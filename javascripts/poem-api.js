document.addEventListener('DOMContentLoaded', function() {
    // Only run poem functionality on the poem.html page
    if (window.location.pathname.includes('poem.html')) {
        if (shouldFetchNewPoem()) {
            fetchDailyPoem();
        } else {
            displaySavedPoem();
        }
    }
});


function shouldFetchNewPoem() {
    const lastFetchDate = localStorage.getItem('lastPoemFetchDate');
    const currentDate = new Date().toDateString();
    
  
    if (!lastFetchDate || lastFetchDate !== currentDate) {
        return true;
    }
    
    
    return false;
}

async function fetchDailyPoem() {
    try {
       
        const authorsResponse = await fetch('https://poetrydb.org/author');
        const authors = await authorsResponse.json();
        const randomAuthor = authors.authors[Math.floor(Math.random() * authors.authors.length)];
        
       
        const poemsResponse = await fetch(`https://poetrydb.org/author/${randomAuthor}`);
        const poems = await poemsResponse.json();
        
        if (poems.length === 0 || poems.status === 404) {
            throw new Error('No poems found for this author');
        }
        
       
        const randomPoem = poems[Math.floor(Math.random() * poems.length)];
        
       
        savePoem(randomPoem);
        
       
        displayPoem(randomPoem);
    } catch (error) {
        console.error('not fetching pioem:', error);
        // this is for when api dont work
        displayDefaultPoem();
    }
}

function savePoem(poem) {
    const currentDate = new Date().toDateString();
    localStorage.setItem('lastPoemFetchDate', currentDate);
    localStorage.setItem('dailyPoem', JSON.stringify(poem));
}

function displaySavedPoem() {
    const savedPoem = localStorage.getItem('dailyPoem');
    if (savedPoem) {
        displayPoem(JSON.parse(savedPoem));
    } else {
       
        fetchDailyPoem();
    }
}

function displayPoem(poem) {
    const poemContainer = document.createElement('div');
    poemContainer.className = 'poem-container';
    
    const poemTitle = document.createElement('h3');
    poemTitle.className = 'poem-title';
    poemTitle.textContent = poem.title;
    
    const poemAuthor = document.createElement('p');
    poemAuthor.className = 'poem-author';
    poemAuthor.textContent = `by ${poem.author}`;
    
    const poemLines = document.createElement('div');
    poemLines.className = 'poem-lines';
    
    
    poem.lines.forEach(line => {
        const lineElement = document.createElement('p');
        lineElement.textContent = line;
        poemLines.appendChild(lineElement);
    });
    
    poemContainer.appendChild(poemTitle);
    poemContainer.appendChild(poemAuthor);
    poemContainer.appendChild(poemLines);
    

    const quotesSection = document.getElementById('quotes-section');
    if (quotesSection) {
        
        quotesSection.innerHTML = '<h2 class="section-title">Poem of the Day</h2>';
        quotesSection.appendChild(poemContainer);
    }
}

function displayDefaultPoem() {
    const defaultPoem = {
        title: "",
        author: "",
        lines: [
        //    add poem u like here as default
        ]
    };
    
    displayPoem(defaultPoem);
    savePoem(defaultPoem);
}