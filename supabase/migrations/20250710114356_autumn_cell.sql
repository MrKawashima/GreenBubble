/*
  # Fix ambiguous table references in RLS policies

  1. Updates
    - Fix ambiguous "users" table references in RLS policies
    - Add proper table aliases and explicit column references
    - Ensure all policies use unambiguous table and column names

  2. Security
    - Maintain existing RLS policy functionality
    - Ensure proper access control is preserved
*/

-- Drop existing policies that have ambiguous references
DROP POLICY IF EXISTS "Users can read bubble members basic info" ON users;
DROP POLICY IF EXISTS "Users can read same bubble members" ON users;

-- Recreate policies with explicit table references
CREATE POLICY "Users can read bubble members basic info"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    (users.bubble_id IS NOT NULL) AND 
    (users.bubble_id IN (
      SELECT b.id
      FROM bubbles b
      WHERE (auth.uid() = ANY (b.members))
    ))
  );

CREATE POLICY "Users can read same bubble members"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    (users.bubble_id IS NOT NULL) AND 
    (users.bubble_id IN (
      SELECT b.id
      FROM bubbles b
      WHERE (auth.uid() = ANY (b.members))
    ))
  );

-- Update challenge_completions policy to be more explicit
DROP POLICY IF EXISTS "Users can read bubble completions" ON challenge_completions;

CREATE POLICY "Users can read bubble completions"
  ON challenge_completions
  FOR SELECT
  TO authenticated
  USING (
    challenge_completions.bubble_id IN (
      SELECT u.bubble_id
      FROM users u
      WHERE u.id = auth.uid() AND u.bubble_id IS NOT NULL
    )
  );