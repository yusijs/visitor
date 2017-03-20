import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Visitor } from './../../../../../models/visitor';
import { Visit } from './../../../../../models/visit';

@Injectable()
export class VisitorService {

    public searchTypeahead(name: string): Observable<string[]> {
        return this._http.get('/api/visits/typeahead/' + name)
            .map(res => res.json());
    }

    public getVisitor(id: string): Observable<Visitor> {
        return this._http.get('/api/visitor/' + id)
            .map(res => res.json());
    }

    public getVisits(id: string): Observable<Visitor> {
        return this._http.get('/api/visits/visitor/' + id)
            .map(res => res.json());
    }

    public visitorTypeahead(name: string): Observable<Visitor[]> {
        return this._http.get('/api/visitor/typeahead/' + name)
            .map(res => res.json());
    }

    public uploadFile(type: string, file: File, date: Date): Observable<any> {

        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        const headers = new Headers();

        // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        const options = new RequestOptions({ headers: headers });

        return this._http.post('/api/files', formData, options)
            .map(r => r.json());
    }

    constructor(private _http: Http) { }
}