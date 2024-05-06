import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { ShellActions } from '../../enums/shell.enum';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor() {}

  public async addListeners() {
    await PushNotifications.addListener('registration', token => {
      localStorage.setItem(ShellActions.SHELL_PUSH_TOKEN, token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {});
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      // console.log('Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      // console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  public async getPermissionStatus(): Promise<any> {
    return await PushNotifications.checkPermissions();
  }
  
  public async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  }

  // This method is used to get the list of delivered notifications on notification center
  public async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }
}