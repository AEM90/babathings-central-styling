/**
 * Default BabaThings Apps Configuration
 * This is the default set of apps that will be displayed
 * if no custom apps are provided by the consuming application
 */
export const defaultApps = [
  {
    id: 'decision-wheel',
    name: 'Decision Wheel',
    description: 'Spin the wheel to make decisions',
    url: '/apps/decision-wheel',
    icon: '🎡',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    status: 'new'
  },
  {
    id: 'atomwatch',
    name: 'AtomWatch',
    description: 'Track time with atomic precision',
    url: '/apps/atomwatch',
    icon: '⏱️',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    status: null
  },
  {
    id: 'moneyburn',
    name: 'MoneyBurn',
    description: 'Meeting cost calculator',
    url: '/apps/moneyburn',
    icon: '💰',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    status: null
  },
  {
    id: 'soundboard',
    name: 'Agile Soundboard',
    description: 'Fun sounds for agile meetings',
    url: '/apps/soundboard',
    icon: '🎵',
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    status: 'beta'
  },
  {
    id: 'brainstorm',
    name: 'Brainstorm',
    description: 'Collaborative idea board',
    url: '/apps/brainstorm',
    icon: '💡',
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    status: 'coming-soon'
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Focus and productivity timer',
    url: 'https://pomodoro.babathings.com',
    icon: '🍅',
    color: 'linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%)',
    status: 'coming-soon'
  },
  {
    id: 'retro',
    name: 'Retro Board',
    description: 'Agile retrospective tool',
    url: 'https://retro.babathings.com',
    icon: '📋',
    color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    status: 'coming-soon'
  },
  {
    id: 'standup',
    name: 'Standup Timer',
    description: 'Keep standups on track',
    url: 'https://standup.babathings.com',
    icon: '⏰',
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    status: 'coming-soon'
  }
];
