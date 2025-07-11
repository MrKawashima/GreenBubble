/*
  # Add 500 Environmental Challenges - Batch 5 (Challenges 201-250)

  1. New Challenges
    - 50 diverse environmental challenges focusing on autumn activities
    - Harvest season sustainability and preparation for winter
    - Points range from 20-160 based on seasonal preparation complexity
    - CO2 savings range from 2.0kg to 35kg per challenge
    - Emphasis on food preservation, energy preparation, and seasonal transitions

  2. Challenge Themes
    - Autumn harvest and preservation techniques
    - Winter preparation and insulation
    - Seasonal energy conservation strategies
    - Leaf and organic waste management
    - Community preparation activities

  3. Seasonal Focus
    - Harvest season sustainability
    - Winter preparation activities
    - Seasonal food storage and preservation
    - Energy efficiency for colder weather
    - Natural material utilization
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Apple Cider Pressing', 'Press fresh apple cider using traditional methods.', 'food', 3.2, 35, NOW() + INTERVAL '201 days', NOW() + INTERVAL '208 days', false),
  ('Leaf Mulch Creation', 'Create nutrient-rich mulch from fallen autumn leaves.', 'waste', 5.8, 45, NOW() + INTERVAL '202 days', NOW() + INTERVAL '209 days', false),
  ('Storm Window Installation', 'Install storm windows for winter energy efficiency.', 'energy', 12.4, 70, NOW() + INTERVAL '203 days', NOW() + INTERVAL '210 days', false),
  ('Bicycle Winterization', 'Prepare bicycles for winter weather commuting.', 'transport', 4.6, 40, NOW() + INTERVAL '204 days', NOW() + INTERVAL '211 days', false),
  ('Root Cellar Construction', 'Build a root cellar for winter food storage.', 'other', 18.7, 95, NOW() + INTERVAL '205 days', NOW() + INTERVAL '212 days', false),
  ('Pumpkin Seed Roasting', 'Roast and preserve pumpkin seeds instead of discarding.', 'food', 1.8, 25, NOW() + INTERVAL '206 days', NOW() + INTERVAL '213 days', false),
  ('Compost Pile Turning', 'Properly manage compost piles for winter decomposition.', 'waste', 4.2, 38, NOW() + INTERVAL '207 days', NOW() + INTERVAL '214 days', false),
  ('Insulation Upgrade', 'Add natural insulation materials to improve home efficiency.', 'energy', 15.6, 80, NOW() + INTERVAL '208 days', NOW() + INTERVAL '215 days', false),
  ('Fat Bike Preparation', 'Prepare fat bikes for winter snow transportation.', 'transport', 5.3, 48, NOW() + INTERVAL '209 days', NOW() + INTERVAL '216 days', false),
  ('Seed Saving Workshop', 'Organize a community seed saving workshop.', 'other', 8.9, 60, NOW() + INTERVAL '210 days', NOW() + INTERVAL '217 days', false),
  ('Sauerkraut Fermentation', 'Ferment cabbage into sauerkraut for winter nutrition.', 'food', 2.7, 32, NOW() + INTERVAL '211 days', NOW() + INTERVAL '218 days', false),
  ('Leaf Mold Composting', 'Create leaf mold compost for garden soil improvement.', 'waste', 6.4, 50, NOW() + INTERVAL '212 days', NOW() + INTERVAL '219 days', false),
  ('Thermal Curtain Hanging', 'Install thermal curtains for winter heat retention.', 'energy', 8.1, 55, NOW() + INTERVAL '213 days', NOW() + INTERVAL '220 days', false),
  ('Ski Preparation', 'Prepare cross-country skis for winter transportation.', 'transport', 3.8, 35, NOW() + INTERVAL '214 days', NOW() + INTERVAL '221 days', false),
  ('Mushroom Log Inoculation', 'Inoculate logs with mushroom spores for future harvests.', 'other', 7.5, 58, NOW() + INTERVAL '215 days', NOW() + INTERVAL '222 days', false),
  ('Kimchi Making', 'Ferment vegetables into kimchi for winter probiotics.', 'food', 3.1, 38, NOW() + INTERVAL '216 days', NOW() + INTERVAL '223 days', false),
  ('Organic Waste Audit', 'Conduct a comprehensive organic waste audit.', 'waste', 4.7, 42, NOW() + INTERVAL '217 days', NOW() + INTERVAL '224 days', false),
  ('Caulking and Sealing', 'Seal air leaks around windows and doors.', 'energy', 9.8, 62, NOW() + INTERVAL '218 days', NOW() + INTERVAL '225 days', false),
  ('Snowshoe Preparation', 'Prepare snowshoes for winter outdoor transportation.', 'transport', 2.9, 30, NOW() + INTERVAL '219 days', NOW() + INTERVAL '226 days', false),
  ('Native Tree Planting', 'Plant native trees for future carbon sequestration.', 'other', 25.4, 120, NOW() + INTERVAL '220 days', NOW() + INTERVAL '227 days', false),
  ('Pickle Preservation', 'Preserve seasonal vegetables through pickling.', 'food', 2.4, 28, NOW() + INTERVAL '221 days', NOW() + INTERVAL '228 days', false),
  ('Worm Bin Setup', 'Set up indoor worm composting for winter.', 'waste', 5.1, 45, NOW() + INTERVAL '222 days', NOW() + INTERVAL '229 days', false),
  ('Fireplace Efficiency', 'Improve fireplace efficiency for sustainable heating.', 'energy', 11.3, 68, NOW() + INTERVAL '223 days', NOW() + INTERVAL '230 days', false),
  ('Ice Skate Maintenance', 'Maintain ice skates for winter transportation.', 'transport', 1.6, 22, NOW() + INTERVAL '224 days', NOW() + INTERVAL '231 days', false),
  ('Pollinator Overwintering', 'Create overwintering habitats for beneficial insects.', 'other', 6.8, 52, NOW() + INTERVAL '225 days', NOW() + INTERVAL '232 days', false),
  ('Dehydrated Fruit Making', 'Dehydrate seasonal fruits for winter snacks.', 'food', 1.9, 26, NOW() + INTERVAL '226 days', NOW() + INTERVAL '233 days', false),
  ('Bokashi Composting', 'Start bokashi fermentation composting system.', 'waste', 3.6, 35, NOW() + INTERVAL '227 days', NOW() + INTERVAL '234 days', false),
  ('Heat Pump Installation', 'Install an efficient heat pump system.', 'energy', 22.7, 110, NOW() + INTERVAL '228 days', NOW() + INTERVAL '235 days', false),
  ('Sled Preparation', 'Prepare sleds for winter transportation needs.', 'transport', 2.1, 25, NOW() + INTERVAL '229 days', NOW() + INTERVAL '236 days', false),
  ('Wildlife Winter Shelter', 'Build winter shelters for local wildlife.', 'other', 4.3, 40, NOW() + INTERVAL '230 days', NOW() + INTERVAL '237 days', false),
  ('Jam and Jelly Making', 'Preserve seasonal fruits in jams and jellies.', 'food', 2.8, 32, NOW() + INTERVAL '231 days', NOW() + INTERVAL '238 days', false),
  ('Leaf Collection Program', 'Organize neighborhood leaf collection for composting.', 'waste', 8.7, 65, NOW() + INTERVAL '232 days', NOW() + INTERVAL '239 days', false),
  ('Radiant Floor Heating', 'Install radiant floor heating for efficient warmth.', 'energy', 16.9, 85, NOW() + INTERVAL '233 days', NOW() + INTERVAL '240 days', false),
  ('Winter Bike Gear', 'Acquire proper gear for winter bicycle commuting.', 'transport', 4.2, 38, NOW() + INTERVAL '234 days', NOW() + INTERVAL '241 days', false),
  ('Bird Feeder Network', 'Set up a network of bird feeders for winter wildlife.', 'other', 3.7, 35, NOW() + INTERVAL '235 days', NOW() + INTERVAL '242 days', false),
  ('Nut Butter Making', 'Make nut butters from seasonal nut harvests.', 'food', 2.2, 28, NOW() + INTERVAL '236 days', NOW() + INTERVAL '243 days', false),
  ('Textile Waste Reduction', 'Implement textile waste reduction strategies.', 'waste', 7.4, 58, NOW() + INTERVAL '237 days', NOW() + INTERVAL '244 days', false),
  ('Passive Solar Heating', 'Optimize passive solar heating for winter.', 'energy', 13.8, 75, NOW() + INTERVAL '238 days', NOW() + INTERVAL '245 days', false),
  ('Kicksled Assembly', 'Assemble a kicksled for winter transportation.', 'transport', 3.5, 32, NOW() + INTERVAL '239 days', NOW() + INTERVAL '246 days', false),
  ('Hibernation Habitat', 'Create hibernation habitats for beneficial animals.', 'other', 5.9, 48, NOW() + INTERVAL '240 days', NOW() + INTERVAL '247 days', false),
  ('Cheese Making', 'Learn traditional cheese making for food preservation.', 'food', 4.1, 45, NOW() + INTERVAL '241 days', NOW() + INTERVAL '248 days', false),
  ('Paper Waste Elimination', 'Eliminate paper waste through digital alternatives.', 'waste', 6.2, 50, NOW() + INTERVAL '242 days', NOW() + INTERVAL '249 days', false),
  ('Wood Stove Efficiency', 'Optimize wood stove efficiency for clean burning.', 'energy', 14.5, 78, NOW() + INTERVAL '243 days', NOW() + INTERVAL '250 days', false),
  ('Dogsled Preparation', 'Prepare for dog sledding as winter transportation.', 'transport', 6.7, 55, NOW() + INTERVAL '244 days', NOW() + INTERVAL '251 days', false),
  ('Evergreen Windbreak', 'Plant evergreen trees as natural windbreaks.', 'other', 19.3, 100, NOW() + INTERVAL '245 days', NOW() + INTERVAL '252 days', false),
  ('Meat Preservation', 'Learn traditional meat preservation techniques.', 'food', 5.6, 52, NOW() + INTERVAL '246 days', NOW() + INTERVAL '253 days', false),
  ('Glass Waste Reduction', 'Implement comprehensive glass waste reduction.', 'waste', 4.8, 42, NOW() + INTERVAL '247 days', NOW() + INTERVAL '254 days', false),
  ('Thermal Mass Addition', 'Add thermal mass for passive heating storage.', 'energy', 17.2, 88, NOW() + INTERVAL '248 days', NOW() + INTERVAL '255 days', false),
  ('Pulk Sled Setup', 'Set up a pulk sled for winter gear transportation.', 'transport', 4.9, 45, NOW() + INTERVAL '249 days', NOW() + INTERVAL '256 days', false),
  ('Winter Garden Planning', 'Plan and prepare gardens for winter growing.', 'other', 8.4, 62, NOW() + INTERVAL '250 days', NOW() + INTERVAL '257 days', false);