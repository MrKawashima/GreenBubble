/*
  # Add 500 Environmental Challenges - Batch 3 (Challenges 101-150)

  1. New Challenges
    - 50 diverse environmental challenges focusing on innovation and technology
    - Advanced sustainability projects and community leadership
    - Points range from 20-150 based on complexity and impact
    - CO2 savings range from 1.2kg to 25kg per challenge
    - Emphasis on cutting-edge environmental solutions

  2. Challenge Themes
    - Smart technology integration
    - Advanced renewable energy systems
    - Community education and leadership
    - Innovative waste reduction techniques
    - Future-focused environmental solutions

  3. Advanced Projects
    - Technology-assisted sustainability
    - Large-scale community impact
    - Research and development activities
    - Educational and advocacy components
    - Long-term environmental planning
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Smart Home Energy Hub', 'Install a comprehensive smart home energy management system.', 'energy', 18.5, 95, NOW() + INTERVAL '101 days', NOW() + INTERVAL '108 days', false),
  ('Electric Cargo Trike', 'Use an electric cargo tricycle for family transportation.', 'transport', 6.8, 55, NOW() + INTERVAL '102 days', NOW() + INTERVAL '109 days', false),
  ('Vertical Farming Tower', 'Build a vertical farming system for maximum food production.', 'food', 9.2, 70, NOW() + INTERVAL '103 days', NOW() + INTERVAL '110 days', false),
  ('Biogas Digester Setup', 'Install a small biogas digester for cooking fuel.', 'energy', 12.7, 80, NOW() + INTERVAL '104 days', NOW() + INTERVAL '111 days', false),
  ('Plastic-to-Fuel Conversion', 'Research and implement plastic-to-fuel technology.', 'waste', 22.4, 120, NOW() + INTERVAL '105 days', NOW() + INTERVAL '112 days', false),
  ('Urban Forest Initiative', 'Lead an urban forest planting initiative in your city.', 'other', 45.8, 150, NOW() + INTERVAL '106 days', NOW() + INTERVAL '113 days', false),
  ('Hydrogen Fuel Cell Demo', 'Demonstrate hydrogen fuel cell technology for transportation.', 'transport', 15.3, 85, NOW() + INTERVAL '107 days', NOW() + INTERVAL '114 days', false),
  ('Hydroponic Greenhouse', 'Build a hydroponic greenhouse for year-round growing.', 'food', 11.6, 75, NOW() + INTERVAL '108 days', NOW() + INTERVAL '115 days', false),
  ('Piezoelectric Walkway', 'Install piezoelectric tiles to generate electricity from footsteps.', 'energy', 8.9, 65, NOW() + INTERVAL '109 days', NOW() + INTERVAL '116 days', false),
  ('Circular Economy Workshop', 'Organize a workshop on circular economy principles.', 'waste', 7.3, 60, NOW() + INTERVAL '110 days', NOW() + INTERVAL '117 days', false),
  ('Drone Reforestation', 'Use drones for seed dispersal in reforestation efforts.', 'other', 28.7, 110, NOW() + INTERVAL '111 days', NOW() + INTERVAL '118 days', false),
  ('Solar-Powered EV Charging', 'Install solar panels specifically for electric vehicle charging.', 'transport', 19.8, 100, NOW() + INTERVAL '112 days', NOW() + INTERVAL '119 days', false),
  ('Algae Biofuel Production', 'Experiment with algae cultivation for biofuel production.', 'food', 13.4, 85, NOW() + INTERVAL '113 days', NOW() + INTERVAL '120 days', false),
  ('Thermoelectric Generator', 'Build a thermoelectric generator from waste heat.', 'energy', 6.7, 55, NOW() + INTERVAL '114 days', NOW() + INTERVAL '121 days', false),
  ('3D Printed Recycling', 'Use 3D printing to create useful items from recycled plastic.', 'waste', 5.8, 50, NOW() + INTERVAL '115 days', NOW() + INTERVAL '122 days', false),
  ('Mycoremediation Project', 'Use mushrooms to clean contaminated soil or water.', 'other', 16.2, 90, NOW() + INTERVAL '116 days', NOW() + INTERVAL '123 days', false),
  ('Maglev Transport Model', 'Build a model magnetic levitation transportation system.', 'transport', 4.5, 45, NOW() + INTERVAL '117 days', NOW() + INTERVAL '124 days', false),
  ('Cellular Agriculture', 'Research cellular agriculture and lab-grown food.', 'food', 8.1, 65, NOW() + INTERVAL '118 days', NOW() + INTERVAL '125 days', false),
  ('Tidal Energy Harvester', 'Design a small tidal energy harvesting device.', 'energy', 14.9, 80, NOW() + INTERVAL '119 days', NOW() + INTERVAL '126 days', false),
  ('Molecular Recycling', 'Research molecular recycling technologies for plastics.', 'waste', 17.6, 95, NOW() + INTERVAL '120 days', NOW() + INTERVAL '127 days', false),
  ('Biophilic Design Project', 'Implement biophilic design principles in a building.', 'other', 12.3, 75, NOW() + INTERVAL '121 days', NOW() + INTERVAL '128 days', false),
  ('Hyperloop Concept Model', 'Create a working model of hyperloop transportation.', 'transport', 7.2, 60, NOW() + INTERVAL '122 days', NOW() + INTERVAL '129 days', false),
  ('Precision Agriculture', 'Implement precision agriculture techniques using sensors.', 'food', 10.8, 70, NOW() + INTERVAL '123 days', NOW() + INTERVAL '130 days', false),
  ('Atmospheric Water Generator', 'Build a device to extract water from atmospheric humidity.', 'energy', 9.5, 65, NOW() + INTERVAL '124 days', NOW() + INTERVAL '131 days', false),
  ('Enzyme Plastic Degradation', 'Experiment with enzymes that break down plastic waste.', 'waste', 13.7, 85, NOW() + INTERVAL '125 days', NOW() + INTERVAL '132 days', false),
  ('Living Building Challenge', 'Design a building that meets Living Building Challenge standards.', 'other', 35.4, 140, NOW() + INTERVAL '126 days', NOW() + INTERVAL '133 days', false),
  ('Pneumatic Tube Transport', 'Design a pneumatic tube system for local deliveries.', 'transport', 5.6, 50, NOW() + INTERVAL '127 days', NOW() + INTERVAL '134 days', false),
  ('Insect Protein Farming', 'Start a small insect protein farming operation.', 'food', 7.9, 60, NOW() + INTERVAL '128 days', NOW() + INTERVAL '135 days', false),
  ('Quantum Dot Solar Cells', 'Research quantum dot technology for solar energy.', 'energy', 11.2, 75, NOW() + INTERVAL '129 days', NOW() + INTERVAL '136 days', false),
  ('Plasma Waste Treatment', 'Research plasma gasification for waste treatment.', 'waste', 20.3, 105, NOW() + INTERVAL '130 days', NOW() + INTERVAL '137 days', false),
  ('Synthetic Biology Garden', 'Create a garden using synthetic biology principles.', 'other', 8.7, 65, NOW() + INTERVAL '131 days', NOW() + INTERVAL '138 days', false),
  ('Vacuum Tube Transport', 'Model a vacuum tube transportation system.', 'transport', 6.4, 55, NOW() + INTERVAL '132 days', NOW() + INTERVAL '139 days', false),
  ('Cultured Meat Lab', 'Visit or intern at a cultured meat research facility.', 'food', 15.6, 90, NOW() + INTERVAL '133 days', NOW() + INTERVAL '140 days', false),
  ('Fusion Energy Research', 'Participate in fusion energy research or education.', 'energy', 25.8, 130, NOW() + INTERVAL '134 days', NOW() + INTERVAL '141 days', false),
  ('Atomic Recycling', 'Research atomic-level recycling and material recovery.', 'waste', 18.9, 100, NOW() + INTERVAL '135 days', NOW() + INTERVAL '142 days', false),
  ('Terraforming Simulation', 'Create a simulation of terraforming techniques.', 'other', 3.2, 40, NOW() + INTERVAL '136 days', NOW() + INTERVAL '143 days', false),
  ('Teleportation Energy Study', 'Calculate energy requirements for theoretical teleportation.', 'transport', 2.1, 35, NOW() + INTERVAL '137 days', NOW() + INTERVAL '144 days', false),
  ('Molecular Gastronomy', 'Use molecular gastronomy to create sustainable food experiences.', 'food', 4.8, 45, NOW() + INTERVAL '138 days', NOW() + INTERVAL '145 days', false),
  ('Zero-Point Energy', 'Research theoretical zero-point energy applications.', 'energy', 1.5, 30, NOW() + INTERVAL '139 days', NOW() + INTERVAL '146 days', false),
  ('Nanotechnology Cleanup', 'Research nanotechnology applications for environmental cleanup.', 'waste', 14.2, 80, NOW() + INTERVAL '140 days', NOW() + INTERVAL '147 days', false),
  ('Artificial Ecosystem', 'Design and build a self-sustaining artificial ecosystem.', 'other', 21.6, 115, NOW() + INTERVAL '141 days', NOW() + INTERVAL '148 days', false),
  ('Warp Drive Efficiency', 'Calculate theoretical efficiency of warp drive transportation.', 'transport', 1.8, 25, NOW() + INTERVAL '142 days', NOW() + INTERVAL '149 days', false),
  ('Synthetic Food Creation', 'Research synthetic food creation from basic elements.', 'food', 6.3, 55, NOW() + INTERVAL '143 days', NOW() + INTERVAL '150 days', false),
  ('Antimatter Energy', 'Study theoretical antimatter energy applications.', 'energy', 0.9, 20, NOW() + INTERVAL '144 days', NOW() + INTERVAL '151 days', false),
  ('Matter Compiler', 'Research theoretical matter compilation for waste elimination.', 'waste', 12.7, 75, NOW() + INTERVAL '145 days', NOW() + INTERVAL '152 days', false),
  ('Dyson Sphere Model', 'Create a scale model of a Dyson sphere energy collector.', 'other', 5.4, 50, NOW() + INTERVAL '146 days', NOW() + INTERVAL '153 days', false),
  ('Quantum Transportation', 'Research quantum entanglement for transportation applications.', 'transport', 3.7, 40, NOW() + INTERVAL '147 days', NOW() + INTERVAL '154 days', false),
  ('Replicator Technology', 'Research theoretical food replication technology.', 'food', 8.5, 60, NOW() + INTERVAL '148 days', NOW() + INTERVAL '155 days', false),
  ('Perpetual Motion Study', 'Analyze theoretical perpetual motion machines for energy.', 'energy', 2.6, 35, NOW() + INTERVAL '149 days', NOW() + INTERVAL '156 days', false),
  ('Dimensional Waste Portal', 'Design theoretical dimensional portals for waste disposal.', 'waste', 9.8, 65, NOW() + INTERVAL '150 days', NOW() + INTERVAL '157 days', false);