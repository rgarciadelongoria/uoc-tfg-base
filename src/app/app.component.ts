import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ShellActions, ShellErrors, ShellEvents } from '@enums/shell.enum';
import { ScannerService } from '@services/scanner/scanner.service';
import { DeviceService } from '@services/device/device.service';
import { PushService } from '@services/push/push.service';
import { BrowserService } from '@services/browser/browser.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'lookttery';

  private showErrorLandingDelay = 10000;

  constructor(
    private router: Router,
    private readonly deviceSrv: DeviceService,
    private readonly scannerSrv: ScannerService,
    private readonly pushSrv: PushService,
    private readonly browserSrv: BrowserService,
  ) {}

  async ngOnInit(): Promise<void> {
    localStorage.setItem(ShellActions.SHELL_VERSION, '0.0.0');
    localStorage.removeItem(ShellErrors.SHELL_LOADING_REMOTE_OK);
    setTimeout(() => {
      this.showErrorLanding();
    }, this.showErrorLandingDelay);
  }

  showErrorLanding() {
    const hasErrorLoadingRemote = localStorage.getItem(ShellErrors.SHELL_LOADING_REMOTE_OK) ? false : true;
    if (hasErrorLoadingRemote) {
      this.router.navigate(['/', 'errorLanding']);
    }
  }

  /*
  Device events
  */

  @HostListener(`window:${ShellEvents.SHELL_DEVICE_GET_ID}`, ['$event'])
  async handleShellDeviceGet(event: any) {
    const result = await this.deviceSrv.getId();
    const responseEvent = event.detail?.responseEvent || ShellEvents.SHELL_DEVICE_GET_ID_RESPONSE;
    window.dispatchEvent(new CustomEvent(responseEvent, this.createResponseObject(result)));
  }

  /*
  Push events
  */

  @HostListener(`window:${ShellEvents.SHELL_PUSH_REQUEST_PERMISSION}`, ['$event'])
  async handleShellPushRequestPermission(event: any) {
    try {
      const permStatus = await this.pushSrv.getPermissionStatus();
      const responseEvent = event.detail?.responseEvent || ShellEvents.SHELL_PUSH_REQUEST_PERMISSION_RESPONSE;
      window.dispatchEvent(new CustomEvent(responseEvent, this.createResponseObject(permStatus)));
    } catch (error) {
      window.dispatchEvent(new CustomEvent(ShellEvents.SHELL_PUSH_REQUEST_PERMISSION_RESPONSE, this.createResponseObject(error)));
    }
  }

  @HostListener(`window:${ShellEvents.SHELL_PUSH_REGISTER}`, ['$event'])
  async handleShellPushRegister(event: any) {
    try {
      this.pushSrv.addListeners();
      this.pushSrv.getDeliveredNotifications();
      this.pushSrv.registerNotifications();
      const responseEvent = event.detail?.responseEvent || ShellEvents.SHELL_PUSH_REGISTER_RESPONSE;
      window.dispatchEvent(new CustomEvent(responseEvent, this.createResponseObject(true)));
    } catch (error) {
      window.dispatchEvent(new CustomEvent(ShellEvents.SHELL_PUSH_REGISTER_RESPONSE, this.createResponseObject(error)));
    }
  }

  /*
  Scanner events
  */

  @HostListener(`window:${ShellEvents.SHELL_SCANNER_REQUEST_PERMISSION}`, ['$event'])
  async handleShellScannerRequestPermission(event: any) {
    try {
      const result = await this.scannerSrv.didUserGrantPermission();
      console.log('Scanner result:', result);
      const responseEvent = event.detail?.responseEvent || ShellEvents.SHELL_SCANNER_REQUEST_PERMISSION_RESPONSE;
      window.dispatchEvent(new CustomEvent(responseEvent, this.createResponseObject(result)));
    } catch (error) {
      window.dispatchEvent(new CustomEvent(ShellEvents.SHELL_SCANNER_ERROR, this.createResponseObject(error)));
    }
  }

  @HostListener(`window:${ShellEvents.SHELL_SCANNER_START}`, ['$event'])
  async handleShellScannerStart(event: any) {
    try {
      const resultCallback = (result: any) => {
        console.log('Scanner result:', result);
        const responseEvent = event.detail?.responseEvent || ShellEvents.SHELL_SCANNER_RESPONSE;
        window.dispatchEvent(new CustomEvent(responseEvent, this.createResponseObject(result)));
      }

      const result = await this.scannerSrv.startScan(resultCallback);
    } catch (error) {
      window.dispatchEvent(new CustomEvent(ShellEvents.SHELL_SCANNER_ERROR, this.createResponseObject(error)));
    }
  }

  @HostListener(`window:${ShellEvents.SHELL_SCANNER_STOP}`, ['$event'])
  async handleShellScannerStop(event: any) {
    await this.scannerSrv.stopScan();
    const responseEvent = event.detail?.responseEvent || ShellEvents.SHELL_SCANNER_RESPONSE;
    const result = { closed: true };
    window.dispatchEvent(new CustomEvent(responseEvent, this.createResponseObject(result)));
  }

  /*
  Browser events
  */

  @HostListener(`window:${ShellEvents.SHELL_BROWSER_OPEN}`, ['$event'])
  async handleShellBrowserOpen(event: any) {
    const url = event.detail?.url;
    await this.browserSrv.openBrowser(url);
    const responseEvent = event.detail?.responseEvent || ShellEvents.SHELL_BROWSER_OPEN_RESPONSE;
    const result = { url: event.detail?.url };
    window.dispatchEvent(new CustomEvent(responseEvent, this.createResponseObject(result)));
  }

  /*
  Global methods
  */

  private createResponseObject(result: any) {
    return {detail: { "response": result }}
  }
}
