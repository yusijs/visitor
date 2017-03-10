import express = require('express');

export const router = express.Router();
export var Authenticated;

const ValidUsers = [
    {
        username: 'rlaugen',
        department: 'IT',
        sites: ['Tananger', 'Vestby']
    },
    {
        username: 'hbrede',
        department: 'Managers',
        sites: ['Tananger']
    }
];

const auth = (username) => {
    return ValidUsers.filter(user => user.username === username)
}

router.post('/', (req, res) => {
    let isAuth = auth(req.body.username);
    if (isAuth.length === 0) {
        req.app.set('auth', 'public');
    }
    req.app.set('auth', isAuth);
});