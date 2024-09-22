const fetch = require('node-fetch');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    const file = req.files.file;
    const apiKey = 'AIzaSyDKHfinTQUDi3yxUeFSn0bSLWgtmCECpp4';
    const url = `https://api.gemine.com/analyze?key=${apiKey}`;

    fetch(url, {
        method: 'POST',
        body: file.data,
        headers: {
            'Content-Type': file.mimetype
        }
    })
    .then(apiResponse => apiResponse.json())
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.error('Erro na análise:', error);
        res.status(500).send('Erro na análise do arquivo.');
    });
});

module.exports = app;
