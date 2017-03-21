import { Visit } from './models/visit';
import { Visitor } from './models/visitor';
import { VisitsCollection, VisitorCollection } from './config';

declare var process: NodeJS.Process;

import crypto = require('crypto');
import faker = require('faker');


switch (process.argv[2]) {
    case 'all':
        visitor();
        break;
    case 'visits':
        visits();
        break;
    default:
        console.error('[ERROR]: Invalid arguments supplied');
        console.error('Expected: all or visits');
        console.error('Received: ' + process.argv[2]);
        console.error('Exiting...');
        process.exit();
        break;
}

function visits() {
    VisitsCollection.remove({}).then(() => {
        VisitorCollection.find({}).then((visitors: Visitor[]) => {
            let promises: Promise<any>[] = [];
            for (let visitor of visitors) {

                let howMany = Math.ceil((Math.random() * 10) / 2);
                for (let i = 0; i < howMany; i++) {
                    let current = createVisit(visitor);
                    promises.push(VisitsCollection.insert(current));
                }

            }

            Promise.all(promises).then(() => {
                console.log("Done");
                process.exit();
            }).catch(console.error);
        });
    });
}


function visitor() {
    VisitorCollection.remove({}).then(() => {

        let promises: Promise<any>[] = [];
        for (let i = 0; i < 1000; i++) {
            let visitor: Visitor = {
                "company": faker.company.companyName(),
                "name": faker.name.firstName() + ' ' + faker.name.lastName(),
                "confidentiality": i % 2 === 0 ? true : false,
                "attachments":
                {
                    "approved": Math.random() > 0.5 ? [
                        {
                            "filename": crypto.randomBytes(4).readUInt32LE(0).toString(),
                            "originalName": faker.system.commonFileName('.pdf', 'pdf'),
                            "dateSigned": faker.date.past(1)
                        }
                    ] : [],
                    "confidentiality": Math.random() > 0.5 ? [
                        {
                            "filename": crypto.randomBytes(4).readUInt32LE(0).toString(),
                            "originalName": faker.system.commonFileName('.pdf', 'pdf'),
                            "dateSigned": faker.date.past(1)
                        }
                    ] : [],
                    "recording": Math.random() > 0.5 ? [
                        {
                            "filename": crypto.randomBytes(4).readUInt32LE(0).toString(),
                            "originalName": faker.system.commonFileName('.pdf', 'pdf'),
                            "dateSigned": faker.date.past(1)
                        }
                    ] : []
                }
            };

            promises.push(VisitorCollection.insert(visitor));
        }

        Promise.all(promises).then(() => {
            visits();
        }).catch(e => {
            throw e;
        });
    });
}

function createVisit(visitor: Visitor): Visit {
    return {
        visitor: visitor,
        "date": faker.date.past(1),
        "site": Math.random() > 0.5 ? 'Tananger' : Math.random() < 0.5 && Math.random() > 0.25 ? 'Vestby' : 'Helsinki',
        "comments": faker.lorem.paragraph(2),
        "badge": {
            "badge": Math.floor(Math.random() * 500),
            "noEscort": Math.random() > 0.5,
            "returned": Math.random() > 0.5
        },
        "keycard": {
            "keycard": Math.floor(Math.random() * 500),
            "returned": Math.random() > 0.5
        }
    }
}

// Promise.all(promises).then(() => {
//     console.log("Done");
//     process.exit();
// }).catch(err => {
//     console.error(err);
//     process.exit();
// })