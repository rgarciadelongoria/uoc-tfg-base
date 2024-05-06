import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { initFederation } from '@angular-architects/native-federation';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-error-landing',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './errorLanding.component.html',
  styleUrl: './errorLanding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorLandingComponent implements OnInit{
  ngOnInit(): void {
    // Import external styles and scripts for shell
    this.importStyles();
    this.importScripts();
  }

  public retry(): void {
    // Retry load micro frontends
    initFederation('/assets/federation.manifest.json')
      .then(_ => {
        import('../../../bootstrap');
        window.location.href = '/';
      })
      .catch(err => console.error(err));
  }

  private importScripts() {
    const scripts = [
      'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js',
      'https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js'
    ]

    const head = document.head;

    scripts.forEach(script => {
      const scriptEl = document.createElement('script');
      scriptEl.type = 'module';
      scriptEl.src = script;
      scriptEl.async = false;
      document.head.appendChild(scriptEl);
      head.insertBefore(scriptEl, head.firstElementChild);
    });
  }

  private importStyles() {
    const styles = [
      'https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css',
      'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css'
    ]

    const head = document.head;

    styles.forEach(style => {
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = style;
      head.insertBefore(linkEl, head.firstElementChild);
    });
  }
}
