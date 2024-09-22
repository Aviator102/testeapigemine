const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        if (!req.body || !req.body.file) {
            return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
        }

        const formData = new FormData();
        formData.append('file', req.body.file);

        const apiKey = 'AIzaSyDKHfinTQUDi3yxUeFSn0bSLWgtmCECpp4';
        const url = `https://api.gemine.com/analyze?key=${apiKey}`;

        try {
            const apiResponse = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const data = await apiResponse.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error('Erro na análise:', error);
            return res.status(500).json({ error: 'Erro na análise do arquivo.' });
        }
    } else {
        return res.status(405).json({ error: 'Método não permitido.' });
    }
};
