-- Migration: Create families and restructure categories
-- Version: 007
-- Description: Add families table, product_categories junction table, and reorganize category hierarchy

-- Create families table (top-level grouping)
CREATE TABLE IF NOT EXISTS families (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(500),
  icon VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add family_id to categories table
ALTER TABLE categories ADD COLUMN IF NOT EXISTS family_id VARCHAR(50) REFERENCES families(id) ON DELETE SET NULL;

-- Add category_type to distinguish between category and subcategory
ALTER TABLE categories ADD COLUMN IF NOT EXISTS category_type VARCHAR(20) DEFAULT 'category' CHECK (category_type IN ('category', 'subcategory'));

-- Create product_categories junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS product_categories (
  id VARCHAR(50) PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id VARCHAR(50) NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, category_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_categories_family ON categories(family_id);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(category_type);
CREATE INDEX IF NOT EXISTS idx_product_categories_product ON product_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_category ON product_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_families_active ON families(is_active);

-- Insert families
INSERT INTO families (id, name, slug, description, sort_order, is_active) VALUES
  ('fam-informatique', 'Informatique', 'informatique', 'Équipement informatique professionnel', 1, true),
  ('fam-image-son', 'Image & Son', 'image-son', 'Équipement audiovisuel et son', 2, true),
  ('fam-telephonie', 'Téléphonie', 'telephonie', 'Smartphones et accessoires téléphonie', 3, true),
  ('fam-audiovisuel', 'Audiovisuel', 'audiovisuel', 'Équipement audiovisuel professionnel', 4, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- Insert/Update categories with family assignments
-- Famille Informatique
INSERT INTO categories (id, name, slug, family_id, category_type, sort_order, is_active) VALUES
  ('cat-laptops', 'Ordinateurs portables', 'ordinateurs-portables', 'fam-informatique', 'category', 1, true),
  ('cat-desktops', 'Ordinateurs de bureau', 'ordinateurs-de-bureau', 'fam-informatique', 'category', 2, true),
  ('cat-printers', 'Imprimantes', 'imprimantes', 'fam-informatique', 'category', 3, true),
  ('cat-monitors', 'Écrans et moniteurs', 'ecrans-moniteurs', 'fam-informatique', 'category', 4, true),
  ('cat-servers', 'Serveurs', 'serveurs', 'fam-informatique', 'category', 5, true),
  ('cat-networking', 'Réseau', 'reseau', 'fam-informatique', 'category', 6, true),
  ('cat-accessories-it', 'Accessoires informatiques', 'accessoires-informatiques', 'fam-informatique', 'category', 7, true),
  ('cat-storage', 'Stockage', 'stockage', 'fam-informatique', 'category', 8, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  family_id = EXCLUDED.family_id,
  category_type = EXCLUDED.category_type,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- Famille Image & Son
INSERT INTO categories (id, name, slug, family_id, category_type, sort_order, is_active) VALUES
  ('cat-tv', 'Télévision', 'television', 'fam-image-son', 'category', 1, true),
  ('cat-headphones', 'Casques & Écouteurs', 'casques-ecouteurs', 'fam-image-son', 'category', 2, true),
  ('cat-speakers', 'Enceintes', 'enceintes', 'fam-image-son', 'category', 3, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  family_id = EXCLUDED.family_id,
  category_type = EXCLUDED.category_type,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- Famille Téléphonie
INSERT INTO categories (id, name, slug, family_id, category_type, sort_order, is_active) VALUES
  ('cat-smartphones', 'Smartphones', 'smartphones', 'fam-telephonie', 'category', 1, true),
  ('cat-iphones', 'iPhone', 'iphone', 'fam-telephonie', 'category', 2, true),
  ('cat-accessories-phone', 'Accessoires téléphonie', 'accessoires-telephonie', 'fam-telephonie', 'category', 3, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  family_id = EXCLUDED.family_id,
  category_type = EXCLUDED.category_type,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- Famille Audiovisuel
INSERT INTO categories (id, name, slug, family_id, category_type, sort_order, is_active) VALUES
  ('cat-microphones', 'Microphones', 'microphones', 'fam-audiovisuel', 'category', 1, true),
  ('cat-mixers', 'Tables de mixage', 'tables-mixage', 'fam-audiovisuel', 'category', 2, true),
  ('cat-speakers-av', 'Enceintes AV', 'enceintes-av', 'fam-audiovisuel', 'category', 3, true),
  ('cat-accessories-av', 'Accessoires AV', 'accessoires-av', 'fam-audiovisuel', 'category', 4, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  family_id = EXCLUDED.family_id,
  category_type = EXCLUDED.category_type,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- Update existing categories to assign them to Informatique family if not assigned
UPDATE categories 
SET family_id = 'fam-informatique', category_type = 'category'
WHERE family_id IS NULL AND slug IN (
  'ordinateurs-portables', 'ordinateurs-de-bureau', 'imprimantes', 
  'ecrans', 'serveurs', 'reseau', 'accessoires', 'stockage'
);

-- Migrate existing product category relationships to product_categories table
-- This preserves the current category_id as primary category
INSERT INTO product_categories (id, product_id, category_id, is_primary)
SELECT 
  'pc-' || id || '-' || category_id,
  id,
  category_id,
  true
FROM products 
WHERE category_id IS NOT NULL
ON CONFLICT (product_id, category_id) DO NOTHING;
