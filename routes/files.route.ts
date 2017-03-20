import express = require('express');
import multer = require('multer');

const upload = multer({
    dest: 'upload/'
});

export const router = express.Router({});

router.post('/', upload.single('file'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.status(200).send({status: 'done'});
});