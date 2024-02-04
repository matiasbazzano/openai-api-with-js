const outputImageElement = document.getElementById('output');
const loadingElement = document.getElementById('loading');

async function makeDALLERequest(prompt) {
  const apiEndpoint = 'https://api.openai.com/v1/images/generations';
  const apiToken = 'YOUR_API_KEY';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  };

  const data = {
    prompt: prompt,
    model: "dall-e-2",
    size: "256x256",
  };

  try {
    loadingElement.style.display = 'block';

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const imageUrl = responseData.data[0].url;
    outputImageElement.src = imageUrl;
    loadingElement.style.display = 'none';
  } catch (error) {
    console.error('Error:', error);
    loadingElement.style.display = 'none';
  }
}

document.getElementById('generate').addEventListener('click', function () {
  const prompt = document.getElementById('prompt').value;
  makeDALLERequest(prompt);
});
