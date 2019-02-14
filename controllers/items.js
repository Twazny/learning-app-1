const express = require('express');

var items = [
    {id: 0, name: 'Sword of destiny', description: 'Sword of destiny has two edges. One of them is you.'},
    {id: 1, name: 'Boots of heist', description: 'Watch out for these. Will take you on a long journey.'},
    {id: 2, name: 'Excalibur', description: 'Waiting for the true king and his strong arms.'},
    {id: 3, name: 'Horn of the Rohirrim', description: 'Deeeeaaaaath!!!'}    
];

const router = express.Router();
router.get('/', (req,res) => {
    res.json(items);
});

router.get('/:id', (req,res) => {
    const id = req.params.id;
    const item = items.find((i) => { return parseInt(i.id) == id});
    res.json(item);
});

router.post('/', (req,res) => {
    items.push(req.body);
})

module.exports = router;
