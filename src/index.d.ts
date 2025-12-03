import { Plugin } from 'vue';

/**
 * BabaThings App Configuration
 */
export interface BabaThingsApp {
  /** Unique identifier (lowercase, hyphenated) */
  id: string;
  /** Display name */
  name: string;
  /** Short description */
  description: string;
  /** Full URL to the app */
  url: string;
  /** Emoji or icon */
  icon: string;
  /** CSS gradient or color for icon background */
  color: string;
  /** Optional status badge */
  status?: 'new' | 'beta' | 'coming-soon' | null;
}

/**
 * Plugin configuration options
 */
export interface BabaThingsPluginOptions {
  /** Custom apps list */
  apps?: BabaThingsApp[];
  /** Show BabaThings branding */
  showBranding?: boolean;
  /** Custom tagline */
  tagline?: string;
  /** Any additional custom options */
  [key: string]: any;
}

/**
 * BabaThings Navigation Component Props
 */
export interface BabaThingsNavProps {
  /** Array of app objects to display */
  apps?: BabaThingsApp[];
  /** Show BabaThings logo and branding */
  showBranding?: boolean;
  /** Show tagline below logo */
  showTagline?: boolean;
  /** Custom tagline text */
  tagline?: string;
  /** Vertical layout instead of horizontal */
  vertical?: boolean;
  /** Current URL to highlight active app */
  currentUrl?: string;
  /** ARIA label for logo link */
  logoAriaLabel?: string;
}

/**
 * BabaThings App Card Component Props
 */
export interface BabaThingsAppCardProps {
  /** App object to display */
  app: BabaThingsApp;
}

/**
 * Default apps configuration
 */
export declare const defaultApps: BabaThingsApp[];

/**
 * BabaThings Navigation Component
 */
export declare const BabaThingsNav: any;

/**
 * BabaThings App Card Component
 */
export declare const BabaThingsAppCard: any;

/**
 * BabaThings Central Styling Plugin
 */
declare const BabaThingsPlugin: Plugin<BabaThingsPluginOptions>;

export default BabaThingsPlugin;
