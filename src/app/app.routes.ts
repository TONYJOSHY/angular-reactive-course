import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/features.routes')
            .then(m => m.routes)
    },
    {
        path: 'nav',
        loadChildren: () => import('./navigation/navigation.routes')
            .then(m => m.routes)
    }
];
