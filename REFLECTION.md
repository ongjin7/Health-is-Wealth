# REFLECTION.md - Wealth is Health (Health Tracking App)
**Student:** Ong Jin . **Course:** MGMT6110 . **Problem Set 1** 

**Live Link:** https://health-is-wealth-tawny.vercel.app

---

## Q1 - Who are your users, and what changes for them?
This app is built for external customers who create an account to use it: digitally savvy mass-market consumers who want a gamified way to pursue a health goal, such as losing a set amount of weight by a target date, and to make better choices in both activity and food consumption.

Without this, consumers rely on wearables or standalone apps to track activity, but rarely track food and beverage intake which is a major part of any health goal. Tracking both means using two separate tools and looking up nutritional figures online. The current process flow looks like this:

**Step 1:** The customer tracks daily activity using their phone's fitness app, which shows calories burned.

**Step 2:** They eat and drink throughout the day, estimating calories mentally without recording. Recording means noting each item, searching for its calorie content, entering it into a spreadsheet, then comparing that against calories burned to judge whether they are on track.

**Step 3:** They receive no tips or recommendations on adjusting activity relative to food consumption. Judging whether their diet and exercise are healthy requires manual online research.

This method is tedious and dull. Every step is manual, with no gamification and no way to compare progress against friends on a leaderboard.

**What changes?**

Integrated with a sports wearable, the app **cuts daily tracking of both exercise and food to roughly two minutes**, **against ten minutes of spreadsheet work** that still leaves the user to reconcile the two sets of data themselves. 

**Step 1 stays the same**, except data is pulled directly from the phone's health app. **Step 2 changes substantially as food logging becomes quick and structured**, inside an app that presents the whole health journey in one place. **For Step 3, the app surfaces insights and recommendations and turns the experience into something social.**

---

## Q2 - Augmented capacity and constrained capacity

**Augmented capacity**

I had a working, deployed health tracking app in 1 hour, having never written a line of React. The build ran through roughly 11 prompts in Google AI Studio. Without the pairing I would not have produced a running front-end app at all in the time available. 

The AI pairing also reduced the time taken between change and deployment. AI Studio is synced to GitHub and auto-deploys to Vercel, so a prompt in the chat panel became a live change on a public URL in a few minutes. 

**Constrained capacity**

One constrained capacity is that re-prompting is my only debugging option. I have not built the skill to read or fix code myself, so when something is wrong I describe the symptom and ask for fixes. 

---

## Q3 - In the loop, on the loop, out of the loop: where was your judgment actually needed?

An **in-the-loop moment (prompt 11) where my judgment changed the outcome** was when I corrected a chart the model had generated. Looking at the preview pane, I could see from both the numbers and the layout that the chart was wrongly generated and misaligned. Nothing reached GitHub until I intervened, so my approval was required for that specific case before it took effect.

**A moment I was nominally in the loop and added nothing was in prompt 2 (empty state entry).** I read the panel's summary of what it had changed and recorded that as verification that the exercise had concluded, although nothing updated on my app preview as all of the data had been populated.

**One step where humans should be out of the loop** is when a wearable is connected, activity records should sync and sum without anyone reviewing them individually. The **volume is high** and a **bad import is reversible** by re-syncing, and any **single record has low stakes** in affecting overall accuracy.

**A step where a human must stay** **however expensive it** is when generating personalised health advice. AI that can hallucinate and offer advice based on a temperature set, but it is important that a human is constantly training and monitoring the type of output that can be distributed, to **prevent any high stakes harmful misinformation** that **may not be reversible.** 

---

## Q4 - What did it build that you never sketched?

On the master prompt I asked for a health tracking app with gamification, against my own set of criteria. The output was mostly what I asked for, but it included components I had not requested. 

An example was a points system. I had asked for gamification without specifying what form it should take, and the model designed a scheme awarding points for both food choices and activities completed. 

I noticed this during the build phase and accepted it, because it worked. What I should do is to check the build against my criteria list to separate what I had specified from what the model had supplied. Doing that early, rather than after deployment can help to identify such scenarios early to prevent issues.

---

## Q5 - Learning pointers for the organisational context

1.	**Before any deploy, mandate a thorough cross check of build against specification/ prompt requirements** to ensure that everything generated is acceptable. In my own build, the model added a points system scoring food choices and activities on rules I never specified (as mentioned in Q4), and I accepted it because it worked.

2.	**Mandate that multiple user journeys be tested on a non-public sandbox link before a live URL is issued**, since AI output fails in ways that are easy to miss. Examples are chart errors (prompt 11), alignment breaking on mobile (prompt 8), buttons that do nothing (prompts 5 and 6), and journeys that technically work but are poor (prompt 9).

3.	**Require that at least one person with the ability to read the generated code signs off before a consumer-facing deploy.** In my build, re-prompting was my only debugging move. A builder should be less reliant on just using the AI chat function to build an app, especially one for the mass market.
