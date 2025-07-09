/*
  # Create database functions and triggers

  1. Functions
    - Update bubble totals when challenge completions change
    - Update user points when completions change
    - Check and award badges automatically

  2. Triggers
    - Trigger functions on challenge completion insert/update/delete
    - Trigger badge checking on user stats changes

  3. Security
    - Functions run with definer rights for proper access
*/

-- Function to update bubble totals
CREATE OR REPLACE FUNCTION update_bubble_totals()
RETURNS TRIGGER AS $$
BEGIN
  -- Update bubble totals based on all completions
  UPDATE bubbles 
  SET 
    total_points = (
      SELECT COALESCE(SUM(points), 0) 
      FROM challenge_completions 
      WHERE bubble_id = COALESCE(NEW.bubble_id, OLD.bubble_id)
    ),
    total_co2_saved = (
      SELECT COALESCE(SUM(co2_saved), 0) 
      FROM challenge_completions 
      WHERE bubble_id = COALESCE(NEW.bubble_id, OLD.bubble_id)
    )
  WHERE id = COALESCE(NEW.bubble_id, OLD.bubble_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user points
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  -- Update user points based on all their completions
  UPDATE users 
  SET points = (
    SELECT COALESCE(SUM(points), 0) 
    FROM challenge_completions 
    WHERE user_id = COALESCE(NEW.user_id, OLD.user_id)
  )
  WHERE id = COALESCE(NEW.user_id, OLD.user_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and award badges
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
  user_stats RECORD;
  badge_record RECORD;
BEGIN
  -- Get user statistics
  SELECT 
    COUNT(*) as total_challenges,
    COUNT(*) FILTER (WHERE c.category = 'food') as food_challenges,
    COUNT(*) FILTER (WHERE c.category = 'waste') as waste_challenges,
    COUNT(*) FILTER (WHERE c.category = 'transport') as transport_challenges,
    COUNT(*) FILTER (WHERE c.category = 'energy') as energy_challenges,
    COALESCE(SUM(cc.co2_saved), 0) as total_co2_saved,
    COUNT(*) FILTER (WHERE cc.photo IS NOT NULL) as photos_shared
  INTO user_stats
  FROM challenge_completions cc
  JOIN challenges c ON cc.challenge_id = c.id
  WHERE cc.user_id = NEW.user_id;

  -- Check each badge condition and award if not already earned
  
  -- First Challenge Badge
  IF user_stats.total_challenges >= 1 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, 'first_challenge')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Green Warrior Badge
  IF user_stats.food_challenges >= 3 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, 'green_warrior')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Recycle Guru Badge
  IF user_stats.waste_challenges >= 5 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, 'recycle_guru')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Eco Sprout Badge
  IF user_stats.total_challenges >= 10 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, 'eco_sprout')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Transport Hero Badge
  IF user_stats.transport_challenges >= 5 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, 'transport_hero')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Energy Saver Badge
  IF user_stats.energy_challenges >= 7 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, 'energy_saver')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- CO2 Champion Badge
  IF user_stats.total_co2_saved >= 25 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, 'co2_champion')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Photo Master Badge
  IF user_stats.photos_shared >= 15 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, 'photo_master')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
DROP TRIGGER IF EXISTS trigger_update_bubble_totals ON challenge_completions;
CREATE TRIGGER trigger_update_bubble_totals
  AFTER INSERT OR UPDATE OR DELETE ON challenge_completions
  FOR EACH ROW EXECUTE FUNCTION update_bubble_totals();

DROP TRIGGER IF EXISTS trigger_update_user_points ON challenge_completions;
CREATE TRIGGER trigger_update_user_points
  AFTER INSERT OR UPDATE OR DELETE ON challenge_completions
  FOR EACH ROW EXECUTE FUNCTION update_user_points();

DROP TRIGGER IF EXISTS trigger_check_badges ON challenge_completions;
CREATE TRIGGER trigger_check_badges
  AFTER INSERT ON challenge_completions
  FOR EACH ROW EXECUTE FUNCTION check_and_award_badges();