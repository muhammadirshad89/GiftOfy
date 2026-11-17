// Bodies for the About, FAQ, How it works, Contact, Editorial standards, Privacy and Terms pages.
// Block syntax: see src/components/Prose.jsx. Every statement here was checked against the code
// (src/services, supabase/*.sql, index.html, middleware.js). If behavior changes, change the text.
import { CONTACT_EMAIL, OWNER_NAME } from './siteConfig.js';

// " or by email at <link>" when an official email is configured, otherwise nothing.
const EMAIL_OR = CONTACT_EMAIL ? ` or by email at [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})` : '';

export const CORE_BODIES = {
  about: {
    lead: 'GiftOfy is a free website for creating personalized digital wishes. You pick an occasion and a design, write a message, and share a link. The person you send it to taps to reveal it and can send a private reply. No account is needed by either side.',
    sections: [
      ['What GiftOfy does', [
        'GiftOfy turns a few kind words into something that feels like an event. Instead of a plain text message, the recipient opens a link and sees an occasion-matched surprise, such as a balloon for a birthday or an envelope for a wedding, and then the wish you wrote for them. It is designed for people who want to mark a moment without the cost or delay of a paper card.',
        ['ul', [
          'Choose from {occasions} occasions and {templates} free designs.',
          'Write your own message or start from a template, up to 500 characters.',
          'Keep your name hidden until the recipient reveals the wish, if you want a surprise.',
          'Share by WhatsApp, Facebook, copy link or your phone’s share sheet.',
          'The recipient can react and reply, and replies come back as a private link.',
        ]],
      ]],
      ['Who it is for', [
        'GiftOfy is for anyone who wants to send a thoughtful message to someone who matters to them, particularly across distance: family abroad, friends in other time zones, partners in long-distance relationships and colleagues who work remotely. The service and its guides are written in English. Wishes themselves can be written in any language you can type.',
      ]],
      ['What GiftOfy does not do', [
        'We would rather be clear than have you discover it later. GiftOfy does not sell or deliver physical gifts, does not send money or gift cards, does not take payments, does not schedule messages for later delivery, does not support photo uploads, and does not let you edit a wish after publishing. See the [FAQ](/faq) and [how it works](/how-it-works) for details.',
      ]],
      ['Who runs GiftOfy', [
        `GiftOfy is an independent project designed, developed and operated by ${OWNER_NAME}. It is not a large company and it does not have a large team, so some things, such as customer support, move at the speed of one person. You can reach us on the [contact page](/contact)${EMAIL_OR}.`,
      ]],
      ['How GiftOfy is funded', [
        'GiftOfy is free to use. To cover hosting and development costs, we plan to show advertising from Google AdSense on public content pages such as guides and message collections. We do not sell the contents of your wishes. The [privacy policy](/privacy) explains which third-party services are used and what they may collect. Premium designs are planned for the future, but every design available today is free.',
      ]],
      ['How we keep our content honest', [
        'The guides and sample messages on GiftOfy are written to be useful on their own. We do not publish invented testimonials, ratings, user numbers or statistics. Our [editorial standards](/editorial-policy) page explains how content is written and how to report an error.',
      ]],
      ['Technology', [
        'GiftOfy is built with React and Vite, uses Supabase for storing wishes and replies, and is hosted on Vercel.',
      ]],
    ],
    faqs: [
      ['Is GiftOfy a real company?', `GiftOfy is an independent project run by ${OWNER_NAME}. It is not presented as a registered corporation.`],
      ['How do I contact GiftOfy?', 'Use the [contact page](/contact). It explains how to reach us and what to include if you want a wish removed.'],
    ],
    related: ['how-it-works', 'faq', 'editorial-policy', 'privacy'],
  },

  faq: {
    lead: 'Quick answers about pricing, accounts, privacy, sharing, replies and removing a wish. If your question is not here, [contact us](/contact).',
    sections: [
      ['Using GiftOfy', [
        ['h3', 'Is GiftOfy free?'],
        'Yes. Every design available today is free, and there is no payment feature. Premium designs are planned for the future, but nothing is sold today.',
        ['h3', 'Do I need an account to create a wish?'],
        'No. Creating and sharing a wish does not require an account or an email address.',
        ['h3', 'Does the recipient need an account?'],
        'No. They open the link, tap to reveal the wish, and can reply without signing up.',
        ['h3', 'How long can my message be?'],
        'Up to 500 characters. Recipient and sender names are limited to 40 characters in the creation form.',
        ['h3', 'Can I write in languages other than English?'],
        'Yes, the message box accepts any text you can type. GiftOfy’s interface and layout are designed for English, so check the preview before publishing.',
        ['h3', 'Can I add photos or schedule a wish for later?'],
        'Not at the moment. You can create a wish ahead of time and share the link when you choose.',
        ['h3', 'Can I edit a wish after publishing?'],
        'No. If you need to fix something, create a new wish and share the new link.',
      ]],
      ['Privacy and visibility', [
        ['h3', 'Who can see my wish?'],
        'Anyone with the link can open it. The links are short random codes that are not listed on the site, but anyone you give the link to can pass it on, so share it only with people you trust. Site administrators can also see wishes for moderation.',
        ['h3', 'Will my wish appear in Google search?'],
        'No. Wish pages ask search engines not to index them and are not part of the sitemap.',
        ['h3', 'Do you sell my data?'],
        'We do not sell the contents of wishes or replies. The [privacy policy](/privacy) explains what is stored and which third-party services are involved.',
        ['h3', 'How do I get a wish removed?'],
        'Contact us with the wish link. We review each request and can make a wish unavailable to the public: the administrator can hide it or mark it as deleted. With the tools GiftOfy has today, that removes it from public view but the record stays in the database; section 11 of the [privacy policy](/privacy) explains what that means for erasure requests. See the [contact page](/contact).',
      ]],
      ['Replies and sharing', [
        ['h3', 'How do replies work?'],
        'After opening a wish, the recipient can pick a reaction and send a message. When they send it, GiftOfy shows them a private link to that reply, which they can share with you on WhatsApp or by copying it. Replies are not emailed or sent as notifications, because GiftOfy does not collect your contact details.',
        ['h3', 'Who can read a reply?'],
        'Anyone who has the private reply link, and site administrators. The link is a long random code that cannot be guessed.',
        ['h3', 'Where can I share a wish?'],
        'WhatsApp, Facebook, copy link, or the share sheet on supported phones. You can paste the link anywhere.',
      ]],
      ['Other questions', [
        ['h3', 'Does GiftOfy work on mobile?'],
        'Yes. The site is designed to work on phones, tablets and computers.',
        ['h3', 'Is GiftOfy suitable for children?'],
        'GiftOfy is not directed at children under 13. See the [privacy policy](/privacy).',
        ['h3', 'How do I report an inappropriate wish?'],
        'Send us the link on the [contact page](/contact). We review reports and can hide wishes, or mark them as deleted, if they break the [terms](/terms).',
      ]],
    ],
    faqs: [],
    related: ['how-it-works', 'about', 'privacy', 'contact'],
  },

  'how-it-works': {
    lead: 'A GiftOfy wish has four moments: you create it, you share it, the recipient reveals it and, if they like, they reply. Here is exactly what happens at each one.',
    sections: [
      ['1. You create the wish', [
        ['ol', [
          'Choose an occasion, such as birthday, wedding, Eid or thank you.',
          'Choose a design from {templates} free designs, or write your own message.',
          'Add the recipient’s name, optionally your name and relationship, and choose whether to hide your name until the reveal (surprise mode).',
          'Preview exactly what the recipient will see, then publish.',
        ]],
        'When you publish, GiftOfy saves the wish and gives you a short link such as /wish/abc12345.',
      ]],
      ['2. You share the link', [
        'Share the link by WhatsApp, Facebook or any channel you like. Because there are no accounts, GiftOfy does not remember the wish for you, so keep the link. Guidance on channels is in [how to share a digital greeting](/guides/how-to-share-a-digital-greeting).',
      ]],
      ['3. The recipient reveals it', [
        'The recipient sees an occasion-matched object to tap. When they do, the wish appears with a short animation, followed by a closing line. They can replay the surprise or share it onward.',
        ['table', [
          ['Occasion', 'Reveal object'],
          ['Birthday, New Baby', 'Balloon'],
          ['Anniversary', 'Hearts'],
          ['Wedding', 'Envelope'],
          ['Engagement', 'Ring'],
          ['Valentine’s Day, Friendship, Romantic', 'Heart'],
          ['Graduation, Congratulations, New Year, Father’s Day, Best Wishes, Just Because', 'Gift box'],
          ['Thank You, Get Well Soon, Mother’s Day', 'Bouquet'],
          ['Miss You, Eid', 'Moon'],
        ]],
      ]],
      ['4. They can reply', [
        'After the reveal the recipient can choose a reaction, such as “Love it” or “Made me smile”, and write a reply. When they send it, they receive a private link to the reply, which they can send to you. Nothing is emailed, because GiftOfy does not collect contact details.',
      ]],
      ['What happens to the data', [
        'The wish (occasion, names, relationship, message, design, tone and whether surprise mode is on) is stored in a database, and the reply (optional name, message, reaction) is stored the same way. Anyone with a link can read that item. Administrators can hide a wish or mark it as deleted if it breaks the rules, which removes it from public view. Details are in the [privacy policy](/privacy).',
      ]],
      ['Limits to know about', [
        ['ul', [
          'Messages are limited to 500 characters.',
          'Wishes cannot be edited after publishing.',
          'There is no scheduling, photo upload or payment feature.',
          'Wishes are addressed to one recipient name.',
        ]],
      ]],
    ],
    faqs: [
      ['How long does it take to create a wish?', 'Most people finish in a couple of minutes. The steps are quick, and you can preview before publishing.'],
      ['Does the recipient need to install anything?', 'No. The wish opens in any modern web browser on a phone or computer.'],
      ['Can I try a wish before sending it?', 'Yes. After publishing, “Preview as recipient” opens the wish as the recipient would see it.'],
    ],
    related: ['guides/how-to-create-personalized-digital-wishes', 'faq', 'about', 'wishes'],
  },

  contact: {
    lead: 'Questions, feedback, a wish you want removed or a privacy request? This page explains how to reach the person who runs GiftOfy and what to include so we can understand your request.',
    sections: [
      ['How to reach us', [
        `You can reach us on WhatsApp (use the button above)${EMAIL_OR}. Please include the details listed below so we can understand your request.`,
      ]],
      ['What to include', [
        ['ul', [
          '**To remove a wish:** the full wish link (it starts with giftofy.vercel.app/wish/) and a sentence on why you want it removed. Anyone can ask to remove a wish that concerns them.',
          '**To report abuse:** the link and what is wrong with it.',
          '**For a privacy request:** what you would like (access, correction, deletion) and the link, if relevant.',
          '**For feedback or a bug:** what you were doing, which device and browser you used, and what happened.',
        ]],
      ]],
      ['What to expect', [
        'GiftOfy is run by one person and has no support team, so we cannot promise a response time or that every request can be granted. For removal and privacy requests we will respond as the law that applies to you requires. If someone is in danger, please contact your local emergency services: GiftOfy cannot respond to emergencies.',
      ]],
      ['Who you are contacting', [
        `GiftOfy is operated by ${OWNER_NAME}. See the [about page](/about).`,
      ]],
    ],
    faqs: [],
    related: ['faq', 'privacy', 'terms', 'about'],
  },

  'editorial-policy': {
    lead: 'This page explains how GiftOfy’s guides and sample messages are written and maintained, and what we promise not to do.',
    sections: [
      ['What we publish', [
        'GiftOfy publishes collections of sample messages for occasions and recipients, and guides on writing and sending digital greetings. The goal is to be useful on its own: you should be able to learn something and find wording that works even if you never use the GiftOfy tool.',
      ]],
      ['How content is written', [
        ['ul', [
          'Sample messages are original writing, intended as starting points for you to personalize. They are not copied from songs, poems, books or other websites.',
          'Descriptions of what GiftOfy can do are checked against how the product actually works. If a feature is missing or incomplete, we say so.',
          'Cultural and religious guidance is kept general and respectful. We recommend asking someone from the relevant community when in doubt.',
          'We do not give medical, legal or financial advice. Pages about illness, for example, only suggest what to say.',
        ]],
      ]],
      ['What we will not do', [
        ['ul', [
          'Invent testimonials, reviews, ratings or user numbers.',
          'Claim awards, partnerships or credentials we do not have.',
          'Publish statistics without a source we can point to.',
          'Hide advertising inside content or disguise it as editorial.',
          'Create near-duplicate pages just to capture more search traffic.',
        ]],
      ]],
      ['Authorship', [
        `Content is published by GiftOfy, operated by ${OWNER_NAME}. We do not list individual author bios, because we do not want to attribute qualifications that are not relevant to writing greetings.`,
      ]],
      ['Corrections and updates', [
        'Each content page shows the date it was last updated. If you spot an error, an outdated claim or a message that could be improved, please tell us on the [contact page](/contact). If we can confirm a problem, we will correct the page.',
      ]],
      ['Advertising', [
        'GiftOfy plans to display advertising from Google AdSense on public content pages. Our content is written independently of any advertising.',
      ]],
    ],
    faqs: [],
    related: ['about', 'contact', 'privacy', 'guides'],
  },

  privacy: {
    lead: 'This policy explains what personal data GiftOfy handles, why, who else is involved and what choices you have. We have tried to write it in plain language and to describe only what the service actually does.',
    sections: [
      ['1. Who we are', [
        `GiftOfy (giftofy.vercel.app) is operated by ${OWNER_NAME}, who is the controller of personal data processed through the service. You can contact us through the [contact page](/contact)${EMAIL_OR}.`,
      ]],
      ['2. The short version', [
        ['ul', [
          'You do not need an account to create or open a wish.',
          'We store the wishes and replies you create so that links keep working.',
          'Anyone with a wish link can read that wish; anyone with a reply link can read that reply.',
          'We do not run our own analytics or tracking tools and we do not set our own cookies for visitors.',
          'Third-party services (hosting, database, fonts, advertising and a chat assistant) are involved and are described below.',
        ]],
      ]],
      ['3. What we collect', [
        ['h3', 'Wishes you create'],
        'When you publish a wish we store the occasion, the recipient’s name, your name if you entered one, the relationship if you selected one, the message, the tone, the design, whether surprise mode is on, a short random identifier, the creation time and a status (published, hidden or deleted). Because wishes may contain names and personal messages, please only include information about other people that you are comfortable sharing and that they would expect you to share.',
        ['h3', 'Replies'],
        'When a recipient sends a reply we store the optional name they entered, the message, the optional reaction, a long random private token, and the time.',
        ['h3', 'Administrator accounts'],
        'The site administrator signs in with an email and password handled by Supabase Authentication. Ordinary visitors do not have accounts.',
        ['h3', 'Technical data'],
        'Like most websites, our hosting provider and database provider receive technical data when your browser contacts them, such as your IP address, browser and device type, the page requested and the time. We do not use this to build profiles of visitors. These providers keep their own logs under their own policies.',
        ['h3', 'When you contact us'],
        'If you contact us through WhatsApp, WhatsApp processes that conversation under its own terms, and we see your phone number and the messages you send.',
        ['h3', 'What we do not collect'],
        'We do not collect payment details, precise location, contact lists, or photos. GiftOfy does not currently have a feature for uploading photos.',
      ]],
      ['4. How we use it', [
        ['ul', [
          'To provide the service: store a wish and show it to people who open its link, and show a reply to people who hold its link.',
          'To keep the service safe: the administrator can review wishes and replies, and can hide a wish or mark it as deleted if it breaks the [terms](/terms).',
          'To maintain and secure the website and respond to requests you send us.',
          'To comply with legal obligations.',
        ]],
      ]],
      ['5. Who can see a wish or reply', [
        'Anyone with the exact link can open that wish. Wish links are short random codes and are not listed on the site or in the sitemap, and the pages ask search engines not to index them, but anyone you share a link with can pass it on. Reply links are longer random codes that give access to one reply only. Site administrators can see wishes and replies for moderation. Hidden or deleted wishes are not shown to the public.',
      ]],
      ['6. Legal bases (EEA and UK visitors)', [
        'Where data protection laws such as the GDPR apply, we rely on: performance of the service you ask for (storing and displaying a wish); our legitimate interests in keeping the service secure and preventing abuse; consent where it is required, for example for advertising cookies, which is collected through Google’s consent tools where those are enabled; and legal obligation where it applies.',
      ]],
      ['7. Third-party services we use', [
        ['ul', [
          '**Vercel** hosts the website and runs the code that serves its pages.',
          '**Supabase** hosts the database where wishes and replies are stored and handles administrator sign-in.',
          '**Google Fonts** supplies the Manrope typeface. Your browser requests the font from Google’s servers, so Google receives your IP address and standard request data.',
          '**Google AdSense** is the advertising service that GiftOfy has applied to use. Its script is loaded on the site. See section 9.',
          '**Chatzy** provides an AI chat assistant widget loaded from its own servers. If you use the chat, what you type is processed by that provider under its own policies. Please do not enter sensitive information in it.',
          '**WhatsApp and Facebook** are involved only if you choose to use the share buttons, which open those services with a prefilled message containing the wish link.',
        ]],
      ]],
      ['8. Cookies and local storage', [
        'GiftOfy’s own code does not set cookies for ordinary visitors. The database client may store an authentication session in your browser’s local storage, but this only happens when the administrator signs in. Third-party scripts described in section 7 may set their own cookies or use their own storage, which we do not control. You can block or delete cookies and local storage through your browser settings, although some features of third-party services may then not work.',
      ]],
      ['9. Advertising', [
        'GiftOfy plans to display ads from Google AdSense on public content pages. Google and its partners may use cookies and similar technologies to show and measure ads, including personalized ads based on your visits to this and other sites. You can manage personalized ads in [Google’s Ads Settings](https://adssettings.google.com), and learn how Google uses information from sites that use its services at [policies.google.com/technologies/partner-sites](https://policies.google.com/technologies/partner-sites). You can also opt out through [aboutads.info](https://www.aboutads.info) or, in Europe, [youronlinechoices.eu](https://www.youronlinechoices.eu).',
        'Visitors in the European Economic Area, the United Kingdom and Switzerland have a right to give or refuse consent for advertising cookies. Google requires publishers to collect that consent through a certified consent management platform before showing ads in those regions. Whether and when ads are shown, and how that consent is collected, depends on how GiftOfy’s AdSense account is configured at the time, and this policy will be updated if that changes.',
      ]],
      ['10. International transfers', [
        'Our providers operate globally, so your data may be processed in countries other than your own, including countries that may have different data protection laws. Those providers describe the safeguards they use, such as standard contractual clauses, in their own documentation.',
      ]],
      ['11. How long we keep data', [
        'Wishes and replies are kept so that their links keep working, and there is currently no automatic expiry. GiftOfy has no self-service way to delete a wish or a reply. The administrator’s tools can hide a wish or mark it as deleted, which removes it from public view but keeps the record in the database. Those tools cannot hide or delete replies. Permanently erasing a record would have to be done manually by the operator directly in the database. If you ask for erasure, we will consider the request under the law that applies to you and, where erasure is required, carry it out in that way. We cannot promise a response time. Server logs are kept by our providers according to their own policies.',
      ]],
      ['12. Your rights', [
        `Depending on where you live, you may have the right to access the personal data we hold about you, to correct it, to have it deleted, to restrict or object to certain processing, to receive a copy in a portable format and to withdraw consent. Because we do not require accounts, we usually need the link to a wish or reply to find it. You also have the right to complain to your local data protection authority. To exercise a right, use the [contact page](/contact)${EMAIL_OR}. We will handle requests as the law that applies to you requires.`,
      ]],
      ['13. Security', [
        'We use HTTPS, access rules in the database that stop the public from listing or browsing other people’s wishes, and long random identifiers. No system is perfectly secure, so please do not put sensitive information in a wish.',
      ]],
      ['14. Children', [
        'GiftOfy is not directed at children under 13, and we do not knowingly collect their personal data. If you believe a child has provided personal data, contact us and we will review the request and, where appropriate, make the content unavailable (see section 11 for what that means in practice).',
      ]],
      ['15. Changes to this policy', [
        'We will update this page when the service or its third-party services change, and show the date of the latest update at the top of the page.',
      ]],
    ],
    faqs: [],
    related: ['terms', 'contact', 'faq', 'about'],
  },

  terms: {
    lead: 'These terms govern your use of GiftOfy. By using the site, you agree to them. They are short and written to be read.',
    sections: [
      ['1. What GiftOfy is', [
        'GiftOfy is a free service for creating and sharing personalized digital wishes. It does not sell or deliver physical gifts, send money or gift cards, or process payments, and we will never ask for payment details.',
      ]],
      ['2. Who may use it', [
        'You must be at least 13 years old, or have permission from a parent or guardian, to create a wish or reply.',
      ]],
      ['3. Your content', [
        'You are responsible for the wishes and replies you create. You confirm that you have the right to share the content and that it does not violate anyone else’s rights. You keep ownership of what you write, and you give GiftOfy a limited, non-exclusive permission to store it, display it to people who have the link and moderate it, for as long as the service needs to operate.',
      ]],
      ['4. Acceptable use', [
        'Use GiftOfy kindly. You must not create wishes or replies that:',
        ['ul', [
          'harass, threaten, bully or demean anyone;',
          'contain hate speech, violent or sexually explicit content, or anything that exploits or endangers children;',
          'impersonate another person or deceive people, including fake gift, prize or payment offers;',
          'contain malware, phishing links or spam;',
          'reveal other people’s private information without their permission;',
          'break the law.',
        ]],
        'Do not use automated tools to create wishes in bulk or to collect wish content.',
      ]],
      ['5. Moderation and removal', [
        'We may hide any wish, or mark it as deleted, if we reasonably believe it breaks these terms, without notice. If you see something that should not be there, report it on the [contact page](/contact). You can also ask us to remove a wish that concerns you; we will review such requests but cannot promise to grant every one.',
      ]],
      ['6. Sharing links', [
        'Anyone with a wish link can open it. You are responsible for who you share links with. Do not share links to wishes that contain information you would not want others to see.',
      ]],
      ['7. Our content', [
        'The GiftOfy name, designs, code and written guides are owned by GiftOfy or its operator. You may use the sample messages on the site in your own personal greetings. You may not republish our guides or message collections at scale, or sell them.',
      ]],
      ['8. Third-party services and links', [
        'GiftOfy uses third-party services and may link to other websites. We do not control them and are not responsible for their content or practices. See the [privacy policy](/privacy).',
      ]],
      ['9. No guarantees', [
        'GiftOfy is provided as is and as available. We try to keep it running, but we do not promise it will always be available, error-free or that wishes will be kept forever. Do not rely on it for anything critical.',
      ]],
      ['10. Limitation of liability', [
        'To the extent allowed by law, GiftOfy and its operator are not liable for indirect or consequential losses, or for losses caused by content created by users. Nothing in these terms limits any legal rights you have as a consumer that cannot be limited.',
      ]],
      ['11. Ending or changing the service', [
        'We may change, suspend or stop any part of GiftOfy, and we may restrict access for anyone who breaks these terms.',
      ]],
      ['12. Changes to these terms', [
        'We may update these terms. The date of the latest update is shown at the top of this page. Continuing to use GiftOfy after an update means you accept the new terms.',
      ]],
      ['13. Contact', [
        `Questions about these terms can be sent through the [contact page](/contact)${EMAIL_OR}. GiftOfy is operated by ${OWNER_NAME}.`,
      ]],
    ],
    faqs: [],
    related: ['privacy', 'contact', 'about', 'faq'],
  },
};
