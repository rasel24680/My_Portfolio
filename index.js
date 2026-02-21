// All functionality wrapped inside one DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
    // ==================== Theme Changing Functionality ====================
    const themeOptions = document.querySelectorAll('.theme-dropdown-content a');
    const currentThemeDisplay = document.getElementById('current-theme');

    themeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();

            const themeName = this.getAttribute('data-theme');

            // Remove existing theme classes
            document.body.classList.remove('dark-theme', 'teal-theme', 'purple-theme');

            // Apply new theme if not default
            if (themeName !== 'default') {
                document.body.classList.add(themeName);
            }

            // Update display and localStorage
            currentThemeDisplay.textContent = this.textContent;
            localStorage.setItem('portfolioTheme', themeName);
        });
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme) {
        const matchingOption = document.querySelector(`.theme-dropdown-content a[data-theme="${savedTheme}"]`);
        if (matchingOption) {
            if (savedTheme !== 'default') {
                document.body.classList.add(savedTheme);
            }
            currentThemeDisplay.textContent = matchingOption.textContent;
        }
    }

    // ==================== Custom Cursor Implementation ====================
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'custom-cursor';

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';

    cursorContainer.appendChild(cursorDot);
    cursorContainer.appendChild(cursorRing);
    document.body.appendChild(cursorContainer);

    function updateCursorPosition(e) {
        cursorContainer.style.left = `${e.clientX}px`;
        cursorContainer.style.top = `${e.clientY}px`;
    }

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseout', () => {
        cursorContainer.style.opacity = '0';
    });
    document.addEventListener('mouseover', () => {
        cursorContainer.style.opacity = '1';
    });
});

// ==================== Contact Form Submit Function ====================
function submitContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    console.log("Form data collected, ready to send:");
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    alert("Form submitted! (This is a placeholder - connect to a backend to make it functional)");
}










/* JAVASCRIPT: Add this JavaScript to implement the typing animation */
document.addEventListener('DOMContentLoaded', function() {
    // Text options to cycle through
    const textOptions = ["UI/UX Designer", "Passionate Learner", "Problem Solver"];
    
    // Get the typing elements
    const typingText = document.querySelector('.typing-text');
    const typingCursor = document.querySelector('.typing-cursor');
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100; // Delay between each character typing
    
    function typeText() {
        const currentText = textOptions[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50; // Faster when deleting
        } else {
            // Typing text
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 120; // Normal typing speed
        }
        
        // If word is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingDelay = 1000; // Wait before starting to delete
        } 
        // If deletion is complete
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next text option
            textIndex = (textIndex + 1) % textOptions.length;
            // Pause before typing next word
            typingDelay = 500;
        }
        
        // Continue the typing animation
        setTimeout(typeText, typingDelay);
    }
    
    // Start the typing animation
    typeText();
});












/*NAbBAr*/
// Navbar scroll behavior and mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.digital-navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Add index attributes to nav items for staggered animation
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
    });
    
    // Scroll variables
    let lastScrollTop = 0;
    const scrollThreshold = 100; // How far to scroll before hiding navbar
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    navLinks.addEventListener('click', function(e) {
        if(e.target.classList.contains('nav-link')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Hide navbar on scroll down, show on scroll up
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if user scrolled more than threshold
        if(scrollTop > scrollThreshold) {
            // Scrolling down
            if(scrollTop > lastScrollTop) {
                navbar.classList.add('hidden');
            } 
            // Scrolling up
            else {
                navbar.classList.remove('hidden');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        // Highlight active section based on scroll position
        highlightActiveSection();
    });
    
    // Highlight active section based on scroll position
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100; // Offset for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if(navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Add temporary highlight effect
                setTimeout(() => {
                    targetElement.classList.add('highlight');
                    setTimeout(() => {
                        targetElement.classList.remove('highlight');
                    }, 1000);
                }, 500);
            }
        });
    });
    
    // Initial call to highlight active section
    highlightActiveSection();
});


