const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Substitua isso pela URL correta da API do Gemine, se necessário
        const apiUrl = 'https://api.gemine.com/your-endpoint'; // Atualize para o endpoint correto da IA do Gemine
        const apiKey = 'AIzaSyDKHfinTQUDi3yxUeFSn0bSLWgtmCECpp4';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}` // Se necessário, ajuste o cabeçalho de autorização
                },
                body: JSON.stringify({ prompt: message }) // Ajuste de acordo com a API do Gemine
            });

            const data = await response.json();
            // Ajuste o acesso à resposta com base na estrutura da resposta da API
            const gemineResponse = data.response || 'Desculpe, não consegui entender isso.';

            return res.status(200).json({ response: gemineResponse });
        } catch (error) {
            console.error('Erro ao conectar com a API do Gemine:', error);
            return res.status(500).json({ response: 'Desculpe, ocorreu um erro ao conectar com a IA.' });
        }
    } else {
        return res.status(405).json({ error: 'Método não permitido.' });
    }
};
