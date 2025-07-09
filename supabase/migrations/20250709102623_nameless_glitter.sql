/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text, user's display name)
      - `email` (text, unique, user's email address)
      - `bubble_id` (uuid, foreign key to bubbles table)
      - `points` (integer, user's total points earned)
      - `level` (integer, user's current level)
      - `badges` (text array, list of earned badge IDs)
      - `avatar` (text, optional avatar URL)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `users` table
    - Add policy for users to read/update their own data
    - Add policy for bubble members to read each other's basic info
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  bubble_id uuid,
  points integer DEFAULT 0,
  level integer DEFAULT 1,
  badges text[] DEFAULT '{}',
  avatar text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read and update their own data
CREATE POLICY "Users can manage own data"
  ON users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

-- Users can read basic info of other users in their bubble
CREATE POLICY "Users can read bubble members"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    bubble_id IS NOT NULL AND 
    bubble_id IN (
      SELECT bubble_id FROM users WHERE id = auth.uid()
    )
  );