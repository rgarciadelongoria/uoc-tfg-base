import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import manifest from '../assets/federation.manifest.json';
import { ErrorLandingComponent } from './components/errorLanding/errorLanding.component';

export const routes: Routes = [
    {
      path: 'errorLanding',
      component: ErrorLandingComponent
    },
    {
      path: '',
      loadChildren: () => loadRemoteModule({
        remoteEntry: manifest.app,
        exposedModule: './routes'
      })
      .then(m => m.routes)
    }
];
