/*
  # Add 500 Environmental Challenges - Batch 2 (Challenges 51-100)

  1. New Challenges
    - 50 diverse environmental challenges continuing from batch 1
    - Focus on intermediate-level activities and seasonal adaptations
    - Points range from 15-120 based on complexity and impact
    - CO2 savings range from 0.8kg to 18kg per challenge
    - Balanced mix across all environmental categories

  2. Challenge Themes
    - Seasonal sustainability practices
    - Home improvement and efficiency
    - Community engagement and education
    - Advanced recycling and upcycling
    - Natural living and outdoor activities

  3. Progressive Difficulty
    - Building on basic habits from batch 1
    - Introducing more complex projects
    - Community and social impact focus
    - Seasonal and weather-specific challenges
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Rain Water Collection', 'Set up a system to collect and use rainwater for plants.', 'other', 4.5, 40, NOW() + INTERVAL '51 days', NOW() + INTERVAL '58 days', false),
  ('Unicycle Urban Travel', 'Master unicycling for short urban transportation.', 'transport', 2.8, 35, NOW() + INTERVAL '52 days', NOW() + INTERVAL '59 days', false),
  ('Wild Game Cooking', 'Prepare a meal using sustainably sourced wild game.', 'food', 3.2, 45, NOW() + INTERVAL '53 days', NOW() + INTERVAL '60 days', false),
  ('Solar Oven Building', 'Construct and use a solar oven for cooking.', 'energy', 8.7, 60, NOW() + INTERVAL '54 days', NOW() + INTERVAL '61 days', false),
  ('Furniture Restoration', 'Restore old furniture instead of buying new.', 'waste', 12.5, 70, NOW() + INTERVAL '55 days', NOW() + INTERVAL '62 days', false),
  ('Butterfly Garden Creation', 'Design and plant a garden specifically for butterflies.', 'other', 6.8, 50, NOW() + INTERVAL '56 days', NOW() + INTERVAL '63 days', false),
  ('Cargo Bike Shopping', 'Use a cargo bike for large shopping trips.', 'transport', 5.4, 48, NOW() + INTERVAL '57 days', NOW() + INTERVAL '64 days', false),
  ('Aquaponics System', 'Set up a small aquaponics system for growing food.', 'food', 7.9, 65, NOW() + INTERVAL '58 days', NOW() + INTERVAL '65 days', false),
  ('Geothermal Heating Research', 'Research and plan geothermal heating for your home.', 'energy', 15.2, 80, NOW() + INTERVAL '59 days', NOW() + INTERVAL '66 days', false),
  ('Electronic Waste Drive', 'Organize an electronic waste collection event.', 'waste', 18.3, 85, NOW() + INTERVAL '60 days', NOW() + INTERVAL '67 days', false),
  ('Native Plant Propagation', 'Propagate native plants from cuttings or seeds.', 'other', 4.1, 35, NOW() + INTERVAL '61 days', NOW() + INTERVAL '68 days', false),
  ('Electric Skateboard Commute', 'Use an electric skateboard for daily commuting.', 'transport', 3.6, 42, NOW() + INTERVAL '62 days', NOW() + INTERVAL '69 days', false),
  ('Sourdough Starter Culture', 'Maintain a sourdough starter for homemade bread.', 'food', 2.1, 28, NOW() + INTERVAL '63 days', NOW() + INTERVAL '70 days', false),
  ('Wind Power Experiment', 'Build a small wind turbine to generate electricity.', 'energy', 6.5, 55, NOW() + INTERVAL '64 days', NOW() + INTERVAL '71 days', false),
  ('Plastic-Free Month', 'Eliminate all single-use plastics for 30 days.', 'waste', 8.9, 75, NOW() + INTERVAL '65 days', NOW() + INTERVAL '72 days', false),
  ('Beekeeping Introduction', 'Take a beekeeping class and visit a local apiary.', 'other', 9.2, 60, NOW() + INTERVAL '66 days', NOW() + INTERVAL '73 days', false),
  ('Folding Bike Adventure', 'Use a folding bike for multi-modal transportation.', 'transport', 4.2, 38, NOW() + INTERVAL '67 days', NOW() + INTERVAL '74 days', false),
  ('Edible Landscaping', 'Replace ornamental plants with edible alternatives.', 'food', 5.7, 52, NOW() + INTERVAL '68 days', NOW() + INTERVAL '75 days', false),
  ('Passive Solar Design', 'Implement passive solar heating techniques in your home.', 'energy', 11.8, 70, NOW() + INTERVAL '69 days', NOW() + INTERVAL '76 days', false),
  ('Clothing Swap Organization', 'Organize a community clothing swap event.', 'waste', 6.4, 45, NOW() + INTERVAL '70 days', NOW() + INTERVAL '77 days', false),
  ('Permaculture Garden Design', 'Design a permaculture garden for your space.', 'other', 8.6, 65, NOW() + INTERVAL '71 days', NOW() + INTERVAL '78 days', false),
  ('Recumbent Bike Trial', 'Try using a recumbent bicycle for transportation.', 'transport', 3.8, 32, NOW() + INTERVAL '72 days', NOW() + INTERVAL '79 days', false),
  ('Cheese Making Workshop', 'Learn to make cheese from local milk sources.', 'food', 2.9, 40, NOW() + INTERVAL '73 days', NOW() + INTERVAL '80 days', false),
  ('Micro-Hydro Power', 'Explore micro-hydroelectric power generation.', 'energy', 13.4, 75, NOW() + INTERVAL '74 days', NOW() + INTERVAL '81 days', false),
  ('Tool Library Creation', 'Start or join a community tool sharing library.', 'waste', 7.8, 55, NOW() + INTERVAL '75 days', NOW() + INTERVAL '82 days', false),
  ('Wildlife Corridor Planning', 'Plan and create wildlife corridors in your neighborhood.', 'other', 12.1, 80, NOW() + INTERVAL '76 days', NOW() + INTERVAL '83 days', false),
  ('Tandem Bike Partnership', 'Partner with someone for tandem bike transportation.', 'transport', 4.7, 40, NOW() + INTERVAL '77 days', NOW() + INTERVAL '84 days', false),
  ('Fermentation Workshop', 'Attend a workshop on fermenting various foods.', 'food', 3.5, 35, NOW() + INTERVAL '78 days', NOW() + INTERVAL '85 days', false),
  ('Thermal Mass Installation', 'Install thermal mass for passive heating and cooling.', 'energy', 9.8, 65, NOW() + INTERVAL '79 days', NOW() + INTERVAL '86 days', false),
  ('Repair Skill Learning', 'Learn a new repair skill like sewing or electronics.', 'waste', 5.2, 42, NOW() + INTERVAL '80 days', NOW() + INTERVAL '87 days', false),
  ('Green Roof Installation', 'Install a green roof or living roof system.', 'other', 16.5, 90, NOW() + INTERVAL '81 days', NOW() + INTERVAL '88 days', false),
  ('Velomobile Experience', 'Try a velomobile for weather-protected cycling.', 'transport', 5.9, 50, NOW() + INTERVAL '82 days', NOW() + INTERVAL '89 days', false),
  ('Seed Saving Program', 'Save seeds from your garden for next year.', 'food', 2.6, 30, NOW() + INTERVAL '83 days', NOW() + INTERVAL '90 days', false),
  ('Battery Storage System', 'Install a home battery storage system for renewable energy.', 'energy', 14.7, 85, NOW() + INTERVAL '84 days', NOW() + INTERVAL '91 days', false),
  ('Freecycle Network Join', 'Join and actively participate in local freecycle networks.', 'waste', 4.8, 35, NOW() + INTERVAL '85 days', NOW() + INTERVAL '92 days', false),
  ('Habitat Restoration', 'Participate in local habitat restoration projects.', 'other', 11.3, 75, NOW() + INTERVAL '86 days', NOW() + INTERVAL '93 days', false),
  ('Kick Scooter Commuting', 'Use a kick scooter for regular commuting.', 'transport', 2.4, 28, NOW() + INTERVAL '87 days', NOW() + INTERVAL '94 days', false),
  ('Pickling Preservation', 'Learn to pickle vegetables for long-term storage.', 'food', 1.8, 25, NOW() + INTERVAL '88 days', NOW() + INTERVAL '95 days', false),
  ('Smart Grid Participation', 'Participate in smart grid programs in your area.', 'energy', 7.3, 50, NOW() + INTERVAL '89 days', NOW() + INTERVAL '96 days', false),
  ('Waste Audit Completion', 'Conduct a comprehensive waste audit of your household.', 'waste', 3.7, 40, NOW() + INTERVAL '90 days', NOW() + INTERVAL '97 days', false),
  ('Medicinal Plant Garden', 'Grow medicinal plants for natural health remedies.', 'other', 3.9, 45, NOW() + INTERVAL '91 days', NOW() + INTERVAL '98 days', false),
  ('Penny-Farthing Riding', 'Learn to ride a penny-farthing bicycle.', 'transport', 2.1, 30, NOW() + INTERVAL '92 days', NOW() + INTERVAL '99 days', false),
  ('Canning Workshop', 'Learn proper canning techniques for food preservation.', 'food', 4.3, 48, NOW() + INTERVAL '93 days', NOW() + INTERVAL '100 days', false),
  ('Energy Monitoring System', 'Install a comprehensive home energy monitoring system.', 'energy', 5.8, 45, NOW() + INTERVAL '94 days', NOW() + INTERVAL '101 days', false),
  ('Upcycling Business', 'Start a small business based on upcycling materials.', 'waste', 15.6, 100, NOW() + INTERVAL '95 days', NOW() + INTERVAL '102 days', false),
  ('Ecosystem Mapping', 'Map and document the ecosystem in your local area.', 'other', 2.7, 35, NOW() + INTERVAL '96 days', NOW() + INTERVAL '103 days', false),
  ('Handcycle Experience', 'Try hand-cycling as an alternative transportation method.', 'transport', 3.1, 35, NOW() + INTERVAL '97 days', NOW() + INTERVAL '104 days', false),
  ('Foraging Guide Creation', 'Create a guide to safe foraging in your region.', 'food', 1.9, 38, NOW() + INTERVAL '98 days', NOW() + INTERVAL '105 days', false),
  ('Off-Grid Weekend', 'Spend a weekend completely off the electrical grid.', 'energy', 8.2, 60, NOW() + INTERVAL '99 days', NOW() + INTERVAL '106 days', false),
  ('Community Repair Hub', 'Establish a community repair hub in your neighborhood.', 'waste', 13.9, 85, NOW() + INTERVAL '100 days', NOW() + INTERVAL '107 days', false);