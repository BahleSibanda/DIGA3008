document.addEventListener('DOMContentLoaded', function() {
  const quoteElement = document.getElementById('random-quote');
  const authorElement = document.getElementById('quote-author');
  const newQuoteBtn = document.getElementById('new-quote-btn');

  // for fall backs u can add ur lana shit
  const fallbackQuotes = [
    {
      content: "",
      author: "lana"
    },
    {
      content: "lana",
      author:  "lana"
    },
    {
      content: "Tdealer os best song",
      author:  "lana"
    },
   
  ];

  async function fetchRandomQuote() {
    try {
     
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://github.com/lukePeavey/quotable', { //link to api
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('API request failed, using fallback quote:', error);
     
      return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    }
  }

  async function updateQuote() {
    try {
    
      quoteElement.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Loading quote...</p>';
      authorElement.textContent = '';
      
      const quote = await fetchRandomQuote();
      quoteElement.innerHTML = `<p>"${quote.content}"</p>`;
      authorElement.textContent = `— ${quote.author}`;
    } catch (error) {
      console.error('Error updating quote:', error);
      quoteElement.innerHTML = '<p>"Creativity is intelligence having fun."</p>';
      authorElement.textContent = '— Albert Einstein';
    }
  }

  // load initial quote
  updateQuote();

  // add event listener for new quote button
  newQuoteBtn.addEventListener('click', updateQuote);

  // changes  quote every 30 seconds... u can change it maam
  setInterval(updateQuote, 50000);
});