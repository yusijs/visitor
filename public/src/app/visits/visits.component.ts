import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Visit } from './../../../../models/visit';
import { VisitsService } from './visits.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-visits',
    moduleId: module.id,
    template: `
        <app-filter (reset)="clearFilters()" (filterChange)="setFilters($event)" class="col-md-6"></app-filter>
        <table class="table table-striped table-hover" (window:scroll)="onScroll($event)">
            <thead>
                <tr>
                    <th *ngFor="let heading of headings" (click)="sort(heading.field)">
                        <i
                            class="fa"
                            [class.fa-caret-up]="orderBy === heading.field"
                            [class.fa-caret-down]="orderBy === '-' + heading.field"
                        ></i>
                        {{ heading.title }}
                    </th>

                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let visit of visits | orderBy : orderBy">
                    <td>{{ visit.visitor.company }}</td>
                    <td><a [routerLink]="['/visitor', visit.visitor._id]">{{ visit.visitor.name }}</a></td>
                    <td>{{ visit.date | date }}</td>
                    <td>{{ visit.site }}</td>
                    <td>
                        <span [style.text-decoration]="visit.badge.returned ? 'line-through' : 'initial'">
                            {{ visit.badge.badge }}
                        </span>
                    </td>
                    <td><i class="fa" [class.fa-check]="visit.badge.noEscort"></i></td>
                    <td>
                        <span [style.text-decoration]="visit.keycard.returned ? 'line-through' : 'initial'">
                            {{ visit.keycard.keycard }}
                        </span>
                    </td>
                    <td>{{ visit.visitor.attachments.approved.dateSigned | date }}</td>
                </tr>
            </tbody>
        </table>
        <div *ngIf="filters" class="text-center">
            <p>End of results</p>
        </div>
    `
})
export class VisitsComponent {
    public visits: Visit[] = [];
    public page = 0;
    public filters;
    public path: string;
    public expired: boolean;
    public observable: Observable<Visit[]>;

    public headings = [
        {
            title: 'Company',
            field: 'visitor.company'
        },
        {
            title: 'Name',
            field: 'visitor.name'
        },
        {
            title: 'Visit Date',
            field: 'date'
        },
        {
            title: 'Site',
            field: 'site'
        },
        {
            title: 'Badge',
            field: 'badge.badge'
        },
        {
            title: 'No Escort',
            field: 'badge.noEscort'
        },
        {
            title: 'Keycard',
            field: 'badge.badge'
        },
        {
            title: 'Signed Date',
            field: 'visitor.attachments.approved.dateSigned'
        },
    ];
    public orderBy = '';

    public setFilters(filters) {
        this._visitsService.searchVisitors(filters)
            .subscribe(visits => this.visits = visits);
        this.filters = filters;
    }

    public clearFilters() {
        this.filters = null;
        this.page = 0;
        this.setObservable();
        this.observable.subscribe(visits => this.visits = visits);
    }

    public sort(sortby: string) {
        if (sortby === 'badge.noEscort') {
            return;
        }
        this.orderBy = this.orderBy === sortby ? '-' + sortby : sortby;
    }

    public setObservable() {
        switch (this.path) {
            case 'expired':
                this.observable = this._visitsService.getVisitors('expired', this.page);
                break;
            case 'all':
                this.observable = this._visitsService.getVisitors('all', this.page);
                break;
            default:
                this.observable = this._visitsService.getVisitors('active', this.page);
                break;
        }
    }

    public onScroll(e) {
        if (!this.filters && (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 200) {
            if (this.visits.length % 30 === 0) {
                // this.getNextPage();
                this.page += 1;
                this.setObservable();
                this.observable.subscribe(visits => this.visits = [...this.visits, ...visits]);
            }
        }
    }

    constructor(private _visitsService: VisitsService, private _route: ActivatedRoute) {
        this._route.url.subscribe(url => {
            if (url.length === 1) {
                this.path = url[0].path;
                this.setObservable();
            }
            else {
                this.path = 'active';
                this.observable = this._visitsService.getVisitors('active');
            }
        })
    }

    ngOnInit() {
        this.observable
            .subscribe(
                visits => this.visits = visits,
                err => console.error(err)
            );
    }
}