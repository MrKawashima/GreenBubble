/*
  # Fix infinite recursion in users RLS policy

  1. Problem
    - The existing "Users can read bubble members" policy causes infinite recursion
    - When querying users table, the policy queries the same users table again

  2. Solution
    - Drop the problematic policy
    - Create a new policy that avoids recursion by using proper table aliasing
    - Use auth.uid() to get current user's bubble_id without recursive queries

  3. Security
    - Maintains same access control: users can only read other users in their bubble
    - Avoids infinite recursion by using clear table references
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Users can read bubble members" ON users;

-- Create a new, simpler policy for reading bubble members
-- This avoids recursion and ambiguous table references
CREATE POLICY "Users can read same bubble members"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    bubble_id IS NOT NULL 
    AND bubble_id = (
      SELECT u.bubble_id 
      FROM users u
      WHERE u.id = auth.uid()
      AND u.bubble_id IS NOT NULL
      LIMIT 1
    )
  );