// LoopOrb Educational Portal Course Data

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  xp: number;
  completed?: boolean;
  content?: string;
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  lessons: Lesson[];
  lessonsCount: number;
  duration: string;
  xpReward: number;
  image: string;
  color: string;
  locked: boolean;
  requiredXp?: number;
  badge?: string;
}

export const courses: Course[] = [
  {
    id: 'water-basics',
    title: 'Water Basics',
    description: 'Learn why water is so vital for life',
    fullDescription: 'In this course you will learn everything about water - the most important resource on the planet! You will find out what water is made of, why life is impossible without it, where the water in our taps comes from, and how we can help preserve it for future generations.',
    level: 'beginner',
    lessons: [
      {
        id: 1,
        title: 'What is water made of?',
        duration: '5 min',
        xp: 20,
        content: 'Water consists of two hydrogen atoms and one oxygen atom. The formula for water is H2O! Imagine: each drop of water is billions of tiny molecules dancing together. Water can be solid (ice), liquid (water in a glass), and gaseous (steam). This is amazing!',
        quiz: [
          {
            id: 1,
            question: 'What is a water molecule made of?',
            options: ['Oxygen and nitrogen', 'Hydrogen and oxygen', 'Carbon and hydrogen', 'Helium and oxygen'],
            correctAnswer: 1,
            explanation: 'Correct! Water consists of two hydrogen atoms (H) and one oxygen atom (O) - formula H2O!'
          }
        ]
      },
      {
        id: 2,
        title: 'Why can\'t we live without water?',
        duration: '6 min',
        xp: 20,
        content: 'Our body is 70% water! Water helps digest food, transports nutrients to cells, removes harmful substances, and regulates body temperature. Without water, a person can survive only 3-4 days!',
        quiz: [
          {
            id: 1,
            question: 'What percentage of water is in our body?',
            options: ['30%', '50%', '70%', '90%'],
            correctAnswer: 2,
            explanation: 'Right! Our body is 70% water - almost like planet Earth!'
          }
        ]
      },
      {
        id: 3,
        title: 'Where does tap water come from?',
        duration: '7 min',
        xp: 20,
        content: 'Tap water travels a long path! First it is collected in a reservoir, then goes through water treatment plants where it is filtered and disinfected. Then through pipes it reaches our homes. This journey can take several days!',
        quiz: [
          {
            id: 1,
            question: 'What happens to water at treatment plants?',
            options: ['It is heated', 'It is filtered and disinfected', 'It is frozen', 'It is mixed with salt'],
            correctAnswer: 1,
            explanation: 'Correct! At treatment plants water undergoes filtration and disinfection to become safe for drinking.'
          }
        ]
      },
      {
        id: 4,
        title: 'Where in the world is water scarce?',
        duration: '6 min',
        xp: 20,
        content: 'Over 2 billion people worldwide lack access to clean drinking water! In Africa, the Middle East, and parts of Asia, water is a rare commodity. People sometimes walk several kilometers for water every day.',
        quiz: [
          {
            id: 1,
            question: 'How many people worldwide lack access to clean water?',
            options: ['100 million', '500 million', 'Over 2 billion', '10 million'],
            correctAnswer: 2,
            explanation: 'Yes! Over 2 billion people worldwide lack access to clean drinking water.'
          }
        ]
      },
      {
        id: 5,
        title: 'How can I help conserve water?',
        duration: '6 min',
        xp: 20,
        content: 'Even a small person can help conserve water! Turn off the tap while brushing your teeth (saves 6 liters!). Take showers instead of baths. Tell adults about leaky faucets. Water plants in the evening when water doesn\'t evaporate quickly.',
        quiz: [
          {
            id: 1,
            question: 'How much water can you save by turning off the tap while brushing teeth?',
            options: ['1 liter', '3 liters', '6 liters', '10 liters'],
            correctAnswer: 2,
            explanation: 'Correct! By turning off the tap while brushing your teeth, you save up to 6 liters of water!'
          }
        ]
      }
    ],
    lessonsCount: 5,
    duration: '30 minutes',
    xpReward: 100,
    image: '/learn/water-basics.jpg',
    color: 'from-blue-500 to-cyan-400',
    locked: false,
    badge: 'Water Novice'
  },
  {
    id: 'water-quality',
    title: 'How to Check Water Quality',
    description: 'Learn to determine if water is clean',
    fullDescription: 'In this course you will learn how to check water quality! You will discover which parameters matter, how to use simple tests at home, and what to do if water doesn\'t meet standards.',
    level: 'intermediate',
    lessons: [
      { id: 1, title: 'Why is it important to check water?', duration: '6 min', xp: 25 },
      { id: 2, title: 'Color, smell and taste of water', duration: '7 min', xp: 25 },
      { id: 3, title: 'What is water pH?', duration: '8 min', xp: 25 },
      { id: 4, title: 'Simple home tests', duration: '7 min', xp: 25 },
      { id: 5, title: 'Laboratory analysis', duration: '6 min', xp: 25 },
      { id: 6, title: 'Nitrates and nitrites', duration: '8 min', xp: 25 },
      { id: 7, title: 'Water hardness', duration: '7 min', xp: 25 },
      { id: 8, title: 'When should water not be drunk?', duration: '6 min', xp: 25 }
    ],
    lessonsCount: 8,
    duration: '55 minutes',
    xpReward: 200,
    image: '/learn/water-quality.jpg',
    color: 'from-emerald-500 to-teal-400',
    locked: false,
    badge: 'Water Researcher'
  },
  {
    id: 'ecology-around',
    title: 'Ecology Around Us',
    description: 'Learn how water is connected with nature',
    fullDescription: 'This course explores the connection between water and the environment. You will learn about the water cycle, aquatic life, river and lake pollution, and how to protect nature around you.',
    level: 'intermediate',
    lessons: [
      { id: 1, title: 'The water cycle in nature', duration: '8 min', xp: 30 },
      { id: 2, title: 'Living creatures in water', duration: '7 min', xp: 30 },
      { id: 3, title: 'Rivers and lakes of our planet', duration: '6 min', xp: 30 },
      { id: 4, title: 'Why do rivers get polluted?', duration: '8 min', xp: 30 },
      { id: 5, title: 'Oceans and seas', duration: '7 min', xp: 30 },
      { id: 6, title: 'Glaciers and polar regions', duration: '7 min', xp: 30 },
      { id: 7, title: 'Groundwater', duration: '6 min', xp: 30 },
      { id: 8, title: 'How to save the river in your yard?', duration: '8 min', xp: 30 },
      { id: 9, title: 'Plants and water', duration: '6 min', xp: 30 },
      { id: 10, title: 'Ecosystems of the world', duration: '7 min', xp: 30 }
    ],
    lessonsCount: 10,
    duration: '70 minutes',
    xpReward: 300,
    image: '/learn/ecology.jpg',
    color: 'from-green-500 to-lime-400',
    locked: true,
    requiredXp: 100,
    badge: 'Eco Defender'
  },
  {
    id: 'advanced-analytics',
    title: 'Advanced Analytics',
    description: 'Deep study of water data',
    fullDescription: 'An advanced course for those who want to deeply understand water analytics. We will study microbiology, chemical composition, modern analysis methods, and data interpretation.',
    level: 'advanced',
    lessons: [
      { id: 1, title: 'Introduction to analytics', duration: '8 min', xp: 40 },
      { id: 2, title: 'Microorganisms in water', duration: '9 min', xp: 40 },
      { id: 3, title: 'Heavy metals', duration: '8 min', xp: 40 },
      { id: 4, title: 'Chemical indicators', duration: '9 min', xp: 40 },
      { id: 5, title: 'Digital sensors', duration: '8 min', xp: 40 },
      { id: 6, title: 'Sample collection and storage', duration: '7 min', xp: 40 },
      { id: 7, title: 'Reading reports', duration: '8 min', xp: 40 },
      { id: 8, title: 'Trends and forecasts', duration: '9 min', xp: 40 },
      { id: 9, title: 'Comparing standards', duration: '8 min', xp: 40 },
      { id: 10, title: 'IoT in water monitoring', duration: '9 min', xp: 40 },
      { id: 11, title: 'Big data', duration: '8 min', xp: 40 },
      { id: 12, title: 'The future of analytics', duration: '8 min', xp: 40 }
    ],
    lessonsCount: 12,
    duration: '99 minutes',
    xpReward: 480,
    image: '/learn/analytics.jpg',
    color: 'from-purple-500 to-violet-400',
    locked: true,
    requiredXp: 500,
    badge: 'Water Analyst'
  },
  {
    id: 'station-operator',
    title: 'Become a Station Operator',
    description: 'Professional operator course',
    fullDescription: 'The most advanced course! Learn to manage a water treatment station, understand all processes, perform quality control, and solve complex problems. For future professionals!',
    level: 'expert',
    lessons: [
      { id: 1, title: 'Who is an operator?', duration: '9 min', xp: 50 },
      { id: 2, title: 'Station equipment', duration: '10 min', xp: 50 },
      { id: 3, title: 'Treatment processes', duration: '10 min', xp: 50 },
      { id: 4, title: 'Filters and their types', duration: '9 min', xp: 50 },
      { id: 5, title: 'Water disinfection', duration: '9 min', xp: 50 },
      { id: 6, title: 'Control instruments', duration: '8 min', xp: 50 },
      { id: 7, title: 'Operator logbook', duration: '8 min', xp: 50 },
      { id: 8, title: 'Emergency situations', duration: '10 min', xp: 50 },
      { id: 9, title: 'Ecology and safety', duration: '9 min', xp: 50 },
      { id: 10, title: 'Water economics', duration: '8 min', xp: 50 },
      { id: 11, title: 'Working with people', duration: '8 min', xp: 50 },
      { id: 12, title: 'Professional development', duration: '9 min', xp: 50 },
      { id: 13, title: 'Modern technologies', duration: '10 min', xp: 50 },
      { id: 14, title: 'Automation', duration: '9 min', xp: 50 },
      { id: 15, title: 'Final exam', duration: '15 min', xp: 100 }
    ],
    lessonsCount: 15,
    duration: '141 minutes',
    xpReward: 800,
    image: '/learn/operator.jpg',
    color: 'from-amber-500 to-orange-400',
    locked: true,
    requiredXp: 1000,
    badge: 'Station Operator'
  }
];

