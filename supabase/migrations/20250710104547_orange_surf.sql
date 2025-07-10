/*
  # Fix Users Table RLS Policy Recursion

  1. Policy Changes
    - Remove the problematic "Users can manage own data" policy that causes recursion
    - Add separate, non-recursive policies for SELECT, INSERT, UPDATE, DELETE operations
    - Fix the "Users can read bubble members" policy to avoid self-reference issues

  2. Security
    - Maintain proper RLS protection
    - Ensure users can only access their own data
    - Allow bubble members to see each other's basic info
*/

-- Drop the problematic policies that cause recursion
DROP POLICY IF EXISTS "Users can manage own data" ON users;
DROP POLICY IF EXISTS "Users can read bubble members" ON users;

-- Create separate, non-recursive policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own data"
  ON users
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to read basic info of bubble members (non-recursive)
CREATE POLICY "Users can read bubble members basic info"
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