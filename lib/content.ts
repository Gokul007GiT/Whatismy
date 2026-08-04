import {
  Zap,
  ShieldCheck,
  Globe,
  type LucideIcon,
} from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const featureList: Feature[] = [
  {
    title: 'Lightning Fast',
    description:
      'Your IP details are fetched and rendered in milliseconds using a globally distributed network of edge servers.',
    icon: Zap,
  },
  {
    title: 'Privacy First',
    description:
      'We never log, store, or sell your IP information. Every lookup is processed in real time and immediately discarded.',
    icon: ShieldCheck,
  },
  {
    title: 'Detailed Insights',
    description:
      'See your public IP, ISP, ASN, approximate location, timezone, browser, operating system, and device type in one view.',
    icon: Globe,
  },
];
