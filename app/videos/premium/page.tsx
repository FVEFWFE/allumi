"use client"

import { useState, useEffect } from "react"
import { Lock, CheckCircle, Play, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { CrossDomainLink } from "@/components/cross-domain-link"


const benefits = [
  "480+ Exclusive Videos (Growing Weekly)",
  "Raw, Unfiltered Content",
  "Pattern Recognition That Pays",
  "GPU Arbitrage Strategies",
  "AI Profit Playbooks",
  "Thailand Living Guides",
  "Dating & Lifestyle Content",
  "No Bullshit, No Fluff"
]



// All 492 premium videos
const allPremiumVideos = [
  "8 Years in Thailand - Brutally Honest Review",
  "I Dated in Colombia, Thailand & Kenya + 33 more countries - Here's The Brutal Ranking",
  "Why Andrew Tate is WRONG about Networking (for Introverts)",
  "I Wrote a FREE Book on AI Killing Humanity (From My $300 Pattaya Beach Condo)",
  "Why Introverts Are Born to Be Online Entrepreneurs",
  "AsmonGold's 'Anti-Brand' Playbook: How He Built an Empire by Being Himself",
  "Why AsmonGold Living in Filth Makes Him Richer Than Your Clean Life",
  "The Sam Hyde Playbook: How to Build a Brand That's Too Hated to Fail",
  "If you couldn't get punished for anything what would you do?",
  "From Soi 6 to BF6 to $6k Days (The Degen to Millionaire Pipeline)",
  "The Degen-to-Rich Pipeline Your Therapist Doesn't Want You to Know",
  "I Tried Every Business Model for 15 Years - Gaming Won",
  "No Car, No Mortgage, No Wife, No Boss, No Alarm Clock (I Won)",
  "I Own Nothing Society Says I Should (That's Why I'm Free and You're Trapped)",
  "No Wife, No Life? Wrong. No Wife, BEST Life (From Paradise)",
  "My Thai Girlfriend Watches Me Lose $19k on a Prediction Market",
  "Pattern Recognition: The Introvert's Secret Weapon for Wealth",
  "My Autism Prints Money While Your Social Skills Keep You Poor",
  "You Have 18 Months to Get Rich or Stay Poor Forever",
  "How I Fund My Gaming Life With Obvious Bets",
  "How I Make $500/Day to Fund My Gaming Addiction",
  "I Bet Against Human Intelligence Daily (It Funds My Gaming Addiction)",
  "I Tried Hiring a Human Instead of AI - Never Again (Manus.im AI Agent Review)",
  "I Hired a Human Once (Worst $5k I Ever Spent)",
  "From Soi 6 Pattaya Thailand to Nairobi Kenya - Dating Before Extinction",
  "I Left Thailand for Africa - The Dating Scene is a Different Planet",
  "From Thai Sweetness to African Curves (Your Dating App Can't Compete)",
  "I Dated in Colombia, Thailand & Kenya - Here's The Brutal Ranking",
  "How I Lost $560k in Bitcoin Without Losing my Mind",
  "My Innocent Thai GF Destroyed Everyone in Battlefield 6 (They Called Her a Hacker)",
  "My Cute Thai GF Has Vampire Vitamin D Levels (She Never Goes Outside)",
  "Why I'm Speedrunning Life Before AGI Arrives (Thailand Edition)",
  "My Daily Routine: Pool, Massage, BF6, $5k Profit, Sleep (Your Life Sucks)",
  "I Haven't Worked a Real Day Since 2019 (Made $2M From My Pool)",
  "I Rejected Everything Society Told Me and Got Rich",
  "Every Rule I Broke Made Me Richer (Your Obedience Keeps You Poor)",
  "Why I Never Show My Face But Show My Lifestyle (The $500k Strategy)",
  "Faceless and Rich > Famous and Broke (You Chose Wrong)",
  "The Coming Poverty Tsunami (And My Surfboard)",
  "A Poverty Tsunami is Coming - My 3-Step Plan to Survive It",
  "My Thai GF's Parents Think I Sell Computers (They're Not Wrong)",
  "Faceless in Thailand: $500k/Year Without Showing My Face",
  "The Anti-Influencer: Make Money, Keep Privacy",
  "The Anti-Influencer: How I Made $500k Without Showing My Face",
  "Physical Arbitrage: The ONLY Business AI Can't Kill",
  "Thai GF Reacts to INTP Personality Type (ENFJ vs INTP Compatibility)",
  "How to Get Rich Before AI Replaces Everything",
  "I Built an AI Model Drunk at 3am (Still Made $400 That Night)",
  "Why I Burned My AI Company and Fled to Thailand (OpenAI Hates This)",
  "I Torched My AI Startup and Fled to Paradise (Best Decision Ever)",
  "The Gamer to Trader Pipeline (Why We're All Rich)",
  "Why Gamers Get Rich and LinkedIn Users Stay Middle Class",
  "I Turned Down $500k to Keep Playing Video Games (Best Decision Ever)",
  "Society Wants You Broke, Married, and Breeding (I Said No to All 3)",
  "They Want You Broke, Married, and Breeding (I Chose Rich, Single, and Free)",
  "I'm Healthier Playing BF6 All Day Than You Are Working Out",
  "Why Gamers Get Rich and Normies Stay Poor (The Data)",
  "Gamers Understand Money Because Life is PvP (You're Playing Co-op)",
  "I Profit From Human Stupidity and Sleep Great (You Should Too)",
  "How I Made $19k Betting on Human Stupidity Last Week",
  "Human Stupidity Paid for My Porsche (Thanks for Being Predictable)",
  "Your Job is Fake and AI Knows It",
  "AI Already Knows Your Job is Bullsh*t (So Does Your Boss)",
  "The Real Cost of Paradise: My $3k/Month Thailand Life",
  "My $10k/Month Thailand Life Without Alcohol or Clubs",
  "Thai Girlfriend's Buddhist Take on AI Doom (Surprisingly Deep)",
  "How My Thai Girlfriend and I Make $15,000/Month in Pattaya Thailand",
  "Thai GF Reacts to AI Taking Jobs (Predicts RIOTS)",
  "Living in Pattaya Thailand While AI Destroys the World - Soi 6 POV",
  "Thai Village Girlfriend Reacts to $1M Bitcoin Portfolio",
  "Gaming Made Me Rich (Here's The Data)",
  "Autistic Pattern Recognition Pays My Rent",
  "My Autistic Pattern Recognition Makes Me $10k/Month",
  "The Anti-Influencer: How I Built Wealth by Staying Anonymous",
  "Why I Refuse to Work Below 70% Energy (Still Out-Earn You)",
  "POV: Your Thai GF Discovers Your $2M Bitcoin Wallet",
  "Last 18 Months to Stack Cash (My Exact Blueprint)",
  "AI Anxiety to AI Assets: Build Your $100k Edge While Others Panic",
  "My AI Hired a Human - Now I Live Like There's No Tomorrow",
  "$2000/Month in Pattaya vs $2000/Month in Nairobi (Lifestyle Comparison)",
  "Should You Still Have Kids If AGI is Coming?",
  "I Bet Against Humanity and Bought a Porsche (From Pattaya)",
  "OpenAI Employees Are Fleeing to Thailand (I Know Why)",
  "How Predictable Humans Pay for My Pattaya Lifestyle",
  "I Bet $60k on Human Stupidity (Trump + Iran) - From My Gaming Chair",
  "The Secret Advantage of Having Zero Followers",
  "The Zero Follower Strategy That Makes Me $15k/Month",
  "How Gaming Taught Me Market Psychology ($100K Profit)",
  "Get Good at Pattern Recognition or Stay Poor",
  "Why I Bet $100k Against Humanity (And You Should Too)",
  "Society Hates That I Game All Day and Out-Earn Doctors",
  "How My Thai GF Furnished Our Condo for Less Than Your Monthly Subscriptions",
  "My Thai Girlfriend Reacts to Vitamin D Deficiency",
  "My Thai Girlfriend Is Too Pure for This World (Believes My Fake Swahili)",
  "How to Get Rich From Other People's Cope",
  "Everyone's Selfishness is Just Better or Worse Disguised",
  "How to Make Money From Reddit Users (They Never Learn)",
  "I Live in Paradise, Game All Day, My GF Cooks, Bitcoin Pays for Everything (This is Freedom)",
  "How to Make $300/Day From Your Gaming Chair",
  "Day 500 of Not Talking to Anyone",
  "Solo Living Tier List (Gadgets That Matter)",
  "Why I Game 8 Hours and Still Make More Than You",
  "From 4chan to $400k: The INTP Success Pipeline",
  "Why Successful Men Choose Gaming Over Golf",
  "Why I Installed a Mini Fridge Next to My Gaming Chair in Thailand",
  "How to Monetize Being Completely Checked Out",
  "Gadgets That Eliminate Human Interaction (Tier List)",
  "My Therapist Said Stop Browsing 4chan (I Bought Bitcoin Instead)",
  "I Muted Everyone in 2021 (Best Decision Ever)",
  "Friends Are Just Future Disappointments",
  "The Cope Market is Worth Trillions",
  "She's Not Attracted to You, She's Attracted to Stability",
  "Love is Just Oxytocin and Sunk Cost Fallacy",
  "Your Friends Don't Actually Like You",
  "You're Too Poor to Be Ethical",
  "Society Will Collapse Slowly Then Suddenly",
  "Your Morning Routine is Making You Poorer",
  "The Culture War is Fake But The Poverty is Real",
  "Your Political Team Doesn't Know You Exist",
  "This Video Won't Change Your Life Either",
  "The Algorithm Knows You Better Than You Do",
  "The System Works Perfectly (Just Not for You)",
  "Your Supplements are Expensive Urine",
  "That Job Opening Already Went to AI",
  "Six Figures is the New Poverty Line",
  "You're Performing for Nobody",
  "Hustle Culture Gave You Anxiety and Debt",
  "Your Habits Are Someone Else's Marketing",
  "Family Gatherings Are Wealth Comparisons",
  "Your Best Friend Has a Better Best Friend",
  "Mental Health Became a Subscription Service",
  "Every Expat Here is Running From Something",
  "Your Emotional Intelligence Can't Buy Bitcoin",
  "Life Is Single-Player: Why Multiplayer Thinking Makes You Poor",
  "My Thai GF Doesn't Know I'm Preparing for AI Apocalypse",
  "I Bet $50k on Human Stupidity (It Always Pays)",
  "Dopamine Detox Is Cope - Here's What Actually Works",
  "My Bitcoin Paid For Everything In This Video",
  "Bitcoin Is A Midwit Filter (And You Failed)",
  "Why Bitter Losers Hate Bitcoin (It's Not The Price)",
  "Bitcoin Is PvP And You're Playing It Wrong",
  "Why Losers Compete For Status While Winners Compete For Freedom",
  "Why High IQ Players Turn Off The Social HUD",
  "Your Fear Of Judgment Costs You $10k/Month",
  "30 Days Without Consuming Any Content (The Results)",
  "Emotional Intelligence Is Just Advanced People-Pleasing",
  "AI Doesn't Need To Be Sentient When Humans Aren't",
  "Your Rent Doubled Because Blackrock Loves Open Borders",
  "Import The Third World, Become The Third World (The Data)",
  "The Pattern That Destroyed Rome (Now With WiFi)",
  "Your Welfare State Can't Survive This (The Numbers)",
  "Why I Bought a Superbike Instead of AI Stocks (Riding Through Koh Samui, Thailand)",
  "Why I 'Muted' All My Friends in 2021 (The Dark Side of Male Groups)",
  "Instagram Try-Hards vs. The Faceless Rich (Why They'll Always Be Poor)",
  "Why Jealousy (Not Money) Runs The World",
  "7 Sneaky Ways People Are Disrespecting You",
  "Rooting For Sports Is For Suckers",
  "Going to the Gym is for Suckers",
  "Exploiting a Debt Glitch to Make Millions - Bitcoin",
  "I Used a 'Debt Glitch' to Turn $10k into $1.2M with Bitcoin (Here's How)",
  "Dating an 18-Year-Old as a Grown Man Changed Me",
  "Why I'll NEVER Get Married (Not What You Think)",
  "Why I Chose Anonymity Over a $1M Influencer Career",
  "Her Family Asked My Job. I Said 'I Wait' (The Bitcoin Strategy)",
  "I Built a Home Gym So My Thai GF Would Never Have To Leave The House",
  "My Daily Routine: I Make $10k While She Works Out (The Perfect Symbiosis)",
  'NOTHING is Better Than Financial Freedom (Not Even "You-Know-What")',
  "Want Financial Freedom? My Advice is This...",
  "It's Disgusting How Much I Enjoy Financial Freedom",
  "You Procrastinate Because You're Not Selfish Enough",
  "Can Thai Girlfriend Pronounce Battlefield 6?",
  "Algorithmic Content is Cooking Your Brain",
  "How to Get Views on YouTube With Zero Subscribers [2026]",
  "Watching Too Much Content = the New Smoking",
  "How to Find Colombian Curves in Thailand",
  "How I Got Beat Up by Thai Mafia (And What I Learned)",
  "How Gaming Since Age 12 Taught Me Everything About Online Marketing",
  "How Gaming Since Age 12 Taught Me The Skill That Made Me $500k",
  "How I Got My First Client Through YouTube (Without Being Famous)",
  "How I Went From $300 to $100k+ in 15 Months",
  "How I Turned My Last $300 into $100k in 15 Months",
  "How I Got Clients as a Broke 22-Year-Old (Door-to-Door to Digital)",
  "How I've Lived in Thailand for 8 Years on Online Income",
  "How I Travel First Class While Building Online Businesses",
  "How I Live in Paradise (Pattaya/Samui) for Less Than Your Rent",
  "How I Write Sales Letters That Made Me $170k+ (Hook-Story-Offer)",
  "How I Pick Profitable Niches Nobody Else Sees",
  "How I Went From Playing COD to Making $500k Online",
  "How I Make Money Online Without Ever Showing My Face",
  "How I Disappeared From Social Media and Made More Money",
  "How to Date in Thailand as a Western Entrepreneur",
  "How to Date in Thailand Without Losing Your Freedom (The Entrepreneur's Guide)",
  "I Date 10s in Thailand While You Simp for 6s on Tinder",
  "How I Went From -$4.5k to $100k in 18 Months",
  "How I Escaped the Matrix at 21 (Quit College, Left Europe)",
  "How Getting Fired Was the Best Thing That Happened to Me",
  "How Growing Up in Nigeria Prepared Me for Entrepreneurship",
  "How Living in 4 Countries by Age 12 Shaped My Worldview",
  "How I Bought a Ducati Panigale in Thailand (And Why I Sold It)",
  "How to Live Like a King in Thailand on Online Income",
  "How I Work From Pool Bars and Massage Shops",
  "How Chasing a Porsche Almost Ruined My Life",
  "How I Went From Gaming in Nigeria to $100k in Thailand",
  "How an Introverted Gamer Built a Location-Independent Empire",
  "How I Got a Thai GF Who Supports My Lifestyle",
  "How I Work From Massage Shops in Pattaya Thailand",
  "How to Live the Playboy Lifestyle for Less Than $2k/Month",
  "How I Date 10s While Being an Introvert",
  "How to Build a Harem in Southeast Asia",
  "How to Date Without Sacrificing Your Freedom",
  "How to Date Curvy Introverts (They Exist)",
  "If I Lost Everything Tomorrow, Here's How I'd Make $10k in 30 Days",
  "How I Run My Entire $500k Business From a Phone on a Thai Beach",
  "Bodybuilding is Cope for Being Poor (Get Rich Instead)",
  "Being Broke in My 20s Taught Me a Cruel Lesson About the World",
  "Living in Thailand: Why This Gen Z European Chose to Move Here",
  "Vibe Coding The AI Bot That Pays for My Life in Pattaya (Thailand)",
  "My Thai GF's Reaction to Her Surprise Masseuse (Pattaya)",
  "Antisocial to $500K: Why I Deleted Everyone & Got Rich Instead",
  "I'm Paying Someone $5k/Month to Live in Thailand (No Face Required)",
  "Want a Thai Girlfriend? This is Where to Come",
  "Life in Koh Samui with My Thai Girlfriend: The Honest Truth [Thailand]",
  "Life in Pattaya with My Thai Girlfriend: The Honest Truth [Thailand]",
  "What the f*ck is happening at OpenAI..",
  "What's happening in Pattaya is insane...",
  "what the f*ck.. my ai hired someone",
  "Thailand situation is insane right now.. (Americans fleeing here)",
  "gaming through the collapse..",
  "what the f*ck is happening to Google..",
  "the real reason zuck built a bunker..",
  "someone just broke ChatGPT..",
  "i made $80k from one pattern..",
  "this is why everyone's broke now..",
  "your savings are cooked..",
  "gaming through world war 3..",
  "china's new AI is terrifying..",
  "google employee records himself getting fired..",
  "sam altman just said the quiet part..",
  "the chart that broke reddit..",
  "china's AI military plan leaked..",
  "pentagon's AI presentation is comedy..",
  "watching boomers regulate AI..",
  "CNN explains AI (it's painful)..",
  "this company got destroyed by ChatGPT..",
  "goldman sachs knows we're cooked..",
  "north korea's AI program leaked..",
  "therapist reacts to AI taking his job..",
  "FBI document mentions AI doom..",
  "amazon warehouse robot kills worker..",
  "watching boomers discover they're obsolete..",
  "i retired to thailand on 3 bitcoin..",
  "why bitcoiners are fleeing to thailand..",
  "pattaya isn't what youtube told you..",
  "dubai costs 5x more than this..",
  "before you move to thailand watch this..",
  "bitcoin at $124k.. i'm never leaving thailand",
  "Bitcoin Hit $124k While You Were At Work (I Was At The Beach)",
  "europe's finished.. asia's the move",
  "I Escaped Europe's Collapse to Asia (You're Still Paying 60% Tax)",
  "Why Girls Get Tattoos & Septum Rings (Men Hate This)",
  "Tattoos and Septum Rings Are Damage Reports (You Can't Fix Her)",
  "Thai Girlfriend Pool Party Phuket Thailand (Luxury Villa Tour)",
  "Why NoFap is Cope But Selling to Coomers is Based",
  "NoFap Won't Save You But Selling to Coomers Made Me Rich",
  "The Lust Economy: Be a Dealer, Not an Addict",
  "the loneliness economy is worth trillions..",
  "how i profit from male loneliness..",
  "simps paid for everything in this video..",
  "your desperation is someone's business model..",
  "Stop Feeling Guilty About Lust - Start Profiting From It Instead",
  "Your Shame About Lust Keeps You Poor (I Profit From It Daily)",
  "Why I Profit from Simps While Having a Real Girlfriend",
  "Build a Business on Male Loneliness (They'll Thank You)",
  "Even Monks Monetize Lust (They Just Hide It Better)",
  "NoFap Won't Make You Rich But Selling to Fappers Will",
  "Why Job Interviews Are for Losers (Make Companies Audition for You)",
  "How to Never Attend Another Networking Event (And Still Win)",
  "The Power of Being Incompatible with Most People",
  "Why Introverts Should Stop Trying to Network (Become a Magnet Instead)",
  "Why Your Personality Type Should Dictate Your Business Model",
  "Why You Should Ignore All Advice (Including This)",
  "How to Build an Empire Without Leaving Your House",
  "Saturation is Real - For People With No Imagination",
  "Competition Means Nothing When Everyone's Retarded",
  "Financial Freedom in 2025: Only for People Who Ignore 'Saturation'",
  "Financial Freedom is Saturated (With People Who Will Quit)",
  "You're 5 Years Late and That's Perfect",
  "It Was Too Late in 2010 Too (According to Losers)",
  "Every Market is Saturated Until You Actually Look",
  "Market Saturation is an IQ Test (You Failed)",
  "YouTube is Saturated (With People Who Quit After 10 Videos)",
  "I Built a Business So I Could Game Forever",
  "Allowing Yourself to be Anti-Social Feels Damn Good",
  "What Would You Do If You Couldn't Get Punished for Anything?",
  "Why Andrew Tate is WRONG about The Meaning of Life",
  "Living in Thailand w/ Thai Girlfriend: Pool at Beachfront Condo in Pattaya",
  "How to Vibe Code during Foot Massages in Thailand",
  "how to make money without talking to anyone",
  "how to get rich without talking to anyone",
  "Pattaya Thailand: Apple Vision Pro in Pool (Girlfriend)",
  "Thai Girlfriend Plays Battlefield 6 on Beach (Apple Vision Pro in Pattaya Thailand)",
  "Thai Girlfriend plays Battlefield 6 on Beach (Pattaya Thailand)",
  "I Traveled to {Amount} Countries & This ONE is my Favorite (for Expat Living)",
  "The Game Theory of Actually Creating Something",
  "High IQ People Are Checking Out Wrong (Here's What Works)",
  "The Mental Models That Replace Ideology",
  "Why Smart People Fall for Stupid Ideas (And How to Stop)",
  "The Masculine Virtues Nobody Talks About",
  "The Compound Effect of Daily Creation",
  "How to Disagree Without Being Cringe",
  "The Skills That Make You Ungovernable",
  "The Content Diet That Increases Agency",
  "Why Creation Beats Consumption (Neurologically)",
  "How to Build Instead of Browse",
  "The Information Hygiene Nobody Practices",
  "The Skills That Matter When Credentials Don't",
  "How Sexual Frustration Built Civilizations",
  "The Evolutionary Reason Creating Beats Consuming",
  "What I Learned Reading 1,000 Banned Books",
  "The CIA Document That Explains Reality",
  "This Graph Destroyed My Worldview",
  "Connecting Nietzsche, Bitcoin, and Evolutionary Biology",
  "How Game Theory Explains Everything Wrong with Society",
  "The Asset They Don't Want You to Own",
  "I Watched 1000 Hours of Sam Hyde - Here's What I Learned",
  "Alex Hormozi Said WHAT?! (Deleted Podcast Clip)",
  "The One Thing Naval and Andrew Tate Actually Agree On",
  "The Tim Dillon Rant That Explains Peter Thiel",
  "When Joe Rogan Was Actually Poor (Life Lessons)",
  "Reacting to Lex Fridman's Worst Take",
  "Sam Hyde and Tim Dillon Start a Podcast (AI Simulation)",
  "Why Women Evolved Different Moral Intuitions (Controversial Data)",
  "Why High IQ People Are Terrified of GPT-6 (The Real Reason)",
  "I Read Every Classified AI Safety Document (Here's What's Coming)",
  "The Skill That Becomes 100x More Valuable with AI",
  "Why Women Trust AI More Than Men (Evolutionary Explanation)",
  "Why Psychopaths Will Dominate the AI Economy",
  "AI Proves Free Will Doesn't Exist (And How to Live With That)",
  "What Hormozi Told Me About Saturation (Off Camera)",
  "Yes, It's Saturated. No, That Doesn't Matter. (Here's Why)",
  "The Evolutionary Trap of Infinite Sexual Novelty",
  "Nietzsche's Take on Sexual Desire Would Get Him Cancelled",
  "Jordan Peterson's Darkest Warning About Male Sexuality",
  "Best online biz models for INTP/INTJ personality types",
  "Most compatible Girlfriend MBTIs for INTP/INTJ personality types",
  "Entrepreneurial advice for INTP/INTJ personality types",
  "How to Create a Life of Freedom as an INTP/ENTJ/ENTP/INTJ Personality Type",
  "How to Collapse Your 10-Year Goals Into 6 Months & Get Your Life Back (3 Examples)",
  "Teaching Thai Girlfriend to Swim for the 1st Time",
  "Why INTPs Are Built for $10k/Month Online Businesses (Introvert Advantage)",
  "The 4 Psychological Triggers That Make People Buy ANYTHING (Ethical Manipulation)",
  "Nobody Buys Your Product - They Buy These 4 Feelings Instead",
  "AIs Will Have an Incentive to Pretend to be Conscious",
  "Moral Status of Digital Minds",
  "Bring in the third world, become a third world (Netherlands Example)",
  "I Quit My Job to Game Full-Time (Here's How)",
  "I Arbitraged GPUs Between Countries for 300% Profit (Here's How)",
  "I Built an AI That Plays Games and Streams on Twitch (Here's How)",
  "I Ran ChatGPT on a Gaming PC and Made $1k/Day (Here's How)",
  "GPU Flipping: From $1K to $50K in 90 Days (Full Strategy)",
  "My Pattaya Thailand Life: $3K/Month for a Perfect Setup (GF, Maid, Freedom)",
  "Almost Bought a Porsche at 27. Thank God I Didn't (Do This Instead)",
  "Why I Stopped Networking & Made $500K Building an Audience",
  "7 Countries Where American Entrepreneurs Get VIP Treatment",
  "The Introvert's Path to Power in 2026 (No Networking Required)",
  "How I Built a $1M Solo Business as an Introvert (Complete Playbook)",
  "The Real Cost of Living Like a King in Thailand (Honest Breakdown)",
  "Why Every Introvert With a Brick-and-Mortar Business Secretly Hates Their Life",
  "Physical Businesses are Extrovert Traps (How I Made $30K/Month Without Showing My Face)",
  "Why Your Personality Type Determines Your Business Model (Introverts, Listen Up)",
  "How I Work 8 Hours a Day While Getting Thai Massages (Literally)",
  "Introverts Don't Need Community, They Need Pattaya Thailand",
  'Why Working From "Paradise" Actually Works (If You\'re Introverted)',
  "Content Addiction is Killing Your Internal Voice (How to Get It Back)",
  "The Hidden Cost of Consuming Content (Lost $500K Learning This)",
  '"Everything is Saturated" - The Biggest Lie Keeping You Broke',
  "How Building Products for My Past Self Made Me $200K",
  "Markets Aren't Saturated. You're Just Creating for Others, Not Yourself",
  'Stop Asking "What\'s Working?" Start Asking "What Do I Want?"',
  "You're Not an Overthinker. You're a Thinker With Bad Aim",
  "Why Overthinkers Get Rich (When They Think About the Right Things)",
  "Stop Copying Successful People. Your Brain Doesn't Work Like Theirs",
  "How to Use AI to Build & Sell (Never Worry About Money Again)",
  "Who Would You Be If No One Was Watching? (That's Your Brand)",
  "Just Live Like a Cowboy With WiFi (Everything Gets Easier)",
  "I Tried Genie 3 on Apple Vision Pro (Mind-Blowing Results)",
  "Thailand's 5 Hidden Cities Where Models Live (Not Bangkok)",
  "South America vs Thailand: The Brutal Truth for Digital Nomads",
  "NoFap is a Distraction. Here's What Actually Makes You Rich",
  "Stop Watching Gurus. I Made $500K Copying My Own Taste",
  "Introverts Will Dominate 2026 (7 Unfair Advantages)",
  "Entrepreneurship Requires a RUTHLESS Mindset",
  "I Skipped College, Marriage, and a Mortgage. Now I'm Free",
  "Stop Asking Why Millionaires Sell Courses (Dumbest Question Ever)",
  "Jeffrey Epstein's Island vs My Thai Island (One Has Better WiFi)",
  "Tommy Robinson Should Have Moved to Thailand (Like I Did)",
  "My Thai Condo vs Hitler's Bunker (Better Ventilation)",
  "Why I Live Like Saddam Hussein (In His Spider Hole Era)",
  "My Thai Girlfriend's Daily Routine vs Kim Jong Un's Schedule (Similar Authoritarianism)",
  "Thai Girlfriend Reacts to Andrew Tate (Thinks He's My Friend)",
  "Is It Smarter to Be a Scammer",
  "She Thinks I'm Rich on $3K/Month (Location Arbitrage)",
  "The West is Collapsing and My Bitcoin Doesn't Care",
  "Why Lonely Gamers Should Arbitrage GPUs in Asia [Financial Freedom]",
  "My RTX 5090 Makes $500/Day (Girlfriend Thinks I'm a Wizard)",
  "I Flip GPUs for $8K/mo Without Talking to a Single Human (Full Method)",
  "Unreal Engine 5 - How to Make 8k per Month Building Game Assets in Thailand",
  "Fight to Save Europe or Move to Thailand? (My Honest Opinion)",
  "Men With an Asian Wife Seeing a Latina Up Close",
  'That One Friend Who Travels for the "Culture"',
  "Colombian vs Thai vs Kenyan Girls",
  "How to Use AI to Get Paid to THINK... Without Wasting Your Time",
  "You're Never Tired When You're Winning",
  "Use Your Worldviews as Tools, Not Identities",
  "Your brain will forever try to convince you other things are easier",
  "You've already won & can perma enjoy peak living now",
  "Getting rich REQUIRES a profound sense of superiority",
  "Near-psychopathic hatred of laziness = success",
  "The Power of Giving Them What They Want (Playboy in Planes Story)",
  "The Secret Power Of 'Marketing By Values'",
  "Successful people are doing 100x more volume than you",
  "Our 'society' is one giant free-for-all. So do w/e you want!"
]

export default function PremiumPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showAllVideos, setShowAllVideos] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/btcpay/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: 399,
          currency: 'USD',
          orderId: `premium-vault-${Date.now()}`,
          itemDesc: 'Premium Video Vault - Annual Access',
          metadata: {
            source: 'premium_sales_page',
            timestamp: new Date().toISOString()
          }
        })
      })
      
      const data = await response.json()
      
      if (data.success && data.checkoutLink) {
        // Track payment initiated
        if (window.posthog) {
          window.posthog.capture('payment_initiated', {
            invoice_id: data.invoiceId,
            product: 'Premium Video Vault',
            price: 399,
            currency: 'USD',
            source: 'premium_sales_page'
          })
        }
        
        // Open payment page in new tab
        window.open(data.checkoutLink, '_blank')
        setIsLoading(false)
      } else {
        alert('Payment system error. Please try again later.')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment system error. Please try again later.')
      setIsLoading(false)
    }
  }

  return (
    <>

      
      <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
        {/* Header */}
        <nav className="border-b border-gray-800 bg-[#0A0A0A]/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-gray-100 hover:text-[#00D4FF] transition-colors">
                Dex Volkov
              </Link>
              <div className="flex items-center space-x-8">
                <Link href="/videos" className="text-gray-300 hover:text-[#00D4FF] transition-colors font-medium flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Free Videos
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 to-transparent" />
          <div className="max-w-4xl mx-auto px-6 py-16 relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-full text-sm text-[#00D4FF] mb-6">
                LIMITED TIME: $399/YEAR
              </div>
              <h1 className="text-5xl font-bold text-gray-100 mb-6">
                Premium Video Vault
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                480+ exclusive videos. No bullshit courses. No fake guru energy. 
                Just raw footage of what actually works.
              </p>
            </div>

            {/* Main CTA */}
            <div className="text-center mb-16">
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="inline-flex items-center px-10 py-4 bg-[#F7931A] text-black rounded-lg font-bold hover:bg-[#E88A17] hover:text-white transition-all text-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
                </svg>
                {isLoading ? 'Loading Payment...' : 'Get Instant Access (Pay with Bitcoin)'}
              </button>
              <p className="text-xs text-gray-500 mt-3">Secure payment. Instant access. No recurring charges.</p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#00D4FF] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{benefit}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sample Videos */}
        <div className="bg-gray-900/30 border-y border-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Inside The Vault</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                "8 Years in Thailand - Brutally Honest Review",
                "I Dated in Colombia, Thailand & Kenya + 33 more countries - Here's The Brutal Ranking",
                "How I Make $500/Day From My Gaming Chair",
                "GPU Arbitrage: From $1K to $50K in 90 Days",
                "Thai GF Reacts to $1M Bitcoin Portfolio",
                "Pattern Recognition That Pays My Rent [Full Method]"
              ].map((title, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 p-6 group hover:border-[#00D4FF]/30 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-[#00D4FF] opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-300">{title}</h3>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowAllVideos(!showAllVideos)}
                className="inline-flex items-center text-[#00D4FF] hover:text-[#00A8CC] transition-colors text-sm font-medium"
              >
                {showAllVideos ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                + {allPremiumVideos.length - 6} more videos inside
              </button>
              
              {showAllVideos && (
                <div className="mt-6 max-h-96 overflow-y-auto bg-gray-900/30 border border-gray-800 rounded-lg p-4">
                  <div className="grid gap-2">
                    {allPremiumVideos.slice(6).map((title, index) => (
                      <div key={index} className="flex items-center space-x-2 text-left p-2 hover:bg-gray-800/50 rounded transition-colors">
                        <Lock className="w-3 h-3 text-gray-600 flex-shrink-0" />
                        <span className="text-xs text-gray-400">{title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>



        {/* FAQ */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Questions</h2>
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800 p-6">
              <h3 className="font-semibold text-gray-100 mb-2">How do I access the videos?</h3>
              <p className="text-gray-400 text-sm">After payment confirmation, you'll get instant access to all videos on this site. No external platforms, no apps to download.</p>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 p-6">
              <h3 className="font-semibold text-gray-100 mb-2">Why Bitcoin only?</h3>
              <p className="text-gray-400 text-sm">Banks fund wars. Credit cards track everything. Bitcoin is freedom. If you don't have Bitcoin, you're not ready for this content.</p>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 p-6">
              <h3 className="font-semibold text-gray-100 mb-2">Is this a course?</h3>
              <p className="text-gray-400 text-sm">No. It's raw footage of what I actually do. No structured modules, no certificates, no community calls. Just reality.</p>
            </Card>
            <Card className="bg-gray-900/50 border-gray-800 p-6">
              <h3 className="font-semibold text-gray-100 mb-2">Can I cancel?</h3>
              <p className="text-gray-400 text-sm">It's a one-time payment for annual access. No subscriptions, no recurring charges, no cancellation needed.</p>
            </Card>
          </div>
        </div>

        {/* ArbVault CTA */}
        <div className="bg-gray-900/30 border-t border-gray-800 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Start With GPU Arbitrage</h3>
            <p className="text-gray-400 mb-8">
              Not ready for the vault? Start flipping GPUs. I source from{' '}
              <CrossDomainLink href="https://arbvault.io?aff=dexv" className="text-[#00D4FF] hover:text-[#00A8CC]">
                ArbVault.io
              </CrossDomainLink>{' '}
              and flip for 35-40% margins. Use code DEX5.
            </p>
            <CrossDomainLink 
              href="https://arbvault.io?aff=dexv"
              className="inline-block px-8 py-3 bg-gray-800 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Check ArbVault.io Inventory →
            </CrossDomainLink>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to See What Actually Works?</h2>
          <p className="text-gray-400 mb-8">
            480+ videos. No fluff. No courses. Just raw reality from paradise.
          </p>
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="inline-flex items-center px-10 py-4 bg-[#F7931A] text-black rounded-lg font-bold hover:bg-[#E88A17] hover:text-white transition-all text-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
            </svg>
            {isLoading ? 'Loading Payment...' : 'Get Instant Access Now'}
          </button>
          <p className="text-xs text-gray-500 mt-3">$399/year. One payment. Instant access.</p>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 py-8">
          <p className="text-xs text-gray-600 text-center">
            I do not sell courses. <Link href="/" className="text-[#00D4FF] hover:text-[#00A8CC] transition-colors underline">Click here to see my free resources</Link>
          </p>
        </div>
      </div>
    </>
  )
}