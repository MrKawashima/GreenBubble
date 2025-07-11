/*
  # Add 500 Environmental Challenges - Batch 6 (Challenges 251-300)

  1. New Challenges
    - 50 diverse environmental challenges focusing on winter activities
    - Cold weather sustainability and energy conservation
    - Points range from 22-180 based on winter complexity
    - CO2 savings range from 2.5kg to 40kg per challenge
    - Emphasis on heating efficiency, winter transportation, and cold weather adaptations

  2. Challenge Themes
    - Winter heating and energy conservation
    - Cold weather transportation solutions
    - Indoor growing and food production
    - Winter waste management strategies
    - Cold climate community activities

  3. Seasonal Focus
    - Cold weather energy efficiency
    - Winter transportation alternatives
    - Indoor sustainability practices
    - Heating system optimization
    - Winter community engagement
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Snow Insulation', 'Use snow as natural insulation around your home foundation.', 'other', 2.3, 45, NOW() + INTERVAL '251 days', NOW() + INTERVAL '258 days', false),
  ('Cross-Country Skiing', 'Use cross-country skiing for winter transportation.', 'transport', 6.8, 55, NOW() + INTERVAL '252 days', NOW() + INTERVAL '259 days', false),
  ('Sprouting Seeds', 'Grow fresh sprouts indoors during winter months.', 'food', 1.8, 28, NOW() + INTERVAL '253 days', NOW() + INTERVAL '260 days', false),
  ('Thermal Underwear Day', 'Reduce heating by wearing thermal layers all day.', 'energy', 4.2, 35, NOW() + INTERVAL '254 days', NOW() + INTERVAL '261 days', false),
  ('Ice Fishing Gear', 'Use ice fishing as sustainable winter food sourcing.', 'food', 3.7, 42, NOW() + INTERVAL '255 days', NOW() + INTERVAL '262 days', false),
  ('Snowshoe Commuting', 'Commute to work using snowshoes when possible.', 'transport', 5.4, 48, NOW() + INTERVAL '256 days', NOW() + INTERVAL '263 days', false),
  ('Indoor Herb Garden', 'Maintain a thriving indoor herb garden all winter.', 'food', 2.9, 35, NOW() + INTERVAL '257 days', NOW() + INTERVAL '264 days', false),
  ('Body Heat Warming', 'Heat rooms using only body heat and thermal mass.', 'energy', 7.6, 58, NOW() + INTERVAL '258 days', NOW() + INTERVAL '265 days', false),
  ('Cardboard Insulation', 'Use cardboard as additional insulation material.', 'waste', 3.4, 38, NOW() + INTERVAL '259 days', NOW() + INTERVAL '266 days', false),
  ('Winter Foraging', 'Safely forage for winter edibles like pine needles.', 'food', 1.5, 25, NOW() + INTERVAL '260 days', NOW() + INTERVAL '267 days', false),
  ('Sled Dog Training', 'Train dogs for sled pulling as transportation.', 'transport', 8.9, 70, NOW() + INTERVAL '261 days', NOW() + INTERVAL '268 days', false),
  ('Microgreen Production', 'Produce microgreens indoors for fresh winter nutrition.', 'food', 2.1, 32, NOW() + INTERVAL '262 days', NOW() + INTERVAL '269 days', false),
  ('Candle Heating', 'Use candles strategically for supplemental room heating.', 'energy', 3.8, 40, NOW() + INTERVAL '263 days', NOW() + INTERVAL '270 days', false),
  ('Newspaper Insulation', 'Use newspaper as eco-friendly insulation material.', 'waste', 4.7, 42, NOW() + INTERVAL '264 days', NOW() + INTERVAL '271 days', false),
  ('Ice Skating Commute', 'Use ice skating for winter transportation when safe.', 'transport', 4.1, 38, NOW() + INTERVAL '265 days', NOW() + INTERVAL '272 days', false),
  ('Mushroom Growing', 'Grow mushrooms indoors during winter months.', 'food', 3.6, 45, NOW() + INTERVAL '266 days', NOW() + INTERVAL '273 days', false),
  ('Shared Body Heat', 'Practice shared body heat for warming spaces.', 'energy', 5.2, 48, NOW() + INTERVAL '267 days', NOW() + INTERVAL '274 days', false),
  ('Fabric Scrap Insulation', 'Use fabric scraps for draft stopping and insulation.', 'waste', 2.8, 35, NOW() + INTERVAL '268 days', NOW() + INTERVAL '275 days', false),
  ('Ski Touring', 'Use ski touring for winter mountain transportation.', 'transport', 7.3, 62, NOW() + INTERVAL '269 days', NOW() + INTERVAL '276 days', false),
  ('Winter Greenhouse', 'Maintain a winter greenhouse for food production.', 'food', 8.4, 68, NOW() + INTERVAL '270 days', NOW() + INTERVAL '277 days', false),
  ('Exercise Heating', 'Use exercise to generate body heat instead of heating.', 'energy', 6.7, 52, NOW() + INTERVAL '271 days', NOW() + INTERVAL '278 days', false),
  ('Plastic Bottle Insulation', 'Use plastic bottles as insulation in walls.', 'waste', 5.9, 48, NOW() + INTERVAL '272 days', NOW() + INTERVAL '279 days', false),
  ('Snowmobile Alternative', 'Find eco-friendly alternatives to snowmobiling.', 'transport', 12.6, 85, NOW() + INTERVAL '273 days', NOW() + INTERVAL '280 days', false),
  ('Windowsill Gardening', 'Maximize windowsill space for winter growing.', 'food', 1.9, 28, NOW() + INTERVAL '274 days', NOW() + INTERVAL '281 days', false),
  ('Hot Water Bottle Heat', 'Use hot water bottles for personal heating.', 'energy', 4.5, 42, NOW() + INTERVAL '275 days', NOW() + INTERVAL '282 days', false),
  ('Styrofoam Upcycling', 'Upcycle styrofoam into useful insulation products.', 'waste', 3.2, 38, NOW() + INTERVAL '276 days', NOW() + INTERVAL '283 days', false),
  ('Fat Bike Commuting', 'Use fat bikes for winter snow commuting.', 'transport', 6.1, 55, NOW() + INTERVAL '277 days', NOW() + INTERVAL '284 days', false),
  ('Preserved Food Eating', 'Eat only preserved foods for a week in winter.', 'food', 4.8, 45, NOW() + INTERVAL '278 days', NOW() + INTERVAL '285 days', false),
  ('Layered Clothing', 'Master layered clothing for warmth without heating.', 'energy', 5.8, 48, NOW() + INTERVAL '279 days', NOW() + INTERVAL '286 days', false),
  ('Aluminum Foil Insulation', 'Use aluminum foil as radiant barrier insulation.', 'waste', 2.6, 32, NOW() + INTERVAL '280 days', NOW() + INTERVAL '287 days', false),
  ('Kicksled Transportation', 'Use kicksleds for winter cargo transportation.', 'transport', 3.9, 40, NOW() + INTERVAL '281 days', NOW() + INTERVAL '288 days', false),
  ('Fermented Food Focus', 'Focus diet on fermented foods during winter.', 'food', 2.4, 30, NOW() + INTERVAL '282 days', NOW() + INTERVAL '289 days', false),
  ('Heated Clothing', 'Use battery-heated clothing instead of room heating.', 'energy', 7.1, 55, NOW() + INTERVAL '283 days', NOW() + INTERVAL '290 days', false),
  ('Bubble Wrap Insulation', 'Use bubble wrap on windows for insulation.', 'waste', 4.3, 40, NOW() + INTERVAL '284 days', NOW() + INTERVAL '291 days', false),
  ('Dogsled Racing', 'Participate in dogsled racing as sport transportation.', 'transport', 9.7, 75, NOW() + INTERVAL '285 days', NOW() + INTERVAL '292 days', false),
  ('Root Vegetable Storage', 'Perfect root vegetable storage for winter eating.', 'food', 3.1, 35, NOW() + INTERVAL '286 days', NOW() + INTERVAL '293 days', false),
  ('Sleeping Bag Living', 'Live in sleeping bags to reduce heating needs.', 'energy', 8.4, 62, NOW() + INTERVAL '287 days', NOW() + INTERVAL '294 days', false),
  ('Egg Carton Insulation', 'Use egg cartons for sound and thermal insulation.', 'waste', 1.8, 25, NOW() + INTERVAL '288 days', NOW() + INTERVAL '295 days', false),
  ('Ski Joring', 'Try ski joring with dogs for winter transportation.', 'transport', 5.6, 50, NOW() + INTERVAL '289 days', NOW() + INTERVAL '296 days', false),
  ('Dried Food Diet', 'Eat only dried and dehydrated foods for a week.', 'food', 2.7, 32, NOW() + INTERVAL '290 days', NOW() + INTERVAL '297 days', false),
  ('Sauna Heating', 'Use sauna sessions for warming instead of home heating.', 'energy', 6.9, 58, NOW() + INTERVAL '291 days', NOW() + INTERVAL '298 days', false),
  ('Cork Insulation', 'Use wine corks as natural insulation material.', 'waste', 3.7, 38, NOW() + INTERVAL '292 days', NOW() + INTERVAL '299 days', false),
  ('Snowboard Commuting', 'Use snowboarding for winter hill transportation.', 'transport', 4.8, 45, NOW() + INTERVAL '293 days', NOW() + INTERVAL '300 days', false),
  ('Canned Food Challenge', 'Eat only home-canned foods for winter nutrition.', 'food', 3.5, 40, NOW() + INTERVAL '294 days', NOW() + INTERVAL '301 days', false),
  ('Heated Blanket Zones', 'Create heated blanket zones instead of heating rooms.', 'energy', 5.4, 48, NOW() + INTERVAL '295 days', NOW() + INTERVAL '302 days', false),
  ('Denim Insulation', 'Use old denim as eco-friendly insulation material.', 'waste', 4.1, 42, NOW() + INTERVAL '296 days', NOW() + INTERVAL '303 days', false),
  ('Pulk Sled Hauling', 'Use pulk sleds for winter gear and supply hauling.', 'transport', 3.3, 35, NOW() + INTERVAL '297 days', NOW() + INTERVAL '304 days', false),
  ('Pickled Food Diet', 'Maintain nutrition with pickled foods during winter.', 'food', 2.2, 28, NOW() + INTERVAL '298 days', NOW() + INTERVAL '305 days', false),
  ('Heated Seat Cushions', 'Use heated cushions for personal warmth.', 'energy', 4.6, 42, NOW() + INTERVAL '299 days', NOW() + INTERVAL '306 days', false),
  ('Wool Insulation', 'Use sheep wool as natural building insulation.', 'waste', 6.8, 55, NOW() + INTERVAL '300 days', NOW() + INTERVAL '307 days', false);