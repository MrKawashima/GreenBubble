/*
  # Environmental Challenges - Batch 5 (Challenges 201-250)

  1. New Challenge Data
    - 50 summer-focused environmental challenges
    - Emphasis on outdoor activities and natural cooling
    - Water conservation and management
    - Summer growing and preservation

  2. Challenge Themes
    - Summer transportation alternatives
    - Natural cooling and energy savings
    - Water-wise gardening and conservation
    - Outdoor cooking and food preservation
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Swimming Commute', 'Use swimming as transportation where safe waterways allow.', 'transport', 0.0, 30, NOW() + INTERVAL '201 days', NOW() + INTERVAL '208 days', false),
  ('Solar Dehydrating', 'Use solar dehydrators to preserve summer fruits and vegetables.', 'food', 1.9, 45, NOW() + INTERVAL '202 days', NOW() + INTERVAL '209 days', false),
  ('Evaporative Cooling', 'Use evaporative cooling methods instead of air conditioning.', 'energy', 6.8, 105, NOW() + INTERVAL '203 days', NOW() + INTERVAL '210 days', false),
  ('Beach Cleanup', 'Organize or participate in beach and waterway cleanup events.', 'waste', 4.2, 75, NOW() + INTERVAL '204 days', NOW() + INTERVAL '211 days', false),
  ('Shade Garden', 'Create shade gardens to reduce cooling needs around your home.', 'other', 3.7, 70, NOW() + INTERVAL '205 days', NOW() + INTERVAL '212 days', false),
  
  ('Kayak Commuting', 'Use kayaking for transportation along waterways when possible.', 'transport', 0.0, 35, NOW() + INTERVAL '206 days', NOW() + INTERVAL '213 days', false),
  ('Canning Workshop', 'Learn water bath and pressure canning for food preservation.', 'food', 2.8, 60, NOW() + INTERVAL '207 days', NOW() + INTERVAL '214 days', false),
  ('Whole House Fan', 'Install and use a whole house fan for natural cooling.', 'energy', 4.5, 80, NOW() + INTERVAL '208 days', NOW() + INTERVAL '215 days', false),
  ('Plastic-Free Beach Day', 'Spend a day at the beach using only reusable, plastic-free items.', 'waste', 1.3, 40, NOW() + INTERVAL '209 days', NOW() + INTERVAL '216 days', false),
  ('Green Roof Expansion', 'Expand or improve green roof areas for cooling and biodiversity.', 'other', 8.1, 125, NOW() + INTERVAL '210 days', NOW() + INTERVAL '217 days', false),
  
  ('Paddleboard Transport', 'Use stand-up paddleboarding for water-based transportation.', 'transport', 0.0, 25, NOW() + INTERVAL '211 days', NOW() + INTERVAL '218 days', false),
  ('Outdoor Solar Cooking', 'Cook all meals outdoors using solar ovens and cookers for one week.', 'food', 3.4, 70, NOW() + INTERVAL '212 days', NOW() + INTERVAL '219 days', false),
  ('Thermal Curtain Summer', 'Use thermal curtains to block heat during hot summer days.', 'energy', 2.7, 50, NOW() + INTERVAL '213 days', NOW() + INTERVAL '220 days', false),
  ('Reusable Water Bottles', 'Use only reusable water bottles and containers for all summer activities.', 'waste', 2.1, 45, NOW() + INTERVAL '214 days', NOW() + INTERVAL '221 days', false),
  ('Butterfly Monitoring', 'Participate in butterfly monitoring programs to track population health.', 'other', 0.6, 30, NOW() + INTERVAL '215 days', NOW() + INTERVAL '222 days', false),
  
  ('Sailing Transportation', 'Use sailing for transportation and recreation instead of motorized boats.', 'transport', 0.0, 40, NOW() + INTERVAL '216 days', NOW() + INTERVAL '223 days', false),
  ('Pickle Making', 'Learn to make pickles and fermented vegetables for food preservation.', 'food', 1.6, 40, NOW() + INTERVAL '217 days', NOW() + INTERVAL '224 days', false),
  ('Radiant Barrier', 'Install radiant barriers in attics to reduce cooling costs.', 'energy', 5.2, 85, NOW() + INTERVAL '218 days', NOW() + INTERVAL '225 days', false),
  ('Sunscreen Reef Safe', 'Use only reef-safe, biodegradable sunscreen for water activities.', 'waste', 0.8, 25, NOW() + INTERVAL '219 days', NOW() + INTERVAL '226 days', false),
  ('Pollinator Pathway', 'Create or maintain pollinator pathways in your community.', 'other', 4.9, 90, NOW() + INTERVAL '220 days', NOW() + INTERVAL '227 days', false),
  
  ('River Rafting', 'Use river rafting for eco-friendly recreation and transportation.', 'transport', 0.0, 30, NOW() + INTERVAL '221 days', NOW() + INTERVAL '228 days', false),
  ('Jam and Jelly Making', 'Make jams and jellies from seasonal fruits to preserve summer flavors.', 'food', 1.4, 35, NOW() + INTERVAL '222 days', NOW() + INTERVAL '229 days', false),
  ('Ceiling Fan Optimization', 'Optimize ceiling fan usage and direction for maximum cooling efficiency.', 'energy', 1.8, 35, NOW() + INTERVAL '223 days', NOW() + INTERVAL '230 days', false),
  ('Biodegradable Camping', 'Use only biodegradable products for summer camping trips.', 'waste', 1.7, 45, NOW() + INTERVAL '224 days', NOW() + INTERVAL '231 days', false),
  ('Hummingbird Garden', 'Create a hummingbird garden with native flowering plants.', 'other', 2.3, 55, NOW() + INTERVAL '225 days', NOW() + INTERVAL '232 days', false),
  
  ('Windsurfing', 'Learn windsurfing as a wind-powered water transportation method.', 'transport', 0.0, 50, NOW() + INTERVAL '226 days', NOW() + INTERVAL '233 days', false),
  ('Herb Drying', 'Dry herbs naturally for year-round seasoning and medicine.', 'food', 0.9, 25, NOW() + INTERVAL '227 days', NOW() + INTERVAL '234 days', false),
  ('Swamp Cooler', 'Build and use a DIY swamp cooler for natural air conditioning.', 'energy', 3.1, 60, NOW() + INTERVAL '228 days', NOW() + INTERVAL '235 days', false),
  ('Zero Waste Picnic', 'Organize completely zero waste picnics and outdoor gatherings.', 'waste', 2.4, 55, NOW() + INTERVAL '229 days', NOW() + INTERVAL '236 days', false),
  ('Dragonfly Survey', 'Conduct dragonfly surveys to monitor aquatic ecosystem health.', 'other', 0.5, 25, NOW() + INTERVAL '230 days', NOW() + INTERVAL '237 days', false),
  
  ('Canoe Transportation', 'Use canoeing for practical transportation and recreation.', 'transport', 0.0, 35, NOW() + INTERVAL '231 days', NOW() + INTERVAL '238 days', false),
  ('Fruit Leather Making', 'Make fruit leather from excess summer fruits.', 'food', 1.1, 30, NOW() + INTERVAL '232 days', NOW() + INTERVAL '239 days', false),
  ('Night Flush Cooling', 'Use night flush cooling to cool homes naturally.', 'energy', 2.6, 50, NOW() + INTERVAL '233 days', NOW() + INTERVAL '240 days', false),
  ('Reusable Ice Packs', 'Make and use reusable ice packs for summer cooling needs.', 'waste', 0.7, 20, NOW() + INTERVAL '234 days', NOW() + INTERVAL '241 days', false),
  ('Bat House Installation', 'Install bat houses to support natural pest control.', 'other', 1.8, 45, NOW() + INTERVAL '235 days', NOW() + INTERVAL '242 days', false),
  
  ('Hydrofoil Biking', 'Try hydrofoil biking for efficient water transportation.', 'transport', 0.0, 60, NOW() + INTERVAL '236 days', NOW() + INTERVAL '243 days', false),
  ('Smoking and Curing', 'Learn traditional smoking and curing methods for meat preservation.', 'food', 2.2, 50, NOW() + INTERVAL '237 days', NOW() + INTERVAL '244 days', false),
  ('Earth Tube Cooling', 'Install earth tubes for natural ground-source cooling.', 'energy', 7.4, 110, NOW() + INTERVAL '238 days', NOW() + INTERVAL '245 days', false),
  ('Compostable Tableware', 'Use only compostable tableware for all summer entertaining.', 'waste', 1.5, 35, NOW() + INTERVAL '239 days', NOW() + INTERVAL '246 days', false),
  ('Firefly Conservation', 'Create firefly-friendly habitats and reduce light pollution.', 'other', 1.2, 40, NOW() + INTERVAL '240 days', NOW() + INTERVAL '247 days', false),
  
  ('Rowing Transportation', 'Use rowing for fitness and transportation on waterways.', 'transport', 0.0, 40, NOW() + INTERVAL '241 days', NOW() + INTERVAL '248 days', false),
  ('Freeze Drying', 'Learn freeze drying techniques for long-term food preservation.', 'food', 1.8, 45, NOW() + INTERVAL '242 days', NOW() + INTERVAL '249 days', false),
  ('Thermal Mass Cooling', 'Use thermal mass for passive cooling during hot weather.', 'energy', 4.3, 75, NOW() + INTERVAL '243 days', NOW() + INTERVAL '250 days', false),
  ('Plastic-Free Festival', 'Attend or organize plastic-free summer festivals and events.', 'waste', 3.6, 70, NOW() + INTERVAL '244 days', NOW() + INTERVAL '251 days', false),
  ('Monarch Tagging', 'Participate in monarch butterfly tagging programs.', 'other', 0.3, 35, NOW() + INTERVAL '245 days', NOW() + INTERVAL '252 days', false),
  
  ('Kitesurfing', 'Learn kitesurfing as a wind-powered water sport and transportation.', 'transport', 0.0, 70, NOW() + INTERVAL '246 days', NOW() + INTERVAL '253 days', false),
  ('Root Cellar Summer', 'Use root cellars and cool storage for summer food preservation.', 'food', 2.7, 55, NOW() + INTERVAL '247 days', NOW() + INTERVAL '254 days', false),
  ('Misting Systems', 'Install efficient misting systems for outdoor cooling.', 'energy', 1.9, 40, NOW() + INTERVAL '248 days', NOW() + INTERVAL '255 days', false),
  ('Leave No Trace', 'Practice Leave No Trace principles for all outdoor summer activities.', 'waste', 2.8, 60, NOW() + INTERVAL '249 days', NOW() + INTERVAL '256 days', false),
  ('Bee Hotel Building', 'Build and maintain bee hotels for native solitary bees.', 'other', 3.4, 65, NOW() + INTERVAL '250 days', NOW() + INTERVAL '257 days', false);