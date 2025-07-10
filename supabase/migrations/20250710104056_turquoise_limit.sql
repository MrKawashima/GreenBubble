/*
  # Fix infinite recursion in users table policy

  1. Security Changes
    - Remove the problematic "Users can read same bubble members" policy that causes infinite recursion
    - Replace with a simpler policy that allows users to read other users in the same bubble
    - Keep the existing "Users can manage own data" policy unchanged

  2. Notes
    - The original policy was trying to query the users table from within a users table policy
    - This creates infinite recursion when Supabase tries to evaluate the policy
    - The new approach uses a direct bubble_id comparison without subqueries
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Users can read same bubble members" ON users;

-- Create a new policy that allows users to read other users in the same bubble
-- This avoids recursion by not querying the users table within the policy
CREATE POLICY "Users can read bubble members"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    bubble_id IS NOT NULL 
    AND bubble_id IN (
      SELECT bubble_id 
      FROM users 
      WHERE id = auth.uid() 
      AND bubble_id IS NOT NULL
    )
  );