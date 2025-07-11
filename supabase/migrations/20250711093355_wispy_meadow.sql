/*
  # Environmental Challenges - Batch 4 (Challenges 151-200)

  1. New Challenge Data
    - 50 practical environmental challenges
    - Focus on seasonal activities and weather adaptation
    - Home improvement and efficiency upgrades
    - Community engagement and education

  2. Challenge Themes
    - Seasonal sustainability practices
    - Home energy efficiency improvements
    - Water conservation techniques
    - Local ecosystem support
*/

INSERT INTO challenges (title, description, category, co2_impact, points, start_date, end_date, is_active) VALUES
  ('Winter Cycling', 'Continue cycling through winter months with proper gear and route planning.', 'transport', 4.8, 85, NOW() + INTERVAL '151 days', NOW() + INTERVAL '158 days', false),
  ('Root Cellar Storage', 'Create a root cellar or cold storage area for preserving winter vegetables.', 'food', 3.2, 65, NOW() + INTERVAL '152 days', NOW() + INTERVAL '159 days', false),
  ('Wool Insulation', 'Use natural wool insulation to improve home energy efficiency.', 'energy', 6.7, 100, NOW() + INTERVAL '153 days', NOW() + INTERVAL '160 days', false),
  ('Leaf Mold Compost', 'Create leaf mold compost from fallen autumn leaves.', 'waste', 2.1, 45, NOW() + INTERVAL '154 days', NOW() + INTERVAL '161 days', false),
  ('Frost Protection', 'Protect plants from frost using sustainable methods like row covers and mulch.', 'other', 1.4, 35, NOW() + INTERVAL '155 days', NOW() + INTERVAL '162 days', false),
  
  ('Snow Shoe Commute', 'Use snowshoes for winter transportation when conditions allow.', 'transport', 1.2, 30, NOW() + INTERVAL '156 days', NOW() + INTERVAL '163 days', false),
  ('Winter Greenhouse', 'Maintain a winter greenhouse or cold frame for year-round growing.', 'food', 4.5, 80, NOW() + INTERVAL '157 days', NOW() + INTERVAL '164 days', false),
  ('Thermal Mass Heating', 'Use thermal mass like stones or water barrels to store and release heat.', 'energy', 5.3, 90, NOW() + INTERVAL '158 days', NOW() + INTERVAL '165 days', false),
  ('Holiday Gift Upcycling', 'Create holiday gifts from upcycled or repurposed materials.', 'waste', 3.8, 70, NOW() + INTERVAL '159 days', NOW() + INTERVAL '166 days', false),
  ('Winter Bird Feeding', 'Set up and maintain bird feeding stations to support winter wildlife.', 'other', 0.8, 25, NOW() + INTERVAL '160 days', NOW() + INTERVAL '167 days', false),
  
  ('Cross-Country Skiing', 'Use cross-country skiing for winter recreation and transportation.', 'transport', 0.9, 25, NOW() + INTERVAL '161 days', NOW() + INTERVAL '168 days', false),
  ('Sprouting in Winter', 'Grow fresh sprouts and microgreens indoors during winter months.', 'food', 1.7, 40, NOW() + INTERVAL '162 days', NOW() + INTERVAL '169 days', false),
  ('Window Quilts', 'Install window quilts or insulating shades to reduce heat loss.', 'energy', 3.4, 60, NOW() + INTERVAL '163 days', NOW() + INTERVAL '170 days', false),
  ('Pine Needle Mulch', 'Use pine needles as natural mulch for garden beds.', 'waste', 1.1, 30, NOW() + INTERVAL '164 days', NOW() + INTERVAL '171 days', false),
  ('Ice Skating Transport', 'Use ice skating on frozen waterways for winter transportation.', 'transport', 0.3, 20, NOW() + INTERVAL '165 days', NOW() + INTERVAL '172 days', false),
  
  ('Preserved Food Challenge', 'Eat only preserved, canned, or stored foods for one week in winter.', 'food', 2.8, 55, NOW() + INTERVAL '166 days', NOW() + INTERVAL '173 days', false),
  ('Passive Solar Gain', 'Maximize passive solar gain through strategic window management.', 'energy', 4.1, 75, NOW() + INTERVAL '167 days', NOW() + INTERVAL '174 days', false),
  ('Natural Christmas Tree', 'Use a living Christmas tree that can be planted after the holidays.', 'other', 5.2, 85, NOW() + INTERVAL '168 days', NOW() + INTERVAL '175 days', false),
  ('Cardboard Insulation', 'Use cardboard as temporary insulation for drafty areas.', 'waste', 1.9, 35, NOW() + INTERVAL '169 days', NOW() + INTERVAL '176 days', false),
  ('Sledding Commute', 'Use a sled for transporting goods in snowy conditions.', 'transport', 0.6, 25, NOW() + INTERVAL '170 days', NOW() + INTERVAL '177 days', false),
  
  ('Winter Foraging', 'Learn to forage for winter edibles like rose hips and pine needles.', 'food', 0.5, 30, NOW() + INTERVAL '171 days', NOW() + INTERVAL '178 days', false),
  ('Heat Recovery Ventilation', 'Install or optimize heat recovery ventilation systems.', 'energy', 7.8, 115, NOW() + INTERVAL '172 days', NOW() + INTERVAL '179 days', false),
  ('Snow Insulation', 'Use snow as natural insulation around your home\'s foundation.', 'other', 2.3, 45, NOW() + INTERVAL '173 days', NOW() + INTERVAL '180 days', false),
  ('Paper Log Making', 'Make fire logs from waste paper and cardboard.', 'waste', 2.7, 50, NOW() + INTERVAL '174 days', NOW() + INTERVAL '181 days', false),
  ('Dogsled Experience', 'Try dogsledding as an eco-friendly winter transportation method.', 'transport', 0.0, 40, NOW() + INTERVAL '175 days', NOW() + INTERVAL '182 days', false),
  
  ('Greenhouse Gas Tracking', 'Track and reduce your household greenhouse gas emissions for one month.', 'other', 8.9, 130, NOW() + INTERVAL '176 days', NOW() + INTERVAL '183 days', false),
  ('Spring Cleaning Prep', 'Prepare for spring by organizing and decluttering sustainably.', 'waste', 3.1, 60, NOW() + INTERVAL '177 days', NOW() + INTERVAL '184 days', false),
  ('Maple Syrup Tapping', 'Tap maple trees to make your own syrup (where climate appropriate).', 'food', 1.3, 45, NOW() + INTERVAL '178 days', NOW() + INTERVAL '185 days', false),
  ('Geothermal Planning', 'Research and plan for geothermal heating and cooling systems.', 'energy', 0.0, 50, NOW() + INTERVAL '179 days', NOW() + INTERVAL '186 days', false),
  ('Snowmelt Collection', 'Collect and use snowmelt for spring garden watering.', 'other', 1.8, 40, NOW() + INTERVAL '180 days', NOW() + INTERVAL '187 days', false),
  
  ('Spring Bike Tune-up', 'Tune up your bicycle for the spring cycling season.', 'transport', 0.2, 25, NOW() + INTERVAL '181 days', NOW() + INTERVAL '188 days', false),
  ('Seed Starting', 'Start seeds indoors for spring planting using sustainable methods.', 'food', 2.4, 50, NOW() + INTERVAL '182 days', NOW() + INTERVAL '189 days', false),
  ('Storm Window Removal', 'Remove storm windows and prepare for natural ventilation season.', 'energy', 1.7, 35, NOW() + INTERVAL '183 days', NOW() + INTERVAL '190 days', false),
  ('Pruning Workshop', 'Learn proper pruning techniques for fruit trees and shrubs.', 'other', 1.9, 40, NOW() + INTERVAL '184 days', NOW() + INTERVAL '191 days', false),
  ('Textile Repair', 'Repair winter clothing and textiles instead of replacing them.', 'waste', 4.2, 75, NOW() + INTERVAL '185 days', NOW() + INTERVAL '192 days', false),
  
  ('Rain Garden Prep', 'Prepare or expand rain gardens for spring runoff management.', 'other', 3.6, 70, NOW() + INTERVAL '186 days', NOW() + INTERVAL '193 days', false),
  ('Walking School Bus', 'Organize a walking school bus for children in your neighborhood.', 'transport', 2.8, 60, NOW() + INTERVAL '187 days', NOW() + INTERVAL '194 days', false),
  ('Wild Edible Walk', 'Take a guided walk to learn about wild edible plants in spring.', 'food', 0.7, 30, NOW() + INTERVAL '188 days', NOW() + INTERVAL '195 days', false),
  ('Natural Dye Workshop', 'Learn to make natural dyes from plants for fabric coloring.', 'waste', 1.5, 45, NOW() + INTERVAL '189 days', NOW() + INTERVAL '196 days', false),
  ('Solar Oven Building', 'Build and test a solar oven for outdoor cooking.', 'energy', 2.1, 55, NOW() + INTERVAL '190 days', NOW() + INTERVAL '197 days', false),
  
  ('Pollinator Survey', 'Conduct a pollinator survey in your local area to support conservation.', 'other', 0.4, 35, NOW() + INTERVAL '191 days', NOW() + INTERVAL '198 days', false),
  ('Cargo Trailer Biking', 'Use a cargo trailer with your bike for larger transportation needs.', 'transport', 3.7, 65, NOW() + INTERVAL '192 days', NOW() + INTERVAL '199 days', false),
  ('Edible Landscaping', 'Replace ornamental plants with edible alternatives in your landscape.', 'food', 5.8, 95, NOW() + INTERVAL '193 days', NOW() + INTERVAL '200 days', false),
  ('Greywater Laundry', 'Set up a greywater system for reusing laundry water in gardens.', 'other', 4.3, 80, NOW() + INTERVAL '194 days', NOW() + INTERVAL '201 days', false),
  ('Mending Circle', 'Organize or join a mending circle to repair clothes and textiles socially.', 'waste', 2.9, 55, NOW() + INTERVAL '195 days', NOW() + INTERVAL '202 days', false),
  
  ('Renewable Energy Fair', 'Attend or organize a renewable energy fair in your community.', 'energy', 0.0, 40, NOW() + INTERVAL '196 days', NOW() + INTERVAL '203 days', false),
  ('Native Plant Sale', 'Organize or support a native plant sale in your community.', 'other', 6.4, 100, NOW() + INTERVAL '197 days', NOW() + INTERVAL '204 days', false),
  ('Bike Maintenance Class', 'Teach or attend a bicycle maintenance class.', 'transport', 0.5, 35, NOW() + INTERVAL '198 days', NOW() + INTERVAL '205 days', false),
  ('Fermentation Festival', 'Organize or attend a fermentation festival to learn food preservation.', 'food', 1.8, 45, NOW() + INTERVAL '199 days', NOW() + INTERVAL '206 days', false),
  ('Earth Day Celebration', 'Organize or participate in Earth Day activities in your community.', 'other', 2.7, 60, NOW() + INTERVAL '200 days', NOW() + INTERVAL '207 days', false);