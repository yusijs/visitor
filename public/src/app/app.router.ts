import { VisitorResolve } from './visits/visitor/visitor.resolver';
import { NewVisitComponent } from './visits/new/new-visit.component';
import { VisitorComponent } from './visits/visitor/visitor.component';
import { VisitsComponent } from './visits/visits.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: VisitsComponent },
    { path: 'expired', component: VisitsComponent },
    { path: 'all', component: VisitsComponent },
    { path: 'visitor/:id', component: VisitorComponent, resolve: { visitor: VisitorResolve }},
    { path: 'new', component: NewVisitComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [VisitsComponent];