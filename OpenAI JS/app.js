const outputElement = document.getElementById('output');
const historyList = document.getElementById('history');
const loadingElement = document.getElementById('loading');

async function makeOpenAIAPIRequest(prompt) {
  loadingElement.style.display = 'block';

  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  const apiToken = "YOUR_API_KEY";

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  };

  const data = {
    model: 'gpt-3.5-turbo',
    max_tokens: 15,
    messages: [
      { role: 'system', content: 'You are a helpful assistant, who answers very few words.' },
      { role: 'user', content: prompt },
    ],
  };

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const assistantResponse = responseData.choices[0].message.content;
    outputElement.innerText = assistantResponse;
    updateHistory(prompt, assistantResponse);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loadingElement.style.display = 'none';
  }
}

function updateHistory(userPrompt, assistantResponse) {
  const listItem = document.createElement('li');
  listItem.textContent = `ASK: ${userPrompt} | ANSWER: ${assistantResponse}`;
  historyList.prepend(listItem);
}

document.getElementById('generate').addEventListener('click', function () {
  const prompt = document.getElementById('prompt').value;
  makeOpenAIAPIRequest(prompt);
});
