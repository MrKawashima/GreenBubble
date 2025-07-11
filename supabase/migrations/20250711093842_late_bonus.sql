/*
  # Environmental Challenges - Batch 10 (Challenges 451-500)

  1. New Challenge Data
    - Final 50 environmental challenges
    - Focus on advanced and experimental practices
    - Long-term sustainability projects
    - Community leadership and innovation

  2. Challenge Themes
    - Advanced sustainability techniques
    - Community leadership projects
    - Experimental environmental practices
    - Long-term impact initiatives
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Mycoremediation Project', 'Use mushrooms to clean contaminated soil in your community.', 'other', 12.7, 180, NOW() + INTERVAL '451 days', NOW() + INTERVAL '458 days', false),
  ('Algae Biofuel Production', 'Experiment with small-scale algae biofuel production.', 'energy', 8.9, 140, NOW() + INTERVAL '452 days', NOW() + INTERVAL '459 days', false),
  ('Insect Farming', 'Start a small insect farm for sustainable protein production.', 'food', 15.3, 200, NOW() + INTERVAL '453 days', NOW() + INTERVAL '460 days', false),
  ('Pyrolysis Experiment', 'Experiment with pyrolysis for converting waste to energy.', 'waste', 9.4, 150, NOW() + INTERVAL '454 days', NOW() + INTERVAL '461 days', false),
  ('Maglev Transport Model', 'Build a working model of magnetic levitation transportation.', 'transport', 0.0, 80, NOW() + INTERVAL '455 days', NOW() + INTERVAL '462 days', false),
  
  ('Biochar Production', 'Produce biochar for carbon sequestration and soil improvement.', 'other', 11.2, 170, NOW() + INTERVAL '456 days', NOW() + INTERVAL '463 days', false),
  ('Tidal Energy Harvester', 'Build a small tidal energy harvesting device.', 'energy', 6.7, 110, NOW() + INTERVAL '457 days', NOW() + INTERVAL '464 days', false),
  ('Cellular Agriculture', 'Experiment with cellular agriculture techniques for food production.', 'food', 18.6, 250, NOW() + INTERVAL '458 days', NOW() + INTERVAL '465 days', false),
  ('Plasma Gasification', 'Research plasma gasification for waste-to-energy conversion.', 'waste', 13.8, 200, NOW() + INTERVAL '459 days', NOW() + INTERVAL '466 days', false),
  ('Hyperloop Pod Design', 'Design a hyperloop pod for efficient transportation.', 'transport', 0.0, 120, NOW() + INTERVAL '460 days', NOW() + INTERVAL '467 days', false),
  
  ('Atmospheric Water Gen', 'Build an atmospheric water generation system.', 'other', 7.3, 125, NOW() + INTERVAL '461 days', NOW() + INTERVAL '468 days', false),
  ('Piezoelectric Walkway', 'Install piezoelectric tiles to generate energy from foot traffic.', 'energy', 4.2, 85, NOW() + INTERVAL '462 days', NOW() + INTERVAL '469 days', false),
  ('Synthetic Biology Food', 'Experiment with synthetic biology for food production.', 'food', 22.1, 300, NOW() + INTERVAL '463 days', NOW() + INTERVAL '470 days', false),
  ('Molecular Recycling', 'Develop molecular-level recycling processes.', 'waste', 16.5, 240, NOW() + INTERVAL '464 days', NOW() + INTERVAL '471 days', false),
  ('Vacuum Transport', 'Design vacuum tube transportation systems.', 'transport', 0.0, 150, NOW() + INTERVAL '465 days', NOW() + INTERVAL '472 days', false),
  
  ('Carbon Capture Trees', 'Plant genetically enhanced trees for carbon capture.', 'other', 28.4, 350, NOW() + INTERVAL '466 days', NOW() + INTERVAL '473 days', false),
  ('Fusion Reactor Model', 'Build a working model of fusion energy technology.', 'energy', 0.0, 200, NOW() + INTERVAL '467 days', NOW() + INTERVAL '474 days', false),
  ('Lab-Grown Meat', 'Experiment with lab-grown meat production techniques.', 'food', 25.7, 320, NOW() + INTERVAL '468 days', NOW() + INTERVAL '475 days', false),
  ('Quantum Recycling', 'Research quantum-level material recycling.', 'waste', 0.0, 400, NOW() + INTERVAL '469 days', NOW() + INTERVAL '476 days', false),
  ('Teleportation Research', 'Study quantum teleportation for transportation.', 'transport', 0.0, 500, NOW() + INTERVAL '470 days', NOW() + INTERVAL '477 days', false),
  
  ('Geoengineering Project', 'Participate in local geoengineering climate projects.', 'other', 35.2, 400, NOW() + INTERVAL '471 days', NOW() + INTERVAL '478 days', false),
  ('Zero-Point Energy', 'Research zero-point energy extraction methods.', 'energy', 0.0, 600, NOW() + INTERVAL '472 days', NOW() + INTERVAL '479 days', false),
  ('Programmable Matter', 'Experiment with programmable matter for food production.', 'food', 0.0, 700, NOW() + INTERVAL '473 days', NOW() + INTERVAL '480 days', false),
  ('Universal Recycler', 'Design universal recycling machines.', 'waste', 0.0, 800, NOW() + INTERVAL '474 days', NOW() + INTERVAL '481 days', false),
  ('Wormhole Generator', 'Research wormhole generation for transportation.', 'transport', 0.0, 1000, NOW() + INTERVAL '475 days', NOW() + INTERVAL '482 days', false),
  
  ('Ecosystem Resurrection', 'Resurrect extinct ecosystems using advanced technology.', 'other', 0.0, 1200, NOW() + INTERVAL '476 days', NOW() + INTERVAL '483 days', false),
  ('Dyson Sphere Planning', 'Plan Dyson sphere construction for solar energy.', 'energy', 0.0, 1500, NOW() + INTERVAL '477 days', NOW() + INTERVAL '484 days', false),
  ('Dimensional Farming', 'Research dimensional farming techniques.', 'food', 0.0, 1800, NOW() + INTERVAL '478 days', NOW() + INTERVAL '485 days', false),
  ('Reality Recycling', 'Develop reality recycling for ultimate sustainability.', 'waste', 0.0, 2000, NOW() + INTERVAL '479 days', NOW() + INTERVAL '486 days', false),
  ('Time Travel Conservation', 'Use time travel for environmental conservation.', 'transport', 0.0, 2500, NOW() + INTERVAL '480 days', NOW() + INTERVAL '487 days', false),
  
  ('Community Solar Farm', 'Establish a community-owned solar farm.', 'energy', 45.8, 500, NOW() + INTERVAL '481 days', NOW() + INTERVAL '488 days', false),
  ('Permaculture Institute', 'Start a permaculture education institute.', 'food', 32.4, 400, NOW() + INTERVAL '482 days', NOW() + INTERVAL '489 days', false),
  ('Zero Waste City', 'Lead your city to zero waste certification.', 'waste', 67.3, 600, NOW() + INTERVAL '483 days', NOW() + INTERVAL '490 days', false),
  ('Car-Free City Center', 'Advocate for car-free city centers.', 'transport', 89.2, 700, NOW() + INTERVAL '484 days', NOW() + INTERVAL '491 days', false),
  ('Biosphere Restoration', 'Lead large-scale biosphere restoration.', 'other', 156.7, 800, NOW() + INTERVAL '485 days', NOW() + INTERVAL '492 days', false),
  
  ('Renewable Energy Grid', 'Build 100% renewable energy grids.', 'energy', 78.9, 650, NOW() + INTERVAL '486 days', NOW() + INTERVAL '493 days', false),
  ('Global Food Security', 'Address global food security challenges.', 'food', 98.4, 750, NOW() + INTERVAL '487 days', NOW() + INTERVAL '494 days', false),
  ('Planetary Cleanup', 'Organize planetary-scale cleanup efforts.', 'waste', 234.6, 900, NOW() + INTERVAL '488 days', NOW() + INTERVAL '495 days', false),
  ('Sustainable Transport Net', 'Create sustainable transportation networks.', 'transport', 145.3, 850, NOW() + INTERVAL '489 days', NOW() + INTERVAL '496 days', false),
  ('Earth System Engineering', 'Engineer Earth systems for sustainability.', 'other', 567.8, 1000, NOW() + INTERVAL '490 days', NOW() + INTERVAL '497 days', false),
  
  ('Climate Reversal', 'Lead climate change reversal initiatives.', 'other', 789.2, 1500, NOW() + INTERVAL '491 days', NOW() + INTERVAL '498 days', false),
  ('Infinite Clean Energy', 'Develop infinite clean energy sources.', 'energy', 0.0, 2000, NOW() + INTERVAL '492 days', NOW() + INTERVAL '499 days', false),
  ('Perfect Food System', 'Create perfect sustainable food systems.', 'food', 0.0, 1800, NOW() + INTERVAL '493 days', NOW() + INTERVAL '500 days', false),
  ('Waste Elimination', 'Eliminate all waste through perfect recycling.', 'waste', 0.0, 2200, NOW() + INTERVAL '494 days', NOW() + INTERVAL '501 days', false),
  ('Sustainable Universe', 'Make the entire universe sustainable.', 'transport', 0.0, 5000, NOW() + INTERVAL '495 days', NOW() + INTERVAL '502 days', false),
  
  ('Consciousness Evolution', 'Evolve human consciousness for environmental harmony.', 'other', 0.0, 3000, NOW() + INTERVAL '496 days', NOW() + INTERVAL '503 days', false),
  ('Cosmic Energy Mastery', 'Master cosmic energy for unlimited power.', 'energy', 0.0, 4000, NOW() + INTERVAL '497 days', NOW() + INTERVAL '504 days', false),
  ('Universal Nutrition', 'Provide perfect nutrition for all beings.', 'food', 0.0, 3500, NOW() + INTERVAL '498 days', NOW() + INTERVAL '505 days', false),
  ('Matter Transcendence', 'Transcend matter for ultimate sustainability.', 'waste', 0.0, 6000, NOW() + INTERVAL '499 days', NOW() + INTERVAL '506 days', false),
  ('Omnipresent Harmony', 'Achieve omnipresent environmental harmony.', 'other', 0.0, 10000, NOW() + INTERVAL '500 days', NOW() + INTERVAL '507 days', false);