// Leaderboard data - will be populated from real user data when backend is ready
export const leaderboard: { rank: number; name: string; xp: number; avatar: string; courses: number; streak: number }[] = [];

// Daily water facts
export const dailyFacts = [
  { id: 1, fact: 'Oceans contain 97% of all water on Earth, but it is salty!', icon: '' },
  { id: 2, fact: 'The deepest point in the ocean - Mariana Trench, 11 km!', icon: '' },
  { id: 3, fact: 'Angel Falls in Venezuela is the tallest at 979 meters!', icon: '' },
  { id: 4, fact: 'The Chinese white dolphin can live in both fresh and salt water!', icon: '' },
  { id: 5, fact: 'The largest freshwater lake by volume - Baikal in Russia!', icon: '' },
  { id: 6, fact: 'A cloud can weigh over 1 million kilograms!', icon: '' },
  { id: 7, fact: 'A pearl can only form in water!', icon: '' },
  { id: 8, fact: 'A water jellyfish is 95% water!', icon: '' },
  { id: 9, fact: 'Watermelon is 92% water!', icon: '' },
  { id: 10, fact: 'One sheet of paper requires 10 liters of water to produce!', icon: '' },
  { id: 11, fact: 'A tomato is 94% water!', icon: '' },
  { id: 12, fact: 'Earth is the only planet with liquid water on its surface!', icon: '' }
];

