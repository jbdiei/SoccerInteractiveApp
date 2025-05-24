// src/utils/mockData.ts

export interface Stat {
  label: string;
  value: string | number;
}
export const stats: Stat[] = [
  { label: 'Workouts Completed', value: 7 },
  { label: 'Program Completion', value: '65%' },
  { label: 'Day Streak', value: 3 },
];

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
}
export const programs: Program[] = [
  {
    id: '1',
    title: 'Shooting Mastery',
    subtitle: 'Perfect for forwards and attacking midfielders',
    features: [
      '4 weeks program',
      '12 unique shooting drills',
      'Technique and power focus',
      'Progressive difficulty',
    ],
  },
  {
    id: '2',
    title: 'Dribbling Excellence',
    subtitle: 'Enhance ball control and creative moves',
    features: [
      '4 weeks program',
      '15 ball mastery exercises',
      'Close control and creativity focus',
      'Skills for game situations',
    ],
  },
  {
    id: '3',
    title: 'Passing Perfection',
    subtitle: 'Mastering Precision and Vision on the Field',
    features: [
      '4 weeks program',
      'Wall Pass Reps',
      'Gate Passing',
      'One-Touch Passing Circle',
    ],
  },
];

export interface HistoryItem {
  id: string;
  date: string;
  title: string;
  program?: string;
}
export const history: HistoryItem[] = [
  {
    id: '1',
    date: 'May 22, 2025',
    title: 'Inside Foot Passing Drill',
    program: 'Shooting Mastery',
  },
  {
    id: '2',
    date: 'May 20, 2025',
    title: 'Power Shot Technique',
    program: 'Shooting Mastery',
  },
  {
    id: '3',
    date: 'May 18, 2025',
    title: 'Figure 8 Dribbling',
    program: 'Shooting Mastery',
  },
  // add more as desired
];

// at the bottom of mockData.ts

export interface Drill {
  title: string;
  description: string;
}

export interface DayPlan {
  id: string;            // e.g. 'day1'
  label: string;         // e.g. 'Day 1 – Monday'
  status: 'Completed' | 'Pending';
  drills: Drill[];
}

export interface ProgramDetail {
  id: string;
  title: string;
  week: number;
  totalWeeks: number;
  progress: number;      // 0–100
  startDate: string;     // e.g. 'May 15, 2025'
  daysLeft: number;
  dayPlans: DayPlan[];
  tips: string[];
}

export const programDetails: ProgramDetail[] = [
  {
    id: '1',
    title: 'Shooting Mastery Program',
    week: 2,
    totalWeeks: 4,
    progress: 65,
    startDate: 'May 15, 2025',
    daysLeft: 13,
    dayPlans: [
      {
        id: 'day1',
        label: 'Day 1 – Monday',
        status: 'Completed',
        drills: [
          {
            title: 'Power Shot Technique',
            description:
              'Set up 5 balls at the edge of the box. Strike through the middle of the ball with the laces. 3 sets of 5 shots.',
          },
        ],
      },
      {
        id: 'day2',
        label: 'Day 2 – Wednesday',
        status: 'Completed',
        drills: [
          {
            title: 'First-Time Finishing',
            description:
              'Have a partner or use a wall to pass. Focus on placement rather than power. 4 sets of 5 shots from different angles.',
          },
        ],
      },
      {
        id: 'day3',
        label: 'Day 3 – Friday',
        status: 'Pending',
        drills: [
          {
            title: 'Volley Practice',
            description:
              'Drop balls from knee height and volley with laces. 5 sets of 8 volleys each foot.',
          },
        ],
      },
    ],
    tips: [
      'Always spend 10–15 minutes warming up before starting the shooting drills.',
      'Keep your head over the ball and eyes on the target.',
      'Record yourself to identify areas for improvement.',
      'Allow 48 hours between intense shooting sessions to prevent overuse injuries.',
    ],
  },
  // …extend for id='2', id='3' etc.
];
