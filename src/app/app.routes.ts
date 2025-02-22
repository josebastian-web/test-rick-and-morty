import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./characters/character.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }

];