// Simple floating panel navigation for portfolio site
document.addEventListener('DOMContentLoaded', function() {
    // Create floating panel element
    const floatingPanel = document.createElement('div');
    floatingPanel.className = 'floating-panel';
    floatingPanel.innerHTML = `
        <div class="floating-panel-header">
            <h2 id="panel-title">Section Title</h2>
            <button class="close-panel">×</button>
        </div>
        <div class="floating-panel-content" id="panel-content"></div>
    `;
    document.body.appendChild(floatingPanel);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'panel-overlay';
    document.body.appendChild(overlay);

    // Create styles for floating panel and overlay
    const style = document.createElement('style');
    style.textContent = `
        .panel-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 998;
        }
        
        .floating-panel {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 800px;
            max-height: 80vh;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 999;
            overflow: hidden;
        }
        
        .floating-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background-color: #f5f5f5;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .floating-panel-header h2 {
            margin: 0;
            font-size: 1.2rem;
        }
        
        .close-panel {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #555;
        }
        
        .floating-panel-content {
            padding: 20px;
            overflow-y: auto;
            max-height: calc(80vh - 60px);
        }
    `;
    document.head.appendChild(style);

    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').replace('#', '');
            openPanel(sectionId);
        });
    });

    // Close panel handlers
    document.querySelector('.close-panel').addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    // Open panel with content
    function openPanel(sectionId) {
        const panelTitle = document.getElementById('panel-title');
        const panelContent = document.getElementById('panel-content');
        
        // Set panel title based on section ID
        panelTitle.textContent = sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace('-', ' ');
        
        // Get content from your page based on section ID
        panelContent.innerHTML = getContentForSection(sectionId);
        
        // Show panel and overlay
        floatingPanel.style.display = 'block';
        overlay.style.display = 'block';
    }

    // Close panel
    function closePanel() {
        floatingPanel.style.display = 'none';
        overlay.style.display = 'none';
    }

    // Get content for section (fixed to properly find and extract content)
    function getContentForSection(sectionId) {
        // This function finds sections by ID or content
        let content = '';
        
        // Map section IDs from navigation to actual content sections in HTML
        const sectionMap = {
            'resume': 'Resume',
            'tech-stack': 'Tech Stack',
            'experience': 'Experience',
            'certification': 'Certification',
            'education': 'Education',
            'projects': 'Featured Projects'
        };
        
        // Get the section title to look for
        const sectionTitle = sectionMap[sectionId] || sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace('-', ' ');
        
        // Find all headings that contain the section title
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).filter(
            heading => heading.textContent.includes(sectionTitle)
        );
        
        if (headings.length > 0) {
            // Find the closest parent container (likely a section or div)
            const container = findParentContainer(headings[0]);
            if (container) {
                content = container.innerHTML;
            } else {
                content = `<p>${sectionTitle} content could not be found.</p>`;
            }
        } else {
            // If we can't find by heading, try to find by ID
            const section = document.getElementById(sectionId);
            if (section) {
                content = section.innerHTML;
            } else {
                // Special case for projects
                if (sectionId === 'projects') {
                    const projectsHeading = Array.from(document.querySelectorAll('h2')).find(
                        h => h.textContent.includes('Featured Projects')
                    );
                    if (projectsHeading) {
                        const projectsContainer = findParentContainer(projectsHeading);
                        if (projectsContainer) {
                            content = projectsContainer.innerHTML;
                        }
                    }
                }
                
                // If still not found
                if (!content) {
                    content = `<p>Content for "${sectionTitle}" could not be found.</p>`;
                }
            }
        }
        
        return content;
    }
    
    // Helper function to find a suitable parent container
    function findParentContainer(element) {
        // Start from the element and move up to find a suitable container
        let current = element;
        const maxLevels = 4; // Prevent going too far up the DOM
        let level = 0;
        
        while (current && level < maxLevels) {
            // Check if this is a suitable container (section, div with class, etc.)
            if (
                current.tagName === 'SECTION' || 
                (current.tagName === 'DIV' && 
                 (current.className.includes('card') || 
                  current.className.includes('section') || 
                  current.className.includes('projects-grid') ||
                  current.className.includes('container')))
            ) {
                return current;
            }
            
            // Move up to parent
            current = current.parentElement;
            level++;
        }
        
        // If we found no suitable container, return the directly containing div or section
        return element.closest('div, section');
    }
});














document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.digital-navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
});























