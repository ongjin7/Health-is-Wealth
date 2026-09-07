# PROMPTS.md - Health is Wealth: Health Tracking App
**Student: Ong Jin** . **Course: MGMT6110** . **Problem Set 1**

**User Sentence:** A digital savvy consumer opens this screen to track their activity and food consumption, and knows it worked when they are able to view a correct summary and log of their wellness activity, factoring in all their new tracking additions.

**Live Link:** https://health-is-wealth-tawny.vercel.app

---

## Prompt 1 - the master prompt
```
ROLE: You are a senior front-end developer building a React web app.

GOAL: Build the front end of “Health is Wealth”, a web product for digitally savvy consumers in Singapore who wish to track their overall lifestyle and deep dive into their exercise activity and their consumption to achieve their goals in an easy, fun and gamified way (e.g. to lose 5kg within 6 months or to improve heart health). Their job on this product is to key in their activity based on their own health tracker or consumptions in the day. Screens:

SCREEN 1: This is the main user page they see when they log into their account. Shows them an overall dashboard at the very top that tracks their activity, allowing them to filter between day, week and month and year. The dashboard should show them a summary of their calories burnt, calories intake based on the food they eat, and if they have hit their targets for the day/ week/ month/ year. This will be compared against their personal goals they had set out to achieve when they set up their account (e.g. to lose 5kg within 6 months, or to improve heart health) There should be a user friendly input widget at the bottom of the screen that allows them to key in their activities conducted(e.g. exercise, time, calories burnt, food consumed etc so that the system can track their calories in their account.]

SCREEN 2: Activity Page will show more detailed information about the exercise on a daily, weekly, monthly, yearly, (e.g. Swims, tennis, walk, basketball, runs etc) that the consumer has keyed into the account, with the date, time, duration, active calories burnt, exercise average heart rate, zone recorded. Based on activity level, the page will also provide recommendations (e.g. notice that you are overdoing cardio, or too many days of consecutive lower body exercise. Remember to take breaks or to have a low impact exercise like a swim etc). At the bottom of the screen, there will be recommendations of nearby locations for physical activities, based on the location of the consumer (e.g. Sengkang swimming complex, anytime fitness, BFT)

SCREEN 3: Consumption tracking page, will show more detailed information about the consumer’s daily, weekly, monthly, yearly consumption, filtered into breakfast, lunch, dinner, supper or tea breaks etc. The customer will be able to track the type of food they eat (e.g. kaya butter toast, ice coffee, prawn noodle, chicken rice) and the corresponding calories estimate of the consumed food. The screen will provide a short recommendation summary to provide insights into their consumption habits (e.g. we notice that you are taking 5 cups of sweet drinks a day, aiming to remove 1 a day or switching to healthier choice will help u to achieve your goals faster). At the bottom of the screen, there will be recommendations of nearby healthier choice food options based on the location of the consumer (e.g. Subway, Grains and Co, Salad Stop).

OUTPUT: A health tracking app. Keep every invented value in ONE data file of its own, with at least 12 rows, so the screen looks real. One component per screen or section. Move between screens without reloading the page. Readable on a phone at arm's length. When you are done, list the files you created and what each one holds.

GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API or any other model. Do NOT call any outside service or fetch from any URL. No database, no login, no user accounts, no analytics. No features I did not list. No real company's name, logo, or trademark. Invented names and numbers only, nothing confidential.

CONTEXT: Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU. Built in Google AI Studio, shared as a link, and opened on a phone by classmates in Week 3. I am not a programmer: when you make a choice I did not specify, say so in one line rather than burying it.
```
**What came back:** A running app, 10 files, preview loaded. The output largely matched my request, but it also added an unrequested sticky action bar containing two extended floating action buttons, pinned to the bottom of the viewport, for logging exercise and food. I decided to keep it. To prevent unrequested additions like this in future, I can set guardrails in the promptto specify that no sticky action bar should be added.

