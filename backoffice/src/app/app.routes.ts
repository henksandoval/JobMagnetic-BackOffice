import { LayoutComponent } from '@layout/layout.component';
import { AppRoute } from '@core/models/app-route.model';
import { NotFoundComponent } from '@layout/components/not-found/not-found.component';

export const routes: AppRoute[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        data: {
          label: $localize`:@@navigation.dashboard:Dashboard`,
          icon: 'dashboard',
        },
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'showcase',
        loadComponent: () =>
          import('./features/showcase/showcase.component').then((m) => m.ShowcaseComponent),
        data: {
          label: $localize`:@@navigation.showcase:Showcase`,
          icon: 'inventory',
        },
        children: [
          {
            path: '',
            data: {
              label: $localize`:@@navigation.showcase.index:Inicio`,
              icon: 'home',
            },
            loadComponent: () =>
              import('./features/showcase/pages/index/index.component').then((m) => m.ShowcaseIndexComponent),
          },
          {
            path: 'form',
            data: {
              label: $localize`:@@navigation.showcase.form:Formulario`,
              icon: 'edit_note',
            },
            loadComponent: () =>
              import('./features/showcase/pages/form/form.component').then((m) => m.FormComponent),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
