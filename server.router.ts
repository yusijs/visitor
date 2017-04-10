import express = require('express');
import { router as VISIT_ROUTER } from './routes/visits.route';
import { router as AUTH_ROUTER } from './routes/auth.route';
import { router as FILES_ROUTER } from './routes/files.route';
import { router as VISITOR_ROUTER } from './routes/visitor.route';

export const router = express.Router();

router.use('/visits', VISIT_ROUTER);
router.use('/auth', AUTH_ROUTER);
router.use('/files', FILES_ROUTER);
router.use('/visitor', VISITOR_ROUTER);
router.all('*', (req, res) => {
    res.status(404).send({
        'message': 'No content'
    });
});