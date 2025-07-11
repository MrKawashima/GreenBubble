/*
  # Environmental Challenges - Batch 1 (Challenges 1-50)

  1. New Challenge Data
    - 50 diverse environmental challenges
    - Categories: transport, food, waste, energy, other
    - Varying CO2 impact and points
    - Mix of difficulty levels and time commitments

  2. Challenge Types
    - Daily habits and lifestyle changes
    - One-time actions and projects
    - Social and community activities
    - Educational and awareness challenges
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Walk Instead of Drive', 'Choose walking for trips under 1 mile instead of driving. Track your walking distance and enjoy the fresh air!', 'transport', 2.3, 40, NOW() + INTERVAL '1 day', NOW() + INTERVAL '8 days', false),
  ('Meatless Monday Plus', 'Go completely plant-based for an entire day. Try new vegan recipes and discover delicious alternatives!', 'food', 3.2, 60, NOW() + INTERVAL '2 days', NOW() + INTERVAL '9 days', false),
  ('Zero Waste Lunch', 'Pack a completely zero-waste lunch using reusable containers, utensils, and napkins.', 'waste', 0.8, 30, NOW() + INTERVAL '3 days', NOW() + INTERVAL '10 days', false),
  ('Unplug Electronics', 'Unplug all non-essential electronics when not in use for a full week. Notice the energy savings!', 'energy', 4.1, 70, NOW() + INTERVAL '4 days', NOW() + INTERVAL '11 days', false),
  ('Plant a Tree', 'Plant a tree in your yard, community, or through a local organization. Watch it grow over time!', 'other', 22.0, 150, NOW() + INTERVAL '5 days', NOW() + INTERVAL '12 days', false),
  
  ('Carpool Challenge', 'Organize carpooling with colleagues or friends for a week. Share the ride and reduce emissions!', 'transport', 5.4, 80, NOW() + INTERVAL '6 days', NOW() + INTERVAL '13 days', false),
  ('Local Food Week', 'Buy only locally sourced food for one week. Visit farmers markets and local producers.', 'food', 2.7, 50, NOW() + INTERVAL '7 days', NOW() + INTERVAL '14 days', false),
  ('Plastic-Free Shopping', 'Complete your grocery shopping without using any single-use plastic bags or containers.', 'waste', 1.2, 35, NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', false),
  ('Cold Water Washing', 'Wash all your clothes in cold water for two weeks. Your clothes will thank you too!', 'energy', 1.8, 40, NOW() + INTERVAL '9 days', NOW() + INTERVAL '16 days', false),
  ('Community Garden', 'Start or join a community garden project. Grow your own vegetables and herbs!', 'other', 8.5, 120, NOW() + INTERVAL '10 days', NOW() + INTERVAL '17 days', false),
  
  ('Public Transit Day', 'Use only public transportation for all your trips in one day. Explore your city differently!', 'transport', 3.8, 65, NOW() + INTERVAL '11 days', NOW() + INTERVAL '18 days', false),
  ('Seasonal Eating', 'Eat only seasonal fruits and vegetables for one week. Discover what\'s fresh in your area!', 'food', 2.1, 45, NOW() + INTERVAL '12 days', NOW() + INTERVAL '19 days', false),
  ('Repair Instead of Replace', 'Fix something broken instead of throwing it away. Learn a new skill while saving resources!', 'waste', 3.5, 55, NOW() + INTERVAL '13 days', NOW() + INTERVAL '20 days', false),
  ('Natural Light Day', 'Use only natural light during daylight hours. Open curtains and work near windows!', 'energy', 1.4, 25, NOW() + INTERVAL '14 days', NOW() + INTERVAL '21 days', false),
  ('Pollinator Garden', 'Create a small pollinator-friendly garden or plant bee-friendly flowers in pots.', 'other', 5.2, 90, NOW() + INTERVAL '15 days', NOW() + INTERVAL '22 days', false),
  
  ('Bike Commute Week', 'Cycle to work or school for an entire week. Feel the health benefits while helping the planet!', 'transport', 6.7, 100, NOW() + INTERVAL '16 days', NOW() + INTERVAL '23 days', false),
  ('Homemade Meals', 'Cook all your meals at home for one week. No takeout, no processed foods!', 'food', 4.3, 75, NOW() + INTERVAL '17 days', NOW() + INTERVAL '24 days', false),
  ('Upcycling Project', 'Transform old items into something new and useful. Get creative with materials you already have!', 'waste', 2.8, 60, NOW() + INTERVAL '18 days', NOW() + INTERVAL '25 days', false),
  ('Shorter Showers', 'Take 5-minute showers for two weeks. Time yourself and see how much water you save!', 'energy', 3.6, 50, NOW() + INTERVAL '19 days', NOW() + INTERVAL '26 days', false),
  ('Wildlife Habitat', 'Create a small wildlife habitat in your yard or balcony with native plants and water sources.', 'other', 7.1, 110, NOW() + INTERVAL '20 days', NOW() + INTERVAL '27 days', false),
  
  ('Car-Free Weekend', 'Spend an entire weekend without using a car. Walk, bike, or use public transport only!', 'transport', 8.2, 120, NOW() + INTERVAL '21 days', NOW() + INTERVAL '28 days', false),
  ('Grow Your Own Herbs', 'Start an herb garden and use fresh herbs in your cooking for two weeks.', 'food', 1.5, 35, NOW() + INTERVAL '22 days', NOW() + INTERVAL '29 days', false),
  ('Compost Bin Setup', 'Set up a composting system for your kitchen scraps. Turn waste into garden gold!', 'waste', 4.7, 85, NOW() + INTERVAL '23 days', NOW() + INTERVAL '30 days', false),
  ('Air Dry Clothes', 'Air dry all your laundry for two weeks instead of using the dryer. Embrace the natural way!', 'energy', 2.9, 45, NOW() + INTERVAL '24 days', NOW() + INTERVAL '31 days', false),
  ('Beach/Park Cleanup', 'Organize or join a local cleanup event. Make your community more beautiful!', 'other', 6.3, 95, NOW() + INTERVAL '25 days', NOW() + INTERVAL '32 days', false),
  
  ('Scooter Adventures', 'Use an electric scooter or kick scooter for short trips instead of driving.', 'transport', 1.9, 30, NOW() + INTERVAL '26 days', NOW() + INTERVAL '33 days', false),
  ('Bulk Buying', 'Buy all dry goods in bulk using your own containers to reduce packaging waste.', 'food', 1.8, 40, NOW() + INTERVAL '27 days', NOW() + INTERVAL '34 days', false),
  ('Digital Receipts', 'Request digital receipts for all purchases to reduce paper waste.', 'waste', 0.5, 20, NOW() + INTERVAL '28 days', NOW() + INTERVAL '35 days', false),
  ('Programmable Thermostat', 'Set up or optimize a programmable thermostat to reduce energy usage.', 'energy', 5.8, 80, NOW() + INTERVAL '29 days', NOW() + INTERVAL '36 days', false),
  ('Rain Water Collection', 'Set up a rain water collection system for watering plants.', 'other', 3.4, 65, NOW() + INTERVAL '30 days', NOW() + INTERVAL '37 days', false),
  
  ('Walking Meetings', 'Conduct all possible meetings while walking instead of sitting in offices.', 'transport', 1.2, 25, NOW() + INTERVAL '31 days', NOW() + INTERVAL '38 days', false),
  ('Preserve Food', 'Learn to preserve seasonal food through canning, freezing, or dehydrating.', 'food', 2.6, 55, NOW() + INTERVAL '32 days', NOW() + INTERVAL '39 days', false),
  ('Reusable Everything', 'Use only reusable items for one week - bags, bottles, containers, utensils.', 'waste', 2.1, 50, NOW() + INTERVAL '33 days', NOW() + INTERVAL '40 days', false),
  ('LED Light Switch', 'Replace all incandescent bulbs in your home with LED bulbs.', 'energy', 7.2, 100, NOW() + INTERVAL '34 days', NOW() + INTERVAL '41 days', false),
  ('Native Plant Garden', 'Replace non-native plants with native species that require less water and maintenance.', 'other', 4.8, 85, NOW() + INTERVAL '35 days', NOW() + INTERVAL '42 days', false),
  
  ('Skateboard Commute', 'Use a skateboard or longboard for short distance transportation.', 'transport', 1.1, 20, NOW() + INTERVAL '36 days', NOW() + INTERVAL '43 days', false),
  ('Fermentation Fun', 'Learn to ferment vegetables to preserve food naturally and reduce waste.', 'food', 1.7, 40, NOW() + INTERVAL '37 days', NOW() + INTERVAL '44 days', false),
  ('Gift Wrapping Reuse', 'Use only reused materials for gift wrapping - newspapers, fabric, old maps.', 'waste', 0.8, 30, NOW() + INTERVAL '38 days', NOW() + INTERVAL '45 days', false),
  ('Smart Power Strips', 'Install smart power strips to eliminate phantom energy loads from electronics.', 'energy', 3.1, 55, NOW() + INTERVAL '39 days', NOW() + INTERVAL '46 days', false),
  ('Seed Bombs', 'Make and plant seed bombs in vacant lots or areas that need more greenery.', 'other', 2.3, 45, NOW() + INTERVAL '40 days', NOW() + INTERVAL '47 days', false),
  
  ('Rideshare Reduction', 'Reduce rideshare usage by 50% and find alternative transportation methods.', 'transport', 4.5, 70, NOW() + INTERVAL '41 days', NOW() + INTERVAL '48 days', false),
  ('Ugly Fruit Challenge', 'Buy only "ugly" or imperfect fruits and vegetables to reduce food waste.', 'food', 2.4, 45, NOW() + INTERVAL '42 days', NOW() + INTERVAL '49 days', false),
  ('Paperless Bills', 'Switch all your bills and statements to paperless digital versions.', 'waste', 1.3, 35, NOW() + INTERVAL '43 days', NOW() + INTERVAL '50 days', false),
  ('Window Insulation', 'Improve window insulation with weather stripping or thermal curtains.', 'energy', 4.6, 75, NOW() + INTERVAL '44 days', NOW() + INTERVAL '51 days', false),
  ('Butterfly Garden', 'Create a butterfly garden with plants that attract and support local butterfly species.', 'other', 3.7, 70, NOW() + INTERVAL '45 days', NOW() + INTERVAL '52 days', false),
  
  ('Telecommute Day', 'Work from home for one day to eliminate commute emissions entirely.', 'transport', 5.1, 60, NOW() + INTERVAL '46 days', NOW() + INTERVAL '53 days', false),
  ('Root-to-Stem Cooking', 'Use entire vegetables including stems, leaves, and peels in your cooking.', 'food', 1.9, 40, NOW() + INTERVAL '47 days', NOW() + INTERVAL '54 days', false),
  ('Clothing Swap', 'Organize or participate in a clothing swap event instead of buying new clothes.', 'waste', 5.2, 80, NOW() + INTERVAL '48 days', NOW() + INTERVAL '55 days', false),
  ('Solar Charger', 'Use a solar charger for all your small electronic devices for one week.', 'energy', 0.9, 25, NOW() + INTERVAL '49 days', NOW() + INTERVAL '56 days', false),
  ('Green Roof Project', 'Start a small green roof or living wall project with drought-resistant plants.', 'other', 6.8, 105, NOW() + INTERVAL '50 days', NOW() + INTERVAL '57 days', false);