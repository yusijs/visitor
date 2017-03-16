import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/dropdown'
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';

import { VisitsModule } from './visits/visits.module';
import { AppRoutingModule } from './app.router'
import { AppComponent } from './app.component';
import { NavComponent } from './navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    VisitsModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
