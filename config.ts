import monk = require('monk');

const db = monk('localhost:27017/visits');

export const VisitsCollection = db.get('visits');