import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ShellActions, ShellErrors, ShellEvents } from '@enums/shell.enum';
import { ScannerService } from '@services/scanner/scanner.service';
import { DeviceService } from '@services/device/device.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'core-shell';

  private showErrorLandingDelay = 10000;

  constructor(
    private router: Router,
    private readonly deviceSrv: DeviceService,
    private readonly scannerSrv: ScannerService,
  ) {}

  ngOnInit(): void {
    localStorage.setItem(ShellActions.SHELL_VERSION, '0.0.0');
    setTimeout(() => {
      this.showErrorLanding();
    }, this.showErrorLandingDelay);
  }

  showErrorLanding() {
    const hasErrorLoadingRemote = localStorage.getItem(ShellErrors.SHELL_LOADING_REMOTE_OK) ? false : true;
    localStorage.removeItem(ShellErrors.SHELL_LOADING_REMOTE_OK);
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
  Scanner events
  */

  @HostListener(`window:${ShellEvents.SHELL_SCANNER_START}`, ['$event'])
  async handleShellScannerStart(event: any) {
    try {
      const result = await this.scannerSrv.startScan();
      const responseEvent = event.detail?.responseEvent || ShellEvents.SHELL_SCANNER_RESPONSE;
      window.dispatchEvent(new CustomEvent(responseEvent, this.createResponseObject(result)));
    } catch (error) {
      window.dispatchEvent(new CustomEvent(ShellEvents.SHELL_SCANNER_ERROR, this.createResponseObject(error)));
    }
  }

  @HostListener(`window:${ShellEvents.SHELL_SCANNER_STOP}`, ['$event'])
  handleShellScannerStop(event: any) {
    this.scannerSrv.stopScan();
    const responseEvent = event.detail?.responseEvent || ShellEvents.SHELL_SCANNER_RESPONSE;
    const result = { closed: true };
    window.dispatchEvent(new CustomEvent(responseEvent, this.createResponseObject(result)));
  }

  /*
  Global methods
  */

  private createResponseObject(result: any) {
    return {detail: { "response": result }}
  }
}
