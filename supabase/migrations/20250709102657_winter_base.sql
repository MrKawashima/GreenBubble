/*
  # Create badges table

  1. New Tables
    - `badges`
      - `id` (text, primary key, badge identifier)
      - `name` (text, badge display name)
      - `description` (text, badge description)
      - `icon` (text, emoji or icon identifier)
      - `requirement` (text, human-readable requirement)
      - `category` (text, badge category)
      - `created_at` (timestamp with timezone)

    - `user_badges`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users table)
      - `badge_id` (text, foreign key to badges table)
      - `earned_at` (timestamp with timezone)

  2. Security
    - Enable RLS on both tables
    - Add policies for reading badges and user achievements
*/

CREATE TABLE IF NOT EXISTS badges (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  requirement text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  badge_id text NOT NULL,
  earned_at timestamptz DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE user_badges ADD CONSTRAINT fk_user_badges_user_id 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_badges ADD CONSTRAINT fk_user_badges_badge_id 
  FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE;

-- Add unique constraint to prevent duplicate badge awards
ALTER TABLE user_badges ADD CONSTRAINT unique_user_badge 
  UNIQUE (user_id, badge_id);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_earned_at ON user_badges(earned_at DESC);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read badges
CREATE POLICY "Authenticated users can read badges"
  ON badges
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can read all user badge achievements
CREATE POLICY "Users can read user badges"
  ON user_badges
  FOR SELECT
  TO authenticated
  USING (true);

-- Only service role can manage badges and awards (for now)
CREATE POLICY "Service role can manage badges"
  ON badges
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can manage user badges"
  ON user_badges
  FOR ALL
  TO service_role
  USING (true);