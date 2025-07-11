/*
  # Add 500 Environmental Challenges - Batch 9 (Challenges 401-450)

  1. New Challenges
    - 50 diverse environmental challenges focusing on creativity and innovation
    - Artistic and creative approaches to environmental action
    - Points range from 35-300 based on creative complexity
    - CO2 savings range from 5.0kg to 60kg per challenge
    - Emphasis on environmental art, creative solutions, and innovative approaches

  2. Challenge Themes
    - Environmental art and creative expression
    - Innovative technology applications
    - Creative community engagement
    - Artistic activism and awareness
    - Experimental sustainability projects

  3. Creative Focus
    - Art as environmental activism
    - Creative problem-solving approaches
    - Innovative technology experiments
    - Community engagement through creativity
    - Experimental and visionary projects
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Eco-Art Installation', 'Create large-scale environmental art installation.', 'other', 12.8, 85, NOW() + INTERVAL '401 days', NOW() + INTERVAL '408 days', false),
  ('Solar-Powered Art', 'Create art piece powered entirely by solar energy.', 'energy', 8.4, 68, NOW() + INTERVAL '402 days', NOW() + INTERVAL '409 days', false),
  ('Recycled Material Sculpture', 'Build sculpture entirely from recycled materials.', 'waste', 15.6, 95, NOW() + INTERVAL '403 days', NOW() + INTERVAL '410 days', false),
  ('Kinetic Wind Art', 'Create kinetic art powered by wind energy.', 'energy', 6.7, 58, NOW() + INTERVAL '404 days', NOW() + INTERVAL '411 days', false),
  ('Living Architecture', 'Design building that incorporates living systems.', 'other', 28.9, 145, NOW() + INTERVAL '405 days', NOW() + INTERVAL '412 days', false),
  ('Bike-Powered Performance', 'Create performance art powered by bicycle energy.', 'transport', 4.2, 48, NOW() + INTERVAL '406 days', NOW() + INTERVAL '413 days', false),
  ('Edible Art Garden', 'Create artistic garden design using edible plants.', 'food', 9.3, 72, NOW() + INTERVAL '407 days', NOW() + INTERVAL '414 days', false),
  ('Waste Stream Visualization', 'Create art visualizing community waste streams.', 'waste', 7.8, 62, NOW() + INTERVAL '408 days', NOW() + INTERVAL '415 days', false),
  ('Climate Data Sonification', 'Convert climate data into musical compositions.', 'other', 3.6, 42, NOW() + INTERVAL '409 days', NOW() + INTERVAL '416 days', false),
  ('Pedal-Powered Cinema', 'Organize cinema powered by audience pedaling.', 'transport', 5.9, 55, NOW() + INTERVAL '410 days', NOW() + INTERVAL '417 days', false),
  ('Mushroom Building Materials', 'Experiment with mushroom-based building materials.', 'other', 18.4, 105, NOW() + INTERVAL '411 days', NOW() + INTERVAL '418 days', false),
  ('Algae Biofuel Art', 'Create art installation demonstrating algae biofuel.', 'energy', 11.2, 78, NOW() + INTERVAL '412 days', NOW() + INTERVAL '419 days', false),
  ('Plastic Ocean Awareness', 'Create awareness art from ocean plastic waste.', 'waste', 13.7, 88, NOW() + INTERVAL '413 days', NOW() + INTERVAL '420 days', false),
  ('Guerrilla Gardening Art', 'Combine guerrilla gardening with artistic expression.', 'food', 6.8, 58, NOW() + INTERVAL '414 days', NOW() + INTERVAL '421 days', false),
  ('Carbon Footprint Visualization', 'Create visual art representing carbon footprints.', 'other', 4.9, 45, NOW() + INTERVAL '415 days', NOW() + INTERVAL '422 days', false),
  ('Human-Powered Transportation Art', 'Create art celebrating human-powered transport.', 'transport', 3.4, 38, NOW() + INTERVAL '416 days', NOW() + INTERVAL '423 days', false),
  ('Fermentation Art Project', 'Create art project exploring fermentation processes.', 'food', 5.2, 48, NOW() + INTERVAL '417 days', NOW() + INTERVAL '424 days', false),
  ('Upcycling Fashion Show', 'Organize fashion show featuring upcycled clothing.', 'waste', 9.6, 72, NOW() + INTERVAL '418 days', NOW() + INTERVAL '425 days', false),
  ('Renewable Energy Dance', 'Create dance performance about renewable energy.', 'energy', 2.8, 35, NOW() + INTERVAL '419 days', NOW() + INTERVAL '426 days', false),
  ('Biodiversity Mural', 'Paint mural celebrating local biodiversity.', 'other', 8.1, 65, NOW() + INTERVAL '420 days', NOW() + INTERVAL '427 days', false),
  ('Cargo Bike Art Mobile', 'Create mobile art gallery using cargo bike.', 'transport', 4.7, 52, NOW() + INTERVAL '421 days', NOW() + INTERVAL '428 days', false),
  ('Seed Bomb Art', 'Create artistic seed bombs for guerrilla gardening.', 'food', 7.3, 62, NOW() + INTERVAL '422 days', NOW() + INTERVAL '429 days', false),
  ('E-Waste Sculpture Garden', 'Create sculpture garden from electronic waste.', 'waste', 16.8, 98, NOW() + INTERVAL '423 days', NOW() + INTERVAL '430 days', false),
  ('Solar Cooking Performance', 'Create performance art around solar cooking.', 'energy', 6.1, 55, NOW() + INTERVAL '424 days', NOW() + INTERVAL '431 days', false),
  ('Ecosystem Sound Map', 'Create sound map of local ecosystem changes.', 'other', 5.4, 48, NOW() + INTERVAL '425 days', NOW() + INTERVAL '432 days', false),
  ('Velomobile Art Car', 'Transform velomobile into mobile art piece.', 'transport', 8.9, 68, NOW() + INTERVAL '426 days', NOW() + INTERVAL '433 days', false),
  ('Permaculture Mandala', 'Create artistic permaculture mandala garden.', 'food', 12.6, 82, NOW() + INTERVAL '427 days', NOW() + INTERVAL '434 days', false),
  ('Plastic-Free Art Challenge', 'Create art using only plastic-free materials.', 'waste', 4.3, 42, NOW() + INTERVAL '428 days', NOW() + INTERVAL '435 days', false),
  ('Geothermal Art Installation', 'Create art installation using geothermal energy.', 'energy', 14.7, 88, NOW() + INTERVAL '429 days', NOW() + INTERVAL '436 days', false),
  ('Migration Pattern Art', 'Create art representing animal migration patterns.', 'other', 6.9, 58, NOW() + INTERVAL '430 days', NOW() + INTERVAL '437 days', false),
  ('Skateboard Solar Charger', 'Build solar charging skateboard for devices.', 'transport', 3.8, 45, NOW() + INTERVAL '431 days', NOW() + INTERVAL '438 days', false),
  ('Vertical Farm Art', 'Create artistic vertical farming installation.', 'food', 10.4, 75, NOW() + INTERVAL '432 days', NOW() + INTERVAL '439 days', false),
  ('Compost Art Process', 'Document composting process through time-lapse art.', 'waste', 5.7, 52, NOW() + INTERVAL '433 days', NOW() + INTERVAL '440 days', false),
  ('Wind Pattern Sculpture', 'Create sculpture that visualizes wind patterns.', 'energy', 7.2, 62, NOW() + INTERVAL '434 days', NOW() + INTERVAL '441 days', false),
  ('Pollinator Pathway Art', 'Create artistic pollinator pathways through city.', 'other', 11.8, 78, NOW() + INTERVAL '435 days', NOW() + INTERVAL '442 days', false),
  ('Rickshaw Art Gallery', 'Convert rickshaw into mobile art gallery.', 'transport', 5.6, 55, NOW() + INTERVAL '436 days', NOW() + INTERVAL '443 days', false),
  ('Aquaponics Art System', 'Create artistic aquaponics system installation.', 'food', 9.7, 72, NOW() + INTERVAL '437 days', NOW() + INTERVAL '444 days', false),
  ('Textile Waste Tapestry', 'Create tapestry from textile waste materials.', 'waste', 8.4, 65, NOW() + INTERVAL '438 days', NOW() + INTERVAL '445 days', false),
  ('Tidal Energy Art', 'Create art installation powered by tidal energy.', 'energy', 12.3, 82, NOW() + INTERVAL '439 days', NOW() + INTERVAL '446 days', false),
  ('Urban Wildlife Photography', 'Document urban wildlife through artistic photography.', 'other', 2.9, 35, NOW() + INTERVAL '440 days', NOW() + INTERVAL '447 days', false),
  ('Pedicab Art Tour', 'Create artistic pedicab for eco-tourism.', 'transport', 6.4, 58, NOW() + INTERVAL '441 days', NOW() + INTERVAL '448 days', false),
  ('Mycoremediation Art', 'Create art project about mushroom soil remediation.', 'food', 13.9, 85, NOW() + INTERVAL '442 days', NOW() + INTERVAL '449 days', false),
  ('Zero Waste Art Studio', 'Establish completely zero waste art studio.', 'waste', 11.5, 78, NOW() + INTERVAL '443 days', NOW() + INTERVAL '450 days', false),
  ('Biomass Art Fuel', 'Create art using biomass as fuel source.', 'energy', 9.8, 72, NOW() + INTERVAL '444 days', NOW() + INTERVAL '451 days', false),
  ('Climate Change Theater', 'Produce theater performance about climate change.', 'other', 7.6, 62, NOW() + INTERVAL '445 days', NOW() + INTERVAL '452 days', false),
  ('Handcycle Art Mobile', 'Create mobile art installation using handcycle.', 'transport', 4.1, 48, NOW() + INTERVAL '446 days', NOW() + INTERVAL '453 days', false),
  ('Insect Protein Art', 'Create art exploring insect protein as food.', 'food', 8.7, 68, NOW() + INTERVAL '447 days', NOW() + INTERVAL '454 days', false),
  ('Circular Design Exhibition', 'Curate exhibition on circular design principles.', 'waste', 14.2, 88, NOW() + INTERVAL '448 days', NOW() + INTERVAL '455 days', false),
  ('Hydrogen Art Generator', 'Create art installation powered by hydrogen.', 'energy', 15.6, 92, NOW() + INTERVAL '449 days', NOW() + INTERVAL '456 days', false),
  ('Ecosystem Restoration Art', 'Document ecosystem restoration through art.', 'other', 19.4, 108, NOW() + INTERVAL '450 days', NOW() + INTERVAL '457 days', false);