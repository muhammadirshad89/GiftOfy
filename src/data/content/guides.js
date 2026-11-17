// Long-form guides. Block syntax: see src/components/Prose.jsx. Extra block here: ['table', [header, ...rows]].
// Tokens {templates} and {occasions} are replaced at render time with the real catalog counts.
export const GUIDE_BODIES = {
  'guides/how-to-write-a-heartfelt-message': {
    lead: 'Most people can feel what they want to say and still stare at an empty text box. This guide gives you a simple four-part method for writing a message that sounds like you, with before-and-after examples and a checklist of common mistakes.',
    sections: [
      ['Start with the reader, not the occasion', [
        'It is tempting to begin with the event: the birthday, the wedding, the graduation. A better starting point is the person. What would they most like to hear? What do they rarely hear? A message that answers those questions feels written for them, even if it is short.',
      ]],
      ['A four-part method', [
        ['ol', [
          '**Open with their name and why you are writing.** “Sara, I was thinking about your birthday and wanted to write something real.”',
          '**Add one specific detail.** A memory, a habit, something you noticed this year.',
          '**Say what it means to you.** This is the part people remember: how that detail made you feel or what it changed.',
          '**Close with a wish or a plan.** What you hope for them, or when you will next see them.',
        ]],
        'You do not need every part every time. If you only have time for two, choose the specific detail and the line about what it means.',
      ]],
      ['Before and after', [
        ['h3', 'A birthday message'],
        '**Before:** “Happy birthday! Hope you have a great day.”',
        '**After:** “Happy birthday, Sara. I still think about how you stayed on the phone with me for an hour when I was panicking about moving. I hope this year gives you the same kindness you give everyone else.”',
        ['h3', 'A thank-you message'],
        '**Before:** “Thanks for your help.”',
        '**After:** “Thank you for taking the time to walk me through the report. I walked into the meeting feeling prepared, and that came from you.”',
        ['h3', 'A message to a friend you have lost touch with'],
        '**Before:** “Hey, long time no see. We should catch up.”',
        '**After:** “I was thinking about the summer we spent at the lake and realized how much I miss your laugh. How are you doing these days?”',
      ]],
      ['Matching the tone to the relationship', [
        ['ul', [
          '**Close friends and partners:** personal, playful, inside jokes welcome.',
          '**Parents and older relatives:** respectful and warm. Mention something they taught you.',
          '**Colleagues and acquaintances:** friendly and brief. Avoid private jokes or anything that could be misread.',
          '**Someone grieving or unwell:** gentle and short. Offer presence, not solutions.',
        ]],
      ]],
      ['Common mistakes', [
        ['ul', [
          'Starting with an apology for not writing sooner. Begin with warmth instead.',
          'Using a template word for word. People often recognize copied messages.',
          'Writing about yourself, such as how busy you have been, instead of about them.',
          'Making the message so long that replying feels like homework.',
          'Using humor to avoid saying the sincere thing. A joke can carry affection, but it should not replace it.',
        ]],
      ]],
      ['If you get stuck', [
        ['ul', [
          'Say it out loud, or record a voice note, and write down what you said.',
          'Finish this sentence: “The thing I appreciate most about you is…”',
          'Write the message to yourself first, then change “I” to “you” where it helps.',
          'Use a template as scaffolding, then replace every general phrase with a specific one.',
        ]],
      ]],
      ['Using GiftOfy to help', [
        'When you personalize a wish on GiftOfy, you can start from a template message for the design you chose, press “Suggest another” to cycle through built-in suggestions in the tone you select, or write your own from scratch. The suggestions are a built-in list, not generated for you, so treat them as a starting point and add your own details. The message limit is 500 characters, which encourages you to keep it focused.',
      ]],
    ],
    faqs: [
      ['How long should a heartfelt message be?', 'Short enough to read in one breath for most people. Two to four sentences with one specific detail usually beats a long paragraph of general praise.'],
      ['What if I am not good with words?', 'Plain words are fine. Honesty and specificity matter more than polish. Write it the way you would say it out loud.'],
      ['Is it okay to write in a language other than English?', 'Yes. Write in the language the person is most comfortable in. On GiftOfy the message box accepts any text you can type, and the preview step shows how it will look.'],
      ['Can I use humor in a heartfelt message?', 'Yes, if it fits your relationship. A light joke followed by one sincere line is often more natural than unbroken sentiment.'],
    ],
    related: ['thank-you-messages', 'birthday-wishes', 'friendship-messages', 'guides/how-to-create-personalized-digital-wishes'],
  },

  'guides/how-to-create-personalized-digital-wishes': {
    lead: 'This guide walks through creating a personalized digital wish on GiftOfy from start to finish, including what each step does, the limits you should know about, and a few tips for getting a better result. Everything described here reflects how the service currently works.',
    sections: [
      ['Before you start', [
        'You do not need an account, and neither does the person you are sending to. A wish is created in your browser and saved so the link keeps working. Because there are no accounts, GiftOfy does not keep a list of the wishes you have created, so copy or save the link when it is shown. If you lose it, there is no way to look it up for you.',
      ]],
      ['Step 1: Choose an occasion', [
        'GiftOfy currently offers {occasions} occasions, including birthdays, anniversaries, weddings, engagements, Eid, Valentine’s Day, graduation, congratulations, thank you, get well soon, miss you, new year, friendship, Mother’s Day, Father’s Day, new baby, best wishes, romantic and just because. The occasion decides which designs you see first and how the wish opens for the recipient.',
      ]],
      ['Step 2: Choose a design, or write your own message', [
        'There are {templates} free designs. You can filter by style (romantic, cute, elegant, minimal, fun), by popular or new, or search by name, and preview any design before choosing it. You can use the design’s template message, or switch to “Write your own message” to start with a blank box.',
      ]],
      ['Step 3: Personalize', [
        ['ul', [
          '**Recipient name** is required and appears in the heading of the wish.',
          '**Relationship** is optional, and is used to tailor suggested messages.',
          '**Your name** is optional. If you leave it blank, the wish is signed “Someone who cares”.',
          '**Surprise mode** keeps your name hidden until the recipient reveals the message.',
          '**Your message** can be up to 500 characters. “Suggest another” cycles through built-in suggestions in the tone you select.',
        ]],
      ]],
      ['Step 4: Preview, then publish', [
        'The preview shows exactly what the recipient will see, with the same design and message. Check the spelling of the name and read the message once more. When you publish, GiftOfy creates a short link. A published wish cannot be edited, so if you spot a mistake afterward, create a new wish and share that link instead.',
      ]],
      ['Step 5: Share the link', [
        'On the success screen you can share by WhatsApp or Facebook, copy the link, use your phone’s share sheet where available, or open the wish yourself using “Preview as recipient”. Choose the channel the person actually uses. The guide to [sharing a digital greeting](/guides/how-to-share-a-digital-greeting) explains what to say alongside the link.',
      ]],
      ['What the recipient experiences', [
        'The recipient opens the link and sees an occasion-matched object to tap, such as a balloon for birthdays, an envelope for weddings or a crescent moon for Eid. When they tap it, the wish is revealed with a short animation. They can replay the surprise, share the wish onward and send you a private reply with an optional reaction. The reply is returned to you as a private link that the recipient can share with you.',
      ]],
      ['What GiftOfy does not do', [
        'To avoid disappointment, here are the things GiftOfy does not currently offer: scheduling a wish to arrive at a set time, adding photos, editing a wish after publishing, accounts that list the wishes you have made, and any kind of payment or monetary gift. You decide when to send the link, and you can create a wish days ahead.',
      ]],
    ],
    faqs: [
      ['Is it free to create a wish?', 'Yes. Every design currently available is free, and there is no payment feature. Premium designs are planned for the future, but nothing is sold today.'],
      ['Can I change a wish after publishing it?', 'No. If you need to fix something, create a new wish and share the new link.'],
      ['Who can open my wish?', 'Anyone who has the link. The links are not listed anywhere and are hard to guess, but you should share them only with people you trust. See the [privacy policy](/privacy) for details.'],
      ['Can I send a wish to more than one person?', 'A wish is addressed to one recipient name. You can share the same link with several people, but each will see the same wish. For individual messages, create one per person.'],
    ],
    related: ['how-it-works', 'guides/how-to-share-a-digital-greeting', 'guides/how-to-write-a-heartfelt-message', 'faq'],
  },

  'guides/how-to-send-digital-birthday-greetings': {
    lead: 'A digital birthday greeting can be warm and memorable or forgettable, depending on timing, channel and wording. This guide covers when to send, which channel suits which person, how to handle time zones and late messages, and what to do when someone receives dozens of greetings.',
    sections: [
      ['Choose the channel for the person', [
        ['table', [
          ['Situation', 'Good channel', 'Why'],
          ['Close friend or partner', 'Private message or call', 'Personal and immediate'],
          ['Family elder', 'Phone call, or a message with a follow-up call', 'Voice is warmer and easier'],
          ['Colleague', 'Direct message or email', 'Keeps it professional and private'],
          ['Wide circle of acquaintances', 'Public post or short message', 'Low effort for both sides'],
        ]],
        'A private message almost always feels more personal than a comment on a public post. If you want to do both, send the private one first.',
      ]],
      ['Timing and time zones', [
        'Messages sent first thing in the morning tend to stand out, because notifications pile up through the day. If the person lives in another time zone, check what time it is for them before sending, since a message at your midnight may arrive during their afternoon or in the middle of their night.',
        'GiftOfy wishes cannot be scheduled. A practical approach is to create the wish a few days early, check the preview, and share the link at the moment you choose.',
      ]],
      ['Sending early or late', [
        '**Early:** fine for a trip or busy period, as long as you say why: “I know you will be away on your birthday, so here is mine early.”',
        '**Late:** better than never. A brief, light note works: “A day late, but I was thinking of you. Happy belated birthday!”',
      ]],
      ['Writing the message', [
        'Use their name, add one specific detail and finish with a wish. For examples by tone, see the [birthday wishes](/birthday-wishes) page, and for the method behind them, the guide to [writing a heartfelt message](/guides/how-to-write-a-heartfelt-message).',
      ]],
      ['When someone gets flooded with greetings', [
        'On a birthday, popular people receive a lot of messages. To stand out, be specific and brief, skip the generic emoji strings, and consider a second message in the evening or the next day, when the flood has passed.',
      ]],
      ['Common mistakes', [
        ['ul', [
          'Posting a public greeting for someone who prefers privacy.',
          'Sending the same copy-pasted message to everyone.',
          'Joking about age without knowing how the person feels about it.',
          'Forgetting that some families and communities do not celebrate birthdays.',
          'Sharing a surprise link in a group chat that includes the recipient.',
        ]],
      ]],
      ['A five-minute plan that works', [
        ['ol', [
          '**A few days ahead:** decide the channel and, if you are using GiftOfy, create the wish and preview it.',
          '**The evening before:** reread the message once. Fix the spelling of the name, which is the mistake people notice most.',
          '**On the day:** send it when the person is likely to see it, ideally in their morning.',
          '**An hour later:** if it is someone close, follow up with a call or a voice note.',
          '**The next day:** if they replied, answer briefly. The conversation does not need to end there.',
        ]],
      ]],
      ['What to write with the link', [
        'The message around the link matters as much as the greeting itself, because it is what the person sees first. Keep it short and curious, and do not reveal the content.',
        ['msgs', [
          'Happy birthday! I made something small for you. Tap it when you have a quiet minute.',
          'There is a little surprise waiting for you at this link. Hope today is a good one.',
          'Birthday wishes, delivered. Open it when you can and tell me what you think.',
        ]],
      ]],
      ['Group birthdays and birthdays at work', [
        'In a team or a large friend group, one person usually coordinates so the birthday person is not flooded and nobody is forgotten. Agree beforehand on a single moment, such as a morning message in the group, and let anyone who wants to add a personal note do it privately. At work, keep to what the whole team would be comfortable reading, and check whether the colleague is happy to have their birthday acknowledged publicly at all.',
      ]],
    ],
    faqs: [
      ['Is a digital birthday greeting less personal than a card?', 'Not necessarily. Personal details make a message personal, not the format. A digital wish can be sent instantly and be opened anywhere, while a card is a keepsake. See the comparison of [digital wishes and greeting cards](/guides/digital-gifts-vs-greeting-cards).'],
      ['What is the best time of day to send?', 'Morning in the recipient’s local time works well for most people. For a surprise, choose a moment when they can open it comfortably, not during work hours.'],
      ['Should I call as well as send a message?', 'For close relatives, yes. A message plus a short call is more meaningful than either alone.'],
    ],
    related: ['birthday-wishes', 'guides/how-to-share-a-digital-greeting', 'guides/creative-ways-to-surprise-someone-online', 'wishes-for-sister'],
  },

  'guides/digital-gifts-vs-greeting-cards': {
    lead: 'Digital wishes and paper greeting cards solve slightly different problems. This comparison looks at cost, speed, personalization, keepsake value and privacy, and explains when each is the better choice. We run a digital wishes service, so we have tried to be even-handed about where paper wins.',
    sections: [
      ['What we mean by digital gifts', [
        '“Digital gift” covers several different things: an e-card or digital wish, an online gift card or voucher, a subscription, or a shared playlist or photo album. GiftOfy offers only the first: personalized digital wishes. It does not sell gift cards, vouchers, subscriptions or physical items, and it does not process payments.',
      ]],
      ['A side-by-side comparison', [
        ['table', [
          ['', 'Digital wish', 'Paper greeting card'],
          ['Cost', 'Free on GiftOfy; no postage', 'Card price plus postage if mailed'],
          ['Speed', 'Instant', 'Days to weeks if mailed'],
          ['Personalization', 'Name, message, design, reveal animation', 'Handwriting, drawings, physical touches'],
          ['Keepsake', 'Link only; you cannot print the wish from GiftOfy', 'Can be kept on a shelf for years'],
          ['Distance', 'Works anywhere with a connection', 'Depends on the postal service'],
          ['Privacy', 'Anyone with the link can open it', 'Only whoever holds the card'],
          ['Accessibility', 'Needs a device and internet', 'Needs nothing but eyes and hands'],
        ]],
      ]],
      ['When a digital wish is the better choice', [
        ['ul', [
          'The occasion is today and the person is far away.',
          'You want to include a reveal or surprise element.',
          'You are sending to someone who lives abroad where post is slow or unreliable.',
          'You want a quick, low-cost way to show you thought of someone.',
        ]],
      ]],
      ['When a paper card is the better choice', [
        ['ul', [
          'The recipient does not use smartphones or the internet.',
          'You want something they can keep and display.',
          'The occasion is formal or traditional, such as a wedding invitation or sympathy.',
          'Handwriting itself is part of the gift.',
        ]],
      ]],
      ['Combining both', [
        'The two are not mutually exclusive. A common approach is to send a digital wish on the day and a card or small gift later. Another is to send the card and use the digital wish to ask them to open it on the day.',
      ]],
      ['A note on environmental claims', [
        'It is common to hear that digital cards are always greener than paper. The truth is more nuanced: paper involves materials, printing and delivery, while digital greetings use device and network energy. Neither is free of impact, so we do not make an environmental claim here. Choose the format that fits the person and the moment.',
      ]],
      ['Three situations, three suggestions', [
        '**A cousin abroad whose birthday is tomorrow.** A paper card will not arrive in time, so a digital wish is the realistic choice. Add a phone call if you can.',
        '**A grandmother who does not use a smartphone.** Send a paper card, and ask a relative to call her on the day. A link is no use to someone who cannot open it.',
        '**A colleague’s farewell.** A short digital message from each team member, plus a card everyone signs in person if the team shares a space, usually works better than either alone.',
      ]],
      ['Questions to ask before you choose', [
        ['ul', [
          'Will the person actually see a link, and are they comfortable opening one?',
          'Does the occasion call for something they will want to keep?',
          'How much time is left before the day?',
          'Would a surprise opening suit this person, or would a quiet card be kinder?',
        ]],
      ]],
    ],
    faqs: [
      ['Does GiftOfy sell gifts?', 'No. GiftOfy creates free digital wishes. It does not sell physical or monetary gifts and does not ask for payment details.'],
      ['Can I print a GiftOfy wish?', 'GiftOfy does not currently offer a print or download feature, so the wish lives at its link. You can take a screenshot yourself if you want to keep a copy.'],
      ['Is a digital wish thoughtful enough?', 'It depends on what you put into it. A specific, sincere message in any format is thoughtful. A generic one is not, whether printed or digital.'],
    ],
    related: ['guides/how-to-send-digital-birthday-greetings', 'guides/ideas-for-meaningful-online-celebrations', 'about', 'how-it-works'],
  },

  'guides/creative-ways-to-surprise-someone-online': {
    lead: 'A surprise does not need to be elaborate to be memorable. This guide offers practical, low-pressure ideas for surprising someone online, from tap-to-reveal messages to coordinated notes from friends, along with advice on when a surprise is a bad idea.',
    sections: [
      ['Start with the person, not the idea', [
        'The best surprises reflect something about the person: a hobby, a joke, a shared memory. A good test is to ask, “Would they smile when they open this, or would they feel they have to respond?” If the second, simplify.',
      ]],
      ['Ideas that work well', [
        ['ul', [
          '**A tap-to-reveal wish.** Part of the pleasure is the moment of opening. GiftOfy wishes open with an occasion-matched object, such as a balloon or an envelope, that the recipient taps to reveal the message.',
          '**An anonymous first message.** GiftOfy’s surprise mode hides your name until they reveal the wish, which adds a guessing game.',
          '**Notes from several people.** Ask friends and family each to send a short message by a set time, then forward them together. GiftOfy wishes come from one sender, so use a shared document or chat for this, or send several wishes.',
          '**A shared playlist or photo album.** Compile songs or pictures tied to your history together.',
          '**A countdown.** Send one small message each day in the days leading to a big date.',
          '**A message to open later.** Send a note and ask them to open it at a specific moment, such as at the end of a hard week.',
        ]],
      ]],
      ['Making a distant surprise feel close', [
        ['ul', [
          'Include a detail from the place they are in, such as their city or a restaurant they like.',
          'Follow up with a call so the surprise leads to a real conversation.',
          'Time it for when they can enjoy it, not during a busy workday.',
        ]],
      ]],
      ['When not to surprise', [
        ['ul', [
          'People who are anxious or dislike attention may feel pressured by a surprise.',
          'Anyone going through a hard time may prefer a quiet message to a big reveal.',
          'Group video surprises need people’s consent. Check before recording or sharing anyone’s face or voice.',
        ]],
      ]],
      ['Keep it respectful and low-pressure', [
        'A good surprise ends well even if the person does not reply. Avoid asking for reactions, and do not share their wish publicly without permission.',
      ]],
      ['A worked example: a three-day countdown', [
        'Suppose a friend is turning thirty and lives in another country. This plan takes about ten minutes in total and costs nothing.',
        ['ol', [
          '**Three days before:** send a short message that says only “Three days to go. Something is coming.”',
          '**Two days before:** send a favorite photo of the two of you, with one line about the day it was taken.',
          '**The day before:** ask for their best time to talk tomorrow, without saying why.',
          '**On the day:** share the personal wish link first thing in their morning, then call at the time you agreed.',
        ]],
        'Each step is small, and none of them asks for anything. The whole sequence builds anticipation without ever feeling like a chore.',
      ]],
      ['Ideas by relationship', [
        ['ul', [
          '**Partner:** a daily one-line note during the week before an anniversary, ending with a wish on the day.',
          '**Parent:** a call arranged with siblings so everyone is online at the same time, plus a message to open afterward.',
          '**Friend:** an inside joke turned into a short wish, sent when they least expect it.',
          '**Colleague:** a short thank-you at the end of a hard project, sent privately, not in the group channel.',
        ]],
      ]],
    ],
    faqs: [
      ['Can I send a GiftOfy wish anonymously?', 'You can leave your name blank, which signs it “Someone who cares”, or use surprise mode to hide your name until the recipient reveals the message.'],
      ['What if the surprise falls flat?', 'Do not apologize at length. A simple follow-up such as “I hope that made you smile” is enough, and the next message can be more personal.'],
      ['Can I combine messages from several people?', 'GiftOfy wishes are from one sender. To combine notes from many people, gather them in a shared document or message thread and forward them together.'],
    ],
    related: ['guides/ideas-for-meaningful-online-celebrations', 'birthday-wishes', 'guides/how-to-share-a-digital-greeting', 'miss-you-messages'],
  },

  'guides/how-to-make-an-anniversary-greeting-special': {
    lead: 'A special anniversary greeting is not about how much you write. It is about whether it sounds like it could only have been written to one person. This guide is a short process for gathering the details, choosing a format and writing something that feels real, for any year and any distance.',
    sections: [
      ['Step 1: Gather ten minutes of memories', [
        'Before writing, spend a few minutes listing things. You will not use them all, but one or two will turn out to be exactly right.',
        ['ul', [
          'Three moments from the last year that made you laugh or feel close.',
          'A place that matters to your relationship.',
          'Something they do that you have come to rely on.',
          'A hard thing you got through together.',
          'One thing you are looking forward to.',
        ]],
      ]],
      ['Step 2: Choose a format', [
        ['ul', [
          '**A short letter:** a few sentences built around one memory.',
          '**A list:** “Ten things I love about our life”, mixing the funny and the tender.',
          '**A then-and-now note:** what you thought on your first anniversary versus now.',
          '**A forward-looking note:** what you want to do together in the coming year.',
        ]],
      ]],
      ['Step 3: Write the first draft quickly', [
        'Write without editing. Then read it as if you were the recipient. Cut any sentence that could be sent to anyone, and keep the ones that only you could have written.',
      ]],
      ['Before and after', [
        '**Before:** “Happy anniversary to the love of my life. I love you so much.”',
        '**After:** “Eight years ago I did not know I would be someone who gets excited about a Sunday grocery run. You did that. Happy anniversary. Here is to many more ordinary Sundays.”',
      ]],
      ['Step 4: Choose the moment', [
        'Morning is a natural time, but a surprise in the middle of a busy day can mean more than one on schedule. If you are using GiftOfy, you can create the wish ahead and send the link at the moment you choose. Surprise mode can hide your name until they reveal the message.',
      ]],
      ['When you are apart', [
        'Name the distance honestly, and include a plan: a call, a visit date, a shared meal at the same time on video. A greeting that points forward feels warmer than one that only describes the gap.',
      ]],
      ['Different stages, different tones', [
        ['ul', [
          '**First anniversary:** fresh and playful, full of firsts.',
          '**Middle years:** acknowledge the ordinary days and the teamwork.',
          '**Milestone years (such as the 25th or 50th):** reflect on the long arc and what you have built.',
        ]],
      ]],
      ['A worked example, from first draft to final', [
        'Say your first draft reads: “Happy anniversary. Thank you for everything. I love you.” Nothing is wrong with it, but nothing in it could only be about the two of you.',
        'Ask three questions: what did we do this year that I want to remember, what do I rely on without saying so, and what do I hope for next? Answers might be a delayed flight that ended with a late-night dinner, the way they always check you got home safely, and a trip you keep postponing. The final version becomes: “Happy anniversary. I will never forget the airport dinner at midnight, or that you texted to ask if I got home safe even when I was in the next room. Let us finally book that trip this year.” It is two sentences longer, and it is unmistakably yours.',
      ]],
      ['Ideas beyond the message', [
        ['ul', [
          'Recreate the place where you met, even in a small way, such as the same café order.',
          'Write the message by hand and send a photo of it, then post the card later.',
          'Plan something together for the coming year and put a date on it.',
          'Say thank you for one specific thing from the past year, out loud.',
        ]],
      ]],
    ],
    faqs: [
      ['What if I am not a good writer?', 'You do not have to be. One honest sentence about a specific memory is stronger than a polished paragraph that could be about anyone.'],
      ['Should I include a gift?', 'It is optional. A thoughtful message can be the gift. If you do add something, keep it modest and personal.'],
      ['Where can I find message ideas?', 'The [anniversary wishes](/anniversary-wishes) page has examples by relationship and stage.'],
    ],
    related: ['anniversary-wishes', 'wishes-for-husband', 'wishes-for-wife', 'guides/how-to-write-a-heartfelt-message'],
  },

  'guides/how-to-share-a-digital-greeting': {
    lead: 'Creating a greeting is half the job. Sharing it well, on the right channel, with the right words alongside, is the other half. This guide covers channels, what to say with the link, privacy basics and what to do if the recipient cannot open it.',
    sections: [
      ['Pick the channel the person actually uses', [
        'Send the link where the recipient is most likely to see it quickly. A message in an app they check once a month is a poor choice for something timely.',
        ['table', [
          ['Channel', 'Good for', 'Watch out for'],
          ['WhatsApp or similar messaging app', 'Close contacts; instant delivery', 'Group chats that include the recipient'],
          ['SMS', 'Older relatives; anyone without a messaging app', 'Long links can be broken across lines'],
          ['Email', 'Colleagues and formal contacts', 'Messages that land in spam or are read late'],
          ['Social media direct message', 'Friends you mainly reach online', 'Public posts are visible to everyone'],
        ]],
      ]],
      ['What to say alongside the link', [
        'Keep it short and do not give the surprise away. For example: “I made something for you. Open it when you have a minute.” Avoid a long introduction that competes with the greeting itself.',
      ]],
      ['Privacy basics', [
        ['ul', [
          'Anyone with a GiftOfy link can open that wish, so share it only with the intended person.',
          'GiftOfy wish pages ask search engines not to index them, and they are not listed anywhere on the site.',
          'Do not post the link publicly if the message is personal.',
          'If a wish contains something you would not want others to see, do not put it in the message.',
        ]],
      ]],
      ['If the recipient cannot open it', [
        ['ol', [
          'Check that the whole link was copied. A link cut off in a message will lead to a not-found page.',
          'Ask them to open it in their regular browser if they are in an app’s built-in viewer.',
          'Check their internet connection.',
          'If it still fails, send the link again or create a fresh wish.',
        ]],
      ]],
      ['After they open it', [
        'The recipient can reply with an optional reaction and a message. Because GiftOfy has no accounts, the reply is delivered as a private link that the recipient can share with you. If you do not hear back, it does not mean they have not seen it; they may simply not have replied.',
      ]],
      ['Sharing in a group chat', [
        'If you are sharing a wish for someone who is in the group, do not post it there, since they will see it first. If it is meant for a group, remember a GiftOfy wish is addressed to one name, so consider sending individual wishes.',
      ]],
      ['Examples of what to say with the link', [
        ['msgs', [
          'I made you something for today. Open it when you have a minute.',
          'No pressure to reply, but I wanted you to have this.',
          'A small thing for a big day. Tap to open.',
        ]],
      ]],
      ['Older relatives and people who are less comfortable online', [
        ['ul', [
          'Tell them in advance a link is coming, so it does not look like spam.',
          'Say what will happen: “tap the balloon and it opens”.',
          'Offer to call and walk them through it, or open it together on a video call.',
          'If they cannot open it, read the message to them. The words matter more than the format.',
        ]],
      ]],
    ],
    faqs: [
      ['Is it safe to share the link on social media?', 'Anyone who sees the link can open the wish, so avoid public posts for personal messages. Use a direct message instead.'],
      ['Why does my link preview look generic?', 'Wish pages use a general GiftOfy preview image and title. This keeps the contents private until the recipient opens the link.'],
      ['Can I send the same link to several people?', 'Yes. Each person will see the same wish. For individual messages, create separate wishes.'],
    ],
    related: ['guides/how-to-create-personalized-digital-wishes', 'faq', 'privacy', 'guides/how-to-send-digital-birthday-greetings'],
  },

  'guides/ideas-for-meaningful-online-celebrations': {
    lead: 'Distance, time zones and busy schedules mean many celebrations now happen partly or entirely online. A virtual celebration can feel warm or awkward depending on how it is planned. This guide offers practical ideas for birthdays, weddings, graduations and holidays, and what to avoid.',
    sections: [
      ['Principles for a celebration that feels real', [
        ['ul', [
          '**Give it a shape.** A start, a high point and an end feel better than an open-ended video call.',
          '**Keep it small.** Fewer people means more conversation.',
          '**Add a ritual.** A shared toast, a song, a moment where everyone says one thing.',
          '**Make it easy.** Test links in advance and help less technical guests.',
        ]],
      ]],
      ['Birthdays', [
        'Schedule a short call at a time that suits the birthday person, send greetings beforehand so they have something to open, and ask each guest to share one memory. A tap-to-open wish makes a good first moment, since it can be opened as the call begins.',
      ]],
      ['Weddings and engagements', [
        'If you cannot attend, send a message in advance and join any online stream if offered. Respect the couple’s wishes about photos and recordings. Afterward, a warm note about what you enjoyed means a lot.',
      ]],
      ['Graduations', [
        'Send a short message before the ceremony and a longer one afterward. If there is a livestream, join and tell them you watched. Avoid questions about next steps on the day itself.',
      ]],
      ['Holidays and festivals', [
        'Time zones make shared meals hard. Consider a shared moment rather than a shared meal, such as lighting candles at the same time, or taking a photo of the table and sending it. See [Eid wishes](/eid-wishes), [Christmas wishes](/christmas-wishes) and [New Year wishes](/new-year-wishes) for greetings.',
      ]],
      ['Including people who are not comfortable with technology', [
        ['ul', [
          'Ask a family member to set up the call or open the wish together.',
          'Use a phone call instead of video if that is easier.',
          'Send a message that does not require any setup beyond opening a link.',
        ]],
      ]],
      ['Keeping a record', [
        'Ask guests for permission before recording. Save the messages people send, and consider printing or saving a few. GiftOfy does not currently offer a print option, so take a screenshot if you want a copy.',
      ]],
      ['A 45-minute virtual birthday, minute by minute', [
        ['ol', [
          '**0 to 5:** everyone joins, the birthday person opens a surprise wish and reads it aloud.',
          '**5 to 20:** each guest shares one memory or wish, around a minute each.',
          '**20 to 35:** a short activity: a quiz about the birthday person, a shared song or a story round.',
          '**35 to 45:** a toast, thanks and a clear end, so nobody has to find the moment to leave.',
        ]],
      ]],
      ['Etiquette for guests', [
        ['ul', [
          'Join on time and mute when you are not speaking.',
          'Keep your contribution short so everyone gets a turn.',
          'Ask before screenshotting or recording anyone.',
          'Follow up privately the next day with something personal.',
        ]],
      ]],
    ],
    faqs: [
      ['How long should a virtual celebration last?', 'Often 30 to 60 minutes is enough. Ending while people are still enjoying it is better than dragging on.'],
      ['How do I include people in different time zones?', 'Pick a time that is reasonable for the majority, and send a message in advance to those who cannot join live.'],
      ['Can I use GiftOfy as part of an online celebration?', 'Yes. A wish can serve as an opening moment or a keepsake. It is not a replacement for a conversation.'],
    ],
    related: ['guides/creative-ways-to-surprise-someone-online', 'guides/digital-gifts-vs-greeting-cards', 'miss-you-messages', 'wedding-wishes'],
  },
};
