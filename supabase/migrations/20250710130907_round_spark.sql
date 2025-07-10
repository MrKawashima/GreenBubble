/*
  # Fix RLS policies for user_bubbles table

  This migration fixes the infinite recursion issue in the user_bubbles table policies.
  The problem was caused by a policy that queries the same table it's applied to.

  ## Changes Made
  1. Drop the problematic policy that causes infinite recursion
  2. Recreate a simplified policy structure that avoids circular references
  3. Ensure users can still access their own bubble memberships and see other members in the same bubbles

  ## Security
  - Users can read their own bubble memberships
  - Users can read other members in bubbles they belong to (using a different approach)
  - Users can insert/update/delete their own memberships
*/

-- Drop all existing policies for user_bubbles to start fresh
DROP POLICY IF EXISTS "Users can delete own bubble memberships" ON user_bubbles;
DROP POLICY IF EXISTS "Users can insert own bubble memberships" ON user_bubbles;
DROP POLICY IF EXISTS "Users can read bubble members in same bubbles" ON user_bubbles;
DROP POLICY IF EXISTS "Users can read own bubble memberships" ON user_bubbles;
DROP POLICY IF EXISTS "Users can update own bubble memberships" ON user_bubbles;

-- Create new policies that avoid infinite recursion

-- Policy 1: Users can read their own bubble memberships
CREATE POLICY "Users can read own bubble memberships"
  ON user_bubbles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy 2: Users can read other members in bubbles where they are also members
-- This uses the bubbles table instead of user_bubbles to avoid recursion
CREATE POLICY "Users can read bubble members in shared bubbles"
  ON user_bubbles
  FOR SELECT
  TO authenticated
  USING (
    bubble_id IN (
      SELECT b.id 
      FROM bubbles b 
      WHERE auth.uid() = ANY(b.members)
    )
  );

-- Policy 3: Users can insert their own bubble memberships
CREATE POLICY "Users can insert own bubble memberships"
  ON user_bubbles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy 4: Users can update their own bubble memberships
CREATE POLICY "Users can update own bubble memberships"
  ON user_bubbles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy 5: Users can delete their own bubble memberships
CREATE POLICY "Users can delete own bubble memberships"
  ON user_bubbles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);