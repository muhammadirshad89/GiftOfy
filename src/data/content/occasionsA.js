// Page bodies for occasion pages (batch A). Block syntax is documented in src/components/Prose.jsx:
// a section is [heading, [blocks]]; a block is a string (paragraph) or ['ul'|'ol'|'msgs'|'tip'|'h3', value].
// Inline: **bold** and [label](/path). Apostrophes are typographic (’) so strings stay single-quoted.
export const OCCASIONS_A = {
  'birthday-wishes': {
    lead: 'A good birthday message does not need to be long or clever. It needs to sound like you and to be about the person receiving it. Below are birthday wishes grouped by tone, advice on adapting them, and a simple way to turn any of them into a personalized digital birthday card.',
    sections: [
      ['What makes a birthday message memorable', [
        'A message that says only “happy birthday” does its job, but it is easy to forget by the next morning. The ones people keep or read twice usually contain one real detail: something you noticed about them this year, a shared memory, or a wish aimed at something they are actually working toward.',
        ['ul', [
          'Use their name in the first line instead of opening with a generic greeting.',
          'Add one specific thing: a trip you took together, a joke only the two of you understand, a quality you admire.',
          'Finish with a wish for the year ahead rather than a summary of the year behind.',
          'Keep it short enough to read in one breath. Two or three sentences is plenty for most people.',
        ]],
      ]],
      ['Heartfelt birthday wishes', [
        'Use these for people you are close to: a partner, a best friend, a parent or a sibling. Replace the general line with your own detail wherever you can.',
        ['msgs', [
          'Wishing you a year as bright and wonderful as you are. Happy birthday!',
          'Thank you for being the person I can call at any hour. I hope this year gives you back everything you give to others.',
          'Watching you grow this year has been a privilege. May the next one bring you the things you have been quietly hoping for.',
          'Today I am thinking about how lucky I am to know you. Happy birthday, and thank you for being exactly who you are.',
          'May your birthday be full of laughter, good food and people who love you. You deserve every bit of it.',
        ]],
      ]],
      ['Short birthday wishes', [
        'When a long message would feel forced, or you are writing to a colleague or an acquaintance, one warm line is better than three awkward ones.',
        ['msgs', [
          'Happy birthday! I hope today feels exactly the way you want it to.',
          'Another year older, another year more wonderful. Have the best day!',
          'Wishing you good health, good news and good company this year.',
          'Happy birthday. Eat the cake, ignore your inbox, enjoy the day.',
          'Cheers to you today. Hope it is a great one!',
        ]],
      ]],
      ['Funny birthday wishes', [
        'Humor works best when you know the person well and the joke is gentle. Teasing about age is common, but skip it if you are not sure how the person feels about getting older.',
        ['msgs', [
          'Happy birthday! You are not older, you are just upgraded with more experience and slightly worse knees.',
          'I would say you do not look a day older, but we both know that would be a lie. Happy birthday anyway!',
          'Congratulations on another lap around the sun. Please pace yourself on the cake.',
          'Age is only a number, and yours is looking very impressive this year. Happy birthday!',
        ]],
      ]],
      ['Birthday wishes for milestone ages', [
        'Round-number birthdays such as 18, 21, 30, 40, 50 and beyond tend to make people reflect, so they deserve a little more than the usual line. Acknowledge the milestone without making it about getting older.',
        ['msgs', [
          'Welcome to a new chapter. Everything you have done so far was practice for what comes next. Happy milestone birthday!',
          'A big birthday for a big-hearted person. I hope this year is the one where you do the thing you keep saying you will do.',
          'Some people get better with every decade, and you are proof. Happy birthday!',
          'You have spent years making the people around you feel valued. Today is your turn to feel it back.',
        ]],
      ]],
      ['Choosing the right tone for the person', [
        ['ul', [
          '**Close friend or partner:** personal and warm. Inside jokes are welcome.',
          '**Parent or grandparent:** affectionate and appreciative. Mention something they taught you or a way they showed up for you.',
          '**Colleague or manager:** friendly and brief. Avoid jokes about age or appearance.',
          '**Someone who does not celebrate birthdays:** some families and communities do not mark them. Wish them good health and happiness without the party language, or ask a mutual friend what they prefer.',
        ]],
      ]],
    ],
    faqs: [
      ['How long should a birthday message be?', 'Most birthday messages work best at one to three sentences. For someone very close, a short paragraph with a specific memory is welcome. On GiftOfy the message box allows up to 500 characters, which is enough for a personal note without becoming a speech.'],
      ['What if I forgot and I am sending it late?', 'A late message is still better than none. Say so lightly and keep going, for example: “I am a day late, but I wanted you to know I was thinking of you. Happy belated birthday!” Do not write a long apology, because that shifts attention away from them.'],
      ['Can I schedule a GiftOfy birthday wish to arrive at midnight?', 'Not currently. GiftOfy creates a link as soon as you publish, and you choose when to share it. A practical approach is to create the wish a few days ahead, check the preview, and send the link when the day begins.'],
      ['Can I write my birthday message in another language?', 'Yes. The message box accepts any text your keyboard can type. The sample messages on this page are in English, and GiftOfy’s own interface is in English, so use the preview step to check how your message looks before you publish.'],
    ],
    related: ['guides/how-to-send-digital-birthday-greetings', 'guides/how-to-write-a-heartfelt-message', 'wishes-for-sister', 'wishes-for-brother', 'thank-you-messages'],
  },

  'anniversary-wishes': {
    lead: 'The best anniversary messages are not the longest or the most poetic. They are the ones that could only have been written to one couple. This page offers messages for spouses, partners and long-married relatives, advice on adding a real detail from your own story, and ideas for milestone years.',
    sections: [
      ['Start with something only the two of you would know', [
        'Generic anniversary lines are easy to find, which is exactly why they feel generic. A single concrete detail turns a standard message into a personal one.',
        ['ul', [
          'A place that matters to you both, such as where you met or the first trip you took.',
          'A small ritual, like Sunday coffee or the way one of you always saves the last bite.',
          'A difficult stretch you got through together, said gently and without drama.',
          'A habit of theirs that you have grown to love.',
        ]],
      ]],
      ['Anniversary wishes for your husband, wife or partner', [
        ['msgs', [
          'Here is to another year of choosing each other, again and again. Happy anniversary.',
          'Home stopped being a place and became a person the day I met you. Thank you for another year of it.',
          'I do not need a grand gesture to know how much I love you. I only need ordinary days with you, and I am so grateful for each one.',
          'Through every busy week and quiet evening, you have been my favorite part. Happy anniversary, my love.',
          'Loving you has become the easiest thing I do. Thank you for making our life together feel like an adventure and a refuge at once.',
        ]],
      ]],
      ['Anniversary wishes for a couple you know', [
        'When you are writing to friends, relatives or parents, make the message about them rather than about you. Mention what you have admired in their relationship and wish them something specific.',
        ['msgs', [
          'Watching your love grow over the years has been one of my favorite things. Congratulations on another year together.',
          'You two make partnership look easy and joyful. May the year ahead be gentle and full of laughter.',
          'Happy anniversary to two people who show everyone around them what steady love looks like.',
          'Thinking of you both today. Thank you for being such a warm example of what a marriage can be.',
        ]],
      ]],
      ['A first anniversary versus a long marriage', [
        'In the first year, the tone is often fresh and playful: you are still collecting firsts. After many years, the strongest messages acknowledge endurance and the ordinary days that make up a life together. Many cultures mark the 25th (often called silver) and 50th (golden) anniversaries as especially significant, so those years deserve extra care.',
        ['msgs', [
          'One year down, a lifetime of firsts still ahead. Thank you for the best first year I could have asked for.',
          'After all these years, you are still the person I want to tell everything to first. Happy anniversary.',
          'Fifty years is not just a long time. It is a thousand small decisions to stay kind to one another. Congratulations on your golden anniversary.',
        ]],
      ]],
      ['When you cannot be together', [
        'Distance changes the format, not the feeling. Be specific about what you miss and when you will next be together, so the message points forward rather than only dwelling on the gap.',
        ['msgs', [
          'I wish I could be next to you today, but I am sending every bit of my love across the distance. Counting the days until we celebrate in person.',
          'Even from far away, you are my favorite part of every day. Happy anniversary. Save me the biggest hug.',
        ]],
      ]],
      ['Things to avoid in an anniversary message', [
        ['ul', [
          'Comparing your relationship, or the couple’s, to other couples.',
          'Jokes about marriage being hard, unless the two of you already joke that way.',
          'Mentioning past partners.',
          'Making the message about your own sacrifices instead of your appreciation.',
        ]],
      ]],
    ],
    faqs: [
      ['Can I use these for a dating anniversary or a work anniversary?', 'Yes. For a dating anniversary, use the partner messages as they are. For a work anniversary, choose the shorter, warmer lines and keep the tone professional. The [thank you messages](/thank-you-messages) page has wording that suits colleagues.'],
      ['How long should an anniversary message be?', 'A few sentences are enough. GiftOfy’s message limit is 500 characters, which fits roughly one specific memory plus a wish for the year ahead.'],
      ['What if my partner is not sentimental?', 'Keep it short and sincere, and lean on humor or a shared reference instead of declarations. One true line is stronger than a paragraph that makes them uncomfortable.'],
      ['Can I create the wish before the day and send it later?', 'Yes. A GiftOfy wish exists from the moment you publish it, so you can write it ahead of time, check the preview, and share the link on the day itself. GiftOfy does not currently send wishes on a schedule.'],
    ],
    related: ['guides/how-to-make-an-anniversary-greeting-special', 'wishes-for-husband', 'wishes-for-wife', 'valentine-wishes', 'miss-you-messages'],
  },

  'wedding-wishes': {
    lead: 'A good wedding wish is warm, specific and short enough to read comfortably in a card, a text or a toast. These messages work whether you know the couple well or are sending congratulations from a distance, and the advice below helps you avoid the common stumbles.',
    sections: [
      ['What to write in a wedding message', [
        'You are writing to two people at once, so acknowledge them as a couple. One kind observation plus one simple wish is the whole formula.',
        ['ul', [
          'Name both people, not only the one you know better.',
          'Say one thing you have noticed about them together.',
          'Wish them something concrete: laughter, patience, adventure, a home full of warmth.',
          'If you know their faith or culture, a greeting in that tradition is received warmly. If you are not sure, keep to universal wishes about happiness and partnership.',
        ]],
      ]],
      ['Wedding wishes for the couple', [
        ['msgs', [
          'Wishing you a lifetime of love, laughter and adventures together. Congratulations on your wedding!',
          'May your marriage be full of the small joys that make everyday life feel special.',
          'Today two lives become one story. I hope it is a long and beautiful one.',
          'Congratulations to you both. May you always be each other’s safe place and best friend.',
          'May your home be filled with warmth, your days with kindness and your years with good news.',
        ]],
      ]],
      ['Short wedding messages', [
        'For a quick text, a small card or a group message where space is limited.',
        ['msgs', [
          'Congratulations, newlyweds! So happy for you both.',
          'Here is to a beautiful beginning. Wishing you a lifetime of happiness.',
          'Love, joy and many wonderful years together. Congratulations!',
          'Cheers to the happy couple today and always.',
        ]],
      ]],
      ['Wishes from a friend or relative', [
        'If you know the couple well, personalize. One shared memory does more than three paragraphs of general praise.',
        ['msgs', [
          'I have loved watching the two of you find each other. You bring out the best in one another, and today I could not be happier for you.',
          'I remember when you first told me about them, and I could hear it in your voice. You deserve this happiness completely.',
          'Thank you for letting me share this day with you. Wishing you everything good, always.',
        ]],
      ]],
      ['Respectful wishes across cultures and faiths', [
        'Weddings are celebrated in very different ways around the world, with different words, rituals and expectations. If you know the couple’s tradition, a greeting in that tradition shows care. If you are unsure, these wishes are safe and sincere.',
        ['msgs', [
          'May your union be blessed with peace, understanding and lasting happiness.',
          'May Allah bless you both and bring you together in goodness.',
          'Wishing you a marriage built on respect, friendship and joy.',
        ]],
      ]],
      ['What to avoid in a wedding message', [
        ['ul', [
          'Advice nobody asked for about how to make a marriage work.',
          'Jokes about the couple’s past relationships, or about in-laws.',
          'References to how much the wedding or the gift cost.',
          'Making the message about you, such as how hard it was to travel or what you wore.',
        ]],
      ]],
    ],
    faqs: [
      ['Is it okay to send a wedding wish if I was not invited?', 'Yes, if you are close enough that you would normally exchange news. Keep it short and warm, and make it clear you expect nothing in return.'],
      ['When should I send a wedding message?', 'Any time from a few days before to a few weeks after is fine. Messages sent before the day tend to get noticed, because the wedding day itself brings a flood of notifications.'],
      ['What if I know only one of the two people?', 'Address them both by name anyway, then add a line to the person you know, such as “I have always known you deserved someone wonderful.”'],
      ['What if I cannot attend in person?', 'Say so in one sentence, wish them well, and avoid long excuses. A digital wish is a good way to be present from far away. Share the link by message and it opens on any phone or computer.'],
    ],
    related: ['engagement-wishes', 'anniversary-wishes', 'congratulations-messages', 'guides/how-to-share-a-digital-greeting'],
  },

  'engagement-wishes': {
    lead: 'An engagement wish celebrates a promise rather than a ceremony, so the tone is usually more excited and forward-looking than a wedding message. These examples help you congratulate a newly engaged couple warmly, without the unintentional pressure that engagement chatter often brings.',
    sections: [
      ['How an engagement message differs from a wedding message', [
        'A wedding message looks back on a couple that has arrived. An engagement message looks ahead, so it is about anticipation, not achievement. It is also a more private moment: the couple may still be telling people, planning, or deciding what to share. Keep your message about the happiness, not the logistics.',
      ]],
      ['Engagement wishes for the couple', [
        ['msgs', [
          'Congratulations on your engagement! Here is to the beautiful beginning of forever.',
          'So thrilled for you both. This is only the start of something wonderful.',
          'Two hearts, one wonderful future. Congratulations!',
          'Watching you two together makes it easy to believe in love. Congratulations on the happy news.',
          'Wishing you joy in the planning, patience in the details and a lifetime of happiness beyond them.',
        ]],
      ]],
      ['Short engagement messages', [
        ['msgs', [
          'Congratulations! Such happy news.',
          'So happy for you both. Cheers to the future!',
          'Yes! Wishing you every happiness together.',
          'Beautiful news. Congratulations to you both.',
        ]],
      ]],
      ['For a friend or family member', [
        'If you are close, say what you have seen. People remember when someone reflects back what makes their relationship special.',
        ['msgs', [
          'I have never seen you as happy as you are with them. I am so glad you found each other.',
          'You have always deserved someone who sees you completely. Congratulations. I cannot wait to celebrate with you.',
          'Please tell me everything about how it happened when you are ready. For now, I am simply overjoyed for you both.',
        ]],
      ]],
      ['Questions to avoid in the first days', [
        'Excited friends sometimes ask questions that feel intrusive. Try not to open with these:',
        ['ul', [
          '“When is the wedding?” The couple may not have decided yet.',
          '“How much was the ring?”',
          '“Am I invited?”',
          '“When will you have children?”',
        ]],
        'A kinder question is “How did it happen? I would love to hear the story when you feel like telling it.”',
      ]],
    ],
    faqs: [
      ['Should I wait for the couple to announce before congratulating them?', 'If you heard directly from them, congratulate immediately. If you heard second-hand, it is usually better to wait for them to tell you, or to send a warm message that does not rely on the news being public.'],
      ['Is there a difference between engagement and wedding wishes on GiftOfy?', 'Yes. They are separate occasions with separate designs. An engagement wish opens with a ring the recipient taps, and a wedding wish opens with an envelope.'],
      ['Can I send a wish to just one of the two people?', 'You can, and it is often natural if you are closer to one of them. Mention the other person by name so the message still feels like it is for the couple.'],
    ],
    related: ['wedding-wishes', 'congratulations-messages', 'anniversary-wishes', 'guides/how-to-write-a-heartfelt-message'],
  },

  'eid-wishes': {
    lead: 'Eid Mubarak messages range from short and simple to warm and prayerful. This page covers different tones for different recipients, explains what the two Eids mark, and offers advice for sending greetings to family, friends, colleagues and neighbors, including those far from home.',
    sections: [
      ['Eid al-Fitr and Eid al-Adha: what each marks', [
        'Eid al-Fitr marks the end of Ramadan, the month of fasting. Eid al-Adha, sometimes called the festival of sacrifice, takes place at the end of the Hajj season and commemorates Prophet Ibrahim’s willingness to sacrifice for God. The exact dates depend on the moon sighting and can differ by country, so many communities confirm the day only the night before.',
        '“Eid Mubarak” means “blessed Eid” and is used for both festivals. In some regions people also say “Eid Saeed”. After the Eid prayer, a traditional exchange is “Taqabbal Allahu minna wa minkum”, meaning “May Allah accept from us and from you.”',
      ]],
      ['Short Eid Mubarak messages', [
        ['msgs', [
          'Eid Mubarak! May this day bring you peace, happiness and the company of those you love.',
          'Wishing you and your family a blessed Eid filled with joy and gratitude.',
          'Eid Mubarak. May every moment of today be full of light.',
          'Sending you warm wishes this Eid. May your home be full of laughter.',
          'Eid Mubarak to you and everyone you love!',
        ]],
      ]],
      ['Prayerful Eid messages', [
        'These suit family, elders and friends who would appreciate a dua. Adapt the wording to your own tradition.',
        ['msgs', [
          'Taqabbal Allahu minna wa minkum. May your prayers, fasting and good deeds be accepted.',
          'May Allah bless you with health, peace and success this Eid and always. Ameen.',
          'May the blessings of this Eid fill your home with barakah and your heart with calm. Eid Mubarak.',
          'May Allah forgive our shortcomings, accept our efforts and bring us together again in good health.',
        ]],
      ]],
      ['Eid wishes for colleagues and neighbors', [
        'In a workplace or mixed neighborhood, keep the message warm and simple. A sincere “Eid Mubarak” is almost always welcome, and no extra explanation is needed.',
        ['msgs', [
          'Eid Mubarak! Wishing you and your family a joyful celebration.',
          'Thinking of you today. I hope you have a peaceful Eid with the people you care about.',
          'Happy Eid! Enjoy the time with family. See you soon.',
        ]],
      ]],
      ['If you are far from family this Eid', [
        'Eid is a family festival, so being away can feel especially heavy. A message that names the distance directly, and makes a plan for the next time you meet, tends to land better than pretending the gap is not there.',
        ['msgs', [
          'I am missing you all today. I will be thinking of the table you are all sitting around. Eid Mubarak, and save me some sweets.',
          'Wherever I am, my Eid starts with you. I love you and I cannot wait until we celebrate together again.',
        ]],
      ]],
      ['A few etiquette notes', [
        ['ul', [
          'If you are not Muslim, a simple “Eid Mubarak” is welcome and kind. You do not need to say more.',
          'Wait until the day is confirmed locally before sending, since the date can be announced late. Sending on the morning is safe.',
          'If someone replies “Khair Mubarak” (common in many South Asian communities) or “Eid Mubarak to you too”, that is simply the greeting returned.',
        ]],
      ]],
    ],
    faqs: [
      ['Is “Eid Mubarak” right for both Eid al-Fitr and Eid al-Adha?', 'Yes. “Eid Mubarak” is used for both. If you want to be specific, add “Eid al-Fitr” or “Eid al-Adha” in your personalized message.'],
      ['What do I say in reply to Eid Mubarak?', 'You can say “Eid Mubarak to you too” or simply thank them. In many South Asian communities people also say “Khair Mubarak”.'],
      ['Does GiftOfy have Eid designs?', 'Yes. Eid is one of GiftOfy’s occasions, with its own designs. The wish opens with a crescent moon the recipient taps to reveal your message.'],
      ['Can I write my Eid message in Arabic or Urdu?', 'The message box accepts text in any language your keyboard supports. GiftOfy’s layout is designed for English, so use the preview step to check how your message looks before you publish it.'],
    ],
    related: ['mothers-day-wishes', 'friendship-messages', 'miss-you-messages', 'guides/ideas-for-meaningful-online-celebrations'],
  },

  'valentine-wishes': {
    lead: 'Valentine’s Day is for partners, but also for new relationships, close friends and family. These messages cover sincere, playful and gentle tones, with advice on what to avoid, so you can say something warm that fits where your relationship actually is.',
    sections: [
      ['Valentine’s Day is not only for couples', [
        'For some people it is a day of grand gestures. For others it is an awkward reminder. A good message does not assume which kind of day the other person is having, and it does not pressure them to respond in a particular way.',
      ]],
      ['Messages for a partner', [
        ['msgs', [
          'You make ordinary days feel like Valentine’s Day. I love you.',
          'Happy Valentine’s Day to the person who makes my heart the happiest.',
          'Grateful for you today and every day. Thank you for loving me the way you do.',
          'Some hearts are just meant to find each other. I am so glad mine found yours.',
          'I do not need a special day to tell you I love you, but I am glad this one gives me an excuse.',
        ]],
      ]],
      ['Playful and light-hearted', [
        ['msgs', [
          'Roses are red, my phone is on low, but I will always find the energy to text you hello.',
          'You are my favorite notification. Happy Valentine’s Day.',
          'If love were a snack, you would be the one I would never share. Happy Valentine’s Day!',
        ]],
      ]],
      ['For a new relationship or a crush', [
        'Keep it light and low-pressure. A message that invites rather than declares is easier to answer honestly, whichever way the answer goes.',
        ['msgs', [
          'I have really enjoyed getting to know you. Happy Valentine’s Day, and I hope your day is a good one.',
          'No pressure, just a smile for your day. You have made my last few weeks brighter.',
          'Thinking of you today. I would love to take you for coffee sometime, if you would like that.',
        ]],
      ]],
      ['For friends and family', [
        'Love comes in many forms. A message to a friend or relative can be a gentle reminder that they matter to you.',
        ['msgs', [
          'Not every love story is romantic. Thank you for being one of the best relationships in my life.',
          'Happy Valentine’s Day to a friend who makes the world feel a little warmer.',
          'You are loved more than you know. I hope today reminds you of that.',
        ]],
      ]],
      ['What to avoid', [
        ['ul', [
          'Pressure, guilt or hints about what you expect in return.',
          'Declaring strong feelings to someone who has not signaled the same.',
          'Generic copy-and-paste lines that could be sent to anyone. People notice.',
          'Comparing the day to what other couples are doing.',
        ]],
      ]],
    ],
    faqs: [
      ['Can I send a Valentine’s wish to a friend, not only a partner?', 'Yes. Pick the gentle friendship messages above, or use the [friendship messages](/friendship-messages) page for wording that is warm without being romantic.'],
      ['What if I am not in a relationship on Valentine’s Day?', 'Send a message to someone you appreciate, such as a friend, a sibling or a parent. Valentine’s Day does not have to be only romantic.'],
      ['Is Valentine’s Day celebrated everywhere?', 'No. Customs differ widely, and in some places it is not widely observed. If you are unsure how the recipient or their family feels about it, a private message sent directly to them is usually the safest approach.'],
      ['Should I send a digital wish or a paper card?', 'Either, or both. A digital wish can be sent instantly and opens on any phone, while a paper card is a keepsake. The guide to [digital wishes versus greeting cards](/guides/digital-gifts-vs-greeting-cards) compares the two.'],
    ],
    related: ['anniversary-wishes', 'wishes-for-girlfriend', 'wishes-for-boyfriend', 'friendship-messages', 'miss-you-messages'],
  },
};
