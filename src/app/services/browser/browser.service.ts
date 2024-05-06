import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';

export interface DeviceResult {
}

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  public async openBrowser(url: string): Promise<void> {
    await Browser.open({ url });
  };
}