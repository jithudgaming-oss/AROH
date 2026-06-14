export interface SeasonInfo {
  season: 'Spring' | 'Summer' | 'Monsoon' | 'Autumn' | 'Winter';
  months: string;
  whatYouSee: string[];
  crowdLevel: 'Low' | 'Medium' | 'High';
  dangerLevel: 'Low' | 'Medium' | 'High';
  recommended: boolean;
}

export interface DayRoute {
  day: number;
  from: string;
  to: string;
  elevationM: number;
  distanceKm: number;
}

export interface Trek {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  durationDays: number;
  distanceKm: number;
  elevationGainM: number;
  maxElevationM: number;
  state: string;
  district: string;
  description: string;
  imageUrl: string;
  status: 'Open' | 'Closed' | 'Weather Lock';
  dataVerifiedDate: string;
  dataVerifiedDaysAgo: number;
  permitRequired: boolean;
  permitFeeINR: number | null;
  startPoint: {
    latitude: number;
    longitude: number;
    name: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
  seasons: SeasonInfo[];
  days: DayRoute[];
  costEstimate: {
    transportINR: string;
    accommodationPerNightINR: string;
    guidePerDayINR: string;
    foodPerDayINR: string;
  };
  safetyTips: string[];
  recommendedGear: string[];
  healthRequirements: string[];
  offlineDownloaded?: boolean;
}

export const MOCK_TREKS: Trek[] = [
  {
    id: '1',
    title: 'Roopkund Lake Trek',
    difficulty: 'Challenging',
    durationDays: 8,
    distanceKm: 53,
    elevationGainM: 3200,
    maxElevationM: 5029,
    state: 'Uttarakhand',
    district: 'Chamoli',
    status: 'Weather Lock',
    dataVerifiedDate: '15 May 2025',
    dataVerifiedDaysAgo: 9,
    permitRequired: true,
    permitFeeINR: 600,
    description:
      'A gorgeous trek through dense oak and rhododendron forests leading up to the mysterious skeleton lake nestled high in the Himalayas.',
    imageUrl:
      'https://images.unsplash.com/photo-1626016752639-2c3b16e3a90c?w=600&auto=format&fit=crop',
    startPoint: { latitude: 30.1444, longitude: 79.7397, name: 'Lohajung' },
    coordinates: [
      { latitude: 30.1444, longitude: 79.7397 },
      { latitude: 30.165, longitude: 79.742 },
      { latitude: 30.189, longitude: 79.735 },
      { latitude: 30.22, longitude: 79.721 },
      { latitude: 30.245, longitude: 79.745 },
    ],
    seasons: [
      {
        season: 'Summer',
        months: 'May - June',
        whatYouSee: ['Bugyal meadows in bloom', 'Clear lake', 'Snow patches', 'Panoramic Himalayan views'],
        crowdLevel: 'High',
        dangerLevel: 'Medium',
        recommended: true,
      },
      {
        season: 'Autumn',
        months: 'September - October',
        whatYouSee: ['Crystal clear lake', 'Minimal snow', 'Stable weather', 'Best photography'],
        crowdLevel: 'Medium',
        dangerLevel: 'Low',
        recommended: false,
      },
    ],
    days: [
      { day: 1, from: 'Lohajung', to: 'Didna Village', elevationM: 2800, distanceKm: 8 },
      { day: 2, from: 'Didna', to: 'Ali Bugyal', elevationM: 3612, distanceKm: 9 },
      { day: 3, from: 'Ali Bugyal', to: 'Patar Nachauni', elevationM: 3840, distanceKm: 7 },
      { day: 4, from: 'Patar Nachauni', to: 'Bhagwabasa', elevationM: 4463, distanceKm: 8 },
      { day: 5, from: 'Bhagwabasa', to: 'Roopkund + back', elevationM: 5029, distanceKm: 8 },
    ],
    costEstimate: {
      transportINR: '₹2,000 - ₹3,500',
      accommodationPerNightINR: '₹600 - ₹1,200',
      guidePerDayINR: '₹1,800 - ₹2,500',
      foodPerDayINR: '₹400 - ₹700',
    },
    safetyTips: [
      'Acclimatization is mandatory at Bedni Bugyal.',
      'Check oxygen saturation levels twice daily.',
      'Stay hydrated — drink at least 4 to 5 litres of water daily.',
    ],
    recommendedGear: ['Sub-zero sleeping bag', 'Microspikes and trekking poles', 'Waterproof high-ankle trekking shoes'],
    healthRequirements: [
      'Stable cardiovascular health',
      'No high-altitude pulmonary edema (HAPE) history',
      'Strong lower body endurance',
    ],
    offlineDownloaded: false,
  },
  {
    id: '2',
    title: 'Valley of Flowers',
    difficulty: 'Moderate',
    durationDays: 6,
    distanceKm: 38,
    elevationGainM: 1450,
    maxElevationM: 3658,
    state: 'Uttarakhand',
    district: 'Chamoli',
    status: 'Open',
    dataVerifiedDate: '22 May 2025',
    dataVerifiedDaysAgo: 2,
    permitRequired: true,
    permitFeeINR: 200,
    description:
      'A UNESCO World Heritage Site renowned for its meadows of endemic alpine flowers and outstanding natural scenic beauty.',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop',
    startPoint: { latitude: 30.5626, longitude: 79.5647, name: 'Govindghat' },
    coordinates: [
      { latitude: 30.5626, longitude: 79.5647 },
      { latitude: 30.6128, longitude: 79.5932 },
      { latitude: 30.728, longitude: 79.6054 },
    ],
    seasons: [
      {
        season: 'Monsoon',
        months: 'July - August',
        whatYouSee: ['Over 300 flower species', 'Lush green valley', 'Waterfalls everywhere', 'Rare Brahma Kamal'],
        crowdLevel: 'High',
        dangerLevel: 'Low',
        recommended: true,
      },
      {
        season: 'Spring',
        months: 'April - May',
        whatYouSee: ['Early blooms', 'Snow melting on ridges', 'Fewer crowds', 'Cool temperatures'],
        crowdLevel: 'Low',
        dangerLevel: 'Low',
        recommended: false,
      },
    ],
    days: [
      { day: 1, from: 'Govindghat', to: 'Ghangaria', elevationM: 3048, distanceKm: 13 },
      { day: 2, from: 'Ghangaria', to: 'Valley of Flowers', elevationM: 3658, distanceKm: 6 },
      { day: 3, from: 'Ghangaria', to: 'Hemkund Sahib', elevationM: 4329, distanceKm: 6 },
    ],
    costEstimate: {
      transportINR: '₹1,200 - ₹2,000',
      accommodationPerNightINR: '₹500 - ₹900',
      guidePerDayINR: '₹1,000 - ₹1,500',
      foodPerDayINR: '₹300 - ₹500',
    },
    safetyTips: [
      'Valley floor is prone to sudden rainstorms — keep rain cover handy.',
      'Do not stray from the marked stone pathways.',
      'Leave the valley by 5 PM as overnight stays are prohibited.',
    ],
    recommendedGear: ['High-quality poncho or raincoat', 'Grip-heavy waterproof shoes', 'Insect repellent'],
    healthRequirements: ['Moderate fitness level', 'Ability to walk 10km a day continuously for 4 days'],
    offlineDownloaded: true,
  },
  {
    id: '3',
    title: 'Kedarkantha Peak',
    difficulty: 'Moderate',
    durationDays: 6,
    distanceKm: 20,
    elevationGainM: 1850,
    maxElevationM: 3810,
    state: 'Uttarakhand',
    district: 'Uttarkashi',
    status: 'Open',
    dataVerifiedDate: '20 May 2025',
    dataVerifiedDaysAgo: 4,
    permitRequired: true,
    permitFeeINR: 150,
    description:
      'Widely regarded as the best winter snow trek in India, featuring pristine pine forests buried under thick blankets of snow.',
    imageUrl:
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&auto=format&fit=crop',
    startPoint: { latitude: 31.0664, longitude: 78.1887, name: 'Sankri' },
    coordinates: [
      { latitude: 31.0664, longitude: 78.1887 },
      { latitude: 31.085, longitude: 78.205 },
      { latitude: 31.115, longitude: 78.212 },
      { latitude: 31.2167, longitude: 78.2 },
    ],
    seasons: [
      {
        season: 'Winter',
        months: 'December - February',
        whatYouSee: ['Snow-covered trails', 'Frozen streams', '360 degree peak views', 'Minimal crowds'],
        crowdLevel: 'Medium',
        dangerLevel: 'Medium',
        recommended: true,
      },
      {
        season: 'Spring',
        months: 'March - May',
        whatYouSee: ['Rhododendron blooms', 'Clear skies', 'Green meadows beginning', 'Good visibility'],
        crowdLevel: 'High',
        dangerLevel: 'Low',
        recommended: false,
      },
      {
        season: 'Autumn',
        months: 'September - November',
        whatYouSee: ['Golden foliage', 'Stable weather', 'Clear mountain views', 'Low crowds'],
        crowdLevel: 'Low',
        dangerLevel: 'Low',
        recommended: false,
      },
    ],
    days: [
      { day: 1, from: 'Sankri', to: 'Juda Ka Talab', elevationM: 2708, distanceKm: 4 },
      { day: 2, from: 'Juda Ka Talab', to: 'Kedarkantha Base', elevationM: 3175, distanceKm: 4 },
      { day: 3, from: 'Base Camp', to: 'Kedarkantha Peak', elevationM: 3810, distanceKm: 6 },
      { day: 4, from: 'Peak', to: 'Hargaon Camp', elevationM: 2680, distanceKm: 6 },
    ],
    costEstimate: {
      transportINR: '₹1,500 - ₹2,500',
      accommodationPerNightINR: '₹400 - ₹800',
      guidePerDayINR: '₹1,200 - ₹1,800',
      foodPerDayINR: '₹300 - ₹500',
    },
    safetyTips: [
      'Frostbite risk is high during peak winter mornings.',
      'Always use gaiters to keep snow out of your boots.',
      'Layering is key — wear at least 4 layers at the peak summit.',
    ],
    recommendedGear: ['Down feather heavy jacket (-10°C rated)', 'Snow gaiters and crampons', 'Thermal innerwear (wool blend)'],
    healthRequirements: ['Basic physical fitness', 'No severe knee joint issues or arthritis'],
    offlineDownloaded: false,
  },
  {
    id: '4',
    title: 'Triund Hill Trek',
    difficulty: 'Easy',
    durationDays: 2,
    distanceKm: 9,
    elevationGainM: 800,
    maxElevationM: 2828,
    state: 'Himachal Pradesh',
    district: 'Kangra',
    status: 'Open',
    dataVerifiedDate: '23 May 2025',
    dataVerifiedDaysAgo: 1,
    permitRequired: false,
    permitFeeINR: null,
    description:
      'The crown jewel of Dharamshala offering panoramic views of the Dhauladhar range on one side and the beautiful Kangra valley on the other.',
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop',
    startPoint: { latitude: 32.2426, longitude: 76.3258, name: 'Dharamkot' },
    coordinates: [
      { latitude: 32.2426, longitude: 76.3258 },
      { latitude: 32.261, longitude: 76.34 },
      { latitude: 32.274, longitude: 76.353 },
    ],
    seasons: [
      {
        season: 'Spring',
        months: 'March - May',
        whatYouSee: ['Clear Dhauladhar views', 'Wildflowers on trail', 'Pleasant temperature', 'High crowds'],
        crowdLevel: 'High',
        dangerLevel: 'Low',
        recommended: true,
      },
      {
        season: 'Autumn',
        months: 'September - November',
        whatYouSee: ['Best visibility of the year', 'Cool and dry trail', 'Golden valley views', 'Moderate crowds'],
        crowdLevel: 'Medium',
        dangerLevel: 'Low',
        recommended: false,
      },
      {
        season: 'Winter',
        months: 'December - February',
        whatYouSee: ['Snow on trail', 'Dramatic white peaks', 'Very few crowds', 'Cold nights'],
        crowdLevel: 'Low',
        dangerLevel: 'Medium',
        recommended: false,
      },
    ],
    days: [
      { day: 1, from: 'Dharamkot', to: 'Triund Top', elevationM: 2828, distanceKm: 9 },
      { day: 2, from: 'Triund Top', to: 'Dharamkot', elevationM: 1457, distanceKm: 9 },
    ],
    costEstimate: {
      transportINR: '₹300 - ₹800',
      accommodationPerNightINR: '₹300 - ₹600',
      guidePerDayINR: '₹800 - ₹1,200',
      foodPerDayINR: '₹200 - ₹400',
    },
    safetyTips: [
      'Beware of monkeys near tea shops — keep food secure.',
      'Carry enough water as there are no natural springs on the trail.',
      'Check weather forecasts for lightning before starting.',
    ],
    recommendedGear: ['Daypack (20 to 30L)', 'Good walking shoes', 'Windbreaker jacket'],
    healthRequirements: ['Suitable for beginners and families', 'Basic walking stamina'],
    offlineDownloaded: false,
  },
  {
    id: '5',
    title: 'Hampta Pass',
    difficulty: 'Moderate',
    durationDays: 5,
    distanceKm: 35,
    elevationGainM: 1800,
    maxElevationM: 4270,
    state: 'Himachal Pradesh',
    district: 'Kullu',
    status: 'Open',
    dataVerifiedDate: '18 May 2025',
    dataVerifiedDaysAgo: 6,
    permitRequired: false,
    permitFeeINR: null,
    description:
      'A dramatic crossover trek connecting the lush Kullu Valley with the stark moonscape of Lahaul. The contrast between the two sides is extraordinary.',
    imageUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop',
    startPoint: { latitude: 32.1534, longitude: 77.1757, name: 'Jobra' },
    coordinates: [
      { latitude: 32.1534, longitude: 77.1757 },
      { latitude: 32.1750, longitude: 77.1900 },
      { latitude: 32.2100, longitude: 77.2050 },
      { latitude: 32.2400, longitude: 77.2200 },
    ],
    seasons: [
      {
        season: 'Summer',
        months: 'June - August',
        whatYouSee: ['Lush green meadows', 'Wild flowers', 'Flowing streams', 'High crowds'],
        crowdLevel: 'High',
        dangerLevel: 'Low',
        recommended: true,
      },
      {
        season: 'Autumn',
        months: 'September - October',
        whatYouSee: ['Clear blue skies', 'Early snow on peaks', 'Golden grass', 'Best visibility'],
        crowdLevel: 'Medium',
        dangerLevel: 'Low',
        recommended: false,
      },
    ],
    days: [
      { day: 1, from: 'Jobra', to: 'Chika', elevationM: 3050, distanceKm: 6 },
      { day: 2, from: 'Chika', to: 'Balu ka Ghera', elevationM: 3810, distanceKm: 8 },
      { day: 3, from: 'Balu ka Ghera', to: 'Hampta Pass + Shea Goru', elevationM: 4270, distanceKm: 11 },
      { day: 4, from: 'Shea Goru', to: 'Chatru', elevationM: 3360, distanceKm: 10 },
    ],
    costEstimate: {
      transportINR: '₹800 - ₹1,500',
      accommodationPerNightINR: '₹500 - ₹1,000',
      guidePerDayINR: '₹1,500 - ₹2,000',
      foodPerDayINR: '₹350 - ₹600',
    },
    safetyTips: [
      'River crossings can be dangerous during peak monsoon.',
      'Snow on the pass can be deep even in July — use gaiters.',
      'Carry a warm layer even in summer as pass temperatures drop suddenly.',
    ],
    recommendedGear: ['Trekking poles (mandatory for the pass descent)', 'Rain cover for backpack', 'Quick-dry clothes'],
    healthRequirements: ['Good cardiovascular fitness', 'Prior trekking experience recommended'],
    offlineDownloaded: false,
  },
];