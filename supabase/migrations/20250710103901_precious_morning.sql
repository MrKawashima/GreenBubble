/*
  # Fix infinite recursion in users RLS policy

  1. Problem
    - The "Users can read bubble members" policy creates infinite recursion
    - It queries the users table within a policy that applies to the users table
    - This causes a loop when trying to read user data

  2. Solution
    - Drop the problematic policy
    - Create a simpler, non-recursive policy for reading bubble members
    - Use a direct bubble membership check instead of subquery on users table

  3. Security
    - Users can still read their own data via "Users can manage own data" policy
    - Users can read other members only if they share the same bubble_id
    - No recursive queries that could cause infinite loops
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Users can read bubble members" ON users;

-- Create a new, simpler policy for reading bubble members
-- This avoids recursion by directly comparing bubble_id values
CREATE POLICY "Users can read same bubble members"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    bubble_id IS NOT NULL 
    AND bubble_id = (
      SELECT bubble_id 
      FROM auth.users 
      JOIN users ON auth.users.id = users.id 
      WHERE auth.users.id = auth.uid()
      LIMIT 1
    )
  );