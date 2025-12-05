-- Seed initial data for Ekwip

-- Insert categories
INSERT INTO categories (id, name, slug, description, parent_id, image, sort_order, is_active, product_count)
VALUES 
  ('cat-laptops', 'Ordinateurs portables', 'ordinateurs-portables', 'Ordinateurs portables professionnels pour entreprises', NULL, '/images/macbook-pro.png', 1, true, 3),
  ('cat-smartphones', 'Smartphones', 'smartphones', 'Smartphones professionnels', NULL, '/images/iphone.png', 2, true, 1),
  ('cat-desktops', 'Ordinateurs de bureau', 'ordinateurs-bureau', 'Stations de travail professionnelles', NULL, '/images/imac.png', 3, true, 1),
  ('cat-printers', 'Imprimantes', 'imprimantes', 'Imprimantes professionnelles', NULL, '/placeholder.svg?height=200&width=200', 4, true, 0),
  ('cat-accessories', 'Accessoires', 'accessoires', 'Accessoires informatiques', NULL, '/placeholder.svg?height=200&width=200', 5, true, 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  sort_order = EXCLUDED.sort_order,
  product_count = EXCLUDED.product_count;

-- Insert brands
INSERT INTO brands (id, name, slug, description, logo, website, is_active, product_count)
VALUES 
  ('brand-apple', 'Apple', 'apple', 'Produits Apple de qualité professionnelle', '/images/logo-apple.png', 'https://www.apple.com', true, 3),
  ('brand-dell', 'Dell', 'dell', 'Ordinateurs professionnels Dell', '/images/logo-dell.png', 'https://www.dell.com', true, 2),
  ('brand-hp', 'HP', 'hp', 'Solutions informatiques HP', '/placeholder.svg?height=100&width=100', 'https://www.hp.com', true, 0),
  ('brand-lenovo', 'Lenovo', 'lenovo', 'Ordinateurs Lenovo Think', '/placeholder.svg?height=100&width=100', 'https://www.lenovo.com', true, 0),
  ('brand-samsung', 'Samsung', 'samsung', 'Produits Samsung', '/placeholder.svg?height=100&width=100', 'https://www.samsung.com', true, 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  logo = EXCLUDED.logo,
  website = EXCLUDED.website,
  product_count = EXCLUDED.product_count;

-- Insert attributes
INSERT INTO attributes (id, name, slug, type, values, is_required, is_filterable, sort_order, categories)
VALUES 
  ('attr-processor', 'Processeur', 'processeur', 'select', '["Intel Core i5", "Intel Core i7", "Intel Core i9", "Apple M2", "Apple M2 Pro", "Apple M3", "Apple M3 Pro", "Apple M4"]', true, true, 1, '["cat-laptops", "cat-desktops"]'),
  ('attr-ram', 'Mémoire RAM', 'ram', 'select', '["8GB", "16GB", "32GB", "64GB", "128GB"]', true, true, 2, '["cat-laptops", "cat-desktops"]'),
  ('attr-storage', 'Stockage', 'stockage', 'select', '["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"]', true, true, 3, '["cat-laptops", "cat-desktops", "cat-smartphones"]'),
  ('attr-screen', 'Écran', 'ecran', 'select', '["13\"", "14\"", "15\"", "16\"", "24\"", "27\"", "32\""]', false, true, 4, '["cat-laptops", "cat-desktops"]'),
  ('attr-color', 'Couleur', 'couleur', 'select', '["Gris sidéral", "Argent", "Or", "Noir", "Blanc", "Bleu"]', false, true, 5, '["cat-laptops", "cat-smartphones", "cat-desktops"]')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  values = EXCLUDED.values,
  is_required = EXCLUDED.is_required,
  is_filterable = EXCLUDED.is_filterable,
  categories = EXCLUDED.categories;

-- Insert products
INSERT INTO products (id, name, slug, sku, description, short_description, category_id, brand_id, product_type, price, compare_at_price, cost_price, images, thumbnail, status, stock_quantity, low_stock_threshold, attributes, tags, is_featured, rental_durations)
VALUES 
  ('prod-mbp-14', 'MacBook Pro 14', 'macbook-pro-14', 'MBP-14-001', 'Le MacBook Pro 14 pouces est l''ordinateur portable parfait pour les professionnels exigeants. Équipé de la puce M2 Pro, il offre des performances exceptionnelles.', 'Ordinateur portable professionnel', 'cat-laptops', 'brand-apple', 'rent', 450, 500, 350, '["/images/macbook-pro.png"]', '/images/macbook-pro.png', 'active', 15, 5, '{"attr-processor": "Apple M2 Pro", "attr-ram": "16GB", "attr-storage": "512GB SSD", "attr-screen": "14\"", "attr-color": "Gris sidéral"}', '["laptop", "apple", "pro"]', true, '[{"duration": 6, "monthlyFee": 550}, {"duration": 12, "monthlyFee": 450}, {"duration": 24, "monthlyFee": 380}, {"duration": 36, "monthlyFee": 320}]'),
  
  ('prod-dell-xps', 'Dell XPS 13', 'dell-xps-13', 'DELL-XPS-001', 'Le Dell XPS 13 combine performance et portabilité pour les professionnels en déplacement. Son design élégant et son écran InfinityEdge offrent une expérience utilisateur exceptionnelle.', 'Ultrabook professionnel Dell', 'cat-laptops', 'brand-dell', 'rent', 380, NULL, 280, '["/images/dell-xps.png"]', '/images/dell-xps.png', 'active', 20, 5, '{"attr-processor": "Intel Core i7", "attr-ram": "16GB", "attr-storage": "512GB SSD", "attr-screen": "13\"", "attr-color": "Argent"}', '["laptop", "dell", "ultrabook"]', true, '[{"duration": 6, "monthlyFee": 480}, {"duration": 12, "monthlyFee": 380}, {"duration": 24, "monthlyFee": 320}, {"duration": 36, "monthlyFee": 280}]'),
  
  ('prod-iphone-14', 'iPhone 14 Pro', 'iphone-14-pro', 'IPH-14P-001', 'L''iPhone 14 Pro offre des performances exceptionnelles pour les professionnels connectés. Avec sa puce A16 Bionic et son système de caméra Pro, il redéfinit les standards.', 'Smartphone professionnel Apple', 'cat-smartphones', 'brand-apple', 'rent', 320, 350, 250, '["/images/iphone.png"]', '/images/iphone.png', 'active', 30, 10, '{"attr-storage": "256GB SSD", "attr-color": "Gris sidéral"}', '["smartphone", "apple", "iphone"]', true, '[{"duration": 6, "monthlyFee": 420}, {"duration": 12, "monthlyFee": 320}, {"duration": 24, "monthlyFee": 280}, {"duration": 36, "monthlyFee": 240}]'),
  
  ('prod-dell-pre', 'Dell Precision 5690', 'dell-precision-5690', 'DELL-PRE-001', 'La Dell Precision 5690 est une station de travail mobile haut de gamme conçue pour les professionnels exigeants en CAO, développement et création de contenu.', 'Station de travail mobile professionnelle', 'cat-laptops', 'brand-dell', 'rent', 280, NULL, 200, '["/images/dell-precision-5690.png"]', '/images/dell-precision-5690.png', 'active', 12, 5, '{"attr-processor": "Intel Core i9", "attr-ram": "32GB", "attr-storage": "1TB SSD", "attr-screen": "16\"", "attr-color": "Noir"}', '["laptop", "dell", "workstation"]', false, '[{"duration": 6, "monthlyFee": 380}, {"duration": 12, "monthlyFee": 280}, {"duration": 24, "monthlyFee": 240}, {"duration": 36, "monthlyFee": 200}]'),
  
  ('prod-imac-24', 'iMac 24', 'imac-24', 'IMAC-24-001', 'L''iMac 24 pouces combine design élégant et performances exceptionnelles pour votre bureau. Son écran Retina 4.5K offre une qualité d''image exceptionnelle.', 'Ordinateur de bureau tout-en-un', 'cat-desktops', 'brand-apple', 'rent', 520, 580, 400, '["/images/imac.png"]', '/images/imac.png', 'active', 8, 3, '{"attr-processor": "Apple M3", "attr-ram": "16GB", "attr-storage": "512GB SSD", "attr-screen": "24\"", "attr-color": "Argent"}', '["desktop", "apple", "imac"]', true, '[{"duration": 6, "monthlyFee": 620}, {"duration": 12, "monthlyFee": 520}, {"duration": 24, "monthlyFee": 450}, {"duration": 36, "monthlyFee": 380}]')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  status = EXCLUDED.status,
  stock_quantity = EXCLUDED.stock_quantity,
  attributes = EXCLUDED.attributes,
  tags = EXCLUDED.tags,
  is_featured = EXCLUDED.is_featured,
  rental_durations = EXCLUDED.rental_durations,
  updated_at = NOW();

-- Insert customers
INSERT INTO customers (id, first_name, last_name, email, phone, company, tax_id, customer_type, status, total_orders, total_spent, notes, tags)
VALUES 
  ('cust-001', 'Mohammed', 'Alami', 'contact@abc.ma', '+212 5 22 00 00 00', 'Société ABC', '123456789', 'business', 'active', 1, 1350, 'Client premium avec contrat annuel', '["premium", "b2b"]'),
  ('cust-002', 'Fatima', 'Benani', 'info@xyz.ma', '+212 5 37 00 00 00', 'Entreprise XYZ', '987654321', 'business', 'active', 2, 1600, 'Client régulier depuis 2023', '["regular", "b2b"]'),
  ('cust-003', 'Youssef', 'Tazi', 'contact@techsolutions.ma', '+212 5 24 00 00 00', 'Tech Solutions', '456789123', 'business', 'active', 1, 960, NULL, '["new", "b2b"]'),
  ('cust-004', 'Amina', 'Idrissi', 'hello@digitalinnovations.ma', '+212 5 22 11 11 11', 'Digital Innovations', '789123456', 'business', 'active', 1, 520, NULL, '["premium", "b2b"]')
ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  company = EXCLUDED.company,
  total_orders = EXCLUDED.total_orders,
  total_spent = EXCLUDED.total_spent;

-- Insert customer addresses
INSERT INTO customer_addresses (id, customer_id, address_type, full_name, company, address, city, postal_code, country, phone, is_default)
VALUES 
  ('addr-001', 'cust-001', 'billing', 'Société ABC', 'ABC SARL', '123 Boulevard Mohammed V', 'Casablanca', '20000', 'Maroc', '+212 5 22 00 00 00', true),
  ('addr-002', 'cust-002', 'billing', 'Entreprise XYZ', 'XYZ Corp', '456 Avenue Hassan II', 'Rabat', '10000', 'Maroc', '+212 5 37 00 00 00', true),
  ('addr-003', 'cust-003', 'billing', 'Tech Solutions', 'Tech Solutions SARL', '789 Rue Prince Moulay Abdellah', 'Marrakech', '40000', 'Maroc', '+212 5 24 00 00 00', true),
  ('addr-004', 'cust-004', 'billing', 'Digital Innovations', 'DI Group', '321 Boulevard Zerktouni', 'Casablanca', '20000', 'Maroc', '+212 5 22 11 11 11', true)
ON CONFLICT (id) DO NOTHING;

-- Insert suppliers
INSERT INTO suppliers (id, name, code, email, phone, website, address, city, contact_person, tax_id, payment_terms, notes, tags, is_active)
VALUES 
  ('supp-001', 'Apple Distribution Maroc', 'APPLE-MA', 'contact@apple-maroc.ma', '+212 5 22 99 99 99', 'https://www.apple.com/ma', 'Twin Center, Tour A', 'Casablanca', 'Hassan Benjelloun', '111222333', 'Net 30', 'Distributeur officiel Apple au Maroc', '["apple", "premium"]', true),
  ('supp-002', 'Dell Enterprise Maroc', 'DELL-MA', 'sales@dell-maroc.ma', '+212 5 37 88 88 88', 'https://www.dell.com/ma', 'Technopolis Rabat Shore', 'Rabat', 'Sara Alaoui', '444555666', 'Net 45', 'Partenaire Dell certifié', '["dell", "enterprise"]', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  contact_person = EXCLUDED.contact_person;

-- Insert warehouse
INSERT INTO warehouses (id, name, code, address, city, phone, email, is_active)
VALUES 
  ('wh-casa', 'Entrepôt Casablanca', 'WH-CASA', 'Zone Industrielle Ain Sebaa', 'Casablanca', '+212 5 22 50 50 50', 'entrepot@ekwip.ma', true)
ON CONFLICT (id) DO NOTHING;

-- Insert shop settings
INSERT INTO shop_settings (id, name, email, phone, address, city, postal_code, country, currency, timezone, language, tax_rate, shipping_cost)
VALUES 
  ('default', 'Ekwip', 'contact@ekwip.ma', '+212 5 22 00 00 00', 'Boulevard Mohammed V', 'Casablanca', '20000', 'Maroc', 'MAD', 'Africa/Casablanca', 'fr', 20, 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  updated_at = NOW();

-- Insert default admin user (password: admin123 - should be changed in production)
INSERT INTO admin_users (id, name, email, password_hash, role, is_active)
VALUES 
  ('admin-001', 'Administrateur', 'admin@ekwip.ma', '$2b$10$placeholder_hash_change_in_production', 'admin', true)
ON CONFLICT (id) DO NOTHING;
