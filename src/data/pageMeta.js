// Registry of every public, indexable page: one row per URL. This is the single source of truth for
// titles, descriptions, canonical paths, sitemap entries, navigation labels and structured data.
// It is deliberately small (no page bodies) so the Vercel edge middleware can import it cheaply.
// Page bodies live in src/data/content/*.js (occasions, recipients, guides) and src/data/corePages.js.
import { CONTENT_UPDATED, SITE_LAUNCHED } from './siteConfig.js';

const NEW = CONTENT_UPDATED;
// group: core | hub | legal | occasion | recipient | guide
const row = (group, path, h1, title, desc, extra = {}) => ({
  group, path, key: path === '/' ? '' : path.slice(1), h1, title, desc, short: extra.short || h1,
  occ: extra.occ, created: extra.created || SITE_LAUNCHED, updated: extra.updated || CONTENT_UPDATED,
});

export const HOME = row('core', '/', 'Make Someone’s Day Extra Special', null,
  'Create personalized digital wishes for birthdays, weddings, Eid and more. Choose a design, add your message and share it with a link. Free, with no account needed.');

const CORE = [
  row('tool', '/create', 'Create a Wish', 'Create a Wish',
    'Create a personalized digital wish in about two minutes: choose an occasion and design, write your message and share the link. Free, with no account needed.', { short: 'Create a Wish' }),
  row('hub', '/wishes', 'Wishes and Messages for Every Occasion', 'Wishes & Messages for Every Occasion',
    'Browse GiftOfy’s library of wishes and messages by occasion and by recipient: birthdays, weddings, Eid, thank-yous, and wishes for mothers, fathers, partners and friends.', { short: 'All occasions' }),
  row('hub', '/guides', 'Guides to Digital Wishes and Greetings', 'Guides to Digital Wishes & Greetings',
    'Practical guides on writing heartfelt messages, sending digital greetings, planning online surprises and choosing between digital wishes and paper cards.', { short: 'Guides' }),
  row('core', '/how-it-works', 'How GiftOfy Works', 'How GiftOfy Works: Create, Share, Reveal, Reply',
    'See exactly how a GiftOfy wish works: choose an occasion and design, personalize the message, share a link, and let the recipient tap to reveal it and reply.', { short: 'How it works' }),
  row('core', '/faq', 'Frequently Asked Questions', 'GiftOfy FAQ: Pricing, Privacy, Sharing & Replies',
    'Answers to common questions about GiftOfy: whether it is free, whether accounts are needed, who can see a wish, how replies work and how to remove a wish.', { short: 'FAQ' }),
  row('core', '/about', 'About GiftOfy', 'About GiftOfy',
    'GiftOfy is a free digital wishes platform. Learn what it does, who runs it, how it works, what it does not do and how we keep our content honest.', { short: 'About' }),
  row('core', '/contact', 'Contact GiftOfy', 'Contact GiftOfy',
    'Questions, feedback, a wish you want removed or a privacy request? Here is how to reach the person who runs GiftOfy by WhatsApp or email, and what to include in your message.', { short: 'Contact' }),
  row('legal', '/privacy', 'Privacy Policy', 'Privacy Policy',
    'How GiftOfy handles personal data: what is stored when you create a wish or reply, which third-party services are used, cookies, advertising, retention and your rights.', { short: 'Privacy Policy' }),
  row('legal', '/terms', 'Terms of Use', 'Terms of Use',
    'The rules for using GiftOfy: acceptable use, what happens to wishes you create, how we moderate, what the service does not provide and the limits of our responsibility.', { short: 'Terms of Use' }),
  row('core', '/editorial-policy', 'Editorial Standards', 'Editorial Standards: How We Write GiftOfy Content',
    'How GiftOfy’s guides and sample messages are written and maintained, what we promise never to fabricate, and how to report an error or suggest an improvement.', { short: 'Editorial standards' }),
];

