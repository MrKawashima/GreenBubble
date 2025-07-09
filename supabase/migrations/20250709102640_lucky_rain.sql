/*
  # Create challenges table

  1. New Tables
    - `challenges`
      - `id` (uuid, primary key)
      - `title` (text, challenge title)
      - `description` (text, challenge description)
      - `category` (text, challenge category: transport, food, waste, energy, other)
      - `co2_impact` (numeric, CO2 saved in kg)
      - `points` (integer, points awarded for completion)
      - `start_date` (timestamp with timezone)
      - `end_date` (timestamp with timezone)
      - `is_active` (boolean, whether challenge is currently active)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `challenges` table
    - Add policy for authenticated users to read challenges
    - Add policy for admins to manage challenges (future feature)
*/

CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('transport', 'food', 'waste', 'energy', 'other')),
  co2_impact numeric(10,2) NOT NULL DEFAULT 0,
  points integer NOT NULL DEFAULT 0,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Add index for active challenges
CREATE INDEX IF NOT EXISTS idx_challenges_active ON challenges(is_active, start_date DESC);
CREATE INDEX IF NOT EXISTS idx_challenges_dates ON challenges(start_date, end_date);

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read challenges
CREATE POLICY "Authenticated users can read challenges"
  ON challenges
  FOR SELECT
  TO authenticated
  USING (true);

-- Only service role can manage challenges (for now)
CREATE POLICY "Service role can manage challenges"
  ON challenges
  FOR ALL
  TO service_role
  USING (true);