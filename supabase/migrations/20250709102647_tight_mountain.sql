/*
  # Create challenge completions table

  1. New Tables
    - `challenge_completions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users table)
      - `challenge_id` (uuid, foreign key to challenges table)
      - `bubble_id` (uuid, foreign key to bubbles table)
      - `completed_at` (timestamp with timezone)
      - `photo` (text, optional photo URL)
      - `comment` (text, optional user comment)
      - `points` (integer, points earned)
      - `co2_saved` (numeric, CO2 saved in kg)

  2. Security
    - Enable RLS on `challenge_completions` table
    - Add policy for users to read completions in their bubble
    - Add policy for users to create their own completions
    - Add policy for users to update their own completions
*/

CREATE TABLE IF NOT EXISTS challenge_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  challenge_id uuid NOT NULL,
  bubble_id uuid NOT NULL,
  completed_at timestamptz DEFAULT now(),
  photo text,
  comment text,
  points integer NOT NULL DEFAULT 0,
  co2_saved numeric(10,2) NOT NULL DEFAULT 0
);

-- Add foreign key constraints
ALTER TABLE challenge_completions ADD CONSTRAINT fk_completions_user_id 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE challenge_completions ADD CONSTRAINT fk_completions_challenge_id 
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE;

ALTER TABLE challenge_completions ADD CONSTRAINT fk_completions_bubble_id 
  FOREIGN KEY (bubble_id) REFERENCES bubbles(id) ON DELETE CASCADE;

-- Add unique constraint to prevent duplicate completions
ALTER TABLE challenge_completions ADD CONSTRAINT unique_user_challenge_completion 
  UNIQUE (user_id, challenge_id);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_completions_user_id ON challenge_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_completions_challenge_id ON challenge_completions(challenge_id);
CREATE INDEX IF NOT EXISTS idx_completions_bubble_id ON challenge_completions(bubble_id);
CREATE INDEX IF NOT EXISTS idx_completions_completed_at ON challenge_completions(completed_at DESC);

ALTER TABLE challenge_completions ENABLE ROW LEVEL SECURITY;

-- Users can read completions in their bubble
CREATE POLICY "Users can read bubble completions"
  ON challenge_completions
  FOR SELECT
  TO authenticated
  USING (
    bubble_id IN (
      SELECT bubble_id FROM users WHERE id = auth.uid()
    )
  );

-- Users can create their own completions
CREATE POLICY "Users can create own completions"
  ON challenge_completions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own completions
CREATE POLICY "Users can update own completions"
  ON challenge_completions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);