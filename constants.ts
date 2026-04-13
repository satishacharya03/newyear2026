import { Wish, NavItem } from './types';

export const TARGET_DATE = new Date('2026-04-13T18:15:00.000Z');
export const CELEBRATION_YEAR = '2083';
export const CELEBRATION_LABEL = 'Nepali New Year 2083';
export const CELEBRATION_LABEL_NE = 'नेपाली नयाँ वर्ष २०८३';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Wishes', href: '#wishes' },
  { label: 'Vision', href: '#vision' },
];

export const WISHES: Wish[] = [
  {
    id: '1',
    title: 'Fresh Beginnings',
    message: 'May Nepali New Year 2083 bring you peace, prosperity, and the courage to chase your dreams.',
    nepaliMessage: 'नेपाली नयाँ वर्ष २०८३ ले तपाईंको जीवनमा शान्ति, समृद्धि र नयाँ ऊर्जा ल्याओस्।',
    author: 'Satish'
  },
  {
    id: '2',
    title: 'Shared Harmony',
    message: 'Wishing the world a year of healing and unity as we welcome Nepali New Year 2083.',
    nepaliMessage: 'विश्वमा शान्ति र एकताको कामना। २०८३ मा हामी सबै अझ नजिक हुन सकौं।',
    author: 'Universal Spirit'
  },
  {
    id: '3',
    title: 'Personal Growth',
    message: 'Embrace the journey. Every step you take in 2083 brings you closer to the person you are meant to become.',
    nepaliMessage: 'तपाईंको हरेक पाइलाले सफलताको शिखर चुमोस्। आत्म-विश्वास र लगनशीलता बढिरहोस्।',
    author: 'Mindful Daily'
  }
];

export const HERO_TITLE_EN = 'Welcome to Nepali New Year 2083';
export const HERO_TITLE_NE = 'नेपाली नयाँ वर्ष २०८३ को शुभकामना';
export const HERO_SUBTITLE = 'A celebration of light, culture, and fresh beginnings.';

export const PUBLIC_VAPID_KEY = 'BIUrM4ZOLaH53-6tyHX3B4JNgprFbuSoGXq50Q1okIj-DgoNro2mBJTwNhd_khGS5oyuvEtHnLh5D1DWLv8XSmM';