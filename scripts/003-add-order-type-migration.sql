-- Migration Script: Add Order Type and Rental-Specific Fields
-- Version: 1.1.0
-- Date: 2024-12-20
-- Description: Adds support for rental vs shop order differentiation

-- Step 1: Add order_type field to distinguish rental from shop orders
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS order_type VARCHAR(20) 
  CHECK (order_type IN ('rental', 'sale')) DEFAULT 'sale';

-- Step 2: Add client_id field for B2B rental orders (references clients table)
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS client_id VARCHAR(50) REFERENCES clients(id) ON DELETE SET NULL;

-- Step 3: Add rental-specific date fields
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS rental_start_date TIMESTAMP WITH TIME ZONE;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS rental_end_date TIMESTAMP WITH TIME ZONE;

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS rental_duration INTEGER; -- Duration in months

-- Step 4: Add rental-specific fields to order_items
ALTER TABLE order_items 
ADD COLUMN IF NOT EXISTS monthly_fee DECIMAL(10,2);

ALTER TABLE order_items 
ADD COLUMN IF NOT EXISTS upfront_contribution DECIMAL(10,2);

ALTER TABLE order_items 
ADD COLUMN IF NOT EXISTS item_start_date TIMESTAMP WITH TIME ZONE;

ALTER TABLE order_items 
ADD COLUMN IF NOT EXISTS item_end_date TIMESTAMP WITH TIME ZONE;

-- Step 5: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_type ON orders(order_type);
CREATE INDEX IF NOT EXISTS idx_orders_client ON orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_rental_dates ON orders(rental_start_date, rental_end_date);

-- Step 6: Update status constraint to support both rental and shop workflows
-- Note: We'll keep the existing status values for backward compatibility
-- Rental orders will use: pending, confirmed, active, renewed, completed, cancelled
-- Shop orders will use: pending, confirmed, processing, shipped, delivered, cancelled
-- The application logic will differentiate based on order_type

-- Step 7: Add comments for documentation
COMMENT ON COLUMN orders.order_type IS 'Type of order: rental (subscription-like) or sale (one-time purchase)';
COMMENT ON COLUMN orders.client_id IS 'B2B client ID for rental orders (references clients table)';
COMMENT ON COLUMN orders.rental_start_date IS 'Start date for rental period';
COMMENT ON COLUMN orders.rental_end_date IS 'End date for rental period';
COMMENT ON COLUMN orders.rental_duration IS 'Rental duration in months';
COMMENT ON COLUMN order_items.monthly_fee IS 'Monthly fee for rental items';
COMMENT ON COLUMN order_items.upfront_contribution IS 'Upfront contribution for rental items';

-- Verification queries (run these to verify migration)
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'orders' AND column_name IN ('order_type', 'client_id', 'rental_start_date', 'rental_end_date', 'rental_duration');

-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'order_items' AND column_name IN ('monthly_fee', 'upfront_contribution', 'item_start_date', 'item_end_date');

