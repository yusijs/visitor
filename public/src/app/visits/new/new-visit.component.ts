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
    public visitor: Visitor = {} as Visitor;

    public searchName: string;
    public users: Visitor[] = [];

    public addVisit() {
        console.log(this.visitForm.value);
    }

    public setVisitor(e) {
        this.visitor = e.item;
    }


    constructor(private _visitsService: VisitsService, private _visitorService: VisitorService, private _formBuilder: FormBuilder) { }

    ngOnInit() {

        this.visitForm = this._formBuilder.group({
            visitor: this._formBuilder.group({
                name: [null],
                _id: [this.visitor._id],
                company: [null],
                confidentiality: [false],
                attachments: this._formBuilder.group({
                    approved: this._formBuilder.group({}),
                    confidentiality: this._formBuilder.group({}),
                    recording: this._formBuilder.group({})
                })
            }),
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

        this.visitForm.controls['visitor'].valueChanges.subscribe(v => {
            this.visitor._id = null;
            if (!v.name || v.name === this.searchName) {
                return;
            }
            this.searchName = v.name;
            console.log("Name changed and search for new OLDAF name", v.name)
            this._visitorService.visitorTypeahead(v.name).subscribe(v => this.users = v);
            // Search for existing visitor
        });
    }
}