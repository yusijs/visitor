import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter } from './../../../../../models/filter';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-filter',
    templateUrl: 'filter.component.html'
})
export class FilterComponent implements OnInit {

    @Output('filterChange') filterChange: EventEmitter<Filter> = new EventEmitter();

    public form: FormGroup;
    public visitorForm: FormGroup;

    public selectValues = [
        {
            value: null,
            name: 'All'
        },
        {
            value: true,
            name: 'Returned'
        },
        {
            value: false,
            name: 'Not Returned'
        }
    ];

    public emitFilters() {
        this.filterChange.emit(this.form.value);
    }

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {

        this.form = this._formBuilder.group({
            visitor: this._formBuilder.group({
                name: [],
                company: []
            }),
            status: ['active'],
            site: [],
            visitDate: [],
            badge: this._formBuilder.group({
                badge: [],
                returned: [null],
                noEscort: []
            }),
            keycard: this._formBuilder.group({
                keycard: [],
                returned: []
            })
        });

    }
}
