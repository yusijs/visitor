import { Visitor } from './../../../../../models/visitor';
import { Visit } from './../../../../../models/visit';
import { VisitorService } from './visitor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-visitor',
    templateUrl: 'visitor.component.html'
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
        });
    }
}
