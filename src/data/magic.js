// Occasion → "Magic Wish" experience config. One row per occasion: no branching in components.
// shape: which InteractiveObject to render. particles: which FloatingBackground types drift behind it.
// closing: the short emotional line shown after the message (no database field needed — see README).
const M = (shape, label, prompt, tapHint, particles, accent, closing) => ({ shape, label, prompt, tapHint, particles, accent, closing });

export const MAGIC = {
  birthday: M('balloon', 'Open birthday surprise', 'Someone has a surprise for you...', 'Touch the balloon to open your surprise', ['balloon', 'confetti', 'sparkle'], '#ff4f9a', 'May this year give you countless reasons to smile. ❤️'),
  anniversary: M('hearts', 'Reveal anniversary wish', 'Two hearts have something to share...', 'Touch the hearts to open your surprise', ['heart', 'petal', 'sparkle'], '#e0457b', 'Some moments become memories. Some people become everything. ❤️'),
  wedding: M('envelope', 'Open wedding envelope', 'There’s something special waiting inside...', 'Touch the envelope to open your surprise', ['petal', 'heart', 'sparkle'], '#c2416b', 'Some moments become memories. Some people become forever. 💕'),
  engagement: M('ring', 'Reveal engagement wish', 'Something beautiful is waiting for you...', 'Touch the ring to open your surprise', ['sparkle', 'heart'], '#7c4dff', 'Here’s to the beginning of something beautiful. 💍'),
  valentines: M('heart', 'Open your valentine', 'A glowing heart is waiting...', 'Touch the heart to open your surprise', ['heart', 'petal', 'sparkle'], '#ff6b8a', 'Some hearts are simply meant to find each other. ❤️'),
  graduation: M('gift', 'Open graduation surprise', 'A celebration is waiting for you...', 'Touch the gift box to open your surprise', ['confetti', 'star', 'sparkle'], '#f5b942', 'This is only the beginning of something amazing. 🌟'),
  congrats: M('gift', 'Open your gift', 'Someone is celebrating you...', 'Touch the gift box to open your surprise', ['confetti', 'star'], '#e85d04', 'Today is just the beginning of something amazing. ✨'),
  thanks: M('bouquet', 'Open thank-you flowers', 'A little gratitude is waiting for you...', 'Touch the bouquet to open your surprise', ['petal', 'sparkle'], '#e07a1f', 'Some people deserve more than just a thank you. 💐'),
  missyou: M('moon', 'Reveal a message from afar', 'Someone is thinking of you...', 'Touch the moon to open your surprise', ['star', 'heart'], '#93c5fd', 'Distance can’t make someone less special. 💕'),
  getwell: M('bouquet', 'Open get-well wishes', 'A little comfort is on its way...', 'Touch the bouquet to open your surprise', ['petal', 'sparkle'], '#10b981', 'Gentle days and good news are on their way to you. 💚'),
  eid: M('moon', 'Reveal your Eid wish', 'A blessing is waiting for you...', 'Touch the moon to open your surprise', ['star', 'sparkle'], '#f5b942', 'May every blessing find its way to you and your loved ones. 🌙'),
  newyear: M('gift', 'Open your New Year wish', 'A new beginning awaits...', 'Touch the gift box to open your surprise', ['confetti', 'star', 'sparkle'], '#f5b942', 'Here’s to new dreams and the best year yet. ✨'),
  friendship: M('heart', 'Reveal a message from a friend', 'Your friend has something to say...', 'Touch the heart to open your surprise', ['heart', 'sparkle'], '#f97316', 'Good friends make ordinary days feel like something special. 🤝'),
  mothers: M('bouquet', 'Open a bouquet for Mom', 'A bouquet is waiting for you...', 'Touch the bouquet to open your surprise', ['petal', 'heart'], '#d6336c', 'Every kind of love in this world started with yours. 💐'),
  fathers: M('gift', 'Open a gift for Dad', 'A little something is waiting for you...', 'Touch the gift box to open your surprise', ['sparkle', 'star'], '#f5b942', 'Some heroes don’t wear capes; they just show up. 💙'),
  baby: M('balloon', 'Open a little surprise', 'A tiny surprise has arrived...', 'Touch the balloon to open your surprise', ['balloon', 'star'], '#3b82f6', 'The smallest arrivals bring the biggest joy. 🍼'),
  bestwishes: M('gift', 'Open your gift', 'Something good is coming your way...', 'Touch the gift box to open your surprise', ['sparkle', 'star'], '#fde047', 'Go shine wherever life takes you next. 🌟'),
  romantic: M('heart', 'Open your heart', 'Someone’s heart has something to say...', 'Touch the heart to open your surprise', ['heart', 'sparkle'], '#f472b6', 'Every moment with you feels like magic. 💜'),
  general: M('gift', 'Open your surprise', 'A little surprise is waiting for you...', 'Touch the gift box to open your surprise', ['sparkle', 'heart'], '#6c3bff', 'Just a little reminder that you’re wonderful. ☀️'),
};
const DEFAULT = M('gift', 'Open your surprise', 'Someone made something special for you...', 'Touch the gift box to open your surprise', ['heart', 'sparkle'], '#6c3bff', 'Wishing you all good things. ❤️');

export const magicFor = (occ) => MAGIC[String(occ || '').trim().toLowerCase()] || DEFAULT;
