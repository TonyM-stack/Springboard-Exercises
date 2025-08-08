-- Comments in SQL Start with dash-dash --
-- 1. Find the app with an ID of 1880
SELECT app_name FROM analytics WHERE id = 1880; 
--         app_name         
-- -------------------------
--  Web Browser for Android
-- (1 row)

-- 2. Find the ID and app name for all apps that were last updated on August 01, 2018.
SELECT id, app_name FROM analytics WHERE last_updated = '2018-08-01';
--   id  |                                     app_name                                      
-- ------+-----------------------------------------------------------------------------------
--    10 | Clash Royale
--    11 | Candy Crush Saga
--    12 | UC Browser - Fast Download Private & Secure
--    74 | Score! Hero
--   101 | Tiny Flashlight + LED
--   102 | Crossy Road
--   103 | SimCity BuildIt
--   111 | FIFA Soccer
--   112 | Angry Birds 2
--   125 | Need for Speed™ No Limits
--   126 | YouCam Makeup - Magic Selfie Makeovers
--   152 | Fallout Shelter
--   159 | DU Recorder – Screen Recorder, Video Editor, Live
--   160 | Bike Race Free - Top Motorcycle Racing Games
--   161 | KakaoTalk: Free Calls & Text
--   162 | Dolphin Browser - Fast, Private & Adblock🐬
--   163 | Opera Browser: Fast and Secure
--   164 | MARVEL Contest of Champions
--   184 | Video Editor Music,Cut,No Crop
--   226 | Frozen Free Fall
--   260 | Chess Free
--   276 | ► MultiCraft ― Free Miner! 👍
--   277 | Vlogger Go Viral - Tuber Game
--   300 | Bad Piggies
--   301 | Skater Boy
--   356 | S Photo Editor - Collage Maker , Photo Collage
--   357 | Magisto Video Editor & Maker
--   358 | Itau bank
--   359 | DEER HUNTER 2018
--   360 | Mobizen Screen Recorder for SAMSUNG
--   362 | Bike Racing 3D

-- 3. Count the number of apps in each category, e.g. “Family | 1972”.
SELECT category,COUNT (*) AS app_count FROM analytics GROUP BY category ORDER BY app_count DESC;
--       category       | app_count 
-- ---------------------+-----------
--  FAMILY              |      1789
--  GAME                |      1110
--  TOOLS               |       753
--  PRODUCTIVITY        |       360
--  MEDICAL             |       350
--  COMMUNICATION       |       342
--  SPORTS              |       338
--  FINANCE             |       331
--  PERSONALIZATION     |       329
--  LIFESTYLE           |       319
--  PHOTOGRAPHY         |       313
--  BUSINESS            |       313
--  HEALTH_AND_FITNESS  |       298
--  SOCIAL              |       269
--  NEWS_AND_MAGAZINES  |       249
--  SHOPPING            |       241
--  TRAVEL_AND_LOCAL    |       234
--  DATING              |       204
--  BOOKS_AND_REFERENCE |       191
--  VIDEO_PLAYERS       |       165
--  EDUCATION           |       156
--  ENTERTAINMENT       |       149
--  MAPS_AND_NAVIGATION |       129
--  FOOD_AND_DRINK      |       110
--  HOUSE_AND_HOME      |        82
--  LIBRARIES_AND_DEMO  |        80
--  WEATHER             |        79
--  AUTO_AND_VEHICLES   |        75
--  ART_AND_DESIGN      |        63
--  PARENTING           |        59
--  COMICS              |        59
--  EVENTS              |        52
--  BEAUTY              |        46
-- (33 rows)

-- 4. Find the top 5 most-reviewed apps and the number of reviews for each.
 SELECT app_name, reviews FROM analytics ORDER BY reviews DESC LIMIT 5;
--                  app_name                 | reviews  
-- ------------------------------------------+----------
--  Facebook                                 | 78158306
--  WhatsApp Messenger                       | 78128208
--  Instagram                                | 69119316
--  Messenger – Text and Video Chat for Free | 69119316
--  Clash of Clans                           | 69109672
-- (5 rows)

-- 5. Find the app that has the most reviews with a rating greater than equal to 4.8.
SELECT app_name, reviews FROM analytics WHERE rating >=4.8 ORDER BY reviews DESC LIMIT 1;
--   app_name  | reviews 
-- ------------+---------
--  Chess Free | 4559407
-- (1 row)

