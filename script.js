const express = require('express');
const fileUpload = require('express-fileupload');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(fileUpload());

// Endpoint para upload de arquivos
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    const file = req.files.file;

    // Aqui você pode fazer o processamento do arquivo
    // e a análise usando a API do Gemine
    const apiKey = 'AIzaSyDKHfinTQUDi3yxUeFSn0bSLWgtmCECpp4';
    const url = `https://api.gemine.com/analyze?key=${apiKey}`; // Endpoint de análise

    // Exemplo de chamada à API com o arquivo
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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
