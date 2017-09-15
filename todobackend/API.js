const express = require('express');
const router = express.Router();

var tasks = [];

router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

router.post('/create', (req, res) => {

    var errors = [{
        ValidationError: {
            name: []
        }
    }];

    if (!req.body.name) {
        errors[0].ValidationError.name.push({
            data: null,
            message: "Validation error: \"null\" Rule \"required(true)\" failed.",
            rule: "required",
            args: [
                true
            ]
        })
    }

    if (errors[0].ValidationError.name.length > 0) {
        res.status(500).send(errors);
    }

    tasks.push(req.body);
    res.status(200).json(req.body);
});

router.get('/destroy/:id', (req, res) => {
    var index = tasks.findIndex((item) => {
        return item.id == req.params.id
    });

    if (index == -1) {
        res.status(400).send('Task not found');
    }

    tasks.splice(index, 1);

    res.status(200).send('Task destroy');
});

router.post('/update', (req, res) => {

});

module.exports = router;