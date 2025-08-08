const quotes = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
      { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
      { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
      { text: "In the end, we only regret the chances we didn’t take.", author: "Lewis Carroll" },
      { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
      { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
      { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
      { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn" },
      { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "Act as if what you do makes a difference. It does.", author: "William James" },
      { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
      { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" }
    ];

    let currentQuote = {};
    const quoteEl = document.getElementById('quote');
    const authorEl = document.getElementById('author');
    const saveBtn = document.querySelector('.save-btn');
    const favoritesSection = document.getElementById('favoritesSection');
    const favoritesList = document.getElementById('favoritesList');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function showNewQuote() {
      let random;
      do {
        random = quotes[Math.floor(Math.random() * quotes.length)];
      } while (random.text === currentQuote.text);
      currentQuote = random;
      quoteEl.textContent = '${random.text}';
      authorEl.textContent = - '-${random.author}';
      updateSaveButton();
    }

    function updateSaveButton() {
      const isSaved = favorites.some(fav => fav.text === currentQuote.text && fav.author === currentQuote.author);
      saveBtn.classList.toggle('saved', isSaved);
      saveBtn.textContent = isSaved ? "Saved ❤" : "Save Quote";
    }

    function toggleFavorite() {
      const index = favorites.findIndex(fav => fav.text === currentQuote.text && fav.author === currentQuote.author);
      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(currentQuote);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateSaveButton();
      renderFavorites();
    }

    function removeFavorite(index) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      renderFavorites();
      updateSaveButton();
    }

    function renderFavorites() {
      favoritesList.innerHTML = favorites.map((fav, index) => `
        <div class="favorite-item">
          "${fav.text}"<br><small>- ${fav.author}</small><br>
          <button class="remove-btn" onclick="removeFavorite(${index})">Remove</button>
        </div>
      `).join('');
    }

    function toggleFavorites() {
      favoritesSection.classList.toggle('show');
      const toggleBtn = document.querySelector('.toggle-favorites-btn');
      toggleBtn.textContent = favoritesSection.classList.contains('show') ? "Hide Favorites" : "Show Favorites";
    }

    window.onload = () => {
      showNewQuote();
      renderFavorites();
    };