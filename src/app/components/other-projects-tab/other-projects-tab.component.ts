import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type ProjectCard = {
  title: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  iframeTitle: string;
  safeUrl: SafeResourceUrl;
};

@Component({
  selector: 'app-other-projects-tab',
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './other-projects-tab.component.html',
  styleUrl: './other-projects-tab.component.scss',
})
export class OtherProjectsTabComponent {
  private rawProjects = signal([
    {
      title: 'Spin Master',
      description:
        'A fast, arcade-style spinner game with simple controls. Built in Pixi.js',
      liveUrl: 'https://bithsnake.github.io/spin-master-2/',
      repoUrl: 'https://github.com/bithsnake/spin-master-2',
      iframeTitle: 'Spin Master live demo',
    },
  ]);

  projects = computed<ProjectCard[]>(() =>
    this.rawProjects().map((project) => ({
      ...project,
      safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(project.liveUrl),
    })),
  );

  constructor(private sanitizer: DomSanitizer) {}
}
