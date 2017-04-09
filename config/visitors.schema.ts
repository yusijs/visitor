import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/visits');

const VisitorSchema = new mongoose.Schema({
    company: String,
    name: String,
    confidentiality: Boolean,
    attachments: {
        recording: [{ filename: String, originalName: String, dateSigned: Date }],
        approved: [{ filename: String, originalName: String, dateSigned: Date }],
        confidentiality: [{ filename: String, originalName: String, dateSigned: Date }]
    }
});

const VisitsSchema = new mongoose.Schema({
    badge: {
        badge: Number,
        noEscort: Boolean,
        returned: Boolean
    },
    comments: String,
    date: Date,
    keycard: {
        keycard: Number,
        returned: Boolean
    },
    site: String,
    visitor: VisitorSchema
});

export const VisitModel = mongoose.model('Visit', VisitsSchema);
export const VisitorModel = mongoose.model('Visitor', VisitorSchema);