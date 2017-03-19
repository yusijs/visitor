import { Observable } from 'rxjs/Observable';
import { VisitorService } from './../visitor/visitor.service';
import { Visitor } from './../../../../../models/visitor';
import { VisitsService } from './../visits.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-new-visit',
    templateUrl: './new-visit.component.html'
})
export class NewVisitComponent implements OnInit {

    public visitForm: FormGroup;
    public visitorForm: FormGroup;
    public attachmentsForm: FormGroup;

    public visitor: Visitor = {} as Visitor;
    public newVisitor = true;

    public searchName: string;
    public users: Visitor[] = [];

    public addVisit() {
        console.log(this.visitForm.value);
    }

    public setVisitor(e) {
        this.newVisitor = false;
        this.visitor = e.item;
    }


    constructor(private _visitsService: VisitsService, private _visitorService: VisitorService, private _formBuilder: FormBuilder) { }

    ngOnInit() {

        this.visitorForm = this._formBuilder.group({
            name: [null],
            _id: [this.visitor._id],
            company: [null],
            confidentiality: [false]
        })

        this.visitForm = this._formBuilder.group({
            visitor: this.visitorForm,
            date: [],
            badge: this._formBuilder.group({
                badge: [],
                noEscort: []
            }),
            keycard: this._formBuilder.group({
                keycard: []
            }),
            site: [],
            comments: []
        });

        this.visitorForm.controls['name'].valueChanges.subscribe(name => {
            this.visitor._id = null;
            this.newVisitor = true;
            this.searchName = name;
            this._visitorService.visitorTypeahead(name).subscribe(users => this.users = users);
        });
    }
}