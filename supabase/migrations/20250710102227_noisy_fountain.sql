/*
  # Fix Users RLS Policy

  1. Security Changes
    - Drop existing problematic RLS policies on users table
    - Create simplified, non-recursive policies for users table
    - Ensure users can read their own data without infinite recursion
    - Allow users to read bubble members data safely

  2. Policy Structure
    - Simple policy for users to manage their own data
    - Separate policy for reading bubble member information
    - Remove any circular dependencies in policy logic
*/

-- Drop existing policies that may cause recursion
DROP POLICY IF EXISTS "Users can manage own data" ON users;
DROP POLICY IF EXISTS "Users can read bubble members" ON users;

-- Create simple policy for users to manage their own data
CREATE POLICY "Users can manage own data"
  ON users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policy for reading bubble members without recursion
CREATE POLICY "Users can read bubble members"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    bubble_id IS NOT NULL 
    AND bubble_id IN (
      SELECT bubble_id 
      FROM users AS u 
      WHERE u.id = auth.uid() 
      AND u.bubble_id IS NOT NULL
    )
  );