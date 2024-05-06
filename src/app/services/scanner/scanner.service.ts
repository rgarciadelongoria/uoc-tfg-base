import { Injectable } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
  CameraPermissionState,
} from '@capacitor-mlkit/barcode-scanning';
import { PluginListenerHandle } from '@capacitor/core';

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

  public async didUserGrantPermission(): Promise<CameraPermissionState> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera;
  };

  public async startScan(resultCallback: any): Promise<PluginListenerHandle> {
    // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
    // However, this means that you have to hide all elements that should not be visible.
    // You can find an example in our demo repository.
    // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.
    document.querySelector('body')?.classList.add('barcode-scanner-active');
  
    // Add the `barcodeScanned` listener
    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async result => {
        await listener.remove();
        await BarcodeScanner.stopScan();
        resultCallback(result.barcode)
      },
    );
  
    // Start the barcode scanner
    await BarcodeScanner.startScan();

    return listener;
  }

  public async stopScan(): Promise<void> {
    // Make all elements in the WebView visible again
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
  
    // Remove all listeners
    await BarcodeScanner.removeAllListeners();
  
    // Stop the barcode scanner
    await BarcodeScanner.stopScan();
  }
}