// Typing Test Implementation
function initTypingTest() {
    const typingText = document.getElementById('typing-text');
    const typingInput = document.getElementById('typing-input');
    const timerElement = document.getElementById('typing-time');
    const wpmElement = document.getElementById('typing-wpm');
    const accuracyElement = document.getElementById('typing-accuracy');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const typingResults = document.getElementById('typing-results');
    const resultWpm = document.getElementById('result-wpm');
    const resultAccuracy = document.getElementById('result-accuracy');
    const resultCorrect = document.getElementById('result-correct');
    const resultWrong = document.getElementById('result-wrong');
    const restartBtn = document.getElementById('typing-restart');
    
    let timer;
    let maxTime = 60; // seconds
    let timeLeft = maxTime;
    let charIndex = 0;
    let mistakes = 0;
    let isTyping = false;
    let totalWords = 0;
    let correctWords = 0;
    let wordCount = 0;
    
    // Typing paragraphs for different difficulty levels
    const typingTexts = {
        easy: [
            "The quick brown fox jumps over the lazy dog. This simple sentence contains every letter of the alphabet. Typing practice helps improve speed and accuracy.",
            "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using many programming languages.",
            "Learning to type quickly and accurately is an essential skill in the digital age. Regular practice can significantly improve your typing speed over time."
        ],
        medium: [
            "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.",
            "The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content.",
            "Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is designed to enable the separation of presentation and content."
        ],
        hard: [
            "Asynchronous JavaScript and XML (AJAX) is a set of web development techniques using many web technologies on the client side to create asynchronous web applications. With AJAX, web applications can send and retrieve data from a server asynchronously without interfering with the display and behavior of the existing page.",
            "React uses a declarative paradigm that makes it easier to reason about your application. It designs simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. The declarative view makes your code more predictable and easier to debug.",
            "The virtual DOM (VDOM) is a programming concept where an ideal, or 'virtual', representation of a UI is kept in memory and synced with the 'real' DOM by a library such as ReactDOM. This process is called reconciliation."
        ]
    };
    
    // Load a random paragraph based on difficulty
    function loadParagraph(difficulty) {
        const texts = typingTexts[difficulty];
        const randomIndex = Math.floor(Math.random() * texts.length);
        const text = texts[randomIndex];
        
        typingText.innerHTML = '';
        
        // Split text by characters
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            typingText.appendChild(span);
        });
        
        // Focus input field
        typingInput.focus();
        
        // Reset variables
        charIndex = 0;
        mistakes = 0;
        isTyping = false;
        timeLeft = maxTime;
        wordCount = text.split(' ').length;
        
        // Highlight first character as active
        typingText.querySelector('span').classList.add('active');
        
        // Reset timer display
        timerElement.textContent = timeLeft;
        wpmElement.textContent = 0;
        accuracyElement.textContent = '100%';
        
        // Hide results
        typingResults.style.display = 'none';
    }
    
    // Event listener for difficulty buttons
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Load paragraph with selected difficulty
            const difficulty = btn.getAttribute('data-difficulty');
            loadParagraph(difficulty);
        });
    });
    
    // Initialize typing event
    typingInput.addEventListener('input', () => {
        const characters = typingText.querySelectorAll('span');
        const inputChars = typingInput.value.split('');
        
        // Start timer on first input
        if (!isTyping) {
            isTyping = true;
            timer = setInterval(initTimer, 1000);
        }
        
        // Check if user has finished typing all characters
        if (charIndex >= characters.length) {
            clearInterval(timer);
            typingInput.value = '';
            showResults();
            return;
        }
        
        // Check if current character is a space
        if (characters[charIndex].textContent === ' ' && inputChars[charIndex] === ' ') {
            totalWords++;
            if (mistakes === 0) correctWords++;
            mistakes = 0;
        }
        
        // Handle backspace
        if (inputChars.length < charIndex) {
            charIndex--;
            
            // Remove classes from current character
            if (characters[charIndex].classList.contains('incorrect')) {
                mistakes--;
            }
            characters[charIndex].classList.remove('correct', 'incorrect');
            characters[charIndex].classList.add('active');
            
            // Remove active class from next character
            if (characters[charIndex + 1]) {
                characters[charIndex + 1].classList.remove('active');
            }
        } 
        // Normal typing
        else {
            // Check if current character matches input
            if (characters[charIndex].textContent === inputChars[charIndex]) {
                characters[charIndex].classList.add('correct');
            } else {
                mistakes++;
                characters[charIndex].classList.add('incorrect');
            }
            characters[charIndex].classList.remove('active');
            
            // Move to next character
            charIndex++;
            
            // Add active class to next character if it exists
            if (characters[charIndex]) {
                characters[charIndex].classList.add('active');
            } else {
                // Finished typing, clear interval and show results
                clearInterval(timer);
                showResults();
            }
        }
        
        // Update accuracy
        const accuracy = Math.max(0, 100 - (mistakes / charIndex) * 100);
        accuracyElement.textContent = `${accuracy.toFixed(0)}%`;
    });
    
    // Timer function
    function initTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            // Calculate WPM
            const elapsedTime = maxTime - timeLeft;
            const wpm = Math.round((charIndex / 5) / (elapsedTime / 60));
            wpmElement.textContent = wpm;
        } else {
            // Time's up, clear interval and show results
            clearInterval(timer);
            showResults();
        }
    }
    
    // Show results function
    function showResults() {
        typingInput.blur();
        isTyping = false;
        
        // Calculate final statistics
        const elapsedTime = maxTime - timeLeft;
        const typedWords = Math.round(charIndex / 5);
        const wpm = Math.round((typedWords) / (elapsedTime / 60));
        const accuracy = Math.max(0, 100 - (mistakes / charIndex) * 100);
        
        // Display results
        resultWpm.textContent = isNaN(wpm) ? 0 : wpm;
        resultAccuracy.textContent = `${accuracy.toFixed(0)}%`;
        resultCorrect.textContent = correctWords;
        resultWrong.textContent = totalWords - correctWords;
        
        // Show results container
        typingResults.style.display = 'block';
    }
    
    // Restart button event
    restartBtn.addEventListener('click', () => {
        clearInterval(timer);
        const activeDifficulty = document.querySelector('.difficulty-btn.active').getAttribute('data-difficulty');
        loadParagraph(activeDifficulty);
        typingInput.value = '';
    });
    
    // Load initial paragraph (easy by default)
    loadParagraph('easy');
}// Games Section JavaScript

