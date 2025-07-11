/*
  # Add 500 Environmental Challenges - Batch 4 (Challenges 151-200)

  1. New Challenges
    - 50 diverse environmental challenges focusing on seasonal activities
    - Summer-specific sustainability practices and innovations
    - Points range from 18-140 based on seasonal complexity
    - CO2 savings range from 1.5kg to 30kg per challenge
    - Emphasis on hot weather adaptations and outdoor activities

  2. Challenge Themes
    - Summer energy conservation techniques
    - Outdoor sustainable living practices
    - Water conservation and management
    - Heat mitigation and cooling strategies
    - Seasonal food preservation and gardening

  3. Seasonal Focus
    - Hot weather sustainability solutions
    - Outdoor recreation with minimal impact
    - Summer-specific transportation options
    - Seasonal eating and preservation
    - Community summer activities
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Natural Air Conditioning', 'Cool your home using only natural ventilation and thermal mass.', 'energy', 8.4, 55, NOW() + INTERVAL '151 days', NOW() + INTERVAL '158 days', false),
  ('Beach Cleanup Bike Ride', 'Combine cycling to the beach with a cleanup activity.', 'transport', 4.2, 40, NOW() + INTERVAL '152 days', NOW() + INTERVAL '159 days', false),
  ('Solar Dehydrator Build', 'Build and use a solar food dehydrator for preservation.', 'food', 6.7, 50, NOW() + INTERVAL '153 days', NOW() + INTERVAL '160 days', false),
  ('Swamp Cooler Creation', 'Build an evaporative cooler using natural materials.', 'energy', 5.8, 45, NOW() + INTERVAL '154 days', NOW() + INTERVAL '161 days', false),
  ('Plastic Beach Cleanup', 'Organize a beach plastic cleanup and recycling event.', 'waste', 12.3, 70, NOW() + INTERVAL '155 days', NOW() + INTERVAL '162 days', false),
  ('Shade Garden Planting', 'Plant a garden designed to provide natural cooling shade.', 'other', 15.6, 80, NOW() + INTERVAL '156 days', NOW() + INTERVAL '163 days', false),
  ('Sailboat Transportation', 'Use wind-powered sailing for recreational transportation.', 'transport', 7.9, 60, NOW() + INTERVAL '157 days', NOW() + INTERVAL '164 days', false),
  ('Sun-Dried Tomato Making', 'Preserve tomatoes using only solar energy for drying.', 'food', 2.3, 30, NOW() + INTERVAL '158 days', NOW() + INTERVAL '165 days', false),
  ('Reflective Roof Coating', 'Apply reflective coating to reduce cooling energy needs.', 'energy', 11.2, 65, NOW() + INTERVAL '159 days', NOW() + INTERVAL '166 days', false),
  ('Ocean Plastic Collection', 'Participate in ocean plastic collection and processing.', 'waste', 18.7, 95, NOW() + INTERVAL '160 days', NOW() + INTERVAL '167 days', false),
  ('Living Roof Installation', 'Install a living roof system for natural cooling.', 'other', 22.4, 110, NOW() + INTERVAL '161 days', NOW() + INTERVAL '168 days', false),
  ('Kayak Commuting', 'Use a kayak for water-based transportation when possible.', 'transport', 3.6, 35, NOW() + INTERVAL '162 days', NOW() + INTERVAL '169 days', false),
  ('Solar Cooking Marathon', 'Cook all meals for a week using only solar energy.', 'food', 9.1, 65, NOW() + INTERVAL '163 days', NOW() + INTERVAL '170 days', false),
  ('Geothermal Cooling', 'Implement geothermal cooling for your home.', 'energy', 16.8, 85, NOW() + INTERVAL '164 days', NOW() + INTERVAL '171 days', false),
  ('Microplastic Research', 'Conduct research on microplastics in your local environment.', 'waste', 4.5, 50, NOW() + INTERVAL '165 days', NOW() + INTERVAL '172 days', false),
  ('Desert Landscaping', 'Convert lawn to drought-resistant desert landscaping.', 'other', 13.7, 75, NOW() + INTERVAL '166 days', NOW() + INTERVAL '173 days', false),
  ('Stand-Up Paddleboard', 'Use stand-up paddleboarding for water transportation.', 'transport', 2.8, 32, NOW() + INTERVAL '167 days', NOW() + INTERVAL '174 days', false),
  ('Fermented Drink Brewing', 'Brew naturally fermented drinks using seasonal fruits.', 'food', 3.4, 38, NOW() + INTERVAL '168 days', NOW() + INTERVAL '175 days', false),
  ('Passive Cooling Design', 'Implement passive cooling architectural features.', 'energy', 14.3, 80, NOW() + INTERVAL '169 days', NOW() + INTERVAL '176 days', false),
  ('Biodegradable Plastic', 'Research and create biodegradable plastic alternatives.', 'waste', 8.9, 60, NOW() + INTERVAL '170 days', NOW() + INTERVAL '177 days', false),
  ('Pollinator Highway', 'Create a pollinator highway through your neighborhood.', 'other', 19.2, 100, NOW() + INTERVAL '171 days', NOW() + INTERVAL '178 days', false),
  ('Windsurfing Transport', 'Use windsurfing for recreational water transportation.', 'transport', 5.1, 45, NOW() + INTERVAL '172 days', NOW() + INTERVAL '179 days', false),
  ('Pickle Making Workshop', 'Teach others to make pickles for food preservation.', 'food', 2.7, 35, NOW() + INTERVAL '173 days', NOW() + INTERVAL '180 days', false),
  ('Earth Tube Cooling', 'Install earth tubes for natural home cooling.', 'energy', 12.6, 70, NOW() + INTERVAL '174 days', NOW() + INTERVAL '181 days', false),
  ('Plastic-Free Beach Day', 'Organize a completely plastic-free beach event.', 'waste', 6.8, 55, NOW() + INTERVAL '175 days', NOW() + INTERVAL '182 days', false),
  ('Xerophytic Garden', 'Create a garden using only drought-resistant plants.', 'other', 8.5, 60, NOW() + INTERVAL '176 days', NOW() + INTERVAL '183 days', false),
  ('Rowing Transportation', 'Use rowing for fitness and transportation combined.', 'transport', 4.7, 42, NOW() + INTERVAL '177 days', NOW() + INTERVAL '184 days', false),
  ('Wild Berry Foraging', 'Safely forage and preserve wild summer berries.', 'food', 1.9, 28, NOW() + INTERVAL '178 days', NOW() + INTERVAL '185 days', false),
  ('Radiant Barrier Install', 'Install radiant barriers to reduce cooling costs.', 'energy', 7.4, 50, NOW() + INTERVAL '179 days', NOW() + INTERVAL '186 days', false),
  ('Compostable Packaging', 'Switch to 100% compostable packaging for summer events.', 'waste', 5.3, 45, NOW() + INTERVAL '180 days', NOW() + INTERVAL '187 days', false),
  ('Butterfly Migration Aid', 'Create waystation gardens for migrating butterflies.', 'other', 11.8, 70, NOW() + INTERVAL '181 days', NOW() + INTERVAL '188 days', false),
  ('Kite-Powered Transport', 'Experiment with kite-powered transportation methods.', 'transport', 3.2, 38, NOW() + INTERVAL '182 days', NOW() + INTERVAL '189 days', false),
  ('Smoke-Free Food Preservation', 'Preserve meat using solar and salt methods only.', 'food', 4.6, 42, NOW() + INTERVAL '183 days', NOW() + INTERVAL '190 days', false),
  ('Night Flush Cooling', 'Use night flush ventilation for natural cooling.', 'energy', 6.1, 48, NOW() + INTERVAL '184 days', NOW() + INTERVAL '191 days', false),
  ('Zero Waste Festival', 'Organize or attend a completely zero waste summer festival.', 'waste', 15.4, 85, NOW() + INTERVAL '185 days', NOW() + INTERVAL '192 days', false),
  ('Native Seed Collection', 'Collect and distribute native plant seeds.', 'other', 7.2, 55, NOW() + INTERVAL '186 days', NOW() + INTERVAL '193 days', false),
  ('Swimming Transportation', 'Use swimming as a form of transportation when safe.', 'transport', 1.8, 25, NOW() + INTERVAL '187 days', NOW() + INTERVAL '194 days', false),
  ('Solar Tea Brewing', 'Brew tea and coffee using only solar energy.', 'food', 1.4, 22, NOW() + INTERVAL '188 days', NOW() + INTERVAL '195 days', false),
  ('Thermal Chimney Build', 'Build a thermal chimney for natural ventilation.', 'energy', 9.7, 65, NOW() + INTERVAL '189 days', NOW() + INTERVAL '196 days', false),
  ('Seaweed Plastic Alternative', 'Research seaweed-based plastic alternatives.', 'waste', 7.6, 58, NOW() + INTERVAL '190 days', NOW() + INTERVAL '197 days', false),
  ('Hummingbird Garden', 'Create a specialized garden to attract hummingbirds.', 'other', 4.9, 45, NOW() + INTERVAL '191 days', NOW() + INTERVAL '198 days', false),
  ('Parasailing Transport', 'Use parasailing for recreational transportation.', 'transport', 2.5, 30, NOW() + INTERVAL '192 days', NOW() + INTERVAL '199 days', false),
  ('Fruit Leather Making', 'Make fruit leather using solar dehydration methods.', 'food', 2.1, 28, NOW() + INTERVAL '193 days', NOW() + INTERVAL '200 days', false),
  ('Cool Roof Technology', 'Install cool roof technology to reduce energy use.', 'energy', 13.5, 75, NOW() + INTERVAL '194 days', NOW() + INTERVAL '201 days', false),
  ('Mushroom Packaging', 'Create packaging materials from mushroom mycelium.', 'waste', 9.3, 62, NOW() + INTERVAL '195 days', NOW() + INTERVAL '202 days', false),
  ('Succulent Propagation', 'Propagate and share drought-resistant succulent plants.', 'other', 3.8, 35, NOW() + INTERVAL '196 days', NOW() + INTERVAL '203 days', false),
  ('Jet Ski Alternative', 'Find eco-friendly alternatives to motorized water sports.', 'transport', 6.4, 50, NOW() + INTERVAL '197 days', NOW() + INTERVAL '204 days', false),
  ('Gazpacho Garden', 'Grow ingredients specifically for cold summer soups.', 'food', 3.7, 40, NOW() + INTERVAL '198 days', NOW() + INTERVAL '205 days', false),
  ('Evaporative Cooling', 'Install whole-house evaporative cooling systems.', 'energy', 10.8, 68, NOW() + INTERVAL '199 days', NOW() + INTERVAL '206 days', false),
  ('Algae Bioplastic', 'Experiment with algae-based bioplastic production.', 'waste', 11.7, 72, NOW() + INTERVAL '200 days', NOW() + INTERVAL '207 days', false);