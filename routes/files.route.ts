import { VisitorCollection } from './../config';
import express = require('express');
import multer = require('multer');
import monk = require('monk');

const upload = multer({
    dest: 'upload/'
});

export const router = express.Router({});

router.post('/', upload.single('file'), (req, res) => {

    console.log(req.body);

    let search = {
        _id: monk.id(req.body.id)
    };

    let field = `attachments.${req.body.type}`;

    let update = {
        $push: {
            [field]: {
                filename: req.file.filename,
                dateSigned: new Date(req.body.date)
            }
        }
    };

    console.log(update);

    VisitorCollection.update(search, update).then(doc => {
        res.status(200).send(doc);
    });
});