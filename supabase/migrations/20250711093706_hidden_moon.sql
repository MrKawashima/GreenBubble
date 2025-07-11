/*
  # Environmental Challenges - Batch 8 (Challenges 351-400)

  1. New Challenge Data
    - 50 practical daily environmental challenges
    - Focus on habit formation and lifestyle changes
    - Accessible challenges for all skill levels
    - Emphasis on measurable impact

  2. Challenge Themes
    - Daily sustainable habits
    - Home efficiency improvements
    - Sustainable consumption patterns
    - Community engagement activities
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Morning Walk Commute', 'Walk for the first mile of your commute every day for a week.', 'transport', 3.2, 60, NOW() + INTERVAL '351 days', NOW() + INTERVAL '358 days', false),
  ('Breakfast Smoothie Bowl', 'Make smoothie bowls using only local, seasonal fruits for breakfast.', 'food', 1.8, 40, NOW() + INTERVAL '352 days', NOW() + INTERVAL '359 days', false),
  ('Unplug Before Bed', 'Unplug all electronics 30 minutes before bedtime for better sleep and energy savings.', 'energy', 2.1, 45, NOW() + INTERVAL '353 days', NOW() + INTERVAL '360 days', false),
  ('Reusable Coffee Cup', 'Use only reusable coffee cups and water bottles for all beverages.', 'waste', 1.4, 35, NOW() + INTERVAL '354 days', NOW() + INTERVAL '361 days', false),
  ('Daily Nature Observation', 'Spend 10 minutes daily observing and recording local wildlife.', 'other', 0.5, 25, NOW() + INTERVAL '355 days', NOW() + INTERVAL '362 days', false),
  
  ('Lunch Box Challenge', 'Pack waste-free lunches using only reusable containers for one week.', 'waste', 2.3, 50, NOW() + INTERVAL '356 days', NOW() + INTERVAL '363 days', false),
  ('Afternoon Bike Ride', 'Take a 20-minute bike ride every afternoon instead of other activities.', 'transport', 2.7, 55, NOW() + INTERVAL '357 days', NOW() + INTERVAL '364 days', false),
  ('Herb Garden Snacking', 'Snack only on herbs and vegetables from your garden for one week.', 'food', 1.6, 40, NOW() + INTERVAL '358 days', NOW() + INTERVAL '365 days', false),
  ('Natural Light Work', 'Work using only natural light during daylight hours.', 'energy', 1.9, 40, NOW() + INTERVAL '359 days', NOW() + INTERVAL '366 days', false),
  ('Daily Gratitude Walk', 'Take a daily gratitude walk in nature, picking up litter along the way.', 'other', 1.1, 35, NOW() + INTERVAL '360 days', NOW() + INTERVAL '367 days', false),
  
  ('Mindful Eating Week', 'Practice mindful eating with locally sourced, plant-based meals.', 'food', 4.2, 75, NOW() + INTERVAL '361 days', NOW() + INTERVAL '368 days', false),
  ('Stair Climbing', 'Use stairs instead of elevators and escalators for all trips.', 'transport', 0.8, 25, NOW() + INTERVAL '362 days', NOW() + INTERVAL '369 days', false),
  ('Cold Shower Challenge', 'Take cold showers to reduce hot water energy consumption.', 'energy', 3.4, 65, NOW() + INTERVAL '363 days', NOW() + INTERVAL '370 days', false),
  ('Repair Something Daily', 'Repair one small item each day instead of throwing it away.', 'waste', 2.8, 60, NOW() + INTERVAL '364 days', NOW() + INTERVAL '371 days', false),
  ('Sunset Appreciation', 'Watch the sunset daily while planning tomorrow\'s sustainable actions.', 'other', 0.3, 20, NOW() + INTERVAL '365 days', NOW() + INTERVAL '372 days', false),
  
  ('Barefoot Grounding', 'Spend 15 minutes daily barefoot on natural ground for grounding.', 'other', 0.2, 15, NOW() + INTERVAL '366 days', NOW() + INTERVAL '373 days', false),
  ('Seasonal Fruit Only', 'Eat only seasonal fruits available in your region for one week.', 'food', 2.1, 45, NOW() + INTERVAL '367 days', NOW() + INTERVAL '374 days', false),
  ('Hand Washing Clothes', 'Hand wash delicate clothes instead of using the washing machine.', 'energy', 1.7, 35, NOW() + INTERVAL '368 days', NOW() + INTERVAL '375 days', false),
  ('Digital Detox Hour', 'Have one hour daily without any digital devices or screens.', 'energy', 0.9, 25, NOW() + INTERVAL '369 days', NOW() + INTERVAL '376 days', false),
  ('Neighborhood Cleanup', 'Clean up litter in your neighborhood during daily walks.', 'waste', 1.5, 40, NOW() + INTERVAL '370 days', NOW() + INTERVAL '377 days', false),
  
  ('Morning Stretching', 'Do morning stretches outdoors to connect with nature daily.', 'other', 0.1, 15, NOW() + INTERVAL '371 days', NOW() + INTERVAL '378 days', false),
  ('One-Pot Meals', 'Cook only one-pot meals to reduce water and energy usage.', 'food', 2.4, 50, NOW() + INTERVAL '372 days', NOW() + INTERVAL '379 days', false),
  ('Manual Can Opener', 'Use manual tools instead of electric ones for food preparation.', 'energy', 0.6, 20, NOW() + INTERVAL '373 days', NOW() + INTERVAL '380 days', false),
  ('Cloth Napkin Week', 'Use only cloth napkins and towels, no paper products.', 'waste', 1.8, 40, NOW() + INTERVAL '374 days', NOW() + INTERVAL '381 days', false),
  ('Bird Song Listening', 'Listen to and identify bird songs during daily outdoor time.', 'other', 0.0, 15, NOW() + INTERVAL '375 days', NOW() + INTERVAL '382 days', false),
  
  ('Walking Meditation', 'Practice walking meditation in natural settings daily.', 'other', 0.4, 20, NOW() + INTERVAL '376 days', NOW() + INTERVAL '383 days', false),
  ('Raw Food Day', 'Eat only raw, unprocessed foods for one day to save cooking energy.', 'food', 3.1, 60, NOW() + INTERVAL '377 days', NOW() + INTERVAL '384 days', false),
  ('Candle Light Evening', 'Use only candles for lighting during evening hours.', 'energy', 2.2, 45, NOW() + INTERVAL '378 days', NOW() + INTERVAL '385 days', false),
  ('Mending Practice', 'Practice visible mending techniques on clothing and textiles.', 'waste', 2.6, 55, NOW() + INTERVAL '379 days', NOW() + INTERVAL '386 days', false),
  ('Cloud Watching', 'Spend time daily watching clouds and weather patterns.', 'other', 0.0, 10, NOW() + INTERVAL '380 days', NOW() + INTERVAL '387 days', false),
  
  ('Breathing Exercise', 'Practice deep breathing exercises outdoors for air quality awareness.', 'other', 0.0, 15, NOW() + INTERVAL '381 days', NOW() + INTERVAL '388 days', false),
  ('Fermented Foods', 'Include fermented foods in every meal for gut and environmental health.', 'food', 1.3, 35, NOW() + INTERVAL '382 days', NOW() + INTERVAL '389 days', false),
  ('Hand Crank Radio', 'Use hand-crank or solar radios instead of electric ones.', 'energy', 0.4, 20, NOW() + INTERVAL '383 days', NOW() + INTERVAL '390 days', false),
  ('Origami Practice', 'Practice origami using only recycled paper and materials.', 'waste', 0.7, 25, NOW() + INTERVAL '384 days', NOW() + INTERVAL '391 days', false),
  ('Star Gazing', 'Spend time nightly star gazing and reducing light pollution.', 'other', 0.8, 25, NOW() + INTERVAL '385 days', NOW() + INTERVAL '392 days', false),
  
  ('Mindful Dishwashing', 'Practice mindful dishwashing using minimal water and natural soap.', 'energy', 1.2, 30, NOW() + INTERVAL '386 days', NOW() + INTERVAL '393 days', false),
  ('Sprouting Daily', 'Grow and eat fresh sprouts daily for local nutrition.', 'food', 0.9, 25, NOW() + INTERVAL '387 days', NOW() + INTERVAL '394 days', false),
  ('Solar Calculator', 'Use only solar-powered calculators and small electronics.', 'energy', 0.3, 15, NOW() + INTERVAL '388 days', NOW() + INTERVAL '395 days', false),
  ('Envelope Reuse', 'Reuse envelopes and paper for all personal correspondence.', 'waste', 0.5, 20, NOW() + INTERVAL '389 days', NOW() + INTERVAL '396 days', false),
  ('Moon Phase Tracking', 'Track moon phases and plan activities according to lunar cycles.', 'other', 0.0, 20, NOW() + INTERVAL '390 days', NOW() + INTERVAL '397 days', false),
  
  ('Gratitude Journaling', 'Keep a daily gratitude journal focused on environmental blessings.', 'other', 0.1, 15, NOW() + INTERVAL '391 days', NOW() + INTERVAL '398 days', false),
  ('Seed Sprouting', 'Sprout different seeds daily for fresh, living nutrition.', 'food', 0.8, 25, NOW() + INTERVAL '392 days', NOW() + INTERVAL '399 days', false),
  ('Wind-Up Clock', 'Use wind-up clocks and watches instead of battery-powered ones.', 'energy', 0.2, 15, NOW() + INTERVAL '393 days', NOW() + INTERVAL '400 days', false),
  ('Scrap Paper Art', 'Create daily art projects using only scrap paper and materials.', 'waste', 0.4, 20, NOW() + INTERVAL '394 days', NOW() + INTERVAL '401 days', false),
  ('Weather Observation', 'Observe and record daily weather patterns and changes.', 'other', 0.0, 15, NOW() + INTERVAL '395 days', NOW() + INTERVAL '402 days', false),
  
  ('Mindful Walking', 'Practice mindful walking, paying attention to each step and breath.', 'other', 0.6, 20, NOW() + INTERVAL '396 days', NOW() + INTERVAL '403 days', false),
  ('Wild Edible Snack', 'Find and eat one wild edible plant daily (safely identified).', 'food', 0.2, 25, NOW() + INTERVAL '397 days', NOW() + INTERVAL '404 days', false),
  ('Pedal Power', 'Use pedal-powered devices for small tasks like sharpening knives.', 'energy', 0.5, 20, NOW() + INTERVAL '398 days', NOW() + INTERVAL '405 days', false),
  ('Bottle Cap Collection', 'Collect and properly recycle bottle caps and small metal items.', 'waste', 0.6, 25, NOW() + INTERVAL '399 days', NOW() + INTERVAL '406 days', false),
  ('Daily Earth Connection', 'Spend time daily with hands in soil, connecting with the earth.', 'other', 0.1, 15, NOW() + INTERVAL '400 days', NOW() + INTERVAL '407 days', false);