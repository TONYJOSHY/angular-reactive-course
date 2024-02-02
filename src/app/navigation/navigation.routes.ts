import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation.component';

export const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            {
                path: '', redirectTo: 'post', pathMatch: 'full'
            },
            {
                path: 'post',
                loadComponent: () => import('../features/post/post.component')
                    .then(m => m.PostComponent)
            },
            {
                path: 'alt',
                loadComponent: () => import('../features/alternate/alternate.component')
                    .then(m => m.AlternateComponent)
            }
        ],
    },
];