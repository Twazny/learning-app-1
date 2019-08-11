const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();
router.get('/', (req,res) => {
    //two ways of executin spawn() method
    const pyScript = spawn('python',['genethic.py'],{ cwd: __dirname });
    //const pyScript = spawn('python',[path.join(__dirname, 'genethic.py')]);
    pyScript.stdout.on('data', function(data) {
        console.log('Received result of the calculations: ' + data.toString());
        res.end(data);
    });

    pyScript.stderr.on('data', function(data) {
        console.log('Received error of the calculations: ' + data.toString());
        res.end(data.toString());
    });
});

module.exports = router;