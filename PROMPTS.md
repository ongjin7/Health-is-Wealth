**ROLE:** You are a senior front-end developer building a React web app.

**GOAL:** Build the front end of “Health is Wealth”, a web product for digitally savvy consumers in Singapore who wish to track their overall lifestyle and deep dive into their exercise activity and their consumption to achieve their goals in an easy, fun and gamified way (e.g. to lose 5kg within 6 months or to improve heart health). Their job on this product is to key in their activity based on their own health tracker or consumptions in the day. Screens:

**SCREEN 1:** This is the main user page they see when they log into their account. Shows them an overall dashboard at the very top that tracks their activity, allowing them to filter between day, week and month and year. The dashboard should show them a summary of their calories burnt, calories intake based on the food they eat, and if they have hit their targets for the day/ week/ month/ year. This will be compared against their personal goals they had set out to achieve when they set up their account (e.g. to lose 5kg within 6 months, or to improve heart health) There should be a user friendly input widget at the bottom of the screen that allows them to key in their activities conducted(e.g. exercise, time, calories burnt, food consumed etc so that the system can track their calories in their account.]

**SCREEN 2,** Activity Page will show more detailed information about the exercise on a daily, weekly, monthly, yearly, (e.g. Swims, tennis, walk, basketball, runs etc) that the consumer has keyed into the account, with the date, time, duration, active calories burnt, exercise average heart rate, zone recorded. Based on activity level, the page will also provide recommendations (e.g. notice that you are overdoing cardio, or too many days of consecutive lower body exercise. Remember to take breaks or to have a low impact exercise like a swim etc). At the bottom of the screen, there will be recommendations of nearby locations for physical activities, based on the location of the consumer (e.g. Sengkang swimming complex, anytime fitness, BFT)

**SCREEN 3,** Consumption tracking page, will show more detailed information about the consumer’s daily, weekly, monthly, yearly consumption, filtered into breakfast, lunch, dinner, supper or tea breaks etc. The customer will be able to track the type of food they eat (e.g. kaya butter toast, ice coffee, prawn noodle, chicken rice) and the corresponding calories estimate of the consumed food. The screen will provide a short recommendation summary to provide insights into their consumption habits (e.g. we notice that you are taking 5 cups of sweet drinks a day, aiming to remove 1 a day or switching to healthier choice will help u to achieve your goals faster). At the bottom of the screen, there will be recommendations of nearby healthier choice food options based on the location of the consumer (e.g. Subway, Grains and Co, Salad Stop).

**OUTPUT:** A health tracking app. Keep every invented value in ONE data file of its own, with at least 12 rows, so the screen looks real. One component per screen or section. Move between screens without reloading the page. Readable on a phone at arm's length. When you are done, list the files you created and what each one holds.

**GUARDRAILS:** Screens and invented data only. Do NOT call the Gemini API or any other model. Do NOT call any outside service or fetch from any URL. No database, no login, no user accounts, no analytics. No features I did not list. No real company's name, logo, or trademark. Invented names and numbers only, nothing confidential.

**CONTEXT:** Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU. Built in Google AI Studio, shared as a link, and opened on a phone by classmates in Week 3. I am not a programmer: when you make a choice I did not specify, say so in one line rather than burying it.

**Additional changes below:** 

Add gamification elements to the "Health is Wealth" app. Include a point system for logging activities and meals, badges for achieving milestones (e.g., 'Marathon Finisher', 'Healthy Eater','Grand Slam Champion'), and a simple leaderboard if multiple users and friends were hypothetically present and connected. Ensure these elements tie into the user's overall goals. Change nothing else.

Change the logo to make it cuter and more fun looking, something that younger people will enjoy. Change nothing else.

Under "Key in today's health log", there are two ++ signs, please streamline the UI to only show 1 if possible. Change nothing else.

Please ensure that the filtering between day, week, month and year works. Change nothing else.

Instead of putting month 1, month 2, current month, can you change it to July, August, September (current) so it looks prettier. Change nothing else.

Your key in exercise and key in food button does not work, fix it. Change nothing else.

Please move the gamified section to the bottom of the dashboard. it currently looks very crowded out because of it. Change nothing else.

Can you remove this at the top of each screen: Goal Lose 5kg within 6 Months & Boost Heart Health. It takes up too much screen space. Change nothing else.

Can you remove the word "filter view", the consumer does not need to see it. Change nothing else.

when i use the app version, the dashboard summary shows burnt, intake and active & net as above each other, instead of side by side in your current view. Can you configure it such that it is big enough, but appears side by side for iphone 15 pro max? Change nothing else.

Can you show friend leaderboard as the default view of the gamified rewards section instead? Remove the wording of hypothetical peers sharing health goals in singapore sentence. Change nothing else.

Move the food and activity log to come first, before the recommendations on screen 2 and 3. Change nothing else.

Instead of dashboard summary, change it to "Summary". Change nothing else.

For Exercise & Activity Deep Dive, make sure the "active burnt", "active time" and "avg workout HR" can appear side by side in iphone 15 pro max screen size too. Change nothing else.

the 5d streak on the top looks abit ugly, can make it look cooler? Change nothing else.

For the activity deepdive and consumption deep dive widget in the overview page. Can we make this into two smaller and cool icons to click into. remove all the wordy stuff because the overview screen is already very crowded out. Move it right after the summary dashboard widget before the goal. Change nothing else.

For the goal dashboard, lose 5kg in 6 months chart, it doesnt currently reflect correctly as 74.5 to 73.2 and 72.1 to 69.5 should reflect a decrease in height. Help me fix it. Change nothing else.

For the goal dashboard, make sure july, august, september and target are all same level. Change nothing else.
