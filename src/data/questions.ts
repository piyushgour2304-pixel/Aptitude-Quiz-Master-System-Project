import { Question, Category } from '@/types/quiz';

export const categories: Category[] = [
  {
    id: 'quantitative',
    name: 'Quantitative Aptitude',
    icon: '🧮',
    color: 'from-cyan-500 to-blue-600',
    description: 'Master numbers, percentages, ratios, and mathematical reasoning',
    totalLevels: 50,
    completedLevels: 0,
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    icon: '🧠',
    color: 'from-purple-500 to-pink-600',
    description: 'Sharpen your analytical and logical thinking skills',
    totalLevels: 50,
    completedLevels: 0,
  },
  {
    id: 'verbal',
    name: 'Verbal Ability',
    icon: '📚',
    color: 'from-green-500 to-emerald-600',
    description: 'Enhance vocabulary, grammar, and comprehension',
    totalLevels: 50,
    completedLevels: 0,
  },
  {
    id: 'non-verbal',
    name: 'Non-Verbal Ability',
    icon: '🔷',
    color: 'from-orange-500 to-red-600',
    description: 'Pattern recognition and spatial reasoning challenges',
    totalLevels: 50,
    completedLevels: 0,
  },
  {
    id: 'puzzles',
    name: 'Puzzles',
    icon: '🧩',
    color: 'from-yellow-500 to-amber-600',
    description: 'Brain teasers and creative problem solving',
    totalLevels: 50,
    completedLevels: 0,
  },
];

