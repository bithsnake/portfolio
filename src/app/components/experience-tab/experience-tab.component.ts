import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../shared/reveal.directive';

type CaseStudy = {
  key: string;
  icon: string;
  area: 'backend' | 'cloud' | 'frontend' | 'data' | 'fullstack';
  featured?: boolean;
  stack: string[];
};

type SkillGroup = {
  key: string;
  icon: string;
  skills: { name: string; level: 'expert' | 'advanced' }[];
};

@Component({
  selector: 'app-experience-tab',
  imports: [TranslateModule, RevealDirective],
  templateUrl: './experience-tab.component.html',
  styleUrl: './experience-tab.component.scss',
})
export class ExperienceTabComponent {
  // Keys (not text) live here so every language renders from one list.
  readonly stats = ['codebases', 'commits', 'services', 'layers'];
  readonly points = ['p1', 'p2', 'p3'];

  readonly caseStudies: CaseStudy[] = [
    {
      key: 'realtime',
      icon: 'fa-solid fa-tower-broadcast',
      area: 'backend',
      featured: true,
      stack: ['WebSockets', 'Server-Sent Events', 'Node.js', 'Express', 'Redux Toolkit'],
    },
    {
      key: 'auth',
      icon: 'fa-solid fa-shield-halved',
      area: 'backend',
      stack: ['Node.js', 'TypeScript', 'Fastify', 'PostgreSQL'],
    },
    {
      key: 'cloud',
      icon: 'fa-solid fa-cloud-arrow-up',
      area: 'cloud',
      stack: ['Kubernetes', 'AWS EKS', 'AWS CDK', 'Lambda', 'SES', 'Flux'],
    },
    {
      key: 'services',
      icon: 'fa-solid fa-diagram-project',
      area: 'backend',
      stack: ['Node.js', 'SQL', 'REST', 'Feature flags', 'Microservices'],
    },
    {
      key: 'admin',
      icon: 'fa-solid fa-syringe',
      area: 'fullstack',
      stack: ['Next.js', 'React', 'Headless CMS', 'Node.js', 'PostgreSQL'],
    },
    {
      key: 'inbox',
      icon: 'fa-solid fa-envelope-open-text',
      area: 'fullstack',
      stack: ['React', 'Redux Toolkit', 'WebSockets', 'REST'],
    },
    {
      key: 'analytics',
      icon: 'fa-solid fa-chart-line',
      area: 'data',
      stack: ['Amplitude', 'Session Replay', 'Feature flags', 'GDPR'],
    },
    {
      key: 'media',
      icon: 'fa-solid fa-photo-film',
      area: 'frontend',
      stack: ['React', 'TypeScript', 'Touch gestures', 'Accessibility'],
    },
  ];

  readonly skillGroups: SkillGroup[] = [
    {
      key: 'backend',
      icon: 'fa-solid fa-server',
      skills: [
        { name: 'Node.js', level: 'expert' },
        { name: 'TypeScript', level: 'expert' },
        { name: 'REST APIs', level: 'expert' },
        { name: 'WebSockets / SSE', level: 'expert' },
        { name: 'Fastify', level: 'advanced' },
        { name: 'Express', level: 'advanced' },
        { name: 'PostgreSQL / SQL', level: 'advanced' },
        { name: 'Microservices', level: 'advanced' },
        { name: 'Auth & security', level: 'advanced' },
        { name: '.NET / C#', level: 'advanced' },
      ],
    },
    {
      key: 'frontend',
      icon: 'fa-solid fa-palette',
      skills: [
        { name: 'React', level: 'expert' },
        { name: 'Next.js', level: 'expert' },
        { name: 'Redux Toolkit', level: 'expert' },
        { name: 'Angular', level: 'advanced' },
        { name: 'Tailwind CSS / SCSS', level: 'advanced' },
        { name: 'Accessibility', level: 'advanced' },
      ],
    },
    {
      key: 'cloud',
      icon: 'fa-solid fa-cubes',
      skills: [
        { name: 'Kubernetes', level: 'advanced' },
        { name: 'AWS (EKS, Lambda, SES)', level: 'advanced' },
        { name: 'AWS CDK', level: 'advanced' },
        { name: 'Docker', level: 'advanced' },
        { name: 'GitOps / Flux', level: 'advanced' },
        { name: 'CI/CD', level: 'advanced' },
      ],
    },
    {
      key: 'quality',
      icon: 'fa-solid fa-magnifying-glass-chart',
      skills: [
        { name: 'Feature flags', level: 'expert' },
        { name: 'Product analytics', level: 'expert' },
        { name: 'AI-assisted development', level: 'expert' },
        { name: 'Observability', level: 'advanced' },
        { name: 'Vitest / Jest', level: 'advanced' },
        { name: 'Privacy by design', level: 'advanced' },
      ],
    },
  ];

  readonly principles = [
    { key: 'ownership', icon: 'fa-solid fa-route' },
    { key: 'secure', icon: 'fa-solid fa-lock' },
    { key: 'measure', icon: 'fa-solid fa-gauge-high' },
    { key: 'clarity', icon: 'fa-solid fa-book-open' },
  ];
}
