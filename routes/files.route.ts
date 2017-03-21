import { VisitorCollection } from './../config';
import express = require('express');
import multer = require('multer');
import monk = require('monk');
import crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) {
                cb(err, '');
            }
            cb(null, raw.toString('hex') + Date.now() + '.pdf');
        });
    }
});

const upload = multer({
    storage
});

export const router = express.Router({});

router.post('/', upload.single('file'), (req, res) => {

    let search = {
        _id: monk.id(req.body.id)
    };

    let field = `attachments.${req.body.type}`;

    let update = {
        $push: {
            [field]: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                dateSigned: new Date(req.body.date)
            }
        }
    };

    VisitorCollection.update(search, update).then(doc => {
        res.status(200).send(doc);
    });
});