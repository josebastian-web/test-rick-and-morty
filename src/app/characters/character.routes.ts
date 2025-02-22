import { Routes } from "@angular/router";
import { LayoutsComponent } from "./layouts/layouts.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

export const characterRoutes: Routes = [

  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'characters',
        component: HomePageComponent
      },
      {
        path: '**',
        redirectTo: 'characters'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default characterRoutes;
