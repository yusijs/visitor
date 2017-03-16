import monk = require('monk');

export const db = monk('localhost:27017/visits');

export const VisitsCollection = db.get('visits');
export const VisitorCollection = db.get('visitors');