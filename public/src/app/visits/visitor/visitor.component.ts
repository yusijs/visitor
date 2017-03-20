import { Visitor } from './../../../../../models/visitor';
import { Visit } from './../../../../../models/visit';
import { VisitorService } from './visitor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestOptions, Headers } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'app-visitor',
    styles: ['td.nowrap { white-space: nowrap }', 'th { white-space: nowrap }'],
    templateUrl: 'visitor.component.html'
})
export class VisitorComponent implements OnInit {
    public params: any;
    public visitor: Visitor;
    public visits: Visit[];
    public id: string;
    public file: FileList;

    fileChanged(e: Event) {
        this.file = e.target['files'];
        console.log(this.file);
    }

    testFile() {
        if (this.file.length === 0) {
            return;
        }

        this._visitorService.uploadFile('approved', this.file[0], new Date(), this.id)
            .subscribe(
                console.log,
                console.error
            );
    }

    constructor(private _route: ActivatedRoute, private _visitorService: VisitorService) { }

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

        this._route.params.subscribe(p => this.id = p['id']);
    }
}
