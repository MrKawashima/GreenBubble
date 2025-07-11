/*
  # Environmental Challenges - Batch 3 (Challenges 101-150)

  1. New Challenge Data
    - 50 innovative environmental challenges
    - Focus on technology integration and smart solutions
    - Community building and social impact
    - Advanced sustainability practices

  2. Challenge Themes
    - Smart home and IoT for sustainability
    - Social entrepreneurship and green business
    - Advanced waste reduction techniques
    - Climate adaptation strategies
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Smart Irrigation', 'Install a smart irrigation system that adjusts watering based on weather and soil conditions.', 'other', 4.2, 80, NOW() + INTERVAL '101 days', NOW() + INTERVAL '108 days', false),
  ('Hydrogen Fuel Research', 'Research hydrogen fuel cell vehicles and their potential for clean transportation.', 'transport', 0.0, 25, NOW() + INTERVAL '102 days', NOW() + INTERVAL '109 days', false),
  ('Insect Protein', 'Try insect-based protein sources as a sustainable alternative to traditional meat.', 'food', 8.7, 120, NOW() + INTERVAL '103 days', NOW() + INTERVAL '110 days', false),
  ('Blockchain Recycling', 'Use blockchain-based apps to track and incentivize recycling efforts.', 'waste', 2.1, 55, NOW() + INTERVAL '104 days', NOW() + INTERVAL '111 days', false),
  ('Smart Grid Participation', 'Participate in smart grid programs to optimize energy usage during peak times.', 'energy', 5.9, 95, NOW() + INTERVAL '105 days', NOW() + INTERVAL '112 days', false),
  
  ('Autonomous Vehicle Study', 'Study the environmental impact of autonomous vehicles and shared mobility.', 'transport', 0.0, 30, NOW() + INTERVAL '106 days', NOW() + INTERVAL '113 days', false),
  ('Lab-Grown Meat', 'Research and try lab-grown meat alternatives when available in your area.', 'food', 15.2, 200, NOW() + INTERVAL '107 days', NOW() + INTERVAL '114 days', false),
  ('AI Waste Sorting', 'Use AI-powered apps to improve waste sorting accuracy and efficiency.', 'waste', 1.8, 45, NOW() + INTERVAL '108 days', NOW() + INTERVAL '115 days', false),
  ('Energy Storage System', 'Install or research home energy storage systems for renewable energy.', 'energy', 8.4, 125, NOW() + INTERVAL '109 days', NOW() + INTERVAL '116 days', false),
  ('Climate Modeling', 'Participate in citizen science climate modeling projects.', 'other', 1.2, 40, NOW() + INTERVAL '110 days', NOW() + INTERVAL '117 days', false),
  
  ('Hyperloop Interest', 'Learn about hyperloop technology and its potential for sustainable transport.', 'transport', 0.0, 20, NOW() + INTERVAL '111 days', NOW() + INTERVAL '118 days', false),
  ('Cellular Agriculture', 'Support cellular agriculture initiatives for sustainable food production.', 'food', 12.8, 160, NOW() + INTERVAL '112 days', NOW() + INTERVAL '119 days', false),
  ('Ocean Plastic Collection', 'Support or participate in ocean plastic collection and recycling projects.', 'waste', 9.3, 140, NOW() + INTERVAL '113 days', NOW() + INTERVAL '120 days', false),
  ('Piezoelectric Harvesting', 'Learn about piezoelectric energy harvesting from foot traffic and movement.', 'energy', 0.8, 35, NOW() + INTERVAL '114 days', NOW() + INTERVAL '121 days', false),
  ('Atmospheric Water', 'Research atmospheric water generation technology for water sustainability.', 'other', 3.7, 70, NOW() + INTERVAL '115 days', NOW() + INTERVAL '122 days', false),
  
  ('Maglev Transportation', 'Learn about magnetic levitation transportation and its efficiency benefits.', 'transport', 0.0, 25, NOW() + INTERVAL '116 days', NOW() + INTERVAL '123 days', false),
  ('Precision Agriculture', 'Support precision agriculture techniques that reduce resource waste.', 'food', 7.4, 110, NOW() + INTERVAL '117 days', NOW() + INTERVAL '124 days', false),
  ('Molecular Recycling', 'Learn about molecular recycling technologies for plastic waste.', 'waste', 6.2, 95, NOW() + INTERVAL '118 days', NOW() + INTERVAL '125 days', false),
  ('Fusion Energy Support', 'Support fusion energy research and development initiatives.', 'energy', 0.0, 50, NOW() + INTERVAL '119 days', NOW() + INTERVAL '126 days', false),
  ('Carbon Capture Trees', 'Plant or support genetically enhanced trees designed for carbon capture.', 'other', 25.6, 250, NOW() + INTERVAL '120 days', NOW() + INTERVAL '127 days', false),
  
  ('Solar Roadways', 'Learn about and support solar roadway technology development.', 'transport', 0.0, 30, NOW() + INTERVAL '121 days', NOW() + INTERVAL '128 days', false),
  ('Vertical Ocean Farms', 'Support vertical ocean farming initiatives for sustainable seafood.', 'food', 9.1, 135, NOW() + INTERVAL '122 days', NOW() + INTERVAL '129 days', false),
  ('Space Debris Cleanup', 'Support space debris cleanup initiatives to protect Earth\'s orbital environment.', 'waste', 2.4, 60, NOW() + INTERVAL '123 days', NOW() + INTERVAL '130 days', false),
  ('Quantum Computing Green', 'Learn how quantum computing can optimize energy systems and reduce consumption.', 'energy', 0.0, 40, NOW() + INTERVAL '124 days', NOW() + INTERVAL '131 days', false),
  ('Bioengineered Coral', 'Support bioengineered coral reef restoration projects.', 'other', 11.7, 175, NOW() + INTERVAL '125 days', NOW() + INTERVAL '132 days', false),
  
  ('Pneumatic Transport', 'Research pneumatic tube transport systems for efficient goods movement.', 'transport', 0.0, 35, NOW() + INTERVAL '126 days', NOW() + INTERVAL '133 days', false),
  ('Synthetic Biology Food', 'Learn about synthetic biology applications in sustainable food production.', 'food', 6.8, 100, NOW() + INTERVAL '127 days', NOW() + INTERVAL '134 days', false),
  ('Enzymatic Recycling', 'Support enzymatic recycling technologies for breaking down plastics.', 'waste', 4.5, 80, NOW() + INTERVAL '128 days', NOW() + INTERVAL '135 days', false),
  ('Ambient Energy Harvest', 'Install devices that harvest ambient energy from radio waves and vibrations.', 'energy', 1.3, 45, NOW() + INTERVAL '129 days', NOW() + INTERVAL '136 days', false),
  ('Terraforming Research', 'Study terraforming techniques that could be applied to Earth restoration.', 'other', 0.0, 55, NOW() + INTERVAL '130 days', NOW() + INTERVAL '137 days', false),
  
  ('Levitating Transport', 'Research magnetic levitation personal transport devices.', 'transport', 0.0, 40, NOW() + INTERVAL '131 days', NOW() + INTERVAL '138 days', false),
  ('Photosynthetic Humans', 'Learn about research into photosynthetic enhancements for human nutrition.', 'food', 0.0, 75, NOW() + INTERVAL '132 days', NOW() + INTERVAL '139 days', false),
  ('Nano-scale Recycling', 'Support nano-scale recycling technologies for molecular-level material recovery.', 'waste', 3.1, 70, NOW() + INTERVAL '133 days', NOW() + INTERVAL '140 days', false),
  ('Zero-Point Energy', 'Learn about zero-point energy research for unlimited clean power.', 'energy', 0.0, 100, NOW() + INTERVAL '134 days', NOW() + INTERVAL '141 days', false),
  ('Atmospheric Engineering', 'Study atmospheric engineering techniques for climate control.', 'other', 0.0, 85, NOW() + INTERVAL '135 days', NOW() + INTERVAL '142 days', false),
  
  ('Teleportation Research', 'Learn about quantum teleportation research and its potential applications.', 'transport', 0.0, 60, NOW() + INTERVAL '136 days', NOW() + INTERVAL '143 days', false),
  ('Programmable Matter Food', 'Research programmable matter applications in food production and nutrition.', 'food', 0.0, 90, NOW() + INTERVAL '137 days', NOW() + INTERVAL '144 days', false),
  ('Matter Compiler', 'Learn about matter compiler technology for waste-free manufacturing.', 'waste', 0.0, 120, NOW() + INTERVAL '138 days', NOW() + INTERVAL '145 days', false),
  ('Dyson Sphere Support', 'Support research into Dyson sphere technology for massive solar energy collection.', 'energy', 0.0, 150, NOW() + INTERVAL '139 days', NOW() + INTERVAL '146 days', false),
  ('Planetary Engineering', 'Study planetary engineering techniques for large-scale environmental restoration.', 'other', 0.0, 200, NOW() + INTERVAL '140 days', NOW() + INTERVAL '147 days', false),
  
  ('Wormhole Transit', 'Learn about theoretical wormhole transportation research.', 'transport', 0.0, 80, NOW() + INTERVAL '141 days', NOW() + INTERVAL '148 days', false),
  ('Quantum Food Synthesis', 'Research quantum-level food synthesis for perfect nutrition.', 'food', 0.0, 110, NOW() + INTERVAL '142 days', NOW() + INTERVAL '149 days', false),
  ('Universal Recycler', 'Support development of universal recycling machines that can process any material.', 'waste', 0.0, 180, NOW() + INTERVAL '143 days', NOW() + INTERVAL '150 days', false),
  ('Infinite Energy Source', 'Learn about research into infinite, clean energy sources.', 'energy', 0.0, 250, NOW() + INTERVAL '144 days', NOW() + INTERVAL '151 days', false),
  ('Ecosystem Resurrection', 'Support technology for completely restoring extinct ecosystems.', 'other', 0.0, 300, NOW() + INTERVAL '145 days', NOW() + INTERVAL '152 days', false),
  
  ('Time Travel Conservation', 'Study theoretical time travel applications for environmental conservation.', 'transport', 0.0, 500, NOW() + INTERVAL '146 days', NOW() + INTERVAL '153 days', false),
  ('Dimensional Farming', 'Research dimensional farming techniques for infinite food production.', 'food', 0.0, 400, NOW() + INTERVAL '147 days', NOW() + INTERVAL '154 days', false),
  ('Reality Recycling', 'Learn about theoretical reality recycling for ultimate waste elimination.', 'waste', 0.0, 600, NOW() + INTERVAL '148 days', NOW() + INTERVAL '155 days', false),
  ('Multiverse Energy', 'Support research into multiverse energy harvesting techniques.', 'energy', 0.0, 750, NOW() + INTERVAL '149 days', NOW() + INTERVAL '156 days', false),
  ('Universe Gardening', 'Study universe-scale gardening techniques for cosmic environmental management.', 'other', 0.0, 1000, NOW() + INTERVAL '150 days', NOW() + INTERVAL '157 days', false);