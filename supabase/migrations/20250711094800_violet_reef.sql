/*
  # Add 500 Environmental Challenges - Batch 1 (Challenges 1-50)

  1. New Challenges
    - 50 diverse environmental challenges across all categories
    - Challenges focus on practical daily actions and beginner-friendly activities
    - Points range from 10-100 based on difficulty and impact
    - CO2 savings range from 0.5kg to 15kg per challenge
    - Mix of transport, food, energy, waste, and other categories

  2. Challenge Categories
    - Transport: Sustainable mobility options
    - Food: Sustainable eating and cooking practices  
    - Energy: Home energy efficiency and conservation
    - Waste: Reduction, reuse, and recycling activities
    - Other: Nature connection and community engagement

  3. Difficulty Levels
    - Beginner: Simple daily habit changes (10-25 points)
    - Intermediate: Weekly projects and installations (30-60 points)
    - Advanced: Larger commitments and community actions (70-100 points)
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Walk to Work Wednesday', 'Walk to work instead of driving for the entire day.', 'transport', 2.5, 25, NOW() + INTERVAL '1 days', NOW() + INTERVAL '8 days', false),
  ('Meatless Monday Meal', 'Prepare and eat a completely plant-based meal.', 'food', 1.8, 20, NOW() + INTERVAL '2 days', NOW() + INTERVAL '9 days', false),
  ('Unplug Electronics Night', 'Unplug all non-essential electronics for 12 hours.', 'energy', 1.2, 15, NOW() + INTERVAL '3 days', NOW() + INTERVAL '10 days', false),
  ('Zero Waste Lunch', 'Pack a lunch with zero single-use packaging.', 'waste', 0.8, 18, NOW() + INTERVAL '4 days', NOW() + INTERVAL '11 days', false),
  ('Plant a Native Seed', 'Plant a native plant seed in your garden or a pot.', 'other', 5.0, 30, NOW() + INTERVAL '5 days', NOW() + INTERVAL '12 days', false),
  ('Bike to the Store', 'Use a bicycle for your next grocery shopping trip.', 'transport', 3.2, 28, NOW() + INTERVAL '6 days', NOW() + INTERVAL '13 days', false),
  ('Local Farmers Market', 'Buy all your produce from a local farmers market.', 'food', 2.1, 22, NOW() + INTERVAL '7 days', NOW() + INTERVAL '14 days', false),
  ('LED Bulb Upgrade', 'Replace one incandescent bulb with an LED bulb.', 'energy', 8.5, 35, NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', false),
  ('Repair Instead of Replace', 'Fix a broken item instead of throwing it away.', 'waste', 4.2, 32, NOW() + INTERVAL '9 days', NOW() + INTERVAL '16 days', false),
  ('Nature Photography Walk', 'Take a 30-minute walk and photograph local wildlife.', 'other', 0.5, 12, NOW() + INTERVAL '10 days', NOW() + INTERVAL '17 days', false),
  ('Public Transit Day', 'Use only public transportation for all your trips.', 'transport', 4.8, 38, NOW() + INTERVAL '11 days', NOW() + INTERVAL '18 days', false),
  ('Grow Your Own Herbs', 'Start an herb garden on your windowsill.', 'food', 1.5, 25, NOW() + INTERVAL '12 days', NOW() + INTERVAL '19 days', false),
  ('Cold Water Laundry', 'Wash all your clothes in cold water for a week.', 'energy', 2.8, 20, NOW() + INTERVAL '13 days', NOW() + INTERVAL '20 days', false),
  ('Compost Kitchen Scraps', 'Start composting your fruit and vegetable scraps.', 'waste', 3.6, 28, NOW() + INTERVAL '14 days', NOW() + INTERVAL '21 days', false),
  ('Bird Watching Session', 'Spend 1 hour observing and identifying local birds.', 'other', 0.3, 10, NOW() + INTERVAL '15 days', NOW() + INTERVAL '22 days', false),
  ('Carpool to Work', 'Share a ride with a colleague for your commute.', 'transport', 3.5, 30, NOW() + INTERVAL '16 days', NOW() + INTERVAL '23 days', false),
  ('Seasonal Eating Challenge', 'Eat only seasonal fruits and vegetables for 3 days.', 'food', 2.7, 24, NOW() + INTERVAL '17 days', NOW() + INTERVAL '24 days', false),
  ('Programmable Thermostat', 'Install and program a smart thermostat.', 'energy', 12.0, 50, NOW() + INTERVAL '18 days', NOW() + INTERVAL '25 days', false),
  ('Plastic-Free Shopping', 'Complete a grocery shop without any plastic bags.', 'waste', 1.1, 16, NOW() + INTERVAL '19 days', NOW() + INTERVAL '26 days', false),
  ('Community Garden Visit', 'Visit and volunteer at a local community garden.', 'other', 2.0, 35, NOW() + INTERVAL '20 days', NOW() + INTERVAL '27 days', false),
  ('Electric Scooter Ride', 'Use an electric scooter for short-distance travel.', 'transport', 1.8, 22, NOW() + INTERVAL '21 days', NOW() + INTERVAL '28 days', false),
  ('Preserve Seasonal Food', 'Can, freeze, or dehydrate seasonal produce.', 'food', 3.4, 40, NOW() + INTERVAL '22 days', NOW() + INTERVAL '29 days', false),
  ('Solar Phone Charger', 'Charge your phone using only solar power for a day.', 'energy', 0.6, 18, NOW() + INTERVAL '23 days', NOW() + INTERVAL '30 days', false),
  ('Upcycle Old Clothing', 'Transform old clothes into something new and useful.', 'waste', 2.9, 35, NOW() + INTERVAL '24 days', NOW() + INTERVAL '31 days', false),
  ('Tree Identification Walk', 'Learn to identify 5 different tree species in your area.', 'other', 0.4, 15, NOW() + INTERVAL '25 days', NOW() + INTERVAL '32 days', false),
  ('Work From Home Day', 'Work remotely to eliminate your commute entirely.', 'transport', 5.2, 42, NOW() + INTERVAL '26 days', NOW() + INTERVAL '33 days', false),
  ('Forage Wild Edibles', 'Safely forage and eat wild edible plants.', 'food', 1.0, 28, NOW() + INTERVAL '27 days', NOW() + INTERVAL '34 days', false),
  ('Weatherstrip Windows', 'Install weatherstripping around drafty windows.', 'energy', 6.8, 45, NOW() + INTERVAL '28 days', NOW() + INTERVAL '35 days', false),
  ('Donate Unused Items', 'Donate 10 items you no longer use to charity.', 'waste', 4.5, 30, NOW() + INTERVAL '29 days', NOW() + INTERVAL '36 days', false),
  ('Pollinator Garden Patch', 'Create a small garden area specifically for pollinators.', 'other', 8.2, 55, NOW() + INTERVAL '30 days', NOW() + INTERVAL '37 days', false),
  ('Skateboard Commute', 'Use a skateboard or longboard for transportation.', 'transport', 2.1, 25, NOW() + INTERVAL '31 days', NOW() + INTERVAL '38 days', false),
  ('Ferment Vegetables', 'Learn to ferment vegetables like sauerkraut or kimchi.', 'food', 1.7, 32, NOW() + INTERVAL '32 days', NOW() + INTERVAL '39 days', false),
  ('Unheated Room Challenge', 'Keep one room unheated for a week using layers instead.', 'energy', 9.5, 48, NOW() + INTERVAL '33 days', NOW() + INTERVAL '40 days', false),
  ('Plastic Bottle Planter', 'Create planters from plastic bottles for herbs.', 'waste', 1.3, 20, NOW() + INTERVAL '34 days', NOW() + INTERVAL '41 days', false),
  ('Sunrise Nature Meditation', 'Meditate outdoors during sunrise for 20 minutes.', 'other', 0.2, 12, NOW() + INTERVAL '35 days', NOW() + INTERVAL '42 days', false),
  ('Walking School Bus', 'Organize a walking group for children going to school.', 'transport', 4.6, 50, NOW() + INTERVAL '36 days', NOW() + INTERVAL '43 days', false),
  ('Sprout Seeds at Home', 'Grow sprouts from seeds on your kitchen counter.', 'food', 0.8, 18, NOW() + INTERVAL '37 days', NOW() + INTERVAL '44 days', false),
  ('Draft Stopper Creation', 'Make draft stoppers for doors using old fabric.', 'energy', 3.2, 25, NOW() + INTERVAL '38 days', NOW() + INTERVAL '45 days', false),
  ('Repair Cafe Visit', 'Take broken items to a repair cafe instead of discarding.', 'waste', 5.8, 40, NOW() + INTERVAL '39 days', NOW() + INTERVAL '46 days', false),
  ('Wildflower Seed Bombing', 'Create and plant seed bombs in appropriate areas.', 'other', 3.5, 30, NOW() + INTERVAL '40 days', NOW() + INTERVAL '47 days', false),
  ('Roller Skating Transport', 'Use roller skates for short-distance transportation.', 'transport', 1.9, 23, NOW() + INTERVAL '41 days', NOW() + INTERVAL '48 days', false),
  ('Mushroom Growing Kit', 'Start growing mushrooms using a home growing kit.', 'food', 2.3, 35, NOW() + INTERVAL '42 days', NOW() + INTERVAL '49 days', false),
  ('Hand-Crank Radio Day', 'Use only hand-powered devices for entertainment.', 'energy', 1.4, 20, NOW() + INTERVAL '43 days', NOW() + INTERVAL '50 days', false),
  ('Textile Recycling Drive', 'Organize a textile recycling collection in your building.', 'waste', 7.2, 45, NOW() + INTERVAL '44 days', NOW() + INTERVAL '51 days', false),
  ('Insect Hotel Building', 'Build a small hotel for beneficial insects.', 'other', 2.8, 38, NOW() + INTERVAL '45 days', NOW() + INTERVAL '52 days', false),
  ('Pogo Stick Commute', 'Use a pogo stick for fun, short-distance travel.', 'transport', 1.2, 15, NOW() + INTERVAL '46 days', NOW() + INTERVAL '53 days', false),
  ('Microgreen Cultivation', 'Grow microgreens on your windowsill for fresh nutrition.', 'food', 1.1, 22, NOW() + INTERVAL '47 days', NOW() + INTERVAL '54 days', false),
  ('Candle-Lit Evening', 'Spend an entire evening using only candles for light.', 'energy', 2.6, 18, NOW() + INTERVAL '48 days', NOW() + INTERVAL '55 days', false),
  ('Zero Waste Bathroom', 'Eliminate all single-use items from your bathroom routine.', 'waste', 3.8, 35, NOW() + INTERVAL '49 days', NOW() + INTERVAL '56 days', false),
  ('Nature Sound Recording', 'Record and share the natural sounds of your local environment.', 'other', 0.6, 16, NOW() + INTERVAL '50 days', NOW() + INTERVAL '57 days', false);