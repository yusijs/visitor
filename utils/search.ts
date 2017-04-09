import { VisitsCollection } from './../config';
import { Visit } from './../models/visit';
import { Keycard } from './../models/keycard';
import { Badge } from './../models/badge';

export class Search {

    private _query: Query;

    public execute(): Promise<Visit[]> {
        let search = this.buildSearch();
        console.log(search);
        return VisitsCollection.find(search, {sort: { "date": -1 }, limit: 30});
    }

    private buildSearch(): Query {
        let q: Query = {} as Query;

        for (let key in this._query) {
            switch (key) {
                case 'visitor':
                case 'badge':
                case 'keycard':
                for (let i in this._query[key]) {
                    if (this._query[key][i] !== null && this._query[key][i] !== undefined) {
                        q[key + '.' + i] = new RegExp(this._query[key][i], 'i');
                    }
                }
                    break;
                default:
                    if (this._query[key] !== null && this._query[key] !== undefined) {
                        q[key] = new RegExp(this._query[key]);
                    }
                    break;
            }
        }

        return q;
    }

    constructor(query: Query) {
        this._query = query;
    }


}

export interface Query {
    "visitor": {
        "name": string;
        "company": string;
    };
    "status": string;
    "site": string;
    "visitDate": string;
    "badge": Badge;
    "keycard": Keycard;
}