-- 6. Find the average rating for each category ordered by the highest rated to lowest rated.
SELECT category, AVG(rating) AS avg_rating FROM analytics GROUP BY category ORDER BY avg_rating DESC;
--       category       |     avg_rating     
-- ---------------------+--------------------
--  EVENTS              |  4.395238104320708
--  EDUCATION           |   4.38903223006956
--  ART_AND_DESIGN      |  4.347540949211746
--  BOOKS_AND_REFERENCE | 4.3423728633061645
--  PERSONALIZATION     |    4.3283387457509
--  BEAUTY              |  4.299999970656175
--  GAME                |  4.287167731498383
--  PARENTING           |  4.285714266251545
--  HEALTH_AND_FITNESS  | 4.2743944663902464
--  SHOPPING            |  4.253648051376507
--  SOCIAL              |  4.245669291244717
--  WEATHER             |   4.24399998664856
--  SPORTS              |  4.233333332576449
--  PRODUCTIVITY        |  4.212173904543338
--  AUTO_AND_VEHICLES   |  4.200000017881393
--  HOUSE_AND_HOME      |  4.197368430463891
--  PHOTOGRAPHY         |  4.196116511489967
--  MEDICAL             | 4.1926829182520144
--  FAMILY              | 4.1904873752761995
--  LIBRARIES_AND_DEMO  | 4.1784615259904125
--  FOOD_AND_DRINK      |  4.155660354866172
--  COMICS              |  4.155172401461108
--  COMMUNICATION       |  4.151234589241169
--  FINANCE             |  4.146835436549368
--  NEWS_AND_MAGAZINES  |  4.130131007281974
--  ENTERTAINMENT       |   4.12617449632427
--  BUSINESS            |  4.116666667004849
--  TRAVEL_AND_LOCAL    |   4.10179372753263
--  LIFESTYLE           |  4.077076400237226
--  VIDEO_PLAYERS       |  4.059748438919115
--  MAPS_AND_NAVIGATION |  4.058196711735647
--  TOOLS               |  4.050627608678331
--  DATING              |  3.993684190825412
-- (33 rows)

-- 7. Find the name, price, and rating of the most expensive app with a rating that’s less than 3.
SELECT app_name, price, rating FROM analytics WHERE rating < 3 ORDER BY price DESC LIMIT 1; 
--       app_name      | price  | rating 
-- --------------------+--------+--------
--  Naruto & Boruto FR | 379.99 |    2.9
-- (1 row)

-- 8. Find all apps with a min install not exceeding 50, that have a rating. Order your results by highest rated first.
SELECT app_name,min_installs,rating FROM analytics WHERE min_installs <= 50 AND rating IS NOT NULL ORDER BY min_installs DESC;
 
--                     app_name                    | min_installs | rating 
-- ------------------------------------------------+--------------+--------
--  FQ - Football Quiz                             |           50 |    4.4
--  DF-View                                        |           50 |    4.2
--  ElejaOnline DF                                 |           50 |      5
--  Dr D K Olukoya                                 |           50 |    3.4
--  EU Whoiswho                                    |           50 |      5
--  E.U. Trademark Search Tool                     |           50 |      5
--  DQ Akses                                       |           50 |      5
--  DT                                             |           50 |      5
--  iCluster - The DX-Cluster database             |           50 |      5
--  Wifi Mingle                                    |           50 |      5
--  Audiowalk EB                                   |           50 |    4.5
--  Lord Fairfax EMS Council                       |           50 |      5
--  EC Designer 2.0                                |           50 |      5
--  EP FCU                                         |           50 |      5
--  Sensenuts eI                                   |           50 |    4.8
--  ER                                             |           50 |    4.6
--  Labs on Demand                                 |           50 |      5
--  Border Ag & Energy                             |           50 |      5
--  Word Search Tab 1 FR                           |           50 |    3.7
--  BL File Explorer                               |           50 |    4.6
--  AQ Dentals                                     |           50 |      5
--  Dr.Dice - Sic bo analyzer                      |           50 |      5
--  BW t&t                                         |           50 |    4.8
--  BT Satmeter                                    |           50 |    4.5
--  BV Bombers                                     |           50 |      5
--  CE Genius Nurses Edition                       |           50 |    4.2
--  All-night drugstore CI & Price                 |           50 |    4.8
--  Pekalongan CJ                                  |           50 |      5
--  CQ SIGNAL PRO 5                                |           50 |      5
--  MY GULFPORT FL                                 |           50 |      5
--  Cy’s Elma Pharmacy                             |           50 |    3.6
--  CI On The Go                                   |           50 |      5
--  BibleRead En Cy Zh Yue                         |           50 |    2.8
--  Reksio cz. 1                                   |           50 |    4.4
--  ReDNAKET DB Normalization Tool                 |           50 |    4.2
--  db Meter - sound level meter with data logging |           10 |      5
--  My CW                                          |           10 |      5
--  DT CLOTHINGS                                   |           10 |    4.8
--  BTK-FH Online Campus                           |           10 |      5

