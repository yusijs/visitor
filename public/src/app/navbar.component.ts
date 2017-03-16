import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { VisitsService } from './visits/visits.service';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-nav',
    template: `
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Authorized Visitors</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li [routerLinkActive]="'active'" [routerLinkActiveOptions]="{exact: true}"><a [routerLink]="['/']">Visits</a></li>
                    <li [routerLinkActive]="'active'"><a [routerLink]="['new']">New Visit</a></li>
                    <li dropdown class="dropdown">
                        <button type="button" class="btn btn-primary" dropdownToggle>
                            Filters <span class="caret"></span>
                        </button>
                        <ul dropdownMenu role="menu" aria-labelledby="single-button">
                            <li role="menuitem"><a class="dropdown-item" [routerLink]="['/']">Active</a></li>
                            <li role="menuitem"><a class="dropdown-item" [routerLink]="['/expired']">Expired</a></li>
                            <li role="menuitem"><a class="dropdown-item" [routerLink]="['/all']">All</a></li>
                        </ul>
                    </li>
                    <li style="margin-left: 10px" class="dropdown">
                    <template #visitorTemplate let-model="item" let-index="index">
                        <b> {{ model.name }} </b> <br />
                        <small> {{ model.company }} </small>
                    </template>
                        <input [(ngModel)]="searchUser"
                            placeholder="Search for visitors.."
                            [typeaheadItemTemplate]="visitorTemplate"
                            typeaheadOptionField="name"
                            (typeaheadOnSelect)="navigateToUser($event)"
                            [typeaheadMinLength]="3"
                            [typeahead]="users"
                            class="form-control">
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `
})
export class NavComponent {

    public searchUser: string;

    public users: Observable<any>;

    public typeaheadChanged(name: string) {
        return this._visitsService.searchTypeahead(name);
    }

    public navigateToUser(e) {
        this._router.navigate(['/visitor', e.item._id]).then(() => {
            this.searchUser = null;
        })
    }

    constructor(private _visitsService: VisitsService, private _router: Router) {
        this.users = Observable
            .create((observer: any) => {
                observer
                    .next(this.searchUser);
            })
            // .debounceTime(500)
            .mergeMap((token: string) => this.typeaheadChanged(token));
    }
}