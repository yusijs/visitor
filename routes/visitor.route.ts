import { VisitorModel } from './../config/visitors.schema';
import express = require('express');

export const router = express.Router({});

router.get('/:id', (req, res) => {
    VisitorModel.findOne({
        _id: req.params.id
    }).then(doc => {
        res.status(200).send(doc);
    }).catch(e => {
        res.status(500).send(e);
    });
});

router.get('/typeahead/:name', (req, res) => {
    VisitorModel.find({ name: new RegExp(req.params.name, 'i') })
        .then(doc => {
            res.status(200).send(doc);
        }).catch(e => {
            res.status(500).send(e);
        });
});