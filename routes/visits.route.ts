import { VisitorModel, VisitModel } from './../config/visitors.schema';
import { Search } from './../utils/search';
import { VisitsCollection, VisitorCollection } from './../config';
import { Visit } from './../models/visit';


import express = require('express');
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

    VisitModel
        .find(search, null,
        {
            sort:
            { 'date': -1 }
        }
        )
        .skip(page * offset)
        .limit(30)
        .then(documents => {
            console.log("Mongoose");
            res.status(200).send(documents);
        }).catch(e => {
            res.status(500).send(e);
        })

    // VisitsCollection.find(search, { sort: { "date": -1 }, limit: 30, skip: page * offset }).then((visitors: Visit[]) => {
    //     res.status(200).send(visitors);
    // }).catch(err => {
    //     res.status(500).send(err);
    // });
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

    VisitorModel.find({
        name: new RegExp(req.params.name, 'ig')
    }, '_id name company')
        .then(document => {
            res.status(200).send(document);
        }).catch(e => {
            res.status(500).send(e);
        });

    // VisitorCollection.find({
    //     "name": new RegExp(req.params.name, 'ig')
    // }, {
    //         fields: {
    //             _id: 1,
    //             name: 1,
    //             company: 1
    //         }
    //     }).then(namesObject => {
    //         res.status(200).send(namesObject);
    //     }).catch(err => {
    //         throw err;
    //     })
});

router.post('/', (req, res) => {
    const body: Visit = req.body;

    VisitModel.create(body).then(status => {
        res.status(200).send(status);
    }).catch(e => {
        res.status(500).send(e);
    });

});

router.put('/:id', (req, res) => {

    VisitModel.update({
        _id: req.body.id
    }, {
        $set: req.body.update
    }).then(status => {
        res.status(200).send(status);
    }).catch(e => {
        res.status(500).send(e);
    });

});

router.delete('/:id', (req, res) => {
    // 
});

router.get('/visitor/:id', (req, res) => {
    let promises: any[] = [];
    promises.push(
        VisitorModel.findOne({
            '_id': req.params.id
        }),
        VisitModel.find({
            'visitor._id': req.params.id
        })
        // VisitorCollection.findOne({ _id: monk.id(req.params.id) }),
        // VisitsCollection.find({"visitor._id": monk.id(req.params.id)})
    );

    Promise.all(promises).then(data => {
        let response = {
            visits: data[1],
            visitor: data[0]
        };
        res.status(200).send(response);
    }).catch(e => res.status(500).send(e.toString()));
});