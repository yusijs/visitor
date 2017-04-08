import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Visit } from './../../../../models/visit';
import { VisitsService } from './visits.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-visits',
    moduleId: module.id,
    template: `
        <app-filter (filterChange)="setFilters($event)" class="col-md-6"></app-filter>
        <div class="col-md-6">
            <pre>
                {{ filters | json }}
            </pre>
        </div>
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
                    <td>{{ visit.badge.badge }}</td>
                    <td><i class="fa" [class.fa-check]="visit.badge.noEscort"></i></td>
                    <td>{{ visit.keycard.keycard }}</td>
                    <td>{{ visit.visitor.attachments.approved.dateSigned | date }}</td>
                </tr>
            </tbody>
        </table>
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
    public orderBy: string = '';

    public setFilters(filters) {
        this.filters = filters;
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
                this.observable = this._visitsService.getVisitors('expired', this.page)
                break;
            case 'all':
                this.observable = this._visitsService.getVisitors('all', this.page)
                break;
            default:
                this.observable = this._visitsService.getVisitors('active', this.page);
                break;
        }
    }

    public onScroll(e) {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 200) {
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