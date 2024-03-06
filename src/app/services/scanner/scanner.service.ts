import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

export interface ScanResult {
  hasContent: boolean;
  content: string;
  format: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor() { }

  private async didUserGrantPermission(): Promise<boolean> {
    // check if user already granted permission
    const status = await BarcodeScanner.checkPermission({ force: false });
  
    if (status.granted) {
      // user granted permission
      return true;
    }
  
    if (status.denied) {
      // user denied permission
      return false;
    }
  
    if (status.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }
  
    if (status.neverAsked) {
      // user has not been requested this permission before
      // it is advised to show the user some sort of prompt
      // this way you will not waste your only chance to ask for the permission
      const c = confirm('We need your permission to use your camera to be able to scan barcodes');
      if (!c) {
        return false;
      }
    }
  
    if (status.restricted || status.unknown) {
      // ios only
      // probably means the permission has been denied
      return false;
    }
  
    // user has not denied permission
    // but the user also has not yet granted the permission
    // so request it
    const statusRequest = await BarcodeScanner.checkPermission({ force: true });
  
    if (statusRequest.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }
  
    if (statusRequest.granted) {
      // the user did grant the permission now
      return true;
    }
  
    // user did not grant the permission, so he must have declined the request
    return false;
  };

  public async startScan(): Promise<ScanResult> {
    const hasPermission = await this.didUserGrantPermission();

    if (hasPermission) {
      BarcodeScanner.hideBackground();

      const rawResult = await BarcodeScanner.startScan();

      const result: ScanResult = {
        hasContent: rawResult.hasContent || false,
        content: rawResult.content || '',
        format: rawResult.format || ''
      };
      
      return result;
    }

    throw new Error('Permission denied'); // TODO: Create error enum
  }

  public stopScan() {
    BarcodeScanner.stopScan();
  }
}
