import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

export interface DeviceResult {
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  public async getId(): Promise<string> {
    const id = await Device.getId();

    return id.identifier || '';
  };
}