const OCCASIONS = [
  ['birthday-wishes', 'Birthday Wishes', 'Birthday Wishes & Messages for Any Age', 'birthday', 'Birthday',
    'Birthday wishes for friends, family and colleagues: heartfelt, short and funny messages, advice on tone and milestones, and a free way to send one as a digital card.'],
  ['anniversary-wishes', 'Anniversary Wishes', 'Anniversary Wishes for Every Kind of Couple', 'anniversary', 'Anniversary',
    'Anniversary wishes that say something true: messages for spouses, partners and parents, ideas for milestone years, and how to send one as a personalized digital card.'],
  ['wedding-wishes', 'Wedding Wishes', 'Wedding Wishes & Messages for the Newlyweds', 'wedding', 'Wedding',
    'Wedding wishes for the couple, a card message or a toast: heartfelt, short and religious-neutral options, tips on what to avoid, and a free digital way to send them.'],
  ['engagement-wishes', 'Engagement Wishes', 'Engagement Wishes & Congratulation Messages', 'engagement', 'Engagement',
    'Engagement wishes and congratulation messages for friends, family and colleagues, with guidance on tone and timing, plus a free ring-themed digital card to send.'],
  ['eid-wishes', 'Eid Wishes', 'Eid Mubarak Wishes & Messages', 'eid', 'Eid',
    'Eid Mubarak wishes for family, friends and colleagues: short greetings, prayerful messages, notes for those far from home, and a free digital Eid card to share.'],
  ['valentine-wishes', 'Valentine’s Day Wishes', 'Valentine’s Day Wishes & Love Messages', 'valentines', 'Valentine’s Day',
    'Valentine’s Day wishes for partners, crushes and close friends: sincere, playful and gentle messages, what to avoid, and a free digital card to send.'],
  ['congratulations-messages', 'Congratulations Messages', 'Congratulations Messages for Any Achievement', 'congrats', 'Congratulations',
    'Congratulations messages for a new job, promotion, exam result, business launch or personal milestone, with advice on making them specific and sincere.'],
  ['thank-you-messages', 'Thank You Messages', 'Thank You Messages That Sound Sincere', 'thanks', 'Thank You',
    'Thank you messages for friends, family, teachers, colleagues and mentors, plus a simple structure for saying thanks in a way that sounds specific and genuine.'],
  ['get-well-soon-wishes', 'Get Well Soon Wishes', 'Get Well Soon Wishes & Messages', 'getwell', 'Get Well Soon',
    'Gentle get well soon messages for friends, family and colleagues, with advice on what to say, what to avoid saying, and how to follow up without adding pressure.'],
  ['friendship-messages', 'Friendship Messages', 'Friendship Messages & Appreciation Notes', 'friendship', 'Friendship',
    'Friendship messages for a friend you see every day or one you have not spoken to in years: appreciation notes, reconnecting messages and how to say them well.'],
  ['miss-you-messages', 'Miss You Messages', 'Miss You Messages for Someone Far Away', 'missyou', 'Miss You',
    'Miss you messages for long-distance partners, family abroad and friends you have lost touch with, plus ideas for making a short message feel close.'],
  ['new-year-wishes', 'New Year Wishes', 'New Year Wishes & Messages', 'newyear', 'New Year',
    'New Year wishes grouped by tone and recipient, with ideas for what to include, when to send them and how to make a message feel personal rather than copied.'],
  ['graduation-wishes', 'Graduation Wishes', 'Graduation Wishes & Messages', 'graduation', 'Graduation',
    'Graduation wishes for a son, daughter, friend or colleague: heartfelt, short and encouraging messages, with tips on what to write and how to send them digitally.'],
  ['mothers-day-wishes', 'Mother’s Day Wishes', 'Mother’s Day Wishes & Messages', 'mothers', 'Mother’s Day',
    'Mother’s Day wishes for your mum, grandmother, stepmother or a mother figure: heartfelt and short messages, advice for hard relationships, and a free digital card.', { created: NEW }],
  ['fathers-day-wishes', 'Father’s Day Wishes', 'Father’s Day Wishes & Messages', 'fathers', 'Father’s Day',
    'Father’s Day wishes for your dad, stepfather, grandfather or father figure: sincere and light-hearted messages, advice on saying what is hard to say, and a free card.', { created: NEW }],
  ['new-baby-wishes', 'New Baby Wishes', 'New Baby Wishes & Congratulation Messages', 'baby', 'New Baby',
    'New baby wishes for parents: warm, short and funny messages, what to say and avoid in the first weeks, and a free digital card you can send before you visit.', { created: NEW }],
  ['good-luck-wishes', 'Good Luck and Best Wishes', 'Good Luck & Best Wishes Messages', 'bestwishes', 'Good Luck',
    'Good luck and best wishes messages for exams, interviews, new jobs, trips and big days, with advice on encouraging without adding pressure, plus a free digital card.', { created: NEW }],
  ['christmas-wishes', 'Christmas Wishes', 'Christmas Wishes & Messages', 'general', 'Christmas',
    'Christmas wishes for family, friends and colleagues, from warm and religious to short and secular, plus how to send a message when you cannot be together.', { created: NEW }],
].map(([slug, h1, title, occ, short, desc, extra]) => row('occasion', `/${slug}`, h1, title, desc, { occ, short, ...extra }));

