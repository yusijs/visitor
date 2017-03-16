import { Visitor } from './../../../../models/visitor';
import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Visit } from './../../../../models/visit';

@Injectable()
export class VisitsService {

    public searchTypeahead(name: string): Observable<string[]> {
        return this._http.get('/api/visits/typeahead/' + name)
            .map(res => res.json());
    }

    public getVisitors(filter, page = 0): Observable<Visit[]> {
        let query = new URLSearchParams();
        query.set('filter', filter);
        query.set('page', page.toString())
        return this._http.get('/api/visits', { search: query })
            .map(res => res.json());
    }

    public getVisitor(id: string): Observable<Visitor> {
        return this._http.get('/api/visitor/:id')
            .map(res => res.json());
    }

    constructor(private _http: Http) { }
}