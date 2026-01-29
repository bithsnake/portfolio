import { Component, computed, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-tab',
  imports: [CommonModule, CardModule, CarouselModule, ImageModule],
  templateUrl: './game-tab.component.html',
  styleUrl: './game-tab.component.scss',
})
export class GameTabComponent {
  gameDescription = signal(
    `Aria Disconnect is an action-adventure Metroidvania with a cyberpunk theme. You are going to follow Heri's journey to recover from the digital nightmare he has become stuck inside. The year is 2082, you are hooked to a machine, and there is only one way out, to disconnect.`,
  );

  gameFeatures = signal([
    '🦾Metroidvania with cyberpunk aesthetic',
    '🧩 Exploration and puzzle-solving',
    '🔧 Ability and weapon upgrades!',
    '🏝️ Isolated atmospheric theme',
    '🎵 Atmospheric soundtrack',
    '📖 Story about life and death, told mostly without words',
    '🎮 Full controller support (Xbox controllers)',
    '🏆 Single-player with Steam Achievements',
  ]);

  screenshots = signal([
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_84f281dba17b2667fb7c433ea52c30d895952543.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 1',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_f03caed41358f268acd03ad9670f23648cb5dfc4.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 2',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_b6abf33955ab15e3776afe169652a9281d18ce1d.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 3',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_1cc906ef6a44be725abd8d11b2db527ea9c435d6.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 4',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_07ac7f9f9fb40c4229446aefedc8258b4d58f2c6.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 5',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_602a3e11634ccd2e9876aa47ce2477e98539d539.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 6',
    },
  ]);

  responsiveOptions = signal([
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ]);

  private videoIds = signal([
    '256827442',
    '256837375',
    '256837374',
    '256802421',
    '256780649',
  ]);

  videos = computed(() =>
    this.videoIds().map((id, index) => ({
      url: this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://cdn.akamai.steamstatic.com/steam/apps/${id}/movie480_vp9.webm`,
      ),
      title: `Aria Disconnect Trailer ${index + 1}`,
    })),
  );

  constructor(private sanitizer: DomSanitizer) {}
}
