-- Run this in your Supabase SQL editor to create the translations cache table
CREATE TABLE IF NOT EXISTS translations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  input_hash text NOT NULL,
  source text NOT NULL,
  target text NOT NULL,
  original_text text,
  translated_text text,
  created_at timestamptz DEFAULT now(),
  UNIQUE (input_hash, source, target)
);

-- Optional index for performance
CREATE INDEX IF NOT EXISTS idx_translations_input_hash ON translations (input_hash);
