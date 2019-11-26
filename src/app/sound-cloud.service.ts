import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Observable, Subscribable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoundCloudService {
  private userId = 'e59d8b005900e38649c1882b87cd828d';
  private scUrl = 'http://api.soundcloud.com/tracks.json?';
  private nextScUrl = '';

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {  }

   search(searchText: string): any {
    let params = new HttpParams();
    params = params.append('client_id', this.userId);
    params = params.append('q', searchText);
    params = params.append('order', 'created_at');
    params = params.append('limit', '5');
    params = params.append('linked_partitioning', '10');

    return this.getSearchResults(params);
  }
  getNextTracks(): any {
    return this.getSearchResults();
  }
  private getSearchResults(params?: any) {
    let res;
    if (params) {
      res = this.httpClient.get(this.scUrl, {params});
    } else {
      res = this.httpClient.get(this.nextScUrl);
    }
    return res.pipe(map((data: any) => {
      this.nextScUrl = data.next_href;
      return data.collection.map(t => {
        t.safe_stream_url = this.sanitizer.bypassSecurityTrustResourceUrl(t.stream_url + '?client_id=e59d8b005900e38649c1882b87cd828d');
        return t;
      });
    }));
  }
}
