/*
  # Create bubbles table

  1. New Tables
    - `bubbles`
      - `id` (uuid, primary key)
      - `name` (text, bubble name)
      - `description` (text, bubble description)
      - `is_private` (boolean, whether bubble is private)
      - `invite_code` (text, optional invite code for private bubbles)
      - `members` (uuid array, list of member user IDs)
      - `total_points` (integer, sum of all member points)
      - `total_co2_saved` (numeric, total CO2 saved by bubble)
      - `created_by` (uuid, foreign key to users table)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `bubbles` table
    - Add policy for bubble members to read bubble data
    - Add policy for bubble creator to update bubble
    - Add policy for public bubbles to be discoverable
*/

CREATE TABLE IF NOT EXISTS bubbles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  is_private boolean DEFAULT false,
  invite_code text,
  members uuid[] DEFAULT '{}',
  total_points integer DEFAULT 0,
  total_co2_saved numeric(10,2) DEFAULT 0,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key constraint
ALTER TABLE users ADD CONSTRAINT fk_users_bubble_id 
  FOREIGN KEY (bubble_id) REFERENCES bubbles(id) ON DELETE SET NULL;

ALTER TABLE bubbles ADD CONSTRAINT fk_bubbles_created_by 
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE bubbles ENABLE ROW LEVEL SECURITY;

-- Bubble members can read bubble data
CREATE POLICY "Bubble members can read bubble"
  ON bubbles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = ANY(members));

-- Bubble creator can update bubble
CREATE POLICY "Bubble creator can update bubble"
  ON bubbles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Anyone can create a bubble
CREATE POLICY "Anyone can create bubble"
  ON bubbles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Public bubbles are discoverable
CREATE POLICY "Public bubbles are discoverable"
  ON bubbles
  FOR SELECT
  TO authenticated
  USING (is_private = false);