const RECIPIENTS = [
  ['wishes-for-mother', 'Wishes and Messages for Your Mother', 'Wishes & Messages for Your Mother', 'mothers', 'For mother',
    'Messages for your mother for birthdays, thank-yous and just-because moments, with advice on saying what you mean even when the relationship is complicated.'],
  ['wishes-for-father', 'Wishes and Messages for Your Father', 'Wishes & Messages for Your Father', 'fathers', 'For father',
    'Messages for your father for birthdays, thank-yous and ordinary days, with practical advice for dads who are not big talkers and sons and daughters who are not either.'],
  ['wishes-for-husband', 'Wishes and Messages for Your Husband', 'Wishes & Messages for Your Husband', 'romantic', 'For husband',
    'Messages for your husband for birthdays, anniversaries and everyday appreciation: romantic, playful and grateful, written to sound like a real person and not a card.'],
  ['wishes-for-wife', 'Wishes and Messages for Your Wife', 'Wishes & Messages for Your Wife', 'romantic', 'For wife',
    'Messages for your wife for birthdays, anniversaries and everyday appreciation: warm, specific and sincere, with tips for moving beyond the usual clichés.'],
  ['wishes-for-boyfriend', 'Wishes and Messages for Your Boyfriend', 'Wishes & Messages for Your Boyfriend', 'romantic', 'For boyfriend',
    'Messages for your boyfriend for birthdays, anniversaries and ordinary days: sweet, funny and sincere, with advice on matching your tone to where the relationship is.'],
  ['wishes-for-girlfriend', 'Wishes and Messages for Your Girlfriend', 'Wishes & Messages for Your Girlfriend', 'romantic', 'For girlfriend',
    'Messages for your girlfriend for birthdays, anniversaries and everyday moments: affectionate, playful and honest, plus tips for making a short note feel personal.'],
  ['wishes-for-brother', 'Wishes and Messages for Your Brother', 'Wishes & Messages for Your Brother', 'birthday', 'For brother',
    'Messages for your brother for birthdays, achievements and just because: funny, proud and sincere, for brothers who tease you and brothers who rarely talk.'],
  ['wishes-for-sister', 'Wishes and Messages for Your Sister', 'Wishes & Messages for Your Sister', 'birthday', 'For sister',
    'Messages for your sister for birthdays, milestones and ordinary days: loving, funny and proud, for a sister who is also your closest friend or a hard one to reach.'],
  ['wishes-for-colleagues', 'Wishes and Messages for Colleagues', 'Wishes & Messages for Colleagues and Coworkers', 'general', 'For colleagues',
    'Messages for colleagues, teammates and managers: birthdays, new jobs, farewells, thank-yous and holidays, with advice on keeping them warm but professional.'],
].map(([slug, h1, title, occ, short, desc]) => row('recipient', `/${slug}`, h1, title, desc, { occ, short, created: NEW }));

const GUIDES = [
  ['how-to-write-a-heartfelt-message', 'How to Write a Heartfelt Message', 'How to Write a Heartfelt Message (With Examples)', 'Write a heartfelt message',
    'A practical method for writing a message that sounds sincere: how to start, what to include, what to cut, and before-and-after examples you can adapt.'],
  ['how-to-create-personalized-digital-wishes', 'How to Create Personalized Digital Wishes', 'How to Create a Personalized Digital Wish, Step by Step', 'Create personalized wishes',
    'A step-by-step guide to creating a personalized digital wish on GiftOfy: choosing an occasion and design, writing the message, using surprise mode and sharing the link.'],
  ['how-to-send-digital-birthday-greetings', 'How to Send Digital Birthday Greetings', 'How to Send a Digital Birthday Greeting People Remember', 'Send birthday greetings',
    'How to time, write and send a digital birthday greeting well: choosing the channel, handling time zones, sending early or late, and avoiding common mistakes.'],
  ['digital-gifts-vs-greeting-cards', 'Digital Gifts vs Traditional Greeting Cards', 'Digital Wishes vs Greeting Cards: An Honest Comparison', 'Digital vs paper cards',
    'An even-handed comparison of digital wishes and paper greeting cards: cost, speed, personalization, keepsake value, privacy and when each one is the better choice.'],
  ['creative-ways-to-surprise-someone-online', 'Creative Ways to Surprise Someone Online', 'Creative Ways to Surprise Someone Online', 'Surprise someone online',
    'Thoughtful ways to surprise someone online, from timed messages and shared playlists to group greetings, without anything that feels spammy or impersonal.'],
  ['how-to-make-an-anniversary-greeting-special', 'How to Make an Anniversary Greeting Special', 'How to Make an Anniversary Greeting Special', 'Special anniversary greetings',
    'Practical ideas for writing an anniversary greeting that feels specific to the two of you, whether it is a first anniversary or a fortieth, in person or long-distance.'],
  ['how-to-share-a-digital-greeting', 'How to Share a Digital Greeting', 'How to Share a Digital Greeting by Link', 'Share a digital greeting',
    'How to share a digital greeting by link: which channel to use, what to say alongside it, privacy basics and what to do if the recipient cannot open it.'],
  ['ideas-for-meaningful-online-celebrations', 'Ideas for Meaningful Online Celebrations', 'Ideas for Meaningful Online Celebrations', 'Online celebration ideas',
    'Ideas for celebrating birthdays, weddings, graduations and holidays when you cannot be together, and how to make a virtual celebration feel warm instead of awkward.'],
].map(([slug, h1, title, short, desc]) => row('guide', `/guides/${slug}`, h1, title, desc, { short, created: NEW }));

export const PAGE_META = [HOME, ...CORE, ...OCCASIONS, ...RECIPIENTS, ...GUIDES];
export const META_BY_PATH = Object.fromEntries(PAGE_META.map((p) => [p.path, p]));
export const META_BY_KEY = Object.fromEntries(PAGE_META.map((p) => [p.key, p]));
export const byGroup = (g) => PAGE_META.filter((p) => p.group === g);
export const OCCASION_PAGES = OCCASIONS;
export const RECIPIENT_PAGES = RECIPIENTS;
export const GUIDE_PAGES = GUIDES;
export const CORE_PAGES = CORE;
