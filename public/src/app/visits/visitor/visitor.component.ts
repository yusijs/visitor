import { Visitor } from './../../../../../models/visitor';
import { Visit } from './../../../../../models/visit';
import { VisitorService } from './visitor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-visitor',
    template: `
        <h2> {{ visitor.name }} <small>{{ visitor.company }}</small></h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Visit Date</th>
                    <th>Site</th>
                    <th>Badge</th>
                    <th>No Escort</th>
                    <th>Keycard</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let visit of visits">
                    <td>{{ visit.date | date }}</td>
                    <td>{{ visit.site }}</td>
                    <td>
                        <span [style.text-decoration]="visit.badge.returned ? 'line-through' : 'initial'">
                            {{ visit.badge.badge }}
                        </span>
                    </td>
                    <td>
                        <i class="fa" [class.fa-check]="visit.badge.noEscort" [class.fa-times]="!visit.badge.noEscort"></i>
                    </td>
                    <td>
                        <span [style.text-decoration]="visit.keycard.returned ? 'line-through' : 'initial'">
                            {{ visit.keycard.keycard }}
                        </span>
                    </td>
                    <td>{{ visit.comments }}</td>
                </tr>
            </tbody>
        </table>
        <pre> {{ visits | json }} </pre>
    `
})
export class VisitorComponent implements OnInit {
    public params: any;
    public visitor: Visitor;
    public visits: Visit[];
    constructor(private _route: ActivatedRoute, private _visitorService: VisitorService){}

    ngOnInit() {
        // Below values are snapshots of the route to have an initial state.
        this.visitor = this._route.data['_value'].visitor.visitor;
        this.visits = this._route.data['_value'].visitor.visits.sort((a, b) => {
            return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
        });

        this._route.data.map(v => v['visitor']).subscribe(v => {
            this.visitor = v.visitor;
            this.visits = v.visits;
        })
    }
}