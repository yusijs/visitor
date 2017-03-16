import { Visit } from './../../../../../models/visit';
import { VisitorService } from './visitor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-visitor',
    template: `<pre> {{ visitor | json }} </pre>`
})
export class VisitorComponent implements OnInit {
    public params: any;
    public visitor: Visit;
    constructor(private _route: ActivatedRoute, private _visitorService: VisitorService){}

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.params = params;
            this._visitorService.getVisits(params['id'])
                .subscribe(visitor => this.visitor = visitor);
        });
    }
}