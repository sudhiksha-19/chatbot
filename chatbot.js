const userInput = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');

userInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && userInput.value.trim() !== '') {
    const message = userInput.value;
    userInput.value = '';
    chatWindow.innerHTML += `<div class="user-message">${message}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom

    // Send the message to Dialogflow
    fetch('https://api.dialogflow.com/v1/query', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your Dialogflow API token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
        lang: 'en', // Use 'en' for English
        sessionId: '12345', // Unique session ID
      }),
    })
    .then(response => response.json())
    .then(data => {
      const botReply = data.result.fulfillment.speech;
      chatWindow.innerHTML += `<div class="bot-message">${botReply}</div>`;
      chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
    })
    .catch(error => {
      console.error('Error:', error);
      chatWindow.innerHTML += `<div class="bot-message">Sorry, something went wrong.</div>`;
    });
  }
});
