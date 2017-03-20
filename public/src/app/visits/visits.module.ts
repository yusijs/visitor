import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { ModalModule } from 'ng2-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewVisitComponent } from './new/new-visit.component';
import { VisitorService } from './visitor/visitor.service';
import { RouterModule } from '@angular/router';
import { VisitorComponent } from './visitor/visitor.component';
import { SharedModule } from './../shared/shared.module';
import { VisitsService } from './visits.service';
import { VisitsComponent } from './visits.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';

@NgModule({
    declarations: [VisitsComponent, VisitorComponent, NewVisitComponent],
    providers: [VisitsService, VisitorService],
    imports: [
        CommonModule, SharedModule, RouterModule,
        FormsModule, ReactiveFormsModule, TypeaheadModule, MomentModule,
        ModalModule.forRoot()
    ],
    exports: [VisitsComponent]
})
export class VisitsModule { }