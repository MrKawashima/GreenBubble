/*
  # Environmental Challenges - Batch 2 (Challenges 51-100)

  1. New Challenge Data
    - 50 more diverse environmental challenges
    - Focus on advanced sustainability practices
    - Community engagement and education
    - Seasonal and weather-specific activities

  2. Challenge Themes
    - Water conservation and management
    - Advanced recycling and upcycling
    - Energy efficiency improvements
    - Biodiversity and ecosystem support
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Greywater System', 'Set up a simple greywater system to reuse water from sinks for garden irrigation.', 'other', 8.4, 125, NOW() + INTERVAL '51 days', NOW() + INTERVAL '58 days', false),
  ('Electric Vehicle Test', 'Test drive electric vehicles and research switching to electric transportation.', 'transport', 0.0, 30, NOW() + INTERVAL '52 days', NOW() + INTERVAL '59 days', false),
  ('Mushroom Growing', 'Grow your own mushrooms using coffee grounds or other organic waste.', 'food', 2.8, 60, NOW() + INTERVAL '53 days', NOW() + INTERVAL '60 days', false),
  ('E-Waste Collection', 'Organize a community e-waste collection drive for proper recycling of electronics.', 'waste', 12.5, 150, NOW() + INTERVAL '54 days', NOW() + INTERVAL '61 days', false),
  ('Thermal Mass Heating', 'Use thermal mass objects to store and release heat naturally in your home.', 'energy', 6.7, 90, NOW() + INTERVAL '55 days', NOW() + INTERVAL '62 days', false),
  
  ('Cargo Bike Trial', 'Use a cargo bike for grocery shopping and errands for one week.', 'transport', 7.3, 110, NOW() + INTERVAL '56 days', NOW() + INTERVAL '63 days', false),
  ('Sprouting Seeds', 'Grow your own sprouts and microgreens for fresh, local nutrition.', 'food', 1.4, 35, NOW() + INTERVAL '57 days', NOW() + INTERVAL '64 days', false),
  ('Textile Recycling', 'Collect and properly recycle old textiles, including worn-out clothes and linens.', 'waste', 4.1, 65, NOW() + INTERVAL '58 days', NOW() + INTERVAL '65 days', false),
  ('Draft Stoppers', 'Install draft stoppers under doors and around windows to improve insulation.', 'energy', 2.3, 40, NOW() + INTERVAL '59 days', NOW() + INTERVAL '66 days', false),
  ('Monarch Waystation', 'Create a monarch butterfly waystation with milkweed and nectar plants.', 'other', 4.2, 80, NOW() + INTERVAL '60 days', NOW() + INTERVAL '67 days', false),
  
  ('Folding Bike Commute', 'Use a folding bike to combine cycling with public transportation.', 'transport', 4.8, 75, NOW() + INTERVAL '61 days', NOW() + INTERVAL '68 days', false),
  ('Aquaponics Setup', 'Start a small aquaponics system combining fish farming with plant growing.', 'food', 5.6, 100, NOW() + INTERVAL '62 days', NOW() + INTERVAL '69 days', false),
  ('Battery Recycling', 'Collect and properly recycle all types of batteries from your household.', 'waste', 2.7, 45, NOW() + INTERVAL '63 days', NOW() + INTERVAL '70 days', false),
  ('Ceiling Fan Optimization', 'Use ceiling fans strategically to reduce air conditioning and heating needs.', 'energy', 3.9, 55, NOW() + INTERVAL '64 days', NOW() + INTERVAL '71 days', false),
  ('Permaculture Design', 'Design a small permaculture garden using sustainable growing principles.', 'other', 9.1, 135, NOW() + INTERVAL '65 days', NOW() + INTERVAL '72 days', false),
  
  ('Micro-Mobility Week', 'Use only micro-mobility options like e-scooters, bikes, and walking for one week.', 'transport', 6.2, 95, NOW() + INTERVAL '66 days', NOW() + INTERVAL '73 days', false),
  ('Vertical Farming', 'Create a vertical growing system for herbs and small vegetables.', 'food', 3.1, 65, NOW() + INTERVAL '67 days', NOW() + INTERVAL '74 days', false),
  ('Plastic Audit', 'Conduct a week-long audit of all plastic use and find alternatives.', 'waste', 1.8, 50, NOW() + INTERVAL '68 days', NOW() + INTERVAL '75 days', false),
  ('Passive Solar Design', 'Optimize your living space for passive solar heating and cooling.', 'energy', 8.5, 120, NOW() + INTERVAL '69 days', NOW() + INTERVAL '76 days', false),
  ('Green Corridor', 'Help create or maintain a green corridor for wildlife movement in your area.', 'other', 7.8, 115, NOW() + INTERVAL '70 days', NOW() + INTERVAL '77 days', false),
  
  ('Car Sharing Week', 'Use car sharing services instead of owning or using a personal vehicle.', 'transport', 5.7, 85, NOW() + INTERVAL '71 days', NOW() + INTERVAL '78 days', false),
  ('Foraging Adventure', 'Learn to safely forage for wild edibles in your local area.', 'food', 0.8, 40, NOW() + INTERVAL '72 days', NOW() + INTERVAL '79 days', false),
  ('Zero Waste Bathroom', 'Convert your bathroom to completely zero waste products and practices.', 'waste', 3.4, 70, NOW() + INTERVAL '73 days', NOW() + INTERVAL '80 days', false),
  ('Heat Pump Research', 'Research and plan for installing a heat pump system for efficient heating/cooling.', 'energy', 0.0, 35, NOW() + INTERVAL '74 days', NOW() + INTERVAL '81 days', false),
  ('Living Mulch', 'Plant living mulch ground covers to suppress weeds and retain soil moisture.', 'other', 2.9, 55, NOW() + INTERVAL '75 days', NOW() + INTERVAL '82 days', false),
  
  ('Velomobile Trial', 'Try a velomobile or recumbent bike for efficient, weather-protected cycling.', 'transport', 3.6, 60, NOW() + INTERVAL '76 days', NOW() + INTERVAL '83 days', false),
  ('Seed Saving', 'Save seeds from your garden plants for next year\'s growing season.', 'food', 1.2, 30, NOW() + INTERVAL '77 days', NOW() + INTERVAL '84 days', false),
  ('Repair Café', 'Organize or attend a repair café to fix broken items instead of discarding them.', 'waste', 6.3, 95, NOW() + INTERVAL '78 days', NOW() + INTERVAL '85 days', false),
  ('Geothermal Cooling', 'Use earth-sheltered or underground spaces for natural cooling.', 'energy', 4.7, 75, NOW() + INTERVAL '79 days', NOW() + INTERVAL '86 days', false),
  ('Bioswale Creation', 'Create a bioswale to manage stormwater runoff naturally.', 'other', 5.4, 90, NOW() + INTERVAL '80 days', NOW() + INTERVAL '87 days', false),
  
  ('Pedicab Adventure', 'Use pedicab services or try pedal-powered transportation for fun trips.', 'transport', 2.1, 45, NOW() + INTERVAL '81 days', NOW() + INTERVAL '88 days', false),
  ('Wild Edible Garden', 'Plant a garden focused on wild edible plants native to your region.', 'food', 4.5, 80, NOW() + INTERVAL '82 days', NOW() + INTERVAL '89 days', false),
  ('Cradle-to-Cradle', 'Choose products designed for complete recyclability or biodegradability.', 'waste', 2.6, 55, NOW() + INTERVAL '83 days', NOW() + INTERVAL '90 days', false),
  ('Radiant Heating', 'Install or use radiant heating systems for efficient, comfortable warmth.', 'energy', 7.1, 105, NOW() + INTERVAL '84 days', NOW() + INTERVAL '91 days', false),
  ('Mycorrhizal Network', 'Support soil health by encouraging mycorrhizal fungal networks in your garden.', 'other', 3.8, 70, NOW() + INTERVAL '85 days', NOW() + INTERVAL '92 days', false),
  
  ('Bamboo Bike Build', 'Build or try riding a bamboo bicycle for sustainable transportation.', 'transport', 1.5, 50, NOW() + INTERVAL '86 days', NOW() + INTERVAL '93 days', false),
  ('Perennial Vegetables', 'Plant perennial vegetables that produce food year after year.', 'food', 6.2, 110, NOW() + INTERVAL '87 days', NOW() + INTERVAL '94 days', false),
  ('Circular Economy', 'Practice circular economy principles by reusing, sharing, and regenerating materials.', 'waste', 4.9, 85, NOW() + INTERVAL '88 days', NOW() + INTERVAL '95 days', false),
  ('Thermal Curtains', 'Install thermal curtains to improve insulation and reduce energy use.', 'energy', 2.8, 50, NOW() + INTERVAL '89 days', NOW() + INTERVAL '96 days', false),
  ('Food Forest', 'Start planning or planting a food forest with multiple layers of edible plants.', 'other', 12.3, 180, NOW() + INTERVAL '90 days', NOW() + INTERVAL '97 days', false),
  
  ('Rickshaw Ride', 'Use cycle rickshaws or similar human-powered transport for local trips.', 'transport', 1.8, 35, NOW() + INTERVAL '91 days', NOW() + INTERVAL '98 days', false),
  ('Heirloom Varieties', 'Grow heirloom varieties of fruits and vegetables to preserve genetic diversity.', 'food', 2.4, 50, NOW() + INTERVAL '92 days', NOW() + INTERVAL '99 days', false),
  ('Biomimicry Project', 'Create something useful inspired by nature\'s designs and processes.', 'waste', 1.7, 45, NOW() + INTERVAL '93 days', NOW() + INTERVAL '100 days', false),
  ('Evaporative Cooling', 'Use evaporative cooling methods to reduce air conditioning needs.', 'energy', 3.2, 60, NOW() + INTERVAL '94 days', NOW() + INTERVAL '101 days', false),
  ('Wetland Garden', 'Create a small wetland garden to filter water and support biodiversity.', 'other', 8.7, 130, NOW() + INTERVAL '95 days', NOW() + INTERVAL '102 days', false),
  
  ('Gravity-Fed Transport', 'Use gravity-fed transportation like downhill biking or skateboarding.', 'transport', 0.5, 20, NOW() + INTERVAL '96 days', NOW() + INTERVAL '103 days', false),
  ('Companion Planting', 'Use companion planting techniques to naturally pest control and improve yields.', 'food', 1.9, 40, NOW() + INTERVAL '97 days', NOW() + INTERVAL '104 days', false),
  ('Precious Plastic', 'Learn about and support precious plastic initiatives for local plastic recycling.', 'waste', 5.8, 90, NOW() + INTERVAL '98 days', NOW() + INTERVAL '105 days', false),
  ('Thermal Chimney', 'Create or use thermal chimney effects for natural ventilation and cooling.', 'energy', 4.3, 70, NOW() + INTERVAL '99 days', NOW() + INTERVAL '106 days', false),
  ('Xerophytic Garden', 'Create a drought-resistant garden using xerophytic plants that need minimal water.', 'other', 6.5, 100, NOW() + INTERVAL '100 days', NOW() + INTERVAL '107 days', false);