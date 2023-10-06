// Reemplaza 'TU_API_KEY' con tu clave de API de OpenAI
const apiKey = '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';

const chatMessages = document.getElementById('chat-messages');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const userMessage = userMessageInput.value;
    appendMessage('Tú', userMessage);
    userMessageInput.value = '';

    fetchGPTResponse(userMessage)
        .then(response => {
            const botMessage = response.choices[0].text;
            appendMessage('Bot', botMessage);
        })
        .catch(error => {
            console.error('Error al obtener respuesta de GPT-3:', error);
        });
});

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function fetchGPTResponse(userMessage) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 50, // Ajusta este valor según tus necesidades
        }),
    });

    if (!response.ok) {
        throw new Error('Error al obtener respuesta de GPT-3');
    }

    return response.json();
}
