-- Migration Script: Add Order Type and Rental-Specific Fields (Fixed)
-- Version: 1.2.0
-- Date: 2024-12-20
-- Description: Adds support for rental vs shop order differentiation
-- Note: This script handles the case where some columns might already exist

-- Step 1: Add order_type field to distinguish rental from shop orders
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS order_type VARCHAR(20) 
  CHECK (order_type IN ('rental', 'sale')) DEFAULT 'sale';

-- Step 2: Add client_id field for B2B rental orders (references clients table)
-- Note: This will fail if clients table doesn't exist - ensure it's created first
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'client_id'
  ) THEN
    ALTER TABLE orders 
    ADD COLUMN client_id VARCHAR(50) REFERENCES clients(id) ON DELETE SET NULL;
  END IF;
END $$;

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


