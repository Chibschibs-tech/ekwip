-- Update banners table to support boutique position and mobile optimization
-- Add boutique to position constraint
ALTER TABLE banners DROP CONSTRAINT IF EXISTS banners_position_check;
ALTER TABLE banners ADD CONSTRAINT banners_position_check CHECK (position IN ('hero', 'sidebar', 'footer', 'boutique'));

-- Add mobile support fields
ALTER TABLE banners ADD COLUMN IF NOT EXISTS is_mobile_enabled BOOLEAN DEFAULT false;
ALTER TABLE banners ADD COLUMN IF NOT EXISTS mobile_image VARCHAR(500);

-- Remove gradient column if it exists (no longer needed, gradients are in images)
-- ALTER TABLE banners DROP COLUMN IF EXISTS gradient;

