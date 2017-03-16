import { Visit } from './models/visit';
import { VisitsCollection, VisitorCollection } from './config';

declare var process;

import faker = require('faker');

let promises = [];

VisitsCollection.remove({}).then(() => {
    VisitorCollection.find({}).then((visitors) => {
        let promises: Promise<any>[] = [];
        for (let visitor of visitors) {

            let bool: boolean = Math.random() > 0.5;
            let current: Visit = {
                visitor: visitor,
                "date": faker.date.past(1),
                "site": bool ? 'Tananger' : 'Vestby',
                "comments": faker.lorem.paragraph(2),
                "badge": {
                    "badge": Math.floor(Math.random() * 500),
                    "noEscort": bool,
                    "returned": bool
                },
                "keycard": {
                    "keycard": Math.floor(Math.random() * 500),
                    "returned": bool
                }
            }
            promises.push(VisitsCollection.insert(current));
        }

        Promise.all(promises).then(() => {
            console.log("Done");
            process.exit();
        }).catch(console.error);
    })
})


// for (let i = 0; i < 1000; i++) {
//     let visitor: Visit = {
//         "visitor": {
//             "company": faker.company.companyName(),
//             "name": faker.name.firstName() + ' ' + faker.name.lastName(),
//             "confidentiality": i % 2 == 0 ? true : false,
//             "attachments":
//             {
//                 "approved": {
//                     "type": "approved",
//                     "filename": faker.internet.userName(),
//                     "dateSigned": faker.date.past(1)
//                 }
//             }
//         },
//         "date": faker.date.past(1),
//         "site": i % 2 == 0 ? 'Tananger' : 'Vestby',
//         "comments": faker.lorem.paragraph(2),
//         "badge": {
//             "badge": Math.floor(Math.random() * 500),
//             "noEscort": i % 2 == 0 ? true : false,
//             "returned": i % 2 == 0 ? true : false
//         },
//         "keycard": {
//             "keycard": Math.floor(Math.random() * 500),
//             "returned": i % 2 == 0 ? true : false
//         }
//     }

//     promises.push(VisitsCollection.insert(visitor));
// }

// Promise.all(promises).then(() => {
//     console.log("Done");
//     process.exit();
// }).catch(err => {
//     console.error(err);
//     process.exit();
// })