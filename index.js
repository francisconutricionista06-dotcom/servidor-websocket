const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

wss.on('connection', function connection(ws) {
    console.log('Novo cliente conectado!');

    ws.on('message', function incoming(message) {
        // Repassa a imagem/mensagem recebida de um aparelho para todos os outros conectados
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', function() {
        console.log('Cliente desconectado.');
    });
});

console.log('Servidor WebSocket rodando...');
