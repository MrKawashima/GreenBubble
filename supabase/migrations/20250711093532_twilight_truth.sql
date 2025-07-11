/*
  # Environmental Challenges - Batch 6 (Challenges 251-300)

  1. New Challenge Data
    - 50 autumn-focused environmental challenges
    - Emphasis on harvest, preservation, and preparation
    - Energy efficiency for heating season
    - Wildlife preparation and habitat support

  2. Challenge Themes
    - Autumn harvest and food preservation
    - Heating efficiency and insulation
    - Wildlife habitat preparation
    - Seasonal transportation adaptations
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Harvest Festival', 'Organize or attend local harvest festivals celebrating seasonal food.', 'food', 1.8, 45, NOW() + INTERVAL '251 days', NOW() + INTERVAL '258 days', false),
  ('Leaf Insulation', 'Use fallen leaves as natural insulation around plants and foundations.', 'energy', 2.4, 50, NOW() + INTERVAL '252 days', NOW() + INTERVAL '259 days', false),
  ('Apple Pressing', 'Make fresh apple cider using traditional pressing methods.', 'food', 1.2, 35, NOW() + INTERVAL '253 days', NOW() + INTERVAL '260 days', false),
  ('Storm Window Installation', 'Install storm windows to improve winter energy efficiency.', 'energy', 5.7, 95, NOW() + INTERVAL '254 days', NOW() + INTERVAL '261 days', false),
  ('Seed Collection', 'Collect and store seeds from garden plants for next year.', 'other', 1.6, 40, NOW() + INTERVAL '255 days', NOW() + INTERVAL '262 days', false),
  
  ('Pumpkin Everything', 'Use whole pumpkins for food, decoration, and composting.', 'waste', 2.1, 45, NOW() + INTERVAL '256 days', NOW() + INTERVAL '263 days', false),
  ('Wood Stove Efficiency', 'Optimize wood stove operation for maximum efficiency and minimal emissions.', 'energy', 8.3, 125, NOW() + INTERVAL '257 days', NOW() + INTERVAL '264 days', false),
  ('Nut Gathering', 'Gather and process wild nuts for winter food storage.', 'food', 0.9, 30, NOW() + INTERVAL '258 days', NOW() + INTERVAL '265 days', false),
  ('Weatherization', 'Complete comprehensive home weatherization for winter.', 'energy', 9.2, 140, NOW() + INTERVAL '259 days', NOW() + INTERVAL '266 days', false),
  ('Migration Monitoring', 'Monitor and support bird migration through your area.', 'other', 0.7, 30, NOW() + INTERVAL '260 days', NOW() + INTERVAL '267 days', false),
  
  ('Cranberry Harvesting', 'Participate in cranberry harvesting activities.', 'food', 1.4, 35, NOW() + INTERVAL '261 days', NOW() + INTERVAL '268 days', false),
  ('Chimney Maintenance', 'Clean and maintain chimneys for efficient heating.', 'energy', 3.1, 60, NOW() + INTERVAL '262 days', NOW() + INTERVAL '269 days', false),
  ('Persimmon Processing', 'Process persimmons and other late-season fruits.', 'food', 1.1, 30, NOW() + INTERVAL '263 days', NOW() + INTERVAL '270 days', false),
  ('Caulking and Sealing', 'Seal air leaks around windows, doors, and other openings.', 'energy', 4.6, 80, NOW() + INTERVAL '264 days', NOW() + INTERVAL '271 days', false),
  ('Acorn Processing', 'Learn to process acorns into flour and food products.', 'food', 0.8, 35, NOW() + INTERVAL '265 days', NOW() + INTERVAL '272 days', false),
  
  ('Mulch Application', 'Apply organic mulch to garden beds for winter protection.', 'other', 2.3, 50, NOW() + INTERVAL '266 days', NOW() + INTERVAL '273 days', false),
  ('Heating System Tune-up', 'Professional tune-up of heating systems for efficiency.', 'energy', 6.8, 100, NOW() + INTERVAL '267 days', NOW() + INTERVAL '274 days', false),
  ('Wild Rice Harvesting', 'Participate in traditional wild rice harvesting where available.', 'food', 1.7, 45, NOW() + INTERVAL '268 days', NOW() + INTERVAL '275 days', false),
  ('Attic Insulation', 'Add or improve attic insulation for better energy efficiency.', 'energy', 7.9, 120, NOW() + INTERVAL '269 days', NOW() + INTERVAL '276 days', false),
  ('Squirrel Proof Gardens', 'Implement squirrel-proof methods to protect winter bird feeders.', 'other', 0.4, 25, NOW() + INTERVAL '270 days', NOW() + INTERVAL '277 days', false),
  
  ('Grape Harvesting', 'Participate in grape harvesting and wine-making activities.', 'food', 2.2, 50, NOW() + INTERVAL '271 days', NOW() + INTERVAL '278 days', false),
  ('Programmable Thermostat', 'Install and program thermostats for optimal heating efficiency.', 'energy', 5.4, 85, NOW() + INTERVAL '272 days', NOW() + INTERVAL '279 days', false),
  ('Hickory Nut Processing', 'Process hickory nuts and other native nuts for food.', 'food', 0.6, 25, NOW() + INTERVAL '273 days', NOW() + INTERVAL '280 days', false),
  ('Basement Insulation', 'Insulate basement walls and rim joists to reduce heat loss.', 'energy', 6.1, 95, NOW() + INTERVAL '274 days', NOW() + INTERVAL '281 days', false),
  ('Deer-Resistant Planting', 'Plant deer-resistant species to protect winter gardens.', 'other', 1.9, 45, NOW() + INTERVAL '275 days', NOW() + INTERVAL '282 days', false),
  
  ('Chestnut Roasting', 'Roast and preserve chestnuts for winter nutrition.', 'food', 0.7, 25, NOW() + INTERVAL '276 days', NOW() + INTERVAL '283 days', false),
  ('Duct Sealing', 'Seal heating ducts to prevent energy loss.', 'energy', 4.2, 75, NOW() + INTERVAL '277 days', NOW() + INTERVAL '284 days', false),
  ('Walnut Processing', 'Process walnuts and other tree nuts for storage.', 'food', 1.0, 30, NOW() + INTERVAL '278 days', NOW() + INTERVAL '285 days', false),
  ('Window Film Application', 'Apply insulating window film for winter energy savings.', 'energy', 2.8, 55, NOW() + INTERVAL '279 days', NOW() + INTERVAL '286 days', false),
  ('Brush Pile Creation', 'Create brush piles for winter wildlife shelter.', 'other', 1.3, 35, NOW() + INTERVAL '280 days', NOW() + INTERVAL '287 days', false),
  
  ('Hazelnut Harvesting', 'Harvest and process hazelnuts for winter storage.', 'food', 0.9, 30, NOW() + INTERVAL '281 days', NOW() + INTERVAL '288 days', false),
  ('Fireplace Efficiency', 'Improve fireplace efficiency with glass doors and dampers.', 'energy', 3.7, 65, NOW() + INTERVAL '282 days', NOW() + INTERVAL '289 days', false),
  ('Elderberry Processing', 'Process elderberries for immune-boosting winter preparations.', 'food', 1.3, 35, NOW() + INTERVAL '283 days', NOW() + INTERVAL '290 days', false),
  ('Pipe Insulation', 'Insulate hot water pipes to reduce heat loss.', 'energy', 1.9, 40, NOW() + INTERVAL '284 days', NOW() + INTERVAL '291 days', false),
  ('Winter Shelter Building', 'Build winter shelters for outdoor cats and wildlife.', 'other', 2.1, 50, NOW() + INTERVAL '285 days', NOW() + INTERVAL '292 days', false),
  
  ('Pecan Processing', 'Process pecans and other southern nuts for storage.', 'food', 1.1, 30, NOW() + INTERVAL '286 days', NOW() + INTERVAL '293 days', false),
  ('Heat Pump Maintenance', 'Maintain heat pumps for optimal winter performance.', 'energy', 4.8, 80, NOW() + INTERVAL '287 days', NOW() + INTERVAL '294 days', false),
  ('Rose Hip Harvesting', 'Harvest rose hips for vitamin C-rich winter preparations.', 'food', 0.5, 25, NOW() + INTERVAL '288 days', NOW() + INTERVAL '295 days', false),
  ('Door Weatherstripping', 'Install weatherstripping around doors to prevent drafts.', 'energy', 2.3, 45, NOW() + INTERVAL '289 days', NOW() + INTERVAL '296 days', false),
  ('Compost Pile Prep', 'Prepare compost piles for winter decomposition.', 'waste', 3.4, 65, NOW() + INTERVAL '290 days', NOW() + INTERVAL '297 days', false),
  
  ('Pine Nut Gathering', 'Gather pine nuts where available for winter nutrition.', 'food', 0.4, 20, NOW() + INTERVAL '291 days', NOW() + INTERVAL '298 days', false),
  ('Radiant Floor Heating', 'Install or optimize radiant floor heating systems.', 'energy', 8.7, 130, NOW() + INTERVAL '292 days', NOW() + INTERVAL '299 days', false),
  ('Sumac Berry Processing', 'Process sumac berries for natural flavoring and nutrition.', 'food', 0.3, 20, NOW() + INTERVAL '293 days', NOW() + INTERVAL '300 days', false),
  ('Thermal Curtain Install', 'Install thermal curtains for winter insulation.', 'energy', 3.6, 65, NOW() + INTERVAL '294 days', NOW() + INTERVAL '301 days', false),
  ('Leaf Mold Creation', 'Create leaf mold for next year\'s garden soil improvement.', 'waste', 1.8, 40, NOW() + INTERVAL '295 days', NOW() + INTERVAL '302 days', false),
  
  ('Beechnut Processing', 'Process beechnuts for winter food storage.', 'food', 0.6, 25, NOW() + INTERVAL '296 days', NOW() + INTERVAL '303 days', false),
  ('Boiler Maintenance', 'Maintain boilers for efficient winter heating.', 'energy', 5.9, 90, NOW() + INTERVAL '297 days', NOW() + INTERVAL '304 days', false),
  ('Hawthorne Berry Prep', 'Process hawthorne berries for heart-healthy preparations.', 'food', 0.4, 20, NOW() + INTERVAL '298 days', NOW() + INTERVAL '305 days', false),
  ('Outlet Insulation', 'Insulate electrical outlets on exterior walls.', 'energy', 1.2, 30, NOW() + INTERVAL '299 days', NOW() + INTERVAL '306 days', false),
  ('Winter Garden Planning', 'Plan next year\'s garden layout and improvements.', 'other', 0.8, 35, NOW() + INTERVAL '300 days', NOW() + INTERVAL '307 days', false);