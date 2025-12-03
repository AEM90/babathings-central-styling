/**
 * BabaThings App Configuration
 * 
 * This file contains the configuration for all available apps/subdomains.
 * To add a new subdomain app, simply add a new entry to the apps array.
 * 
 * Each app object should have:
 * - id: unique identifier (lowercase, no spaces)
 * - name: display name
 * - description: short description of what the app does
 * - url: subdomain URL (can be relative or absolute)
 * - icon: emoji or icon representation
 * - color: background color for the icon (hex or gradient)
 * - status: optional status badge (new, beta, coming-soon)
 */

const appsConfig = [
    {
        id: 'decision-wheel',
        name: 'Decision Wheel',
        description: 'Spin the wheel to make decisions',
        url: 'https://decision-wheel.babathings.com',
        icon: '🎡',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        status: 'new'
    },
    {
        id: 'atomwatch',
        name: 'AtomWatch',
        description: 'Track time with atomic precision',
        url: 'https://atomwatch.babathings.com',
        icon: '⏱️',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        status: null
    },
    {
        id: 'moneyburn',
        name: 'MoneyBurn',
        description: 'Meeting cost calculator',
        url: 'https://moneyburn.babathings.com',
        icon: '💰',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        status: null
    },
    {
        id: 'soundboard',
        name: 'Agile Soundboard',
        description: 'Fun sounds for agile meetings',
        url: 'https://soundboard.babathings.com',
        icon: '🎵',
        color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        status: 'beta'
    },
    {
        id: 'brainstorm',
        name: 'Brainstorm',
        description: 'Collaborative idea board',
        url: 'https://brainstorm.babathings.com',
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

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = appsConfig;
}