---
## Prompt 2 - fix the empty state
```
When the list has no rows, show "Nothing due today" instead of an empty table. Change nothing else.
```
**What came back:** Two files touched.

**What i changed next and why:** Nothing. Moved on to further enhance my app as there are no noticeable issues related to an empty state.

---
## Prompt 3 - Add gamification to app
```
Add gamification elements to the "Health is Wealth" app. Include a point system for logging activities and meals, badges for achieving milestones (e.g., 'Marathon Finisher', 'Healthy Eater','Grand Slam Champion'), and a simple leaderboard if multiple users and friends were hypothetically present and connected. Ensure these elements tie into the user's overall goals. Change nothing else.
```
**What came back:** 6 files edited with gamification added

**What i changed next and why:** I proceeded to edit the app with further prompts to shift the gamification table around, improve the UI/UX further for readability, compatibility with my mobile interface, fixing any defects along the way. 

---
## Prompt 4 - Logo edit
```
Change the logo to make it cuter and more fun looking, something that younger people will enjoy. Change nothing else.
```
**What came back:** 2 files edited with logo applied

**What i changed next and why:** Nothing. I accepted the AI proposed logo for the app as it looked better than a plain logo. I learnt that AI leaves a watermark on a generated logo to show that it was generated by Google AI studio.

---
## Prompt 5 - Date Filter fix
```
Please ensure that the filtering between day, week, month and year works. Change nothing else.
```

**What came back:** 5 files edited with date filter fixed and working for the app.

**What i changed next and why:** Since the date filter is finally working, I continued to prompt to improve the layout and look and feel of the filter so it gels with the overall app design. 

---
## Prompt 6 - Sticky action bar fix
```
The "key in exercise" and "key in food" button does not work, please fix it. Change nothing else.
```
**What came back:** 5 files edited with the buttons fixed to open up a form for the consumer to fill up their activities.

**What i changed next and why:** I accepted the fix and pushed the change to github.

---
## Prompt 7 - Fixing Header of all screens
```
Can you remove the header section at the top of each screen where it shows "Goal: Lose 5kg within 6 Months & Boost Heart Health". It takes up too much screen space. Change nothing else.
```
**What came back:** 1 file edited with the header removed.

**What i changed next and why:** I accepted the fix as the app design now looks cleaner without losing any user functionality, and moved on to the next prompt.

---
## Prompt 8 - Changing the appearance layout of the main dashboard
```
When i use the app version, the dashboard summary shows "burnt calories", "intake" and "active & net" vertically above each other instead of a side by side display shown in the current preview. Can you configure it such that the words are big enough, but the widgets will appear side by side for iphone 15 pro max? Change nothing else.
```
**What came back:** 1 file edited with the fix deployed successfully. I am now able to view it on my phone with the widgets side by side.

**What i changed next and why:** I accepted the fix and moved on to the next prompt.

---

## Prompt 9 - Reordering the app displays
```
Shift the food and activity log to come first, before the recommendations on screen 2 and 3. Change nothing else.
```
**What came back:** 2 files edited with the reorder deployed successfully. The user journey feels better now. 

**What i changed next and why:** I accepted the fix and moved on to the next prompt.

---

## Prompt 10 - Improving appearance of "5D streak logo"
```
The 5d streak displayed on the top of the app interface looks basic, can make it look cooler? Change nothing else.
```
**What came back:** 1 files edited with new cool appearance.

**What i changed next and why:** I accepted the fix and moved on to the next prompt.

---

## Prompt 11 - Fixing chart height issues
```
For the "goal dashboard lose 5kg in 6 months" chart, it does not currently reflect correctly as 74.5 to 73.2 and 72.1 to 69.5 should reflect a decrease in bar height. Please fix this. Change nothing else.
```
**What came back:** 1 files edited with chart issue fixed.

**What i changed next and why:** I accepted the fix and deployed the app to github.
