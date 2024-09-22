module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Aqui você pode implementar a lógica para gerar respostas
        let response;
        if (message.toLowerCase() === 'oi') {
            response = 'Olá! Como posso ajudar você hoje?';
        } else if (message.toLowerCase() === 'tudo bem?') {
            response = 'Tudo ótimo, obrigado por perguntar! E você?';
        } else {
            response = 'Desculpe, não entendi a sua mensagem.';
        }

        return res.status(200).json({ response });
    } else {
        return res.status(405).json({ error: 'Método não permitido.' });
    }
};
