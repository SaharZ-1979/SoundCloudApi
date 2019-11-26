import {Component, OnInit} from '@angular/core';
import {SoundCloudService} from './sound-cloud.service';
import {SafeResourceUrl} from "@angular/platform-browser";
// import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  private title: string;
  private searchValue: string;
  private selectedTrackTitle: string;
  private scTracks: any[];
  private selectedTrackStreamUrl: SafeResourceUrl;

  constructor(private soundCloudService: SoundCloudService) {
  }

  ngOnInit() {
    console.log('On Init');
    this.title = 'Sound Cloud Api';
    this.searchValue = '';
    this.selectedTrackTitle = '';
  }

  getTracks() {
    this.soundCloudService.search(this.searchValue).subscribe((data: any) => {
      console.log(data);
      this.scTracks = data;
    });
  }

  nextTracks() {
    this.soundCloudService.getNextTracks().subscribe((data: any) => {
      console.log(data);
      this.scTracks = data;
    });
  }

  playStream($event: MouseEvent, track: any) {
    this.selectedTrackStreamUrl = track.safe_stream_url;
    this.selectedTrackTitle = track.title;
  }
}
