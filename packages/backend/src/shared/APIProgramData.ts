// src/utils/mockData.ts

export interface IAPIStat {
  label: string;
  value: string | number;
}
export const stats: IAPIStat[] = [
  { label: 'Workouts Completed', value: 7 },
  { label: 'Program Completion', value: '65%' },
  { label: 'Day Streak', value: 3 },
];

export interface IAPIProgram {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
}
export const programs: IAPIProgram[] = [
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

export interface IAPIHistoryItem {
  id: string;
  date: string;
  title: string;
  program?: string;
  userId: string;
}
export const history: IAPIHistoryItem[] = [
  {
    id: '1',
    date: 'May 22, 2025',
    title: 'Inside Foot Passing Drill',
    program: 'Shooting Mastery',
    userId: '1',
  },
  {
    id: '2',
    date: 'May 20, 2025',
    title: 'Power Shot Technique',
    program: 'Shooting Mastery',
    userId: '1',

  },
  {
    id: '3',
    date: 'May 18, 2025',
    title: 'Figure 8 Dribbling',
    program: 'Shooting Mastery',
    userId: '123',
  },
  // add more as desired
];

// at the bottom of mockData.ts

export interface IAPIDrill {
  title: string;
  description: string;
}

export interface IAPIDayPlan {
  id: string;            // e.g. 'day1'
  label: string;         // e.g. 'Day 1 – Monday'
  status: 'Completed' | 'Pending';
  drills: IAPIDrill[];
}

export interface IAPIProgramDetail {
  id: string;
  title: string;
  week: number;
  totalWeeks: number;
  progress: number;      // 0–100
  startDate: string;     // e.g. 'May 15, 2025'
  daysLeft: number;
  dayPlans: IAPIDayPlan[];
  tips: string[];
}

export const programDetails: IAPIProgramDetail[] = [
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
  {
    id: '2',
    title: 'Dribbling Excellence',
    week: 1,
    totalWeeks: 4,
    progress: 25,
    startDate: 'June 8, 2025',
    daysLeft: 25,
    dayPlans: [
      {
        id: 'day1',
        label: 'Day 1 – Tuesday',
        status: 'Completed',
        drills: [
          {
            title: 'Close Control Cones',
            description:
              'Set up 8 cones in a straight line, 2 feet apart. Dribble through using only the inside of both feet. 4 sets forward and backward.',
          },
        ],
      },
      {
        id: 'day2',
        label: 'Day 2 – Thursday',
        status: 'Pending',
        drills: [
          {
            title: 'Juggling Challenge',
            description:
              'Start with 20 touches using feet only. Progress to thigh-foot combinations. Aim for 50 total touches without dropping.',
          },
        ],
      },
      {
        id: 'day3',
        label: 'Day 3 – Saturday',
        status: 'Pending',
        drills: [
          {
            title: 'Box Touch Drill',
            description:
              'Create a 5x5 yard box. Dribble inside using all surfaces of both feet for 60 seconds. Rest 30 seconds. Repeat 5 times.',
          },
        ],
      },
    ],
    tips: [
      'Start slowly and focus on clean touches before increasing speed.',
      'Use both feet equally to develop ambidextrous ball control.',
      'Keep the ball close to your body during tight space dribbling.',
      'Practice with your head up to simulate game conditions.',
    ],
  },
  {
    id: '3',
    title: 'Passing Perfection',
    week: 3,
    totalWeeks: 4,
    progress: 75,
    startDate: 'April 22, 2025',
    daysLeft: 7,
    dayPlans: [
      {
        id: 'day1',
        label: 'Day 1 – Monday',
        status: 'Completed',
        drills: [
          {
            title: 'Short Pass Accuracy',
            description:
              'Set up targets 15 yards away. Use inside foot to hit targets consistently. 6 sets of 10 passes to each target.',
          },
        ],
      },
      {
        id: 'day2',
        label: 'Day 2 – Wednesday',
        status: 'Completed',
        drills: [
          {
            title: 'Long Ball Distribution',
            description:
              'Practice driven passes 30-40 yards to a partner or target. Focus on accuracy and proper follow-through. 4 sets of 8 passes.',
          },
        ],
      },
      {
        id: 'day3',
        label: 'Day 3 – Friday',
        status: 'Completed',
        drills: [
          {
            title: 'Through Ball Timing',
            description:
              'Practice weighted passes between cones representing defenders. Vary pace and timing. 5 sets of 6 through balls.',
          },
        ],
      },
    ],
    tips: [
      'Always check your shoulder before receiving the ball to scan for options.',
      'Use the inside of your foot for accuracy, outside for disguise.',
      'Practice passing with both feet under pressure situations.',
      'Communication is key – call for the ball and direct teammates.',
    ],
  },
];

