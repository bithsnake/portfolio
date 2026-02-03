import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

type ProjectCard = {
  title: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  iframeTitle: string;
  safeUrl: SafeResourceUrl;
  hideOnMobile?: boolean;
};

@Component({
  selector: 'app-other-projects-tab',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    MessageModule,
    TranslateModule,
  ],
  templateUrl: './other-projects-tab.component.html',
  styleUrl: './other-projects-tab.component.scss',
})
export class OtherProjectsTabComponent {
  private rawProjects = signal([
    {
      titleKey: 'projects.spinMaster.title',
      descriptionKey: 'projects.spinMaster.description',
      liveUrl: 'https://bithsnake.github.io/spin-master-2/',
      repoUrl: 'https://github.com/bithsnake/spin-master-2',
      iframeTitleKey: 'projects.spinMaster.iframeTitle',
      hideOnMobile: true,
    },
  ]);

  projects = computed<ProjectCard[]>(() =>
    this.rawProjects().map((project) => ({
      title: project.titleKey,
      description: project.descriptionKey,
      liveUrl: project.liveUrl,
      repoUrl: project.repoUrl,
      iframeTitle: project.iframeTitleKey,
      safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(project.liveUrl),
      hideOnMobile: project.hideOnMobile,
    })),
  );

  constructor(private sanitizer: DomSanitizer) {}
}
