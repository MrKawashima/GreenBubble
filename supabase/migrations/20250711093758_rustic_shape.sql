/*
  # Environmental Challenges - Batch 9 (Challenges 401-450)

  1. New Challenge Data
    - 50 creative environmental challenges
    - Focus on artistic and cultural sustainability
    - Innovation and experimentation
    - Social and community art projects

  2. Challenge Themes
    - Environmental art and creativity
    - Cultural sustainability practices
    - Innovation challenges
    - Community art and expression
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Eco-Art Installation', 'Create an art installation using only natural or recycled materials.', 'waste', 3.4, 70, NOW() + INTERVAL '401 days', NOW() + INTERVAL '408 days', false),
  ('Bicycle Art Car', 'Transform a bicycle into a mobile art piece for sustainable transportation.', 'transport', 2.1, 50, NOW() + INTERVAL '402 days', NOW() + INTERVAL '409 days', false),
  ('Solar Cooking Art', 'Create artistic solar cookers that are both functional and beautiful.', 'energy', 4.2, 80, NOW() + INTERVAL '403 days', NOW() + INTERVAL '410 days', false),
  ('Seed Bomb Making', 'Create artistic seed bombs for guerrilla gardening projects.', 'other', 2.8, 60, NOW() + INTERVAL '404 days', NOW() + INTERVAL '411 days', false),
  ('Edible Flower Garden', 'Design and plant an artistic edible flower garden.', 'food', 3.6, 75, NOW() + INTERVAL '405 days', NOW() + INTERVAL '412 days', false),
  
  ('Trash Fashion Show', 'Organize a fashion show featuring clothing made from recycled materials.', 'waste', 5.7, 100, NOW() + INTERVAL '406 days', NOW() + INTERVAL '413 days', false),
  ('Wind Sculpture', 'Create kinetic wind sculptures that generate small amounts of energy.', 'energy', 1.8, 45, NOW() + INTERVAL '407 days', NOW() + INTERVAL '414 days', false),
  ('Living Wall Art', 'Design and install living wall art pieces with air-purifying plants.', 'other', 4.9, 90, NOW() + INTERVAL '408 days', NOW() + INTERVAL '415 days', false),
  ('Mushroom Cultivation Art', 'Grow mushrooms in artistic arrangements and containers.', 'food', 2.3, 55, NOW() + INTERVAL '409 days', NOW() + INTERVAL '416 days', false),
  ('Upcycled Instrument', 'Create musical instruments from upcycled and waste materials.', 'waste', 1.9, 45, NOW() + INTERVAL '410 days', NOW() + INTERVAL '417 days', false),
  
  ('Solar Light Sculpture', 'Create artistic lighting sculptures powered by solar energy.', 'energy', 3.1, 65, NOW() + INTERVAL '411 days', NOW() + INTERVAL '418 days', false),
  ('Pollinator Mandala', 'Design mandala gardens specifically for pollinator attraction.', 'other', 3.8, 75, NOW() + INTERVAL '412 days', NOW() + INTERVAL '419 days', false),
  ('Fermentation Vessels', 'Create artistic fermentation vessels for food preservation.', 'food', 1.7, 40, NOW() + INTERVAL '413 days', NOW() + INTERVAL '420 days', false),
  ('Plastic Bottle Greenhouse', 'Build an artistic greenhouse using plastic bottles and recycled materials.', 'waste', 6.2, 110, NOW() + INTERVAL '414 days', NOW() + INTERVAL '421 days', false),
  ('Pedal-Powered Art', 'Create art installations that are powered by human pedaling.', 'energy', 2.4, 55, NOW() + INTERVAL '415 days', NOW() + INTERVAL '422 days', false),
  
  ('Moss Graffiti', 'Create living graffiti using moss and natural materials.', 'other', 1.2, 35, NOW() + INTERVAL '416 days', NOW() + INTERVAL '423 days', false),
  ('Edible Landscape Design', 'Design artistic edible landscapes for public spaces.', 'food', 8.4, 130, NOW() + INTERVAL '417 days', NOW() + INTERVAL '424 days', false),
  ('Tire Planter Art', 'Transform old tires into artistic planters and garden features.', 'waste', 2.7, 60, NOW() + INTERVAL '418 days', NOW() + INTERVAL '425 days', false),
  ('Water Wheel Art', 'Create artistic water wheels for small-scale energy generation.', 'energy', 5.3, 95, NOW() + INTERVAL '419 days', NOW() + INTERVAL '426 days', false),
  ('Butterfly Garden Maze', 'Design a maze-like butterfly garden with artistic pathways.', 'other', 6.1, 105, NOW() + INTERVAL '420 days', NOW() + INTERVAL '427 days', false),
  
  ('Compost Sculpture', 'Create temporary sculptures that decompose into compost.', 'waste', 3.9, 75, NOW() + INTERVAL '421 days', NOW() + INTERVAL '428 days', false),
  ('Solar Oven Art', 'Design and build artistic solar ovens for community use.', 'energy', 4.7, 85, NOW() + INTERVAL '422 days', NOW() + INTERVAL '429 days', false),
  ('Herb Spiral Design', 'Create artistic herb spirals with permaculture principles.', 'food', 2.9, 65, NOW() + INTERVAL '423 days', NOW() + INTERVAL '430 days', false),
  ('Recycled Paper Making', 'Make artistic paper from recycled materials and plant fibers.', 'waste', 1.6, 40, NOW() + INTERVAL '424 days', NOW() + INTERVAL '431 days', false),
  ('Wind Chime Energy', 'Create wind chimes that generate small amounts of electricity.', 'energy', 0.8, 30, NOW() + INTERVAL '425 days', NOW() + INTERVAL '432 days', false),
  
  ('Living Fence Art', 'Design artistic living fences using edible and native plants.', 'other', 4.5, 85, NOW() + INTERVAL '426 days', NOW() + INTERVAL '433 days', false),
  ('Sprouting Art', 'Create artistic displays using sprouting seeds and microgreens.', 'food', 1.1, 30, NOW() + INTERVAL '427 days', NOW() + INTERVAL '434 days', false),
  ('Bottle Cap Mosaic', 'Create large mosaic artworks using collected bottle caps.', 'waste', 2.2, 50, NOW() + INTERVAL '428 days', NOW() + INTERVAL '435 days', false),
  ('Thermal Mass Art', 'Create artistic thermal mass features for passive heating and cooling.', 'energy', 6.8, 115, NOW() + INTERVAL '429 days', NOW() + INTERVAL '436 days', false),
  ('Bee Hotel Art', 'Design and build artistic bee hotels for native solitary bees.', 'other', 2.6, 55, NOW() + INTERVAL '430 days', NOW() + INTERVAL '437 days', false),
  
  ('Driftwood Sculpture', 'Create sculptures using driftwood and other natural beach materials.', 'waste', 1.4, 35, NOW() + INTERVAL '431 days', NOW() + INTERVAL '438 days', false),
  ('Biogas Art Installation', 'Create artistic biogas digesters for renewable energy and art.', 'energy', 7.9, 125, NOW() + INTERVAL '432 days', NOW() + INTERVAL '439 days', false),
  ('Vertical Garden Art', 'Design artistic vertical gardens for small spaces.', 'food', 3.7, 70, NOW() + INTERVAL '433 days', NOW() + INTERVAL '440 days', false),
  ('Textile Waste Weaving', 'Weave artistic pieces using textile waste and fabric scraps.', 'waste', 2.8, 60, NOW() + INTERVAL '434 days', NOW() + INTERVAL '441 days', false),
  ('Sundial Garden', 'Create artistic sundials integrated with garden designs.', 'other', 1.9, 45, NOW() + INTERVAL '435 days', NOW() + INTERVAL '442 days', false),
  
  ('Leaf Art Preservation', 'Create preserved leaf art using natural preservation methods.', 'other', 0.7, 25, NOW() + INTERVAL '436 days', NOW() + INTERVAL '443 days', false),
  ('Aquaponics Art', 'Design artistic aquaponics systems that are both functional and beautiful.', 'food', 5.8, 100, NOW() + INTERVAL '437 days', NOW() + INTERVAL '444 days', false),
  ('Glass Bottle Building', 'Build artistic structures using glass bottles and natural mortar.', 'waste', 4.3, 80, NOW() + INTERVAL '438 days', NOW() + INTERVAL '445 days', false),
  ('Micro-Wind Art', 'Create artistic micro-wind turbines for small-scale energy generation.', 'energy', 3.2, 65, NOW() + INTERVAL '439 days', NOW() + INTERVAL '446 days', false),
  ('Rain Chain Art', 'Design artistic rain chains for beautiful water management.', 'other', 2.1, 50, NOW() + INTERVAL '440 days', NOW() + INTERVAL '447 days', false),
  
  ('Stone Balance Art', 'Create temporary stone balance sculptures in natural settings.', 'other', 0.0, 20, NOW() + INTERVAL '441 days', NOW() + INTERVAL '448 days', false),
  ('Edible Flower Pressing', 'Press edible flowers for artistic culinary and craft purposes.', 'food', 0.4, 20, NOW() + INTERVAL '442 days', NOW() + INTERVAL '449 days', false),
  ('Cardboard Architecture', 'Build temporary architectural structures using cardboard waste.', 'waste', 3.1, 65, NOW() + INTERVAL '443 days', NOW() + INTERVAL '450 days', false),
  ('Solar Fountain Art', 'Create artistic water fountains powered by solar energy.', 'energy', 2.7, 55, NOW() + INTERVAL '444 days', NOW() + INTERVAL '451 days', false),
  ('Succulent Art Garden', 'Design artistic arrangements using drought-resistant succulents.', 'other', 1.8, 40, NOW() + INTERVAL '445 days', NOW() + INTERVAL '452 days', false),
  
  ('Natural Dye Art', 'Create artistic textiles using natural dyes from plants and minerals.', 'waste', 1.5, 35, NOW() + INTERVAL '446 days', NOW() + INTERVAL '453 days', false),
  ('Mushroom Log Art', 'Create artistic mushroom growing logs and installations.', 'food', 2.4, 55, NOW() + INTERVAL '447 days', NOW() + INTERVAL '454 days', false),
  ('Recycled Metal Sculpture', 'Create sculptures using recycled metal and industrial waste.', 'waste', 4.6, 85, NOW() + INTERVAL '448 days', NOW() + INTERVAL '455 days', false),
  ('Gravity Battery Art', 'Create artistic gravity-powered energy storage systems.', 'energy', 3.8, 70, NOW() + INTERVAL '449 days', NOW() + INTERVAL '456 days', false),
  ('Zen Garden Design', 'Design meditative zen gardens using sustainable materials.', 'other', 2.3, 50, NOW() + INTERVAL '450 days', NOW() + INTERVAL '457 days', false);