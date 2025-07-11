/*
  # Add 500 Environmental Challenges - Batch 8 (Challenges 351-400)

  1. New Challenges
    - 50 diverse environmental challenges focusing on leadership and community impact
    - Advanced sustainability projects and policy advocacy
    - Points range from 30-250 based on leadership complexity
    - CO2 savings range from 4.0kg to 50kg per challenge
    - Emphasis on community leadership, policy change, and large-scale impact

  2. Challenge Themes
    - Environmental leadership and advocacy
    - Policy change and community organizing
    - Business sustainability transformation
    - Educational program development
    - Large-scale environmental projects

  3. Leadership Focus
    - Community environmental leadership
    - Policy advocacy and change
    - Business and institutional transformation
    - Educational and awareness programs
    - Regional and global impact initiatives
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Environmental Education', 'Develop environmental education curriculum for schools.', 'other', 15.8, 95, NOW() + INTERVAL '351 days', NOW() + INTERVAL '358 days', false),
  ('Transit Policy Advocacy', 'Advocate for improved public transit policies.', 'transport', 22.4, 125, NOW() + INTERVAL '352 days', NOW() + INTERVAL '359 days', false),
  ('Farm-to-School Program', 'Establish farm-to-school program in your district.', 'food', 18.7, 105, NOW() + INTERVAL '353 days', NOW() + INTERVAL '360 days', false),
  ('Renewable Energy Policy', 'Advocate for renewable energy policies in your city.', 'energy', 35.6, 175, NOW() + INTERVAL '354 days', NOW() + INTERVAL '361 days', false),
  ('Waste Reduction Campaign', 'Lead city-wide waste reduction campaign.', 'waste', 28.9, 145, NOW() + INTERVAL '355 days', NOW() + INTERVAL '362 days', false),
  ('Urban Forest Initiative', 'Lead urban forest expansion initiative.', 'other', 42.3, 200, NOW() + INTERVAL '356 days', NOW() + INTERVAL '363 days', false),
  ('Bike Infrastructure', 'Advocate for improved bicycle infrastructure.', 'transport', 19.2, 110, NOW() + INTERVAL '357 days', NOW() + INTERVAL '364 days', false),
  ('Community Supported Agriculture', 'Start community supported agriculture program.', 'food', 16.4, 98, NOW() + INTERVAL '358 days', NOW() + INTERVAL '365 days', false),
  ('Green Building Standards', 'Advocate for green building standards adoption.', 'energy', 31.7, 160, NOW() + INTERVAL '359 days', NOW() + INTERVAL '366 days', false),
  ('Plastic Ban Campaign', 'Lead campaign for single-use plastic bans.', 'waste', 24.6, 130, NOW() + INTERVAL '360 days', NOW() + INTERVAL '367 days', false),
  ('Climate Action Plan', 'Develop comprehensive climate action plan for city.', 'other', 48.9, 240, NOW() + INTERVAL '361 days', NOW() + INTERVAL '368 days', false),
  ('Electric Bus Fleet', 'Advocate for electric bus fleet conversion.', 'transport', 45.7, 220, NOW() + INTERVAL '362 days', NOW() + INTERVAL '369 days', false),
  ('Food Waste Reduction', 'Implement city-wide food waste reduction program.', 'food', 21.8, 118, NOW() + INTERVAL '363 days', NOW() + INTERVAL '370 days', false),
  ('Solar Incentive Program', 'Develop solar incentive program for residents.', 'energy', 38.4, 185, NOW() + INTERVAL '364 days', NOW() + INTERVAL '371 days', false),
  ('Circular Economy Hub', 'Establish circular economy business hub.', 'waste', 33.2, 165, NOW() + INTERVAL '365 days', NOW() + INTERVAL '372 days', false),
  ('Carbon Neutral City', 'Lead initiative for carbon neutral city designation.', 'other', 52.6, 250, NOW() + INTERVAL '366 days', NOW() + INTERVAL '373 days', false),
  ('Car-Free District', 'Advocate for car-free downtown district.', 'transport', 41.9, 195, NOW() + INTERVAL '367 days', NOW() + INTERVAL '374 days', false),
  ('Urban Agriculture Zone', 'Establish urban agriculture zoning policies.', 'food', 14.3, 88, NOW() + INTERVAL '368 days', NOW() + INTERVAL '375 days', false),
  ('Energy Efficiency Mandate', 'Advocate for building energy efficiency mandates.', 'energy', 29.8, 148, NOW() + INTERVAL '369 days', NOW() + INTERVAL '376 days', false),
  ('Zero Waste Municipality', 'Lead zero waste municipality certification.', 'waste', 36.7, 180, NOW() + INTERVAL '370 days', NOW() + INTERVAL '377 days', false),
  ('Green Space Protection', 'Lead green space protection and expansion.', 'other', 25.4, 135, NOW() + INTERVAL '371 days', NOW() + INTERVAL '378 days', false),
  ('Sustainable Tourism', 'Develop sustainable tourism practices for region.', 'transport', 17.6, 102, NOW() + INTERVAL '372 days', NOW() + INTERVAL '379 days', false),
  ('Local Food Security', 'Develop local food security and resilience plan.', 'food', 19.9, 112, NOW() + INTERVAL '373 days', NOW() + INTERVAL '380 days', false),
  ('Renewable Energy Coop', 'Start renewable energy cooperative.', 'energy', 44.1, 210, NOW() + INTERVAL '374 days', NOW() + INTERVAL '381 days', false),
  ('Industrial Symbiosis', 'Facilitate industrial symbiosis networks.', 'waste', 39.8, 190, NOW() + INTERVAL '375 days', NOW() + INTERVAL '382 days', false),
  ('Biodiversity Action Plan', 'Develop regional biodiversity action plan.', 'other', 32.5, 162, NOW() + INTERVAL '376 days', NOW() + INTERVAL '383 days', false),
  ('Mobility as a Service', 'Implement mobility as a service platform.', 'transport', 26.7, 138, NOW() + INTERVAL '377 days', NOW() + INTERVAL '384 days', false),
  ('Regenerative Agriculture', 'Promote regenerative agriculture practices.', 'food', 23.1, 125, NOW() + INTERVAL '378 days', NOW() + INTERVAL '385 days', false),
  ('District Energy System', 'Develop district energy system for neighborhood.', 'energy', 47.3, 225, NOW() + INTERVAL '379 days', NOW() + INTERVAL '386 days', false),
  ('Extended Producer Responsibility', 'Advocate for extended producer responsibility laws.', 'waste', 27.4, 142, NOW() + INTERVAL '380 days', NOW() + INTERVAL '387 days', false),
  ('Climate Resilience Plan', 'Develop climate resilience and adaptation plan.', 'other', 40.6, 198, NOW() + INTERVAL '381 days', NOW() + INTERVAL '388 days', false),
  ('Autonomous Vehicle Policy', 'Develop sustainable autonomous vehicle policies.', 'transport', 34.8, 170, NOW() + INTERVAL '382 days', NOW() + INTERVAL '389 days', false),
  ('Vertical Farming Initiative', 'Lead vertical farming development initiative.', 'food', 20.7, 115, NOW() + INTERVAL '383 days', NOW() + INTERVAL '390 days', false),
  ('Smart Grid Development', 'Lead smart grid infrastructure development.', 'energy', 41.2, 200, NOW() + INTERVAL '384 days', NOW() + INTERVAL '391 days', false),
  ('Cradle-to-Cradle Design', 'Promote cradle-to-cradle design principles.', 'waste', 30.9, 155, NOW() + INTERVAL '385 days', NOW() + INTERVAL '392 days', false),
  ('Ecosystem Services Valuation', 'Develop ecosystem services valuation program.', 'other', 18.5, 108, NOW() + INTERVAL '386 days', NOW() + INTERVAL '393 days', false),
  ('Hyperloop Development', 'Support hyperloop transportation development.', 'transport', 12.3, 78, NOW() + INTERVAL '387 days', NOW() + INTERVAL '394 days', false),
  ('Cellular Agriculture Hub', 'Establish cellular agriculture research hub.', 'food', 28.6, 145, NOW() + INTERVAL '388 days', NOW() + INTERVAL '395 days', false),
  ('Fusion Energy Research', 'Support fusion energy research initiatives.', 'energy', 8.7, 65, NOW() + INTERVAL '389 days', NOW() + INTERVAL '396 days', false),
  ('Molecular Recycling Plant', 'Develop molecular recycling facility.', 'waste', 45.9, 215, NOW() + INTERVAL '390 days', NOW() + INTERVAL '397 days', false),
  ('Biosphere Reserve', 'Establish UNESCO biosphere reserve designation.', 'other', 49.2, 235, NOW() + INTERVAL '391 days', NOW() + INTERVAL '398 days', false),
  ('Maglev Transit System', 'Advocate for magnetic levitation transit.', 'transport', 38.1, 182, NOW() + INTERVAL '392 days', NOW() + INTERVAL '399 days', false),
  ('Synthetic Biology Lab', 'Establish synthetic biology research laboratory.', 'food', 15.9, 95, NOW() + INTERVAL '393 days', NOW() + INTERVAL '400 days', false),
  ('Quantum Computing Energy', 'Research quantum computing for energy optimization.', 'energy', 6.4, 55, NOW() + INTERVAL '394 days', NOW() + INTERVAL '401 days', false),
  ('Atomic Recycling Facility', 'Develop atomic-level recycling technology.', 'waste', 42.7, 205, NOW() + INTERVAL '395 days', NOW() + INTERVAL '402 days', false),
  ('Terraforming Research', 'Support terraforming technology research.', 'other', 4.8, 45, NOW() + INTERVAL '396 days', NOW() + INTERVAL '403 days', false),
  ('Space Elevator Project', 'Support space elevator development for transport.', 'transport', 7.2, 58, NOW() + INTERVAL '397 days', NOW() + INTERVAL '404 days', false),
  ('Molecular Gastronomy Lab', 'Establish molecular gastronomy research lab.', 'food', 9.6, 68, NOW() + INTERVAL '398 days', NOW() + INTERVAL '405 days', false),
  ('Zero-Point Energy Research', 'Support zero-point energy research.', 'energy', 3.1, 38, NOW() + INTERVAL '399 days', NOW() + INTERVAL '406 days', false),
  ('Nanotechnology Cleanup', 'Develop nanotechnology environmental cleanup.', 'waste', 21.4, 118, NOW() + INTERVAL '400 days', NOW() + INTERVAL '407 days', false);