// Quiz questions
export const quizQuestions = {
  easy: [
    {
      id: 1,
      question: 'What is the formula for water?',
      options: ['H2O', 'CO2', 'O2', 'NaCl'],
      correctAnswer: 0,
      explanation: 'H2O - two hydrogen atoms and one oxygen atom!'
    },
    {
      id: 2,
      question: 'What states can water exist in?',
      options: ['Only liquid', 'Only solid', 'Solid, liquid, and gaseous', 'Only hot'],
      correctAnswer: 2,
      explanation: 'Water can be ice (solid), water (liquid), and steam (gas)!'
    },
    {
      id: 3,
      question: 'How many planets in the Solar System have water?',
      options: ['All', 'Only Earth', 'Earth and Mars', 'None'],
      correctAnswer: 1,
      explanation: 'Only Earth has liquid water on its surface!'
    },
    {
      id: 4,
      question: 'What is heavier: a bucket of water or a bucket of ice?',
      options: ['Bucket of water', 'Bucket of ice', 'The same', 'Depends on size'],
      correctAnswer: 0,
      explanation: 'Ice floats in water because it is lighter than water!'
    },
    {
      id: 5,
      question: 'What is the largest freshwater lake?',
      options: ['Ontario', 'Baikal', 'Victoria', 'Michigan'],
      correctAnswer: 1,
      explanation: 'Baikal in Russia is the deepest and largest by volume!'
    },
    {
      id: 6,
      question: 'How many oceans are on Earth?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 2,
      explanation: '5 oceans: Pacific, Atlantic, Indian, Southern, and Arctic!'
    },
    {
      id: 7,
      question: 'What percentage of water is in a watermelon?',
      options: ['50%', '70%', '92%', '100%'],
      correctAnswer: 2,
      explanation: 'Watermelon is 92% water - that\'s why it is so juicy!'
    },
    {
      id: 8,
      question: 'Where does rain come from?',
      options: ['From rivers', 'From clouds', 'From the sea', 'From a tap'],
      correctAnswer: 1,
      explanation: 'Rain falls from clouds that form from water vapor!'
    },
    {
      id: 9,
      question: 'Which animal drinks the most water?',
      options: ['Elephant', 'Whale', 'Giraffe', 'Camel'],
      correctAnswer: 0,
      explanation: 'An elephant drinks up to 190 liters of water per day!'
    },
    {
      id: 10,
      question: 'What happens if water is frozen?',
      options: ['It evaporates', 'It becomes ice', 'It disappears', 'It becomes hot'],
      correctAnswer: 1,
      explanation: 'When frozen, water turns into solid ice!'
    }
  ],
  medium: [
    {
      id: 1,
      question: 'What is the pH of pure water?',
      options: ['5', '7', '10', '14'],
      correctAnswer: 1,
      explanation: 'Pure water has a neutral pH = 7!'
    },
    {
      id: 2,
      question: 'What is the water cycle?',
      options: ['A water game', 'Movement of water in nature', 'A type of filter', 'A water slide'],
      correctAnswer: 1,
      explanation: 'The water cycle is the continuous movement of water in nature!'
    },
    {
      id: 3,
      question: 'What is the freezing temperature of water?',
      options: ['0 C', '10 C', '-10 C', '100 C'],
      correctAnswer: 0,
      explanation: 'Water freezes at 0 C at normal pressure!'
    },
    {
      id: 4,
      question: 'What makes water hard?',
      options: ['Salt', 'Calcium and magnesium', 'Sugar', 'Sand'],
      correctAnswer: 1,
      explanation: 'Calcium and magnesium make water hard!'
    },
    {
      id: 5,
      question: 'What percentage of water on Earth is fresh?',
      options: ['50%', '10%', '3%', '25%'],
      correctAnswer: 2,
      explanation: 'Only 3% of water on Earth is fresh, the rest is salty!'
    },
    {
      id: 6,
      question: 'What is the process of water turning into steam called?',
      options: ['Condensation', 'Evaporation', 'Freezing', 'Deposition'],
      correctAnswer: 1,
      explanation: 'Evaporation - the transformation of liquid water into water vapor!'
    },
    {
      id: 7,
      question: 'What percentage of water is in the human brain?',
      options: ['60%', '75%', '85%', '95%'],
      correctAnswer: 1,
      explanation: 'The brain is 75% water!'
    },
    {
      id: 8,
      question: 'How much water does a person need per day?',
      options: ['0.5 liters', '1-2 liters', '5 liters', '10 liters'],
      correctAnswer: 1,
      explanation: 'An adult needs 1.5-2 liters of water per day!'
    },
    {
      id: 9,
      question: 'What is groundwater?',
      options: ['Water in rivers', 'Water underground', 'Water in pipes', 'Rainwater'],
      correctAnswer: 1,
      explanation: 'Groundwater is found in layers of earth below the surface!'
    },
    {
      id: 10,
      question: 'What percentage of world water is in oceans?',
      options: ['50%', '70%', '85%', '97%'],
      correctAnswer: 3,
      explanation: '97% of Earth\'s water is in oceans!'
    }
  ],
  hard: [
    {
      id: 1,
      question: 'What is osmosis?',
      options: ['A type of fish', 'Water passing through a membrane', 'A waterfall', 'A type of cloud'],
      correctAnswer: 1,
      explanation: 'Osmosis is the passage of water through a semi-permeable membrane!'
    },
    {
      id: 2,
      question: 'Which mineral most commonly makes water hard?',
      options: ['Calcium carbonate', 'Salt', 'Sugar', 'Sand'],
      correctAnswer: 0,
      explanation: 'Calcium carbonate (lime) makes water hard!'
    },
    {
      id: 3,
      question: 'What is a hydrogen bond?',
      options: ['A water pipe', 'A bond between water molecules', 'A type of ship', 'An electrical connection'],
      correctAnswer: 1,
      explanation: 'Hydrogen bonds connect water molecules to each other!'
    },
    {
      id: 4,
      question: 'At what temperature does water have maximum density?',
      options: ['0 C', '4 C', '10 C', '100 C'],
      correctAnswer: 1,
      explanation: 'Water is most dense at 4 C - that is why ice floats!'
    },
    {
      id: 5,
      question: 'What is eutrophication?',
      options: ['Water purification', 'Nutrient pollution of water', 'Water heating', 'Water freezing'],
      correctAnswer: 1,
      explanation: 'Eutrophication - excess nutrients cause algae growth!'
    },
    {
      id: 6,
      question: 'Which chemical element gives water its blue color?',
      options: ['Nitrogen', 'Oxygen', 'Hydrogen', 'Carbon'],
      correctAnswer: 1,
      explanation: 'Oxygen absorbs red light, making water appear blue!'
    },
    {
      id: 7,
      question: 'How many liters of water are needed to produce 1 kg of cotton?',
      options: ['100 liters', '1,000 liters', '10,000 liters', '20,000 liters'],
      correctAnswer: 2,
      explanation: 'About 10,000 liters of water are needed for 1 kg of cotton!'
    },
    {
      id: 8,
      question: 'What is capillary action?',
      options: ['River flow', 'Rising of liquid in narrow tubes', 'A waterfall', 'Ocean waves'],
      correctAnswer: 1,
      explanation: 'Capillary action raises water in narrow tubes, like in plants!'
    },
    {
      id: 9,
      question: 'What percentage of fresh water is available for use?',
      options: ['3%', '1%', '0.4%', '10%'],
      correctAnswer: 2,
      explanation: 'Only 0.4% of all water is available for drinking - the rest is in glaciers!'
    },
    {
      id: 10,
      question: 'What is reverse osmosis?',
      options: ['A natural process', 'A water purification method', 'A type of precipitation', 'Ocean movement'],
      correctAnswer: 1,
      explanation: 'Reverse osmosis - a water purification method using membranes under pressure!'
    }
  ]
};

// Rewards and badges
export const badges = [
  { id: 'first-lesson', name: 'First Step', icon: '', description: 'Complete your first lesson', color: 'from-gray-400 to-gray-500' },
  { id: 'water-basics', name: 'Water Novice', icon: '', description: 'Complete the "Water Basics" course', color: 'from-blue-400 to-blue-500' },
  { id: 'quality-expert', name: 'Quality Expert', icon: '', description: 'Complete the water quality course', color: 'from-emerald-400 to-emerald-500' },
  { id: 'eco-warrior', name: 'Eco Defender', icon: '', description: 'Complete the ecology course', color: 'from-green-400 to-green-500' },
  { id: 'quiz-master', name: 'Quiz Master', icon: '', description: 'Score 100% on a quiz', color: 'from-yellow-400 to-amber-500' },
  { id: 'streak-7', name: 'Knowledge Week', icon: '', description: 'Study 7 days in a row', color: 'from-orange-400 to-red-500' },
  { id: 'water-cycle', name: 'Cycle Explorer', icon: '', description: 'Study the water cycle', color: 'from-cyan-400 to-blue-500' },
  { id: 'kids-hero', name: 'Kids Hero', icon: '', description: 'Help parents and children', color: 'from-pink-400 to-rose-500' }
];
