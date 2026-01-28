import { Component, OnInit } from '@angular/core';
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
export class GameTabComponent implements OnInit {
  gameDescription = `Aria Disconnect is an action-adventure Metroidvania with a cyberpunk theme. You are going to follow Heri's journey to recover from the digital nightmare he has become stuck inside. The year is 2082, you are hooked to a machine, and there is only one way out, to disconnect.`;

  gameFeatures = [
    'Metroidvania with cyberpunk aesthetic',
    'Exploration and puzzle-solving',
    'Ability and weapon upgrades for optional areas',
    'Isolated atmospheric theme',
    'Atmospheric soundtrack',
    'Story about life and death, told mostly without words',
    'Full controller support (Xbox controllers)',
    'Single-player with Steam Achievements',
  ];

  videos: { url: SafeResourceUrl; title: string }[] = [];

  screenshots = [
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_84c2e862a8e41e7c6c1d92bf04ad28e8e4be5c49.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 1',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_5b7f3d92f71f1f9ae68f7bc95b2be9e7e9cc6dc5.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 2',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_c7c58c4c28fa5f8b2c3c1f6c97e6e73c2a7b8e9e.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 3',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_3b9e4b2e4a0c8e4c7f1a5b9e8c3d6e7f8a9b0c1d.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 4',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 5',
    },
    {
      url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1269910/ss_1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b.600x338.jpg',
      alt: 'Aria Disconnect Screenshot 6',
    },
  ];

  responsiveOptions = [
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
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Steam video IDs for Aria Disconnect
    const videoIds = [
      '256827442',
      '256837375',
      '256837374',
      '256802421',
      '256780649',
    ];
    this.videos = videoIds.map((id, index) => ({
      url: this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://cdn.akamai.steamstatic.com/steam/apps/${id}/movie480_vp9.webm`,
      ),
      title: `Aria Disconnect Trailer ${index + 1}`,
    }));
  }
}
