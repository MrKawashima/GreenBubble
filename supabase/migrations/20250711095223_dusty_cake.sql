/*
  # Add 500 Environmental Challenges - Batch 7 (Challenges 301-350)

  1. New Challenges
    - 50 diverse environmental challenges focusing on spring activities
    - Renewal, growth, and preparation for the growing season
    - Points range from 25-200 based on spring project complexity
    - CO2 savings range from 3.0kg to 45kg per challenge
    - Emphasis on gardening, renewal energy, and fresh starts

  2. Challenge Themes
    - Spring gardening and planting activities
    - Renewable energy system installations
    - Spring cleaning and organization
    - Outdoor activity resumption
    - Community garden and environmental projects

  3. Seasonal Focus
    - Garden preparation and planting
    - Energy system maintenance and upgrades
    - Spring cleaning with environmental focus
    - Outdoor transportation resumption
    - Community environmental leadership
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Seed Starting Station', 'Set up an efficient seed starting station for spring planting.', 'food', 5.8, 48, NOW() + INTERVAL '301 days', NOW() + INTERVAL '308 days', false),
  ('Bike Tune-Up', 'Perform comprehensive spring tune-up on bicycles.', 'transport', 3.2, 35, NOW() + INTERVAL '302 days', NOW() + INTERVAL '309 days', false),
  ('Compost Tea Brewing', 'Brew nutrient-rich compost tea for garden fertilization.', 'waste', 2.7, 32, NOW() + INTERVAL '303 days', NOW() + INTERVAL '310 days', false),
  ('Solar Panel Cleaning', 'Clean and maintain solar panels for optimal efficiency.', 'energy', 4.6, 42, NOW() + INTERVAL '304 days', NOW() + INTERVAL '311 days', false),
  ('Native Plant Garden', 'Establish a native plant garden for local ecosystem support.', 'other', 12.4, 75, NOW() + INTERVAL '305 days', NOW() + INTERVAL '312 days', false),
  ('Rain Garden Installation', 'Install a rain garden for natural water management.', 'other', 8.9, 65, NOW() + INTERVAL '306 days', NOW() + INTERVAL '313 days', false),
  ('Electric Bike Conversion', 'Convert a regular bike to electric for easier commuting.', 'transport', 7.3, 58, NOW() + INTERVAL '307 days', NOW() + INTERVAL '314 days', false),
  ('Greenhouse Construction', 'Build a greenhouse for extended growing season.', 'food', 15.6, 85, NOW() + INTERVAL '308 days', NOW() + INTERVAL '315 days', false),
  ('Wind Turbine Installation', 'Install a small residential wind turbine.', 'energy', 18.7, 95, NOW() + INTERVAL '309 days', NOW() + INTERVAL '316 days', false),
  ('Pollinator Garden Design', 'Design and plant a comprehensive pollinator garden.', 'other', 9.8, 68, NOW() + INTERVAL '310 days', NOW() + INTERVAL '317 days', false),
  ('Organic Lawn Conversion', 'Convert traditional lawn to organic maintenance.', 'other', 6.4, 52, NOW() + INTERVAL '311 days', NOW() + INTERVAL '318 days', false),
  ('Cargo Bike Purchase', 'Invest in a cargo bike for family transportation.', 'transport', 11.2, 78, NOW() + INTERVAL '312 days', NOW() + INTERVAL '319 days', false),
  ('Aquaponics Setup', 'Set up an aquaponics system for fish and vegetables.', 'food', 13.5, 82, NOW() + INTERVAL '313 days', NOW() + INTERVAL '320 days', false),
  ('Geothermal System', 'Install a geothermal heating and cooling system.', 'energy', 35.8, 180, NOW() + INTERVAL '314 days', NOW() + INTERVAL '321 days', false),
  ('Community Garden Leadership', 'Take leadership role in community garden management.', 'other', 22.7, 120, NOW() + INTERVAL '315 days', NOW() + INTERVAL '322 days', false),
  ('Permaculture Design', 'Complete permaculture design course and implementation.', 'other', 28.4, 140, NOW() + INTERVAL '316 days', NOW() + INTERVAL '323 days', false),
  ('Electric Scooter Fleet', 'Organize electric scooter sharing in your community.', 'transport', 9.6, 72, NOW() + INTERVAL '317 days', NOW() + INTERVAL '324 days', false),
  ('Vertical Garden Wall', 'Install a vertical garden wall for space-efficient growing.', 'food', 7.1, 58, NOW() + INTERVAL '318 days', NOW() + INTERVAL '325 days', false),
  ('Battery Storage Addition', 'Add battery storage to existing solar system.', 'energy', 16.3, 88, NOW() + INTERVAL '319 days', NOW() + INTERVAL '326 days', false),
  ('Habitat Restoration Lead', 'Lead a habitat restoration project in your area.', 'other', 31.9, 155, NOW() + INTERVAL '320 days', NOW() + INTERVAL '327 days', false),
  ('Food Forest Planting', 'Plant a food forest with multiple canopy layers.', 'food', 24.6, 125, NOW() + INTERVAL '321 days', NOW() + INTERVAL '328 days', false),
  ('Bike Share Program', 'Start a neighborhood bike sharing program.', 'transport', 14.8, 85, NOW() + INTERVAL '322 days', NOW() + INTERVAL '329 days', false),
  ('Greywater System', 'Install a greywater recycling system for irrigation.', 'other', 11.7, 75, NOW() + INTERVAL '323 days', NOW() + INTERVAL '330 days', false),
  ('Smart Grid Integration', 'Integrate home energy system with smart grid.', 'energy', 12.9, 78, NOW() + INTERVAL '324 days', NOW() + INTERVAL '331 days', false),
  ('Medicinal Herb Garden', 'Establish a comprehensive medicinal herb garden.', 'food', 4.8, 45, NOW() + INTERVAL '325 days', NOW() + INTERVAL '332 days', false),
  ('Zero Waste Lifestyle', 'Commit to zero waste lifestyle for entire season.', 'waste', 18.2, 95, NOW() + INTERVAL '326 days', NOW() + INTERVAL '333 days', false),
  ('Walking School Bus', 'Organize walking school bus for neighborhood children.', 'transport', 6.7, 55, NOW() + INTERVAL '327 days', NOW() + INTERVAL '334 days', false),
  ('Rooftop Garden', 'Establish a productive rooftop garden space.', 'food', 9.4, 68, NOW() + INTERVAL '328 days', NOW() + INTERVAL '335 days', false),
  ('Micro-Hydro Installation', 'Install micro-hydroelectric system if water available.', 'energy', 21.5, 110, NOW() + INTERVAL '329 days', NOW() + INTERVAL '336 days', false),
  ('Wildlife Corridor', 'Create wildlife corridor connecting habitat patches.', 'other', 19.8, 105, NOW() + INTERVAL '330 days', NOW() + INTERVAL '337 days', false),
  ('Heirloom Seed Library', 'Start heirloom seed library for community sharing.', 'food', 3.9, 42, NOW() + INTERVAL '331 days', NOW() + INTERVAL '338 days', false),
  ('Repair Cafe Organization', 'Organize monthly repair cafe events.', 'waste', 8.6, 65, NOW() + INTERVAL '332 days', NOW() + INTERVAL '339 days', false),
  ('Car-Free Month', 'Commit to car-free transportation for entire month.', 'transport', 25.3, 130, NOW() + INTERVAL '333 days', NOW() + INTERVAL '340 days', false),
  ('Edible Landscaping', 'Replace ornamental landscaping with edible plants.', 'food', 11.8, 78, NOW() + INTERVAL '334 days', NOW() + INTERVAL '341 days', false),
  ('Energy Independence', 'Achieve complete energy independence for your home.', 'energy', 42.7, 200, NOW() + INTERVAL '335 days', NOW() + INTERVAL '342 days', false),
  ('Green Roof Installation', 'Install extensive green roof system.', 'other', 26.1, 135, NOW() + INTERVAL '336 days', NOW() + INTERVAL '343 days', false),
  ('Mushroom Cultivation', 'Set up comprehensive mushroom cultivation system.', 'food', 6.2, 52, NOW() + INTERVAL '337 days', NOW() + INTERVAL '344 days', false),
  ('Waste-to-Energy', 'Implement small-scale waste-to-energy system.', 'waste', 15.4, 88, NOW() + INTERVAL '338 days', NOW() + INTERVAL '345 days', false),
  ('Public Transit Advocacy', 'Lead advocacy for improved public transportation.', 'transport', 8.1, 62, NOW() + INTERVAL '339 days', NOW() + INTERVAL '346 days', false),
  ('Aquaculture System', 'Set up sustainable aquaculture for protein production.', 'food', 12.6, 82, NOW() + INTERVAL '340 days', NOW() + INTERVAL '347 days', false),
  ('Passive House Retrofit', 'Retrofit home to passive house standards.', 'energy', 38.9, 185, NOW() + INTERVAL '341 days', NOW() + INTERVAL '348 days', false),
  ('Biodiversity Survey', 'Conduct comprehensive biodiversity survey of area.', 'other', 5.7, 48, NOW() + INTERVAL '342 days', NOW() + INTERVAL '349 days', false),
  ('Fermentation Workshop', 'Teach fermentation workshops to community.', 'food', 4.3, 45, NOW() + INTERVAL '343 days', NOW() + INTERVAL '350 days', false),
  ('Circular Economy Business', 'Start business based on circular economy principles.', 'waste', 22.8, 115, NOW() + INTERVAL '344 days', NOW() + INTERVAL '351 days', false),
  ('Velomobile Purchase', 'Invest in velomobile for weather-protected cycling.', 'transport', 13.7, 85, NOW() + INTERVAL '345 days', NOW() + INTERVAL '352 days', false),
  ('Perennial Food System', 'Establish perennial food production system.', 'food', 17.9, 95, NOW() + INTERVAL '346 days', NOW() + INTERVAL '353 days', false),
  ('Net-Zero Energy', 'Achieve net-zero energy consumption for your home.', 'energy', 45.2, 210, NOW() + INTERVAL '347 days', NOW() + INTERVAL '354 days', false),
  ('Ecosystem Restoration', 'Lead major ecosystem restoration project.', 'other', 41.6, 195, NOW() + INTERVAL '348 days', NOW() + INTERVAL '355 days', false),
  ('Sustainable Business', 'Convert existing business to sustainable practices.', 'other', 33.4, 165, NOW() + INTERVAL '349 days', NOW() + INTERVAL '356 days', false),
  ('Climate Action Group', 'Form and lead local climate action group.', 'other', 29.7, 148, NOW() + INTERVAL '350 days', NOW() + INTERVAL '357 days', false);