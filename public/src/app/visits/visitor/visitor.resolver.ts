import { Visitor } from './../../../../../models/visitor';
import { VisitorService } from './visitor.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class VisitorResolve implements Resolve<Visitor> {

  constructor(private _visitorService: VisitorService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this._visitorService.getVisits(route.params['id']);
  }
}