-- 9. Find the names of all apps that are rated less than 3 with at least 10000 reviews.
SELECT app_name,rating,reviews FROM analytics WHERE rating < 3 AND reviews >= 10000;
--                     app_name                     | rating | reviews 
-- -------------------------------------------------+--------+---------
--  The Wall Street Journal: Business & Market News |    2.8 |  107441
--  Vikings: an Archer’s Journey                    |    2.9 |   31596
--  Shoot Em Down Free                              |    2.4 |   11773
-- (3 rows)

-- 10. Find the top 10 most-reviewed apps that cost between 10 cents and a dollar.
SELECT app_name,price,reviews FROM analytics WHERE price BETWEEN .10 AND 1.00 ORDER BY reviews DESC LIMIT 10; 
--                   app_name                   | price | reviews 
-- ---------------------------------------------+-------+---------
--  Free Slideshow Maker & Video Editor         |  0.99 |  408292
--  Couple - Relationship App                   |  0.99 |   85468
--  Anime X Wallpaper                           |  0.99 |   84114
--  Dance On Mobile                             |  0.99 |   61264
--  Marvel Unlimited                            |  0.99 |   58617
--  FastMeet: Chat, Dating, Love                |  0.99 |   58614
--  IHG®: Hotel Deals & Rewards                 |  0.99 |   48754
--  Live Weather & Daily Local Weather Forecast |  0.99 |   38419
--  DreamMapper                                 |  0.99 |   32496
--  Můj T-Mobile Business                       |  0.99 |   32344
-- (10 rows)

-- 11. Find the most out of date app.
SELECT app_name, last_updated FROM analytics ORDER BY last_updated ASC LIMIT 1;
--   app_name  | last_updated 
-- ------------+--------------
--  CP Clicker | 2010-05-21
-- (1 row)

-- 12. Find the most expensive app
SELECT app_name, price FROM analytics ORDER BY price DESC LIMIT 1;
--       app_name      | price 
-- --------------------+-------
--  Cardi B Piano Game |   400
-- (1 row)

-- 13. Count all the reviews in the Google Play Store.
SELECT SUM(reviews) AS total_reviews FROM analytics;
--  total_reviews 
-- ---------------
--     4814575866
-- (1 row)

-- 14. Find all the categories that have more than 300 apps in them.
SELECT category, COUNT(*) AS app_count FROM analytics GROUP BY category HAVING COUNT(*) > 300 ORDER BY app_count DESC;
--     category     | app_count 
-- -----------------+-----------
--  FAMILY          |      1789
--  GAME            |      1110
--  TOOLS           |       753
--  PRODUCTIVITY    |       360
--  MEDICAL         |       350
--  COMMUNICATION   |       342
--  SPORTS          |       338
--  FINANCE         |       331
--  PERSONALIZATION |       329
--  LIFESTYLE       |       319
--  BUSINESS        |       313
--  PHOTOGRAPHY     |       313
-- (12 rows)

-- 15. Find the app that has the highest proportion of min_installs to reviews, among apps that have been installed
--  at least 100,000 times. Display the name of the app along with the number of reviews, the min_installs, and the proportion
SELECT app_name, reviews, min_installs, (min_installs::float / reviews) AS proportion FROM analytics WHERE min_installs >= 100000 ORDER BY proportion DESC LIMIT 1;
--      app_name     | reviews | min_installs |     proportion     
-- ------------------+---------+--------------+--------------------
--  Kim Bu Youtuber? |      66 |     10000000 | 151515.15151515152
























