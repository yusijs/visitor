import { Search } from './../utils/search';
import { VisitsCollection, VisitorCollection, db } from './../config';
import { Visit } from './../models/visit';


import express = require('express');
import monk = require('monk');
import moment = require('moment');

export const router = express.Router();


router.get('/', (req, res) => {
    let page = req.query.page ? req.query.page : 0;
    let offset = 30;
    let d = moment().subtract(6, 'months').toISOString();
    let q = req.query ? req.query : { filter: 'active' };
    let search;

    switch (q.filter) {
        case 'expired':
            search = {
                "visitor.attachments.approved.dateSigned": {
                    $lt: new Date(d)
                }
            }
            break;
        case 'all':
            search = {};
            break;
        default:
            // Active as default
            search = {
                "visitor.attachments.approved.dateSigned": {
                    $gte: new Date(d)
                }
            }
            break;
    }

    VisitsCollection.find(search, {sort: { "date": -1 }, limit: 30, skip: page * offset }).then((visitors: Visit[]) => {
        res.status(200).send(visitors);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.post('/search', (req, res) => {
    const search = new Search(req.body);
    search.execute().then((visits: Visit[]) => {
        res.status(200).send(visits);
    }).catch(e => {
        res.status(500).send(e);
    });
});

router.get('/typeahead/:name', (req, res) => {
    VisitorCollection.find({
        "name": new RegExp(req.params.name, 'ig')
    }, {
            fields: {
                _id: 1,
                name: 1,
                company: 1
            }
        }).then(namesObject => {
            res.status(200).send(namesObject);
        }).catch(err => {
            throw err;
        })
});

router.post('/', (req, res) => {
    const body: Visit = req.body;
    VisitsCollection.insert(body).then(status => {
        res.status(200).send(status);
    }).catch(err => {
        res.status(500).send(err);
    })
});

router.put('/:id', (req, res) => {
    VisitsCollection.update({ _id: req.body.id }, { $set: req.body.update }).then(status => {
        res.status(200).send(status);
    }).catch(err => {
        res.status(500).send(err);
    })
});

router.delete('/:id', (req, res) => {
    // 
});

router.get('/visitor/:id', (req, res) => {
    let promises: Promise<any>[] = [];
    promises.push(
        VisitorCollection.findOne({ _id: monk.id(req.params.id) }),
        VisitsCollection.find({"visitor._id": monk.id(req.params.id)})
    )

    Promise.all(promises).then(data => {
        let response = {
            visits: data[1],
            visitor: data[0]
        }
        res.status(200).send(response);
    }).catch(e => res.status(500).send(e.toString()));
});