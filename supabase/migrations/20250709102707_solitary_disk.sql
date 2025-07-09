/*
  # Insert sample data

  1. Sample Badges
    - Insert predefined badges that users can earn

  2. Sample Challenge
    - Insert an active challenge for testing

  3. Notes
    - This data is for development/testing purposes
    - In production, you'd manage this through an admin interface
*/

-- Insert sample badges
INSERT INTO badges (id, name, description, icon, requirement, category) VALUES
  ('first_challenge', 'Første Skritt', 'Fullfør din første utfordring', '🌱', 'Complete 1 challenge', 'milestone'),
  ('green_warrior', 'Grønnsakskriger', 'Fullfør 3 kjøttfrie utfordringer', '🥦', 'Complete 3 food challenges', 'food'),
  ('recycle_guru', 'Gjenbruksguru', 'Del 5 gjenbruksbilder', '🔁', 'Complete 5 waste challenges', 'waste'),
  ('eco_sprout', 'Miljøspire', 'Fullfør 10 utfordringer totalt', '🌱', 'Complete 10 challenges', 'milestone'),
  ('transport_hero', 'Transporthelt', 'Bruk miljøvennlig transport 5 ganger', '🚲', 'Complete 5 transport challenges', 'transport'),
  ('energy_saver', 'Energisparer', 'Spar energi i 7 dager', '💡', 'Complete 7 energy challenges', 'energy'),
  ('consistency_king', 'Konsistenskong', 'Fullfør utfordringer 3 uker på rad', '👑', 'Complete challenges for 3 consecutive weeks', 'consistency'),
  ('co2_champion', 'CO₂ Mester', 'Spar 25kg CO₂ totalt', '🏆', 'Save 25kg CO₂', 'impact'),
  ('social_butterfly', 'Sosial Sommerfugl', 'Inviter 3 venner til din boble', '🦋', 'Invite 3 friends', 'social'),
  ('photo_master', 'Fotomester', 'Del 15 bilder av utfordringer', '📸', 'Share 15 challenge photos', 'engagement')
ON CONFLICT (id) DO NOTHING;

-- Insert a sample active challenge
INSERT INTO challenges (
  title, 
  description, 
  category, 
  co2_impact, 
  points, 
  start_date, 
  end_date, 
  is_active
) VALUES (
  'Bike to Work Week',
  'Choose cycling, walking, or public transport instead of driving for your daily commute. Every sustainable trip counts towards a greener future!',
  'transport',
  2.5,
  50,
  NOW() - INTERVAL '1 day',
  NOW() + INTERVAL '6 days',
  true
) ON CONFLICT DO NOTHING;

-- Insert another sample challenge (inactive, for history)
INSERT INTO challenges (
  title, 
  description, 
  category, 
  co2_impact, 
  points, 
  start_date, 
  end_date, 
  is_active
) VALUES (
  'Meatless Monday',
  'Go vegetarian or vegan for the entire day. Try new plant-based recipes and discover delicious alternatives to meat!',
  'food',
  1.8,
  30,
  NOW() - INTERVAL '8 days',
  NOW() - INTERVAL '2 days',
  false
) ON CONFLICT DO NOTHING;