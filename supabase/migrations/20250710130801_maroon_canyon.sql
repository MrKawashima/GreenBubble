/*
  # Create user_bubbles junction table

  1. New Tables
    - `user_bubbles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `bubble_id` (uuid, foreign key to bubbles)
      - `joined_at` (timestamp)
      - `role` (text, default 'member')
      - `points` (integer, default 0)
      - `co2_saved` (numeric, default 0)

  2. Security
    - Enable RLS on `user_bubbles` table
    - Add policies for users to read their own bubble memberships
    - Add policies for bubble members to read other members in same bubble

  3. Indexes
    - Add indexes for efficient querying by user_id and bubble_id
    - Add unique constraint to prevent duplicate memberships
*/

CREATE TABLE IF NOT EXISTS user_bubbles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bubble_id uuid NOT NULL REFERENCES bubbles(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  role text DEFAULT 'member' CHECK (role IN ('member', 'admin', 'creator')),
  points integer DEFAULT 0,
  co2_saved numeric(10,2) DEFAULT 0,
  UNIQUE(user_id, bubble_id)
);

-- Enable RLS
ALTER TABLE user_bubbles ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_bubbles_user_id ON user_bubbles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bubbles_bubble_id ON user_bubbles(bubble_id);
CREATE INDEX IF NOT EXISTS idx_user_bubbles_joined_at ON user_bubbles(joined_at DESC);

-- RLS Policies
CREATE POLICY "Users can read own bubble memberships"
  ON user_bubbles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read bubble members in same bubbles"
  ON user_bubbles
  FOR SELECT
  TO authenticated
  USING (
    bubble_id IN (
      SELECT ub.bubble_id 
      FROM user_bubbles ub 
      WHERE ub.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own bubble memberships"
  ON user_bubbles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bubble memberships"
  ON user_bubbles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bubble memberships"
  ON user_bubbles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Migrate existing data from users.bubble_id to user_bubbles table
INSERT INTO user_bubbles (user_id, bubble_id, role, joined_at)
SELECT 
  u.id as user_id,
  u.bubble_id,
  CASE 
    WHEN b.created_by = u.id THEN 'creator'
    ELSE 'member'
  END as role,
  u.created_at as joined_at
FROM users u
JOIN bubbles b ON u.bubble_id = b.id
WHERE u.bubble_id IS NOT NULL
ON CONFLICT (user_id, bubble_id) DO NOTHING;