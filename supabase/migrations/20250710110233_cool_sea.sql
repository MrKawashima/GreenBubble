/*
  # Fix infinite recursion in users RLS policy

  1. Problem
    - The "Users can read bubble members" policy creates infinite recursion
    - It queries the users table within a policy that applies to the users table
    - This causes a loop when trying to read user data

  2. Solution
    - Drop the problematic policy
    - Create a simpler, non-recursive policy for reading bubble members
    - Use proper table aliasing to avoid ambiguous references
    - Reference the bubbles table directly instead of creating circular dependencies

  3. Security
    - Users can still read their own data via "Users can manage own data" policy
    - Users can read other members only if they share the same bubble_id
    - No recursive queries that could cause infinite loops
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
    AND bubble_id IN (
      SELECT b.id 
      FROM bubbles b 
      WHERE auth.uid() = ANY(b.members)
    )
  );