// Tab Switching Logic
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const gameTabs = document.querySelectorAll('.game-tab');
    const gameContainers = document.querySelectorAll('.game-container');

    gameTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const gameId = tab.getAttribute('data-game');
            
            // Update active tab
            gameTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show selected game
            gameContainers.forEach(container => {
                container.classList.remove('active');
                if (container.id === `${gameId}-game`) {
                    container.classList.add('active');
                }
            });
        });
    });


    
    // Memory Match Game Logic
    initMemoryGame();
    

    // Typing Test Logic
    initTypingTest();
});

// Tic Tac Toe Game Implementation
function initTicTacToe() {
    const statusDisplay = document.querySelector('.game-status');
    const gameBoard = document.querySelector('.tictactoe-board');
    const cells = document.querySelectorAll('.tictactoe-cell');
    const restartButton = document.querySelector('.restart-btn');
    
    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;
    
    // Set initial status
    statusDisplay.innerHTML = currentPlayerTurn();
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
        
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }
    
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }
    
    function handleResultValidation() {
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }
        
        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }
        
        handlePlayerChange();
    }
    
    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
    }
    
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        
        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove("x");
            cell.classList.remove("o");
        });
    }
    
    // Add event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
}

// Memory Match Game Implementation
function initMemoryGame() {
    const memoryBoard = document.querySelector('.memory-board');
    const pairsFoundDisplay = document.getElementById('pairs-found');
    const memoryRestartBtn = document.getElementById('memory-restart');
    
    const emojis = ['🚀', '🎮', '🎨', '🎵', '📱', '💻', '🎯', '🔍'];
    let cards = [...emojis, ...emojis];
    let flippedCards = [];
    let matchedPairs = 0;
    let isProcessing = false;
    
    // Create the memory board
    function createBoard() {
        memoryBoard.innerHTML = '';
        matchedPairs = 0;
        pairsFoundDisplay.textContent = '0';
        
        // Shuffle cards
        shuffleCards(cards);
        
        // Create card elements
        cards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.cardValue = emoji;
            
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.textContent = emoji;
            
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            cardBack.textContent = '?';
            
            card.appendChild(cardFront);
            card.appendChild(cardBack);
            
            card.addEventListener('click', flipCard);
            memoryBoard.appendChild(card);
        });
    }
    
    function shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function flipCard() {
        if (isProcessing) return;
        if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
        
        this.classList.add('flipped');
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            isProcessing = true;
            setTimeout(checkForMatch, 700);
        }
    }
    
    function checkForMatch() {
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];
        
        if (card1.dataset.cardValue === card2.dataset.cardValue) {
            // It's a match
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            pairsFoundDisplay.textContent = matchedPairs;
            
            if (matchedPairs === emojis.length) {
                setTimeout(() => {
                    alert('Congratulations! You found all pairs!');
                }, 500);
            }
        } else {
            // Not a match
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        
        flippedCards = [];
        isProcessing = false;
    }
    
    // Restart game
    memoryRestartBtn.addEventListener('click', createBoard);
    
    // Initialize the board
    createBoard();
}

// Character Animation Implementation
function initCharacter() {
    const character = document.querySelector('.character');
    const jumpBtn = document.getElementById('jump-btn');
    const danceBtn = document.getElementById('dance-btn');
    const waveBtn = document.getElementById('wave-btn');
    
    jumpBtn.addEventListener('click', () => {
        // Remove previous animations
        character.classList.remove('dance', 'wave');
        
        // Add jump animation
        character.classList.add('jump');
        
        // Remove animation class after animation ends
        setTimeout(() => {
            character.classList.remove('jump');
        }, 500);
    });
    
    danceBtn.addEventListener('click', () => {
        // Remove previous animations
        character.classList.remove('jump', 'wave');
        
        // Toggle dance animation
        if (character.classList.contains('dance')) {
            character.classList.remove('dance');
        } else {
            character.classList.add('dance');
        }
    });
    
    waveBtn.addEventListener('click', () => {
        // Remove previous animations
        character.classList.remove('jump', 'dance');
        
        // Add wave animation
        character.classList.add('wave');
        
        // Remove animation class after animation ends
        setTimeout(() => {
            character.classList.remove('wave');
        }, 500);
    });
}





















