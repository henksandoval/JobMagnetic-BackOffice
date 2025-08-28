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
          label: $localize`:Label for the main dashboard link in the navigation menu@@navigation.dashboard:Dashboard`,
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
          label: $localize`:Label for the showcase section in the navigation menu@@navigation.showcase:Showcase`,
          icon: 'inventory',
        },
        children: [
          {
            path: '',
            data: {
              label: $localize`:Label for the showcase home page in the navigation menu@@navigation.showcase.index:Home`,
              icon: 'home',
            },
            loadComponent: () =>
              import('./features/showcase/pages/index/index.component').then((m) => m.ShowcaseIndexComponent),
          },
          {
            path: 'form',
            data: {
              label: $localize`:Label for the form example page in the navigation menu@@navigation.showcase.form:Form`,
              icon: 'edit_note',
            },
            loadComponent: () =>
              import('./features/showcase/pages/form/form.component').then((m) => m.FormComponent),
          },
          {
            path: 'form-base',
            data: {
              label: $localize`:Label for the form example page in the navigation menu@@navigation.showcase.form:Form`,
              icon: 'edit_note',
            },
            loadComponent: () =>
              import('./features/showcase/pages/form-base/form-base.component').then((m) => m.FormBaseComponent),
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
