/*
  # Environmental Challenges - Batch 7 (Challenges 301-350)

  1. New Challenge Data
    - 50 advanced environmental challenges
    - Focus on community building and social impact
    - Advanced technology integration
    - Long-term sustainability projects

  2. Challenge Themes
    - Community environmental leadership
    - Advanced renewable energy systems
    - Sustainable business practices
    - Environmental education and advocacy
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Environmental Club', 'Start or join an environmental club in your community or workplace.', 'other', 5.2, 100, NOW() + INTERVAL '301 days', NOW() + INTERVAL '308 days', false),
  ('Solar Panel Installation', 'Install solar panels on your home or support community solar projects.', 'energy', 15.8, 200, NOW() + INTERVAL '302 days', NOW() + INTERVAL '309 days', false),
  ('Green Business Audit', 'Conduct an environmental audit of your workplace or local business.', 'other', 8.7, 130, NOW() + INTERVAL '303 days', NOW() + INTERVAL '310 days', false),
  ('Waste Stream Analysis', 'Analyze and optimize waste streams in your community or organization.', 'waste', 6.4, 110, NOW() + INTERVAL '304 days', NOW() + INTERVAL '311 days', false),
  ('Electric Vehicle Purchase', 'Purchase or lease an electric vehicle for sustainable transportation.', 'transport', 25.3, 300, NOW() + INTERVAL '305 days', NOW() + INTERVAL '312 days', false),
  
  ('Environmental Education', 'Teach environmental education classes or workshops in your community.', 'other', 3.1, 75, NOW() + INTERVAL '306 days', NOW() + INTERVAL '313 days', false),
  ('Wind Turbine Project', 'Support or install small wind turbines for renewable energy.', 'energy', 12.4, 180, NOW() + INTERVAL '307 days', NOW() + INTERVAL '314 days', false),
  ('Sustainable Catering', 'Organize events using only sustainable, local catering options.', 'food', 4.8, 85, NOW() + INTERVAL '308 days', NOW() + INTERVAL '315 days', false),
  ('Circular Economy Business', 'Start or support a business based on circular economy principles.', 'waste', 9.6, 150, NOW() + INTERVAL '309 days', NOW() + INTERVAL '316 days', false),
  ('Public Transit Advocacy', 'Advocate for improved public transportation in your area.', 'transport', 7.2, 120, NOW() + INTERVAL '310 days', NOW() + INTERVAL '317 days', false),
  
  ('Climate Action Plan', 'Develop a climate action plan for your community or organization.', 'other', 12.5, 200, NOW() + INTERVAL '311 days', NOW() + INTERVAL '318 days', false),
  ('Geothermal Installation', 'Install geothermal heating and cooling systems.', 'energy', 18.7, 250, NOW() + INTERVAL '312 days', NOW() + INTERVAL '319 days', false),
  ('Farm-to-Table Restaurant', 'Start or support farm-to-table restaurants in your area.', 'food', 6.3, 110, NOW() + INTERVAL '313 days', NOW() + INTERVAL '320 days', false),
  ('Zero Waste Certification', 'Achieve zero waste certification for your home or business.', 'waste', 11.2, 170, NOW() + INTERVAL '314 days', NOW() + INTERVAL '321 days', false),
  ('Bike Share Program', 'Start or expand bike share programs in your community.', 'transport', 8.9, 140, NOW() + INTERVAL '315 days', NOW() + INTERVAL '322 days', false),
  
  ('Environmental Journalism', 'Write articles or create content about environmental issues.', 'other', 2.4, 60, NOW() + INTERVAL '316 days', NOW() + INTERVAL '323 days', false),
  ('Micro-Hydro System', 'Install micro-hydro systems for renewable energy generation.', 'energy', 14.1, 190, NOW() + INTERVAL '317 days', NOW() + INTERVAL '324 days', false),
  ('Permaculture Farm', 'Start or support permaculture farming operations.', 'food', 16.8, 220, NOW() + INTERVAL '318 days', NOW() + INTERVAL '325 days', false),
  ('Industrial Symbiosis', 'Develop industrial symbiosis projects for waste reduction.', 'waste', 13.7, 200, NOW() + INTERVAL '319 days', NOW() + INTERVAL '326 days', false),
  ('Car-Free District', 'Advocate for car-free districts in urban areas.', 'transport', 19.4, 280, NOW() + INTERVAL '320 days', NOW() + INTERVAL '327 days', false),
  
  ('Green Building Design', 'Design or support green building projects in your community.', 'other', 22.6, 300, NOW() + INTERVAL '321 days', NOW() + INTERVAL '328 days', false),
  ('Battery Storage System', 'Install home battery storage systems for renewable energy.', 'energy', 9.8, 150, NOW() + INTERVAL '322 days', NOW() + INTERVAL '329 days', false),
  ('Aquaculture Project', 'Start sustainable aquaculture projects for local food production.', 'food', 8.4, 130, NOW() + INTERVAL '323 days', NOW() + INTERVAL '330 days', false),
  ('Waste-to-Energy Plant', 'Support waste-to-energy projects in your region.', 'waste', 15.9, 230, NOW() + INTERVAL '324 days', NOW() + INTERVAL '331 days', false),
  ('Electric Bus Fleet', 'Advocate for electric bus fleets in public transportation.', 'transport', 21.7, 290, NOW() + INTERVAL '325 days', NOW() + INTERVAL '332 days', false),
  
  ('Environmental Law', 'Study environmental law and advocate for policy changes.', 'other', 4.6, 90, NOW() + INTERVAL '326 days', NOW() + INTERVAL '333 days', false),
  ('Smart Grid Development', 'Support smart grid development in your community.', 'energy', 11.3, 170, NOW() + INTERVAL '327 days', NOW() + INTERVAL '334 days', false),
  ('Vertical Farm Investment', 'Invest in or support vertical farming operations.', 'food', 12.1, 180, NOW() + INTERVAL '328 days', NOW() + INTERVAL '335 days', false),
  ('Plastic-Free Municipality', 'Advocate for plastic-free policies in your municipality.', 'waste', 7.8, 125, NOW() + INTERVAL '329 days', NOW() + INTERVAL '336 days', false),
  ('Autonomous Vehicle Fleet', 'Support autonomous vehicle fleet development for shared mobility.', 'transport', 16.2, 240, NOW() + INTERVAL '330 days', NOW() + INTERVAL '337 days', false),
  
  ('Carbon Offset Program', 'Develop carbon offset programs for your community.', 'other', 18.9, 260, NOW() + INTERVAL '331 days', NOW() + INTERVAL '338 days', false),
  ('Hydrogen Fuel Cell', 'Support hydrogen fuel cell technology development.', 'energy', 13.6, 200, NOW() + INTERVAL '332 days', NOW() + INTERVAL '339 days', false),
  ('Cellular Agriculture Lab', 'Support cellular agriculture research and development.', 'food', 20.4, 280, NOW() + INTERVAL '333 days', NOW() + INTERVAL '340 days', false),
  ('Molecular Recycling Plant', 'Support molecular recycling facility development.', 'waste', 17.3, 250, NOW() + INTERVAL '334 days', NOW() + INTERVAL '341 days', false),
  ('Hyperloop Development', 'Support hyperloop transportation technology development.', 'transport', 0.0, 100, NOW() + INTERVAL '335 days', NOW() + INTERVAL '342 days', false),
  
  ('Climate Research', 'Participate in or support climate research initiatives.', 'other', 6.7, 120, NOW() + INTERVAL '336 days', NOW() + INTERVAL '343 days', false),
  ('Fusion Energy Research', 'Support fusion energy research and development.', 'energy', 0.0, 150, NOW() + INTERVAL '337 days', NOW() + INTERVAL '344 days', false),
  ('Space Agriculture', 'Support space agriculture research for sustainable food systems.', 'food', 0.0, 200, NOW() + INTERVAL '338 days', NOW() + INTERVAL '345 days', false),
  ('Quantum Recycling', 'Support quantum-level recycling technology research.', 'waste', 0.0, 300, NOW() + INTERVAL '339 days', NOW() + INTERVAL '346 days', false),
  ('Teleportation Research', 'Support quantum teleportation research for transportation.', 'transport', 0.0, 500, NOW() + INTERVAL '340 days', NOW() + INTERVAL '347 days', false),
  
  ('Ecosystem Restoration', 'Lead large-scale ecosystem restoration projects.', 'other', 45.8, 400, NOW() + INTERVAL '341 days', NOW() + INTERVAL '348 days', false),
  ('Renewable Energy Grid', 'Develop 100% renewable energy grids for communities.', 'energy', 38.2, 350, NOW() + INTERVAL '342 days', NOW() + INTERVAL '349 days', false),
  ('Global Food Security', 'Work on global food security and sustainable nutrition projects.', 'food', 32.7, 320, NOW() + INTERVAL '343 days', NOW() + INTERVAL '350 days', false),
  ('Planetary Waste Management', 'Develop planetary-scale waste management systems.', 'waste', 28.9, 300, NOW() + INTERVAL '344 days', NOW() + INTERVAL '351 days', false),
  ('Interplanetary Transport', 'Support sustainable interplanetary transportation development.', 'transport', 0.0, 600, NOW() + INTERVAL '345 days', NOW() + INTERVAL '352 days', false),
  
  ('Biosphere Engineering', 'Participate in biosphere engineering and management projects.', 'other', 52.3, 450, NOW() + INTERVAL '346 days', NOW() + INTERVAL '353 days', false),
  ('Stellar Energy Harvesting', 'Support stellar energy harvesting technology development.', 'energy', 0.0, 800, NOW() + INTERVAL '347 days', NOW() + INTERVAL '354 days', false),
  ('Synthetic Ecosystem', 'Design and create synthetic ecosystems for food production.', 'food', 0.0, 700, NOW() + INTERVAL '348 days', NOW() + INTERVAL '355 days', false),
  ('Universal Recycling', 'Develop universal recycling systems for all matter.', 'waste', 0.0, 900, NOW() + INTERVAL '349 days', NOW() + INTERVAL '356 days', false),
  ('Dimensional Transport', 'Support dimensional transportation research and development.', 'transport', 0.0, 1000, NOW() + INTERVAL '350 days', NOW() + INTERVAL '357 days', false);