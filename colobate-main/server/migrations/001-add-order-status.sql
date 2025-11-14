-- Migration: add status column to orders table
-- This migration adds a 'status' column to track order progress through stages:
-- new, progress, completed, cancelled

ALTER TABLE orders
ADD COLUMN status VARCHAR(32) DEFAULT 'new' AFTER special_instructions;

-- Create an index for faster filtering by status
CREATE INDEX idx_orders_status ON orders(status);

-- Note: Before running this, ensure you have backed up your database.
-- If the status column already exists, this migration will fail.
