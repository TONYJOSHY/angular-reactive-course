import { Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        component: FeaturesComponent,
        children: [
            { 
                path: '', redirectTo: 'post', pathMatch: 'full' 
            },
            {
                path: 'post',
                loadComponent: () => import('./post/post.component')
                    .then(m => m.PostComponent)
            }
        ]
    },
];