const generateQuestions = (categoryId: string, level: number): Question[] => {
  const difficulty: 'easy' | 'medium' | 'hard' = 
    level <= 15 ? 'easy' : level <= 35 ? 'medium' : 'hard';

  const questionBanks: { [key: string]: Question[][] } = {
    quantitative: [
      [
        { id: 'q1', text: 'What is 25 + 37?', options: ['52', '62', '72', '82'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q2', text: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correctAnswer: 2, difficulty: 'easy' },
        { id: 'q3', text: 'If x = 5, what is 3x + 7?', options: ['15', '22', '20', '17'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q4', text: 'What is the square of 12?', options: ['124', '144', '134', '154'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q5', text: 'What is 48 ÷ 6?', options: ['6', '7', '8', '9'], correctAnswer: 2, difficulty: 'easy' },
      ],
      [
        { id: 'q1', text: 'A train travels 360 km in 4 hours. What is its speed?', options: ['80 km/h', '90 km/h', '85 km/h', '95 km/h'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q2', text: 'If the ratio of boys to girls is 3:5 and total students are 40, how many boys?', options: ['12', '15', '18', '20'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q3', text: 'What is the compound interest on $1000 at 10% for 2 years?', options: ['$200', '$210', '$220', '$230'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q4', text: 'The average of 5 numbers is 20. If one number is 30, what is the average of remaining?', options: ['17.5', '18', '18.5', '19'], correctAnswer: 0, difficulty: 'medium' },
        { id: 'q5', text: 'A product costs $80 after 20% discount. What was original price?', options: ['$96', '$100', '$104', '$110'], correctAnswer: 1, difficulty: 'medium' },
      ],
      [
        { id: 'q1', text: 'If log₂(x) = 5, what is x?', options: ['16', '25', '32', '64'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q2', text: 'In how many ways can 6 people be seated in a row?', options: ['120', '360', '720', '840'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q3', text: 'What is the probability of getting at least one head in 3 coin tosses?', options: ['3/8', '5/8', '7/8', '1/8'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q4', text: 'If A can do a job in 12 days and B in 15 days, how long together?', options: ['6 days', '6.67 days', '7 days', '7.5 days'], correctAnswer: 1, difficulty: 'hard' },
        { id: 'q5', text: 'The sum of infinite GP 1, 1/2, 1/4... is?', options: ['1', '1.5', '2', '2.5'], correctAnswer: 2, difficulty: 'hard' },
      ],
    ],
    logical: [
      [
        { id: 'q1', text: 'If all dogs are animals and all animals have tails, then:', options: ['Some dogs have tails', 'All dogs have tails', 'No dogs have tails', 'Cannot determine'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q2', text: 'Complete: 2, 4, 8, 16, ?', options: ['24', '28', '32', '36'], correctAnswer: 2, difficulty: 'easy' },
        { id: 'q3', text: 'BOOK is to READ as FOOD is to:', options: ['Cook', 'Eat', 'Buy', 'Sell'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q4', text: 'If A > B and B > C, then:', options: ['A < C', 'A = C', 'A > C', 'Cannot determine'], correctAnswer: 2, difficulty: 'easy' },
        { id: 'q5', text: 'Odd one out: Apple, Banana, Carrot, Mango', options: ['Apple', 'Banana', 'Carrot', 'Mango'], correctAnswer: 2, difficulty: 'easy' },
      ],
      [
        { id: 'q1', text: 'If CLOUD is coded as DMPVE, then RAIN is coded as:', options: ['SBJO', 'RBJN', 'SAJO', 'TBJN'], correctAnswer: 0, difficulty: 'medium' },
        { id: 'q2', text: 'Find missing: 3, 9, 27, 81, ?', options: ['162', '189', '243', '324'], correctAnswer: 2, difficulty: 'medium' },
        { id: 'q3', text: 'John is older than Peter. Mary is younger than John. Peter is older than Mary. Who is youngest?', options: ['John', 'Peter', 'Mary', 'Cannot determine'], correctAnswer: 2, difficulty: 'medium' },
        { id: 'q4', text: 'If some cats are dogs and all dogs are birds, then:', options: ['All cats are birds', 'Some cats are birds', 'No cats are birds', 'All birds are cats'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q5', text: 'ABCD : ZYXW :: EFGH : ?', options: ['VUSR', 'VUTS', 'WVUT', 'TSRQ'], correctAnswer: 1, difficulty: 'medium' },
      ],
      [
        { id: 'q1', text: 'A is 2 years older than B. B is twice as old as C. If C is 6, what is A?', options: ['12', '14', '16', '18'], correctAnswer: 1, difficulty: 'hard' },
        { id: 'q2', text: 'If only some A are B, and all B are C, which must be true?', options: ['All A are C', 'Some A are C', 'No A are C', 'All C are A'], correctAnswer: 1, difficulty: 'hard' },
        { id: 'q3', text: 'Complete: 1, 1, 2, 3, 5, 8, 13, ?', options: ['18', '20', '21', '24'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q4', text: 'In a race, Tom beats Jerry. Jerry beats Spike. Spike beats Butch. Who finishes last?', options: ['Tom', 'Jerry', 'Spike', 'Butch'], correctAnswer: 3, difficulty: 'hard' },
        { id: 'q5', text: 'If COMPUTER = 12345678, then COMPUTE = ?', options: ['1234567', '2345678', '1234568', '1234578'], correctAnswer: 0, difficulty: 'hard' },
      ],
    ],
    verbal: [
      [
        { id: 'q1', text: 'Choose the synonym of "Happy":', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q2', text: 'Choose the antonym of "Ancient":', options: ['Old', 'Historic', 'Modern', 'Antique'], correctAnswer: 2, difficulty: 'easy' },
        { id: 'q3', text: 'Fill the blank: She ___ to school every day.', options: ['go', 'goes', 'going', 'went'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q4', text: 'Which word is spelled correctly?', options: ['Recieve', 'Receive', 'Recive', 'Receeve'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q5', text: 'Choose the correct article: ___ apple a day keeps doctor away.', options: ['A', 'An', 'The', 'No article'], correctAnswer: 1, difficulty: 'easy' },
      ],
      [
        { id: 'q1', text: 'Identify the figure of speech: "Time is money"', options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q2', text: 'Choose the synonym of "Ubiquitous":', options: ['Rare', 'Omnipresent', 'Unique', 'Absent'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q3', text: 'Choose correct passive voice: "She writes a letter"', options: ['A letter is written by her', 'A letter was written by her', 'A letter is being written by her', 'A letter has been written by her'], correctAnswer: 0, difficulty: 'medium' },
        { id: 'q4', text: 'Fill the blank: Neither he nor she ___ present.', options: ['are', 'is', 'were', 'have been'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q5', text: 'Choose antonym of "Benevolent":', options: ['Kind', 'Generous', 'Malevolent', 'Helpful'], correctAnswer: 2, difficulty: 'medium' },
      ],
      [
        { id: 'q1', text: 'Identify the sentence with correct punctuation:', options: ['He asked, "Where are you going?"', 'He asked "Where are you going"', 'He asked, where are you going?', 'He asked: "Where are you going"'], correctAnswer: 0, difficulty: 'hard' },
        { id: 'q2', text: 'Choose the word with the correct meaning of "Ephemeral":', options: ['Eternal', 'Short-lived', 'Permanent', 'Ancient'], correctAnswer: 1, difficulty: 'hard' },
        { id: 'q3', text: 'Identify the type of clause: "When the rain stopped, we went out"', options: ['Noun clause', 'Adjective clause', 'Adverb clause', 'Independent clause'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q4', text: 'Choose the correct idiom meaning "very expensive":', options: ['Cost an arm', 'Cost a fortune', 'Cost an arm and a leg', 'Cost everything'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q5', text: 'Which is a palindrome?', options: ['RADAR', 'RIVER', 'RADIO', 'RAPID'], correctAnswer: 0, difficulty: 'hard' },
      ],
    ],
    'non-verbal': [
      [
        { id: 'q1', text: 'If △ rotates 90° clockwise, what position is it in?', options: ['Same', 'Inverted', 'On its side', 'Upside down'], correctAnswer: 2, difficulty: 'easy' },
        { id: 'q2', text: 'How many triangles in a figure with 3 overlapping triangles?', options: ['3', '4', '5', '7'], correctAnswer: 3, difficulty: 'easy' },
        { id: 'q3', text: 'Complete pattern: ○ □ ○ □ ○ ?', options: ['○', '□', '△', '◇'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q4', text: 'Mirror image of "E" is:', options: ['E', '3', 'Ǝ', 'ɘ'], correctAnswer: 2, difficulty: 'easy' },
        { id: 'q5', text: 'How many cubes in a 2x2x2 arrangement?', options: ['4', '6', '8', '10'], correctAnswer: 2, difficulty: 'easy' },
      ],
      [
        { id: 'q1', text: 'A cube has how many edges?', options: ['6', '8', '10', '12'], correctAnswer: 3, difficulty: 'medium' },
        { id: 'q2', text: 'If a paper is folded twice and a hole is punched, how many holes when unfolded?', options: ['1', '2', '4', '8'], correctAnswer: 2, difficulty: 'medium' },
        { id: 'q3', text: 'Complete: 🔴🔵🔴🔵🔴🔵 → next in series?', options: ['🔴', '🔵', '🟢', '🟡'], correctAnswer: 0, difficulty: 'medium' },
        { id: 'q4', text: 'Water image of letter "F" looks like:', options: ['F', 'Ꮈ', 'ꟻ', 'Rotated F'], correctAnswer: 0, difficulty: 'medium' },
        { id: 'q5', text: 'How many faces does a pyramid with square base have?', options: ['4', '5', '6', '8'], correctAnswer: 1, difficulty: 'medium' },
      ],
      [
        { id: 'q1', text: 'A cube is painted on all faces and cut into 27 smaller cubes. How many have exactly 2 painted faces?', options: ['6', '8', '12', '16'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q2', text: 'If figure rotates 270° anti-clockwise, it equals rotation of:', options: ['90° clockwise', '180° clockwise', '270° clockwise', '360° clockwise'], correctAnswer: 0, difficulty: 'hard' },
        { id: 'q3', text: 'A hexagon has how many diagonals?', options: ['6', '9', '12', '15'], correctAnswer: 1, difficulty: 'hard' },
        { id: 'q4', text: 'Complete: 1, 3, 7, 15, 31, ?', options: ['45', '55', '63', '72'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q5', text: 'How many cubes with no painted face when a 3x3x3 painted cube is cut?', options: ['0', '1', '8', '27'], correctAnswer: 1, difficulty: 'hard' },
      ],
    ],
    puzzles: [
      [
        { id: 'q1', text: 'I have cities but no houses. I have mountains but no trees. What am I?', options: ['Globe', 'Map', 'Atlas', 'Painting'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q2', text: 'What has hands but cannot clap?', options: ['Gloves', 'Clock', 'Robot', 'Puppet'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q3', text: 'What gets wetter the more it dries?', options: ['Sponge', 'Towel', 'Paper', 'Cloth'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q4', text: 'What can travel around the world while staying in a corner?', options: ['Letter', 'Stamp', 'Postcard', 'Envelope'], correctAnswer: 1, difficulty: 'easy' },
        { id: 'q5', text: 'What has keys but no locks?', options: ['Car', 'Piano', 'House', 'Safe'], correctAnswer: 1, difficulty: 'easy' },
      ],
      [
        { id: 'q1', text: 'A farmer has 17 sheep. All but 9 die. How many are left?', options: ['8', '9', '17', '0'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q2', text: 'What word becomes shorter when you add letters to it?', options: ['Long', 'Short', 'Small', 'Brief'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q3', text: 'If you have it, you want to share it. If you share it, you dont have it. What is it?', options: ['Love', 'Money', 'Secret', 'Time'], correctAnswer: 2, difficulty: 'medium' },
        { id: 'q4', text: 'Two fathers and two sons go fishing. They catch 3 fish. Each takes one home. How?', options: ['They shared', 'One is grandfather, father, son', 'Magic', 'They released one'], correctAnswer: 1, difficulty: 'medium' },
        { id: 'q5', text: 'What can you catch but not throw?', options: ['Ball', 'Cold', 'Fish', 'Frisbee'], correctAnswer: 1, difficulty: 'medium' },
      ],
      [
        { id: 'q1', text: 'A man builds a house with all 4 sides facing south. A bear walks by. What color is the bear?', options: ['Brown', 'Black', 'White', 'Cannot determine'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q2', text: 'What 5-letter word becomes shorter when you add 2 letters?', options: ['Small', 'Short', 'Brief', 'Quick'], correctAnswer: 1, difficulty: 'hard' },
        { id: 'q3', text: 'I am taken from a mine, enclosed in wood, and used by everyone. What am I?', options: ['Coal', 'Pencil lead', 'Diamond', 'Gold'], correctAnswer: 1, difficulty: 'hard' },
        { id: 'q4', text: 'What disappears as soon as you say its name?', options: ['Shadow', 'Echo', 'Silence', 'Dream'], correctAnswer: 2, difficulty: 'hard' },
        { id: 'q5', text: 'The more you take, the more you leave behind. What is it?', options: ['Time', 'Money', 'Footsteps', 'Memories'], correctAnswer: 2, difficulty: 'hard' },
      ],
    ],
  };

  const bank = questionBanks[categoryId] || questionBanks.quantitative;
  const difficultyIndex = difficulty === 'easy' ? 0 : difficulty === 'medium' ? 1 : 2;
  
  // Shuffle and select questions based on level
  const questions = [...bank[difficultyIndex]];
  const shuffled = questions.sort(() => Math.random() - 0.5);
  
  return shuffled.map((q, index) => ({
    ...q,
    id: `${categoryId}-${level}-${index}`,
  }));
};

export const getQuestionsForLevel = (categoryId: string, level: number): Question[] => {
  return generateQuestions(categoryId, level);
};

export const getDifficultyForLevel = (level: number): 'easy' | 'medium' | 'hard' => {
  if (level <= 15) return 'easy';
  if (level <= 35) return 'medium';
  return 'hard';
};
