// Page bodies for recipient pages ("wishes for ..."). Each targets what to say to one specific person
// across occasions, so it adds advice about that relationship rather than repeating an occasion page.
// `ctas` are [occasionId, label] pairs used for the create-a-wish links on the page.
export const RECIPIENT_BODIES = {
  'wishes-for-mother': {
    lead: 'Mothers are often the people we thank least precisely because they do the most. These messages are for birthdays, thank-yous and ordinary days, with advice for saying what you mean when the relationship is warm, formal or complicated.',
    ctas: [['mothers', 'Mother’s Day'], ['birthday', 'Birthday'], ['thanks', 'Thank You']],
    sections: [
      ['What mothers usually want to hear', [
        'Most mothers do not need an elaborate message. They want evidence that you notice what they have done and that you are doing well. Gratitude, a specific memory and a line about how they are doing as a person, not only as a parent, tend to land best.',
      ]],
      ['Birthday messages for your mother', [
        ['msgs', [
          'Happy birthday, Mum. I hope today is about you, with no chores and no worries.',
          'Another year of you being the heart of our family. I love you, and I hope this year gives back everything you give.',
          'You taught me to be kind before clever. I am still learning. Happy birthday.',
        ]],
      ]],
      ['Thank-you messages for your mother', [
        ['msgs', [
          'I did not understand how much you did until I had to do it myself. Thank you for all of it.',
          'Thank you for never giving up on me, even when I was impossible to deal with.',
          'Every time I am unsure what to do, I hear your voice. Thank you for that.',
        ]],
      ]],
      ['Just-because messages', [
        ['msgs', [
          'Nothing special today. I just wanted to tell you I love you.',
          'I was cooking your recipe today and thought of you. Call me when you are free.',
        ]],
      ]],
      ['When your relationship is difficult', [
        'Not every relationship with a mother is simple. If yours is strained, a short, honest message that does not pretend things are perfect is better than an effusive one. Name something real you are grateful for, or simply say you are thinking of them.',
        ['msgs', [
          'I know things have not always been easy between us. I wanted you to know I am thinking of you and I hope you are well.',
          'Whatever has happened, I am grateful for the things you taught me. I hope your day is peaceful.',
        ]],
      ]],
      ['When your mother is far away', [
        ['ul', [
          'Send a message and follow it with a call, so it feels like a conversation and not a delivery.',
          'Include a photo of something from your daily life that she would enjoy.',
          'Share a plan, such as when you will next visit, so the message points toward something.',
        ]],
      ]],
      ['Questions that open a better conversation', [
        'A message gets more meaningful when it invites a reply. Ending with a question gives her something to answer other than “thank you”.',
        ['ul', [
          'What is one thing from your childhood that you would like me to know more about?',
          'What are you most looking forward to this year?',
          'Which family recipe should I learn properly this time?',
        ]],
      ]],
    ],
    faqs: [
      ['Which occasion should I choose on GiftOfy for a message to my mother?', 'Choose Mother’s Day for that day, Birthday for her birthday, or Thank You for a general message. If none fits, Just Because works for any ordinary day.'],
      ['Should I write in her language?', 'If she is more comfortable in another language, yes. A message in the language she grew up with can feel more personal. Use the GiftOfy preview to check how it looks.'],
      ['What if my mother is not comfortable with technology?', 'The recipient only needs to open a link. You can send it to a family member to show her, or open it on a video call together.'],
    ],
    related: ['mothers-day-wishes', 'thank-you-messages', 'birthday-wishes', 'miss-you-messages'],
  },

  'wishes-for-father': {
    lead: 'Fathers and children often show care through actions and avoid saying it aloud. Here are messages that fit that style: short, specific and sincere, for birthdays, thank-yous and ordinary days, with advice for dads who are reserved and children who are too.',
    ctas: [['fathers', 'Father’s Day'], ['birthday', 'Birthday'], ['thanks', 'Thank You']],
    sections: [
      ['Writing to a father who is not a big talker', [
        'If your father rarely says what he feels, an emotional paragraph may make him uncomfortable. Match his register. One specific memory and one plain sentence of appreciation is often more moving than three paragraphs of sentiment.',
      ]],
      ['Birthday messages for your father', [
        ['msgs', [
          'Happy birthday, Dad. Thank you for being a steady presence in my life. Hope you take today easy.',
          'Another year wiser, and still the one I call first when something goes wrong. Happy birthday.',
          'To the man who taught me how to fix things and how to keep going: happy birthday, and thank you.',
        ]],
      ]],
      ['Thank-you messages for your father', [
        ['msgs', [
          'Thank you for the early mornings, the long drives and the quiet sacrifices. I notice them now.',
          'I know you do not like fuss, so I will keep this short: thank you, and I love you.',
          'I try to be as dependable as you are. Thank you for the example.',
        ]],
      ]],
      ['Messages for a father who is far away', [
        ['msgs', [
          'I miss our long conversations and the silences in between. Call me this weekend?',
          'Wherever I am, I carry your advice with me. Take care of yourself, Dad.',
        ]],
      ]],
      ['If he is unwell or aging', [
        'Reversing roles is hard for both of you. Keep the tone respectful and warm, and avoid language that treats him as fragile.',
        ['msgs', [
          'I hope you are taking care of yourself the way you always taught me to. I am proud to be your child.',
          'Thank you for everything you have done. Whatever you need, I am here.',
        ]],
      ]],
      ['Ideas that go beyond a message', [
        ['ul', [
          'Ask him to tell a story from before you were born, and write down what he says.',
          'Send a photo of something he taught you to do, along with a line about it.',
          'Call during something he enjoys, such as a match or a favorite programme, so the call is not an interruption.',
          'Fix or finish one small thing he has been meaning to do, and tell him you thought of him.',
        ]],
      ]],
    ],
    faqs: [
      ['Which GiftOfy occasion fits a message to my father?', 'Use Father’s Day on that day, Birthday for his birthday and Thank You for a general message.'],
      ['What if I am not close to my father?', 'Send something short and honest, such as “I am thinking of you and I hope you are well.” You do not need to claim more closeness than you feel.'],
      ['Is it okay to add humor?', 'Yes, if your family uses it. Keep the closing line sincere so the joke does not hide the point.'],
    ],
    related: ['fathers-day-wishes', 'thank-you-messages', 'birthday-wishes', 'guides/how-to-write-a-heartfelt-message'],
  },

  'wishes-for-husband': {
    lead: 'After years together, the hardest part of writing to a husband is avoiding the same lines you have used before. These messages for birthdays, anniversaries and ordinary days aim at saying something specific and true, and the advice below helps you move past clichés.',
    ctas: [['anniversary', 'Anniversary'], ['birthday', 'Birthday'], ['romantic', 'Romantic']],
    sections: [
      ['Say what you notice, not what you feel in general', [
        'General statements such as “you are the best husband” are pleasant but easy to forget. Describe what you have actually seen: how he handles a bad day, what he does for the family, what you rely on without saying.',
      ]],
      ['Birthday messages for your husband', [
        ['msgs', [
          'Happy birthday to the man who makes our home feel like home. I love you more every year.',
          'Another year of you, and I would not trade a single day. Happy birthday, my love.',
          'Thank you for being patient, funny and kind. Today is all about you.',
        ]],
      ]],
      ['Anniversary and appreciation messages', [
        ['msgs', [
          'You are my partner in everything, including the boring parts. Thank you for choosing this life with me.',
          'I do not say it enough: I am grateful for what you do for us. Happy anniversary.',
          'You make hard days lighter and good days better. I am so glad it is you.',
        ]],
      ]],
      ['Playful messages', [
        ['msgs', [
          'You are still my favorite person to sit in silence with. Happy birthday!',
          'Thank you for pretending my cooking is good. It means everything.',
        ]],
      ]],
      ['When things have been difficult', [
        'Every marriage has stretches that are hard. A message that acknowledges that, gently and without blame, can be a quiet way to reconnect.',
        ['msgs', [
          'I know the last while has been hard. I want you to know I am still on your side, and I am grateful for you.',
          'Whatever else is going on, I love you. Let us find our way back to laughing together.',
        ]],
      ]],
      ['Small habits that make a message land', [
        ['ul', [
          'Send it at an unexpected moment, such as mid-afternoon on a weekday.',
          'Mention something from the past week so it does not feel like a template.',
          'Avoid using the same wording as your last anniversary message.',
        ]],
      ]],
      ['What to do after you send it', [
        ['ul', [
          'Do not wait for a particular reaction. Some people respond immediately and others save it for later.',
          'Mention it lightly in the evening, such as “Did you see my message?”, instead of asking for a response.',
          'If he replies with a joke, accept it: it may be how he says thank you.',
        ]],
      ]],
    ],
    faqs: [
      ['What is the best occasion on GiftOfy for a husband?', 'Anniversary or Birthday for those days. Romantic is a good choice for an ordinary day with no occasion.'],
      ['How long should the message be?', 'Short and specific beats long and general. GiftOfy’s limit of 500 characters is enough for one memory and one wish.'],
      ['Can I keep my name hidden until he opens it?', 'Yes. GiftOfy has a surprise mode that hides the sender’s name until the recipient reveals the message.'],
    ],
    related: ['anniversary-wishes', 'wishes-for-wife', 'valentine-wishes', 'guides/how-to-make-an-anniversary-greeting-special'],
  },

  'wishes-for-wife': {
    lead: 'A message to your wife lands best when it reflects something you have really noticed. These examples for birthdays, anniversaries and everyday appreciation focus on specifics, with advice for avoiding the generic lines that are easy to write and easy to forget.',
    ctas: [['anniversary', 'Anniversary'], ['birthday', 'Birthday'], ['romantic', 'Romantic']],
    sections: [
      ['Notice what she does that goes unseen', [
        'In many households a lot of the work of keeping life running goes unnoticed. If you can name something she does that you rarely mention, such as how she remembers everyone’s birthdays or manages the calendar, your message will land with extra weight.',
      ]],
      ['Birthday messages for your wife', [
        ['msgs', [
          'Happy birthday to the woman who makes every room warmer. I love you, and I hope today is yours.',
          'Another year of you, and I am more grateful than ever. Happy birthday, my love.',
          'Thank you for everything you carry, seen and unseen. Today, let someone carry you.',
        ]],
      ]],
      ['Anniversary and appreciation messages', [
        ['msgs', [
          'You are the best decision I have ever made. Happy anniversary.',
          'You have made my life richer in ways I could not have planned. Thank you for every day.',
          'I notice how much you do, and I want you to know it matters to me.',
        ]],
      ]],
      ['Playful messages', [
        ['msgs', [
          'You laugh at my jokes when nobody else does. That is real love. Happy birthday!',
          'Thank you for being my partner, my translator and my reminder to eat vegetables.',
        ]],
      ]],
      ['After a hard stretch', [
        ['msgs', [
          'I know it has been a lot lately. You handled it with more grace than I could have. Thank you.',
          'I am proud of you and I am on your side. Let us take a day off from everything.',
        ]],
      ]],
      ['Avoiding clichés', [
        ['ul', [
          'Replace “you are my everything” with a concrete example.',
          'Do not copy a message you have seen online word for word. She will often recognize it.',
          'Avoid comparing her to other women or to a past version of herself.',
        ]],
      ]],
      ['Giving a message more weight', [
        ['ul', [
          'Pair it with an action: take over a task she dislikes for a week, or plan an evening she does not have to organize.',
          'Mention something she did that was difficult and that she did well.',
          'Say it in person as well, because a message plus a conversation counts for more than either alone.',
        ]],
      ]],
    ],
    faqs: [
      ['Which occasion should I choose on GiftOfy for my wife?', 'Birthday or Anniversary for those days, or Romantic for any ordinary day.'],
      ['Can I send one if we are in a long-distance marriage?', 'Yes. It is a good way to be present across the distance. Include something from your day and a plan for when you will be together.'],
      ['What if I am not good at writing?', 'Keep it simple. One honest sentence with a specific detail is better than a long message that does not sound like you. The guide on [writing a heartfelt message](/guides/how-to-write-a-heartfelt-message) can help.'],
    ],
    related: ['anniversary-wishes', 'wishes-for-husband', 'valentine-wishes', 'birthday-wishes'],
  },

  'wishes-for-boyfriend': {
    lead: 'Writing to a boyfriend means matching the message to the stage of your relationship. A new relationship wants light and warm. A long one can be more personal. These messages for birthdays, anniversaries and ordinary days cover both, with tips for sounding like yourself.',
    ctas: [['birthday', 'Birthday'], ['anniversary', 'Anniversary'], ['romantic', 'Romantic']],
    sections: [
      ['Match the message to where you are', [
        ['ul', [
          '**Early on:** keep it light and kind. Avoid big declarations that put pressure on him.',
          '**Established:** be more specific. Mention something you have noticed or shared.',
          '**Long-term:** acknowledge what you have built and what you look forward to.',
        ]],
      ]],
      ['Birthday messages for your boyfriend', [
        ['msgs', [
          'Happy birthday! I am so glad I get to celebrate you. I hope it is a great one.',
          'You make the ordinary days my favorites. Happy birthday to someone who deserves the best.',
          'Another year of you being thoughtful, funny and kind. I am lucky to know you.',
        ]],
      ]],
      ['Anniversary messages for your boyfriend', [
        ['msgs', [
          'Thank you for the best months of my life so far. I cannot wait for what is next.',
          'I still smile when I think of how we met. Happy anniversary.',
        ]],
      ]],
      ['Sweet, everyday messages', [
        ['msgs', [
          'Just thinking about you. Hope your day is going well.',
          'You are the first person I want to tell good news to. That says a lot.',
          'I appreciate how you listen. Thank you for being you.',
        ]],
      ]],
      ['Funny messages', [
        ['msgs', [
          'Happy birthday! Please accept this message as a substitute for the gift I forgot to wrap.',
          'You are old enough to know better and young enough not to care. Perfect combination.',
        ]],
      ]],
      ['Long-distance couples', [
        ['msgs', [
          'Missing you today. I cannot wait to see your face in person.',
          'We are far apart, but you are always close. Counting down to the next visit.',
        ]],
      ]],
      ['Mistakes that make a message fall flat', [
        ['ul', [
          'Copying a famous quote that has no connection to the two of you.',
          'Making the message so long that he feels he must reply in kind.',
          'Using a pet name you do not normally use, which can feel performed.',
          'Posting publicly before checking he is comfortable with it.',
        ]],
      ]],
    ],
    faqs: [
      ['What if we have only been dating a short time?', 'Keep it warm and simple, and avoid strong declarations. A thoughtful, low-pressure message shows care without overwhelming.'],
      ['Which GiftOfy occasion should I choose?', 'Birthday or Anniversary for those days, and Romantic for an ordinary day. Surprise mode can hide your name until he opens the message.'],
      ['Can he reply?', 'Yes. After opening the wish, the recipient can send a private reply with an optional reaction.'],
    ],
    related: ['wishes-for-girlfriend', 'valentine-wishes', 'anniversary-wishes', 'miss-you-messages'],
  },

  'wishes-for-girlfriend': {
    lead: 'The right message for a girlfriend depends on how long you have been together and how she likes to be told. These messages for birthdays, anniversaries and everyday moments aim at being affectionate and specific, without sounding like a template.',
    ctas: [['birthday', 'Birthday'], ['anniversary', 'Anniversary'], ['romantic', 'Romantic']],
    sections: [
      ['Specifics beat superlatives', [
        'Telling someone she is the best is easy and easy to dismiss. Telling her what you noticed, such as how she handled a stressful week or what made you laugh, shows that you pay attention.',
      ]],
      ['Birthday messages for your girlfriend', [
        ['msgs', [
          'Happy birthday to someone who makes my days brighter. I hope today feels as special as you are.',
          'You are one of the best parts of my life. Happy birthday, and thank you for being you.',
          'Another year of your laughter, your kindness and your stubbornness. I would not change any of it.',
        ]],
      ]],
      ['Anniversary messages for your girlfriend', [
        ['msgs', [
          'Looking back, every moment with you has been better than the last. Happy anniversary.',
          'Thank you for making me a better person. I love where we are going.',
        ]],
      ]],
      ['Everyday messages', [
        ['msgs', [
          'Just a reminder that I am thinking of you and I am proud of you.',
          'Hope your day is a gentle one. I am here if you want to talk about it.',
          'You make me laugh more than anyone I know. Thank you for that.',
        ]],
      ]],
      ['Playful messages', [
        ['msgs', [
          'Happy birthday! Your gift is on its way. Your message is already here.',
          'Another year older and still the person I would pick for every team.',
        ]],
      ]],
      ['When she is having a hard time', [
        ['msgs', [
          'You do not have to be okay today. I am here either way.',
          'Whatever you are carrying, you do not have to carry it alone.',
        ]],
      ]],
      ['Small touches that feel personal', [
        ['ul', [
          'Refer to something she mentioned in passing last week. It shows you listen.',
          'Use a nickname only the two of you use, if she likes it.',
          'Keep the message in her style: playful if she is playful, straightforward if she is private.',
          'Send it at a quiet moment, not in the middle of her workday.',
        ]],
      ]],
    ],
    faqs: [
      ['How personal should the message be?', 'As personal as your relationship is. One shared memory or inside joke makes any message feel real.'],
      ['Which GiftOfy design should I choose?', 'Romantic designs suit a heartfelt note, while the playful and cute styles suit lighter messages. You can preview the wish before you publish it.'],
      ['Can I keep my name hidden at first?', 'Yes. Surprise mode hides the sender’s name until the recipient reveals the message.'],
    ],
    related: ['wishes-for-boyfriend', 'valentine-wishes', 'anniversary-wishes', 'birthday-wishes'],
  },

  'wishes-for-brother': {
    lead: 'Sibling relationships are often built on teasing, which can make sincerity feel unnatural. These messages for brothers combine humor and appreciation for birthdays, achievements and ordinary days, including brothers who tease you and brothers who rarely talk.',
    ctas: [['birthday', 'Birthday'], ['congrats', 'Congratulations'], ['thanks', 'Thank You']],
    sections: [
      ['Humor first, sincerity second', [
        'If you and your brother communicate through jokes, start with one and end with something real. The warmth lands better when the joke has already lowered the guard.',
      ]],
      ['Birthday messages for your brother', [
        ['msgs', [
          'Happy birthday to the brother who has been annoying me and protecting me since forever.',
          'Another year older, and still the one I would call first when something goes wrong. Happy birthday.',
          'I may not say it often, but I am proud to be your sibling. Have a great day.',
        ]],
      ]],
      ['Messages for achievements', [
        ['msgs', [
          'You worked hard for this and you earned it. I am really proud of you.',
          'I used to think I was the successful sibling. Congratulations, you have officially taken the title.',
        ]],
      ]],
      ['Thank-you messages for your brother', [
        ['msgs', [
          'Thank you for always having my back. I noticed, even when I did not say so.',
          'You taught me how to stand up for myself. I am grateful for that every day.',
        ]],
      ]],
      ['If you do not talk often', [
        'Distance or busy lives can leave siblings out of touch. A short, low-pressure message can restart contact without any big conversation.',
        ['msgs', [
          'I was thinking of you today and realized it has been too long. How are you doing?',
          'No reason for this message except that I miss you. Call me sometime.',
        ]],
      ]],
      ['Ways to reconnect without forcing it', [
        ['ul', [
          'Send something that needs no answer, such as a photo or a link to a thing you would both find funny.',
          'Suggest a low-effort plan, such as watching a match at the same time on a call.',
          'Mention a shared memory instead of asking how he has been, which can feel like a form to fill in.',
        ]],
      ]],
    ],
    faqs: [
      ['Is it okay to keep the message short and funny?', 'Yes. For many siblings humor is the natural language. Add one sincere line to make it count.'],
      ['Which occasion should I choose on GiftOfy?', 'Birthday for his birthday, Congratulations for an achievement, or Thank You for a general message.'],
      ['What if we are not on good terms?', 'Send something brief and honest, such as “I am thinking of you and I hope you are well.” Do not try to resolve everything in one message.'],
    ],
    related: ['wishes-for-sister', 'birthday-wishes', 'graduation-wishes', 'friendship-messages'],
  },

  'wishes-for-sister': {
    lead: 'A sister can be a rival, a confidante and a best friend, sometimes in the same week. These messages for birthdays, milestones and ordinary days suit sisters who are close, sisters who are distant and everything in between.',
    ctas: [['birthday', 'Birthday'], ['congrats', 'Congratulations'], ['thanks', 'Thank You']],
    sections: [
      ['Mention a shared memory', [
        'Sisters often share a private history of jokes, secrets and childhood scenes. A reference to one of them does more than any general compliment, because only the two of you will understand it.',
      ]],
      ['Birthday messages for your sister', [
        ['msgs', [
          'Happy birthday to my first friend and forever partner in crime. I am so glad you are my sister.',
          'You have been there for every version of me. Thank you, and have a wonderful day.',
          'Another year of you being brilliant and stubborn in the best way. Happy birthday!',
        ]],
      ]],
      ['Messages for a milestone', [
        ['msgs', [
          'I watched how hard you worked for this, and I could not be prouder. Congratulations.',
          'You are going to be amazing at this next chapter. I am in your corner always.',
        ]],
      ]],
      ['Thank-you messages for your sister', [
        ['msgs', [
          'Thank you for knowing what I mean even when I do not say it. Nobody else does that.',
          'You showed up when it mattered. I will never forget it.',
        ]],
      ]],
      ['If you live far apart', [
        ['msgs', [
          'Missing you more than I admit. Call me tonight and tell me everything.',
          'Distance does not change that you are one of the most important people in my life.',
        ]],
      ]],
      ['If you are not close', [
        'Not all sisters are friends. If you are not close, a gentle message with no demands can leave the door open.',
        ['msgs', [
          'I am thinking of you today. I hope the year ahead is good to you.',
          'I know we have our differences, but I wanted you to know I wish you well.',
        ]],
      ]],
      ['Making it feel like it is only for her', [
        ['ul', [
          'Use a nickname or a phrase from your childhood.',
          'Mention something you admire in her that she probably does not hear from others.',
          'Remember a day, not a year: “the afternoon we got lost on the way to Nani’s” says more than “all these years”.',
        ]],
      ]],
    ],
    faqs: [
      ['Which GiftOfy occasion should I choose?', 'Birthday for her birthday, Congratulations for an achievement and Thank You for a general message. Friendship also works if you are best friends.'],
      ['Can I send one to my sister on her wedding?', 'Yes. Choose Wedding and personalize it with a memory. See [wedding wishes](/wedding-wishes) for more ideas.'],
      ['Can she reply privately?', 'Yes. After opening the wish, the recipient can send a private reply.'],
    ],
    related: ['wishes-for-brother', 'birthday-wishes', 'wedding-wishes', 'friendship-messages'],
  },

  'wishes-for-colleagues': {
    lead: 'Workplace messages need to be warm without being intrusive. These examples for birthdays, new jobs, farewells, thank-yous and holidays help you write something friendly and professional, with advice on tone, cultural differences and what to skip.',
    ctas: [['thanks', 'Thank You'], ['congrats', 'Congratulations'], ['bestwishes', 'Best Wishes']],
    sections: [
      ['Warm but professional', [
        'A good workplace message is short, specific and free of anything that could be misread. Avoid jokes about age, appearance, family status or religion, and keep it appropriate for the whole team to read if it were shared.',
      ]],
      ['Birthday messages for a colleague', [
        ['msgs', [
          'Happy birthday! Hope you get to enjoy the day and eat some cake.',
          'Wishing you a wonderful birthday and a great year ahead. Thank you for being such a great teammate.',
          'Happy birthday! Take a proper break today. You have earned it.',
        ]],
      ]],
      ['New job, promotion or farewell', [
        ['msgs', [
          'Congratulations on your promotion. It is well deserved, and the team is lucky to have you.',
          'We will miss you, and we are excited for your next step. Thank you for everything you brought to the team.',
          'Best of luck in your new role. Keep in touch!',
        ]],
      ]],
      ['Thank-you messages for a colleague or manager', [
        ['msgs', [
          'Thank you for your support on this project. It made a real difference.',
          'I appreciate how clearly you explained everything. It saved me a lot of time.',
        ]],
      ]],
      ['Holiday and festival greetings', [
        'In diverse teams, colleagues celebrate different holidays. If you do not know what someone celebrates, a general greeting is safe. If you do know, a greeting for their festival shows you noticed.',
        ['msgs', [
          'Wishing you a restful break and a good start to the new year.',
          'Eid Mubarak to you and your family. Hope you enjoy the celebrations.',
          'Happy holidays. Thank you for a great year working together.',
        ]],
      ]],
      ['Messages for remote teams', [
        ['ul', [
          'Mention the time zone if it matters, such as “hope your day is going well wherever you are”.',
          'Add one human detail, since remote relationships can feel transactional.',
          'Keep it short and easy to acknowledge.',
        ]],
      ]],
      ['What not to send at work', [
        ['ul', [
          'Anything that comments on appearance, age, relationship status or family.',
          'Inside jokes that only part of the team will understand.',
          'Messages that put someone on the spot to reply in public.',
          'Long personal messages to someone you rarely work with.',
        ]],
      ]],
    ],
    faqs: [
      ['Is it appropriate to send a personal wish to a manager?', 'Yes, if it is respectful and specific. Thank-you and congratulations messages are almost always welcome.'],
      ['Can I use GiftOfy for a work message?', 'Yes. Choose a simple, calm design and keep the message professional. GiftOfy has a Thank You occasion that suits colleagues and mentors.'],
      ['Should I send one message to the whole team?', 'A GiftOfy wish is addressed to one recipient, so send individual wishes if you want them to feel personal. For a whole team, a group chat message is more practical.'],
    ],
    related: ['thank-you-messages', 'congratulations-messages', 'good-luck-wishes', 'new-year-wishes'],
  },
};
