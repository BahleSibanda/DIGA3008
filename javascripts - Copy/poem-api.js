/**
 * Poem of the Day - PoetryDB API Integration
 * Fetches and displays a daily poem with caching
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('[Poem] DOM loaded - checking if we should load poem');
    
    // Check if we're on a page that should display poems
    if (window.location.pathname.includes('poem.html') || 
        document.getElementById('quotes-section')) {
        
        console.log('[Poem] Initializing poem system');
        initializePoemSystem();
    }
});

async function initializePoemSystem() {
    console.log('[Poem] Initializing poem system');
    
    try {
        // First check if we have a valid saved poem
        if (shouldFetchNewPoem()) {
            console.log('[Poem] Fetching new poem');
            await fetchDailyPoem();
        } else {
            console.log('[Poem] Displaying saved poem');
            displaySavedPoem();
        }
    } catch (error) {
        console.error('[Poem] Error initializing poem system:', error);
        displayDefaultPoem();
    }
}

function shouldFetchNewPoem() {
    console.log('[Poem] Checking if we need a new poem');
    
    const lastFetchDate = localStorage.getItem('lastPoemFetchDate');
    const currentDate = new Date().toDateString();
    const savedPoem = localStorage.getItem('dailyPoem');
    
    // If no saved poem exists, we need to fetch
    if (!savedPoem) {
        console.log('[Poem] No saved poem found - fetching new');
        return true;
    }
    
    // If the saved poem is invalid, we need to fetch
    try {
        const parsedPoem = JSON.parse(savedPoem);
        if (!parsedPoem || !parsedPoem.title) {
            console.log('[Poem] Invalid saved poem - fetching new');
            return true;
        }
    } catch {
        console.log('[Poem] Corrupted saved poem - fetching new');
        return true;
    }
    
    // If the date has changed, we need to fetch
    if (!lastFetchDate || lastFetchDate !== currentDate) {
        console.log('[Poem] Date changed - fetching new poem');
        return true;
    }
    
    console.log('[Poem] Using cached poem');
    return false;
}

async function fetchDailyPoem() {
    console.log('[Poem] Fetching daily poem');
    
    try {
        // Attempt 1: Try the direct random poem endpoint (most reliable)
        console.log('[Poem] Attempting random poem endpoint');
        const randomResponse = await fetchWithTimeout('https://poetrydb.org/random/1');
        
        if (randomResponse.ok) {
            const [randomPoem] = await randomResponse.json();
            
            if (randomPoem?.title) {
                console.log('[Poem] Successfully fetched random poem:', randomPoem.title);
                savePoem(randomPoem);
                displayPoem(randomPoem);
                return;
            }
        }
        
        // Attempt 2: Try the author-based approach (fallback)
        console.log('[Poem] Falling back to author-based approach');
        const authorsResponse = await fetchWithTimeout('https://poetrydb.org/author');
        
        if (!authorsResponse.ok) {
            throw new Error(`Authors fetch failed with status ${authorsResponse.status}`);
        }
        
        const authors = await authorsResponse.json();
        const validAuthors = authors.authors?.filter(a => a) || [];
        
        if (validAuthors.length === 0) {
            throw new Error('No valid authors available');
        }
        
        // Select a random author and fetch their poems
        const randomAuthor = validAuthors[Math.floor(Math.random() * validAuthors.length)];
        console.log('[Poem] Selected author:', randomAuthor);
        
        const poemsResponse = await fetchWithTimeout(
            `https://poetrydb.org/author/${encodeURIComponent(randomAuthor)}`
        );
        
        if (!poemsResponse.ok) {
            throw new Error(`Poems fetch failed with status ${poemsResponse.status}`);
        }
        
        const poems = await poemsResponse.json();
        const validPoems = poems.filter(p => p?.title) || [];
        
        if (validPoems.length === 0) {
            throw new Error('No valid poems found for author');
        }
        
        // Select and display a random poem
        const randomPoem = validPoems[Math.floor(Math.random() * validPoems.length)];
        console.log('[Poem] Selected poem:', randomPoem.title);
        savePoem(randomPoem);
        displayPoem(randomPoem);
        
    } catch (error) {
        console.error('[Poem] Error fetching daily poem:', error);
        displayDefaultPoem();
        throw error; // Re-throw for initializePoemSystem to handle
    }
}

// Helper function for fetch with timeout
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

function savePoem(poem) {
    console.log('[Poem] Saving poem to localStorage');
    
    try {
        const currentDate = new Date().toDateString();
        localStorage.setItem('lastPoemFetchDate', currentDate);
        localStorage.setItem('dailyPoem', JSON.stringify(poem));
    } catch (error) {
        console.error('[Poem] Error saving poem:', error);
    }
}

function displaySavedPoem() {
    console.log('[Poem] Attempting to display saved poem');
    
    try {
        const savedPoem = localStorage.getItem('dailyPoem');
        
        if (!savedPoem) {
            console.log('[Poem] No saved poem found - fetching new');
            fetchDailyPoem();
            return;
        }
        
        const parsedPoem = JSON.parse(savedPoem);
        
        if (!parsedPoem?.title) {
            console.log('[Poem] Invalid saved poem - fetching new');
            fetchDailyPoem();
            return;
        }
        
        console.log('[Poem] Displaying saved poem:', parsedPoem.title);
        displayPoem(parsedPoem);
    } catch (error) {
        console.error('[Poem] Error displaying saved poem:', error);
        fetchDailyPoem();
    }
}

function displayPoem(poem) {
    console.log('[Poem] Displaying poem:', poem.title);
    
    try {
        // Create poem container
        const poemContainer = document.createElement('div');
        poemContainer.className = 'poem-container';
        
        // Add title
        const poemTitle = document.createElement('h3');
        poemTitle.className = 'poem-title';
        poemTitle.textContent = poem.title || 'Untitled Poem';
        
        // Add author
        const poemAuthor = document.createElement('p');
        poemAuthor.className = 'poem-author';
        poemAuthor.textContent = poem.author ? `by ${poem.author}` : 'Author Unknown';
        
        // Add poem lines
        const poemLines = document.createElement('div');
        poemLines.className = 'poem-lines';
        
        if (poem.lines?.length > 0) {
            poem.lines.forEach(line => {
                if (line.trim()) {
                    const lineElement = document.createElement('p');
                    lineElement.className = 'poem-line';
                    lineElement.textContent = line;
                    poemLines.appendChild(lineElement);
                }
            });
        } else {
            const noContent = document.createElement('p');
            noContent.textContent = '[No poem content available]';
            poemLines.appendChild(noContent);
        }
        
        // Assemble the poem
        poemContainer.appendChild(poemTitle);
        poemContainer.appendChild(poemAuthor);
        poemContainer.appendChild(poemLines);
        
        // Find where to insert the poem
        const targetSection = document.getElementById('quotes-section') || 
                            document.getElementById('poem-container') || 
                            document.body;
        
        // Clear previous poem if exists
        const existingPoem = targetSection.querySelector('.poem-container');
        if (existingPoem) {
            existingPoem.replaceWith(poemContainer);
        } else {
            // Add title if needed
            if (!targetSection.querySelector('.section-title')) {
                const title = document.createElement('h2');
                title.className = 'section-title';
                title.textContent = 'Poem of the Day';
                targetSection.prepend(title);
            }
            targetSection.appendChild(poemContainer);
        }
        
    } catch (error) {
        console.error('[Poem] Error displaying poem:', error);
        displayDefaultPoem();
    }
}

function displayDefaultPoem() {
    console.log('[Poem] Displaying default poem');
    
    const defaultPoem = {
        title: "The Muse is Resting",
        author: "Digital Poet",
        lines: [
            "The verses hide in silicon dreams,",
            "Between the pulses of electric streams.",
            "Refresh the page or try once more,",
            "When inspiration's not at war.",
            "",
            "Or maybe pause and look outside,",
            "Where real poems live and breathe and bide."
        ]
    };
    
    displayPoem(defaultPoem);
    
    try {
        localStorage.removeItem('dailyPoem');
        localStorage.removeItem('lastPoemFetchDate');
    } catch (error) {
        console.error('[Poem] Error clearing poem cache:', error);
    }
}