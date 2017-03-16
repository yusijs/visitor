import { VisitorCollection } from './../config';
import express = require('express');

export const router = express.Router({});

router.get('/:id', (req, res) => {
    VisitorCollection.findById(req.params.id)
        .then(visitor => res.status(200).send(visitor))
        .catch(e => res.status(500).send(e));
});

router.get('/typeahead/:name', (req, res) => {
    VisitorCollection.find({ name: new RegExp(req.params.name, 'i') })
        .then(doc => res.status(200).send(doc))
        .catch(e => res.status(500).send(e));
})