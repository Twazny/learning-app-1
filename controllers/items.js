const express = require('express');


const Item = require('../models').models.Item;

const router = express.Router();
router.get('/', (req,res) => {
    Item.findAll({
        attributes: ['id', 'name', 'description']
    }).then((items) => {
        res.json(items);
    });
});


router.post('/', (req,res) => {
    Item.create(req.body).then((item) => {
        res.json(item);
    }).catch((err) => {
        console.log(err);
    });
});

router.delete('/:id', (req,res) => {
    Item.destroy({
        force: true,
        where: {
            id: req.params.id
        }
    }).then((item) => {
        res.json(item);
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;
