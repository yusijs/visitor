import { VisitsCollection } from './../config';
import { Visit } from './../models/visit';

import express = require('express');

export const router = express.Router();

router.get('/', (req, res) => {
    VisitsCollection.find({}).then((visitors: Visit[]) => {
        res.status(200).send(visitors);
    }).catch(err => {
        res.status(500).send(err);
    });
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

router.get('/:id', (req, res) => {
    // 
});