// Audio variables
let audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
let bgMusic = document.getElementById('bgMusic');
let buttonSound = document.getElementById('buttonSound');
let coinSound = document.getElementById('coinSound');
let magnetSound = document.getElementById('magnetSound');
let crashSound = document.getElementById('crashSound');
let engineSound = document.getElementById('engineSound');

// Background and road settings for each difficulty
const LEVEL_SETTINGS = {
    easy: {
        background: 'background-easy.gif',
        roadColor: '#2d3436'
    },
    medium: {
        background: 'background-medium.gif',
        roadColor: '#1a1a2e'
    },
    hard: {
        background: 'background-hard.gif',
        roadColor: '#16213e'
    }
};

// Initialize audio settings
function initAudio() {
    // Set volume levels
    bgMusic.volume = 0.4;
    buttonSound.volume = 0.6;
    coinSound.volume = 0.7;
    magnetSound.volume = 0.7;
    crashSound.volume = 0.8;
    engineSound.volume = 0.3;
    
    // Create sound controls UI
    createSoundControls();
    
    // Apply saved audio settings
    toggleAudio(audioEnabled);
}

// Create sound control buttons
function createSoundControls() {
    const soundControls = document.createElement('div');
    soundControls.className = 'sound-controls';
    
    soundControls.innerHTML = `
        <div class="sound-btn music-btn" title="Toggle Music">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOSAxOFY1bDExIDExIi8+PHBhdGggZD0iTTkgNWwxMSAxMSIvPjwvc3ZnPg==" alt="Music">
        </div>
        <div class="sound-btn sfx-btn" title="Toggle Sound Effects">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgM2ExIDEgMCAwIDAtMSAxdjdhMSAxIDAgMCAwIDIgMFY0YTEgMSAwIDAgMC0xLTF6Ii8+PHBhdGggZD0iTTE5IDEwYTIgMiAwIDAgMS0yIDIgMiAyIDAgMCAxLTItMiAyIDIgMCAwIDEgMi0yIDIgMiAwIDAgMSAyIDJ6Ii8+PHBhdGggZD0iTTEyIDE5LjV2LTEuNWEyLjUgMi41IDAgMCAwIDIuNS0yLjUgMi41IDIuNSAwIDAgMC0yLjUtMi41IDIuNSAyLjUgMCAwIDAtMi41IDIuNUw3IDIwYTIgMiAwIDAgMCAyIDIgMiAyIDAgMCAwIDItMnoiLz48L3N2Zz4=" alt="SFX">
        </div>
    `;
    
    document.body.appendChild(soundControls);
    
    // Add event listeners to sound control buttons
    document.querySelector('.music-btn').addEventListener('click', toggleMusic);
    document.querySelector('.sfx-btn').addEventListener('click', toggleSFX);
}

// Toggle all audio
function toggleAudio(enabled) {
    audioEnabled = enabled;
    localStorage.setItem('audioEnabled', audioEnabled);
    
    if (audioEnabled) {
        bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
        document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('muted'));
    } else {
        bgMusic.pause();
        buttonSound.pause();
        coinSound.pause();
        magnetSound.pause();
        crashSound.pause();
        engineSound.pause();
        document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.add('muted'));
    }
}

// Toggle music only
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        document.querySelector('.music-btn').classList.remove('muted');
    } else {
        bgMusic.pause();
        document.querySelector('.music-btn').classList.add('muted');
    }
}

// Toggle sound effects only
function toggleSFX() {
    const sfxBtn = document.querySelector('.sfx-btn');
    const isMuted = sfxBtn.classList.contains('muted');
    
    if (isMuted) {
        sfxBtn.classList.remove('muted');
        // Play a test sound
        if (audioEnabled) {
            buttonSound.currentTime = 0;
            buttonSound.play();
        }
    } else {
        sfxBtn.classList.add('muted');
    }
}

// Play sound effect with check for audio enabled
function playSound(soundElement) {
    if (audioEnabled && !document.querySelector('.sfx-btn').classList.contains('muted')) {
        soundElement.currentTime = 0;
        soundElement.play().catch(e => console.log("Sound play prevented:", e));
    }
}

// Story elements
const storyScreen = document.querySelector('.story-screen');
const storyContinueBtn = document.querySelector('.story-continue');
const backBtn = document.querySelector('.back');

// Menu elements
const mainMenu = document.querySelector('.main-menu');
const playBtn = document.querySelector('.play-btn');
const shopBtn = document.querySelector('.shop-btn');
const totalCoinsElement = document.getElementById('total-coins');

// Game elements
const carGame = document.querySelector('.cargame');
const scoreElement = document.querySelector('.score');
const coinsElement = document.querySelector('.coins');
const highScoreElement = document.querySelector('.high-score');
const magnetTimerElement = document.querySelector('.magnet-timer');
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const exitBtn = document.querySelector('.exit-btn');
const backButton = document.querySelector('.back-btn');

// Shop elements
const shopScreen = document.querySelector('.shop-screen');
const shopCoinsElement = document.getElementById('shop-coins');
const carsContainer = document.querySelector('.cars-container');
const backToMenuBtn = document.querySelector('.back-to-menu');

// Message box elements
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const messageOk = document.getElementById('message-ok');

// Game settings
const UNLOCK_SCORES = {
    medium: 50,    // Score needed to unlock Medium
    hard: 100      // Score needed to unlock Hard
};

// Car prices and data
const CARS_DATA = {
    car1: { name: "Red Sports Car", price: 0, owned: true },
    car2: { name: "Blue Racer", price: 20, owned: false },
    car3: { name: "White Dove", price: 30, owned: false },
    car4: { name: "Yellow Lightning", price: 50, owned: false },
    car5: { name: "Ash Gray", price: 55, owned: false },
    car6: { name: "Cookies & Cream", price: 45, owned: false }
};

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

let player = {
    speed: 5,
    score: 0,
    coins: 0,
    totalCoins: parseInt(localStorage.getItem('totalCoins')) || 0,
    level: 'easy',
    selectedCar: localStorage.getItem('selectedCar') || 'car1',
    ownedCars: JSON.parse(localStorage.getItem('ownedCars')) || ['car1'],
    highScores: {
        easy: localStorage.getItem('highScore_easy') || 0,
        medium: localStorage.getItem('highScore_medium') || 0,
        hard: localStorage.getItem('highScore_hard') || 0
    },
    unlockedLevels: {
        easy: true,
        medium: localStorage.getItem('unlocked_medium') === 'true' || false,
        hard: localStorage.getItem('unlocked_hard') === 'true' || false
    }
};

// Coin and magnet variables
let coins = [];
let magnets = [];
let magnetActive = false;
let magnetTimer = 0;
let magnetInterval = null;

// Initialize the game
function initGame() {
    // Check if user has seen the story before
    const hasSeenStory = localStorage.getItem('hasSeenStory');

    if (hasSeenStory) {
        storyScreen.classList.add('hide');
        mainMenu.classList.remove('hide');
    } else {
        storyScreen.classList.remove('hide');
        mainMenu.classList.add('hide');
    }

    // Initialize audio system
    initAudio();
    
    // Update UI based on unlocked levels
    updateUnlockedLevels();
    updateHighScoreDisplay();
    updateTotalCoinsDisplay();
    
    // Add event listeners
    setupEventListeners();
    
    // Initial render of shop
    renderShop();
}

// Setup event listeners
function setupEventListeners() {
    // Add button click sounds to all buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            playSound(buttonSound);
        });
    });
    
    // Continue button functionality
    storyContinueBtn.addEventListener('click', function() {
        storyScreen.classList.add('hide');
        mainMenu.classList.remove('hide');
        localStorage.setItem('hasSeenStory', 'true');
    });

    // Play button functionality
    playBtn.addEventListener('click', function() {
        mainMenu.classList.add('hide');
        carGame.classList.remove('hide');
    });

    // Shop button functionality
    shopBtn.addEventListener('click', function() {
        mainMenu.classList.add('hide');
        shopScreen.classList.remove('hide');
        updateTotalCoinsDisplay();
        renderShop(); // Re-render shop to update button states
    });

    // Back to menu button functionality
    backToMenuBtn.addEventListener('click', function() {
        shopScreen.classList.add('hide');
        mainMenu.classList.remove('hide');
    });

    // Difficulty selection
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('locked')) return;
            
            difficultyBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            player.level = this.classList.contains('easy') ? 'easy' : 
                          this.classList.contains('medium') ? 'medium' : 'hard';
            updateHighScoreDisplay();
            
            // Show back button when a difficulty is selected
            backButton.classList.remove('hide');
        });
    });

    // Exit button functionality
    exitBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to exit to menu?')) {
            carGame.classList.add('hide');
            mainMenu.classList.remove('hide');
            resetGame();
        }
    });

    // Back button functionality
    backBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to exit the game?')) {
            window.close();
        }
    });

    // Back button in difficulty selection
    backButton.addEventListener('click', function() {
        // Hide the back button
        backButton.classList.add('hide');
        
        // Reset difficulty selection
        difficultyBtns.forEach(b => b.classList.remove('active'));
        document.querySelector('.difficulty-btn.easy').classList.add('active');
        player.level = 'easy';
        updateHighScoreDisplay();
    });

    // Start of the game
    startScreen.addEventListener('click', start);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    
    // Message box OK button
    messageOk.addEventListener('click', function() {
        messageBox.classList.add('hide');
    });
}

// Update total coins display
function updateTotalCoinsDisplay() {
    totalCoinsElement.textContent = player.totalCoins;
    shopCoinsElement.textContent = player.totalCoins;
}

// Update which difficulty levels are unlocked
function updateUnlockedLevels() {
    const mediumBtn = document.querySelector('.difficulty-btn.medium');
    const hardBtn = document.querySelector('.difficulty-btn.hard');

    if (player.unlockedLevels.medium) {
        mediumBtn.classList.remove('locked');
        mediumBtn.disabled = false;
        mediumBtn.innerHTML = 'Medium';
    } else {
        mediumBtn.classList.add('locked');
        mediumBtn.disabled = true;
        mediumBtn.innerHTML = 'Medium <span class="lock-icon">🔒</span><span class="unlock-requirement">(Score 50 in Easy to unlock)</span>';
    }

    if (player.unlockedLevels.hard) {
        hardBtn.classList.remove('locked');
        hardBtn.disabled = false;
        hardBtn.innerHTML = 'Hard';
    } else {
        hardBtn.classList.add('locked');
        hardBtn.disabled = true;
        hardBtn.innerHTML = 'Hard <span class="lock-icon">🔒</span><span class="unlock-requirement">(Score 100 in Medium to unlock)</span>';
    }
}

// Set initial high score display
function updateHighScoreDisplay() {
    highScoreElement.innerText = `High Score (${player.level.toUpperCase()}): ${player.highScores[player.level]}`;
}

function keyDown(e) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        keys[e.key] = true;
    }
}

function keyUp(e) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        keys[e.key] = false;
    }
}

function start() {
    // Set difficulty parameters
    switch(player.level) {
        case 'easy':
            player.speed = 7;
            break;
        case 'medium':
            player.speed = 9;
            break;
        case 'hard':
            player.speed = 10;
            break;
    }
    
    // Set background and road based on difficulty
    carGame.className = 'cargame ' + player.level;
    gameArea.className = 'gameArea ' + player.level;
    
    gameArea.innerHTML = "";
    startScreen.classList.add('hide');
    player.start = true;
    player.score = 0;
    player.coins = 0;
    scoreElement.innerText = `Score: ${player.score}`;
    coinsElement.innerText = `Coins: ${player.coins}`;
    magnetTimerElement.classList.add('hide');
    
    // Reset magnet state
    magnetActive = false;
    magnetTimer = 0;
    if (magnetInterval) clearInterval(magnetInterval);
    
    // Play engine sound when game starts
    if (audioEnabled) {
        engineSound.currentTime = 0;
        engineSound.play();
    }
    
    window.requestAnimationFrame(gamePlay);
    
    // Create road lines
    for (let i = 0; i < 5; i++) {
        let roadline = document.createElement('div');
        roadline.setAttribute('class', 'lines');
        roadline.y = (i * 150);
        roadline.style.top = roadline.y + "px";
        gameArea.appendChild(roadline);
    }
    
    // Create player car
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    car.style.backgroundImage = `url(${player.selectedCar}.png)`;
    
    // Create enemy cars - number depends on difficulty
    let enemyCount = player.level === 'easy' ? 3 : player.level === 'medium' ? 4 : 5;
    for (let i = 0; i < enemyCount; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = (((i + 1) * 350) * -1);
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundImage = randomImage();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
    
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    
    // Start generating coins and magnets
    generateCoin();
    generateMagnet();
}

function randomImage() {
    let randomNum = Math.floor(Math.random() * 4) + 1; // Generates 1-4
    return `url(white${randomNum}.png)`;
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || 
            (aRect.top > bRect.bottom) || 
            (aRect.left > bRect.right) || 
            (aRect.right < bRect.left));
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function moveEnemy(car) {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(item) {
        if (isCollide(car, item)) {
            endGame();
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            item.style.backgroundImage = randomImage();
            // Increase score when an enemy car passes
            player.score++;
            scoreElement.innerText = `Score: ${player.score}`;
            
            // Check if player has unlocked new levels
            checkUnlockConditions();
        }
        // Make enemy cars move faster on higher difficulties
        let enemySpeed = player.speed;
        if (player.level === 'medium') enemySpeed *= 1.2;
        if (player.level === 'hard') enemySpeed *= 1.5;
        
        item.y += enemySpeed;
        item.style.top = item.y + "px";
    });
}

// Generate coins on the road
function generateCoin() {
    if (!player.start) return;
    
    let coin = document.createElement('div');
    coin.setAttribute('class', 'coin');
    coin.y = -50;
    coin.x = Math.floor(Math.random() * 350);
    coin.style.left = coin.x + "px";
    coin.style.top = coin.y + "px";
    gameArea.appendChild(coin);
    coins.push(coin);
    
    // Remove coin after a while if not collected
    setTimeout(() => {
        if (coin.parentNode) {
            gameArea.removeChild(coin);
            coins = coins.filter(c => c !== coin);
        }
    }, 5000);
    
    // Schedule next coin
    if (player.start) {
        setTimeout(generateCoin, Math.random() * 2000 + 1000);
    }
}

// Generate magnets on the road
function generateMagnet() {
    if (!player.start) return;
    
    // Only create magnet with 10% probability
    if (Math.random() > 0.1) {
        // Schedule next magnet attempt
        if (player.start) {
            setTimeout(generateMagnet, 5000);
        }
        return;
    }
    
    let magnet = document.createElement('div');
    magnet.setAttribute('class', 'magnet');
    magnet.y = -50;
    magnet.x = Math.floor(Math.random() * 340);
    magnet.style.left = magnet.x + "px";
    magnet.style.top = magnet.y + "px";
    gameArea.appendChild(magnet);
    magnets.push(magnet);
    
    // Remove magnet after a while if not collected
    setTimeout(() => {
        if (magnet.parentNode) {
            gameArea.removeChild(magnet);
            magnets = magnets.filter(m => m !== magnet);
        }
    }, 5000);
    
    // Schedule next magnet attempt
    if (player.start) {
        setTimeout(generateMagnet, 10000);
    }
}

// Move coins and check for collection
function moveCoins(car) {
    for (let i = 0; i < coins.length; i++) {
        let coin = coins[i];
        
        if (magnetActive) {
            // If magnet is active, coins move toward player
            let carRect = car.getBoundingClientRect();
            let coinRect = coin.getBoundingClientRect();
            
            let dx = (carRect.left + carRect.width/2) - (coinRect.left + coinRect.width/2);
            let dy = (carRect.top + carRect.height/2) - (coinRect.top + coinRect.height/2);
            
            coin.x += dx * 0.1;
            coin.y += dy * 0.1;
            
            coin.style.left = coin.x + "px";
            coin.style.top = coin.y + "px";
            
            // Set CSS variables for attraction animation
            coin.style.setProperty('--attract-x', (dx * 0.05) + 'px');
            coin.style.setProperty('--attract-y', (dy * 0.05) + 'px');
            
            // Add attract class for animation
            coin.classList.add('attract-coin');
        } else {
            // Normal coin movement
            coin.y += player.speed;
            coin.style.top = coin.y + "px";
            coin.classList.remove('attract-coin');
        }
        
        // Check for collision with player
        if (isCollide(car, coin)) {
            // Play coin collection sound
            playSound(coinSound);
            
            // Collect coin - now only increases coin count, not score
            player.coins++;
            coinsElement.innerText = `Coins: ${player.coins}`;
            
            // Remove coin
            if (coin.parentNode) {
                gameArea.removeChild(coin);
                coins.splice(i, 1);
                i--;
            }
        }
        
        // Remove coins that go off screen
        if (coin.y > 750) {
            if (coin.parentNode) {
                gameArea.removeChild(coin);
                coins.splice(i, 1);
                i--;
            }
        }
    }
}

// Move magnets and check for collection
function moveMagnets(car) {
    for (let i = 0; i < magnets.length; i++) {
        let magnet = magnets[i];
        
        // Move magnet
        magnet.y += player.speed;
        magnet.style.top = magnet.y + "px";
        
        // Check for collision with player
        if (isCollide(car, magnet)) {
            // Play magnet collection sound
            playSound(magnetSound);
            
            // Activate magnet
            activateMagnet();
            
            // Remove magnet
            if (magnet.parentNode) {
                gameArea.removeChild(magnet);
                magnets.splice(i, 1);
                i--;
            }
        }
        
        // Remove magnets that go off screen
        if (magnet.y > 750) {
            if (magnet.parentNode) {
                gameArea.removeChild(magnet);
                magnets.splice(i, 1);
                i--;
            }
        }
    }
}

// Activate magnet power-up
function activateMagnet() {
    magnetActive = true;
    magnetTimer = 5;
    magnetTimerElement.classList.remove('hide');
    magnetTimerElement.innerText = `Magnet: ${magnetTimer}s`;
    
    // Clear existing interval if any
    if (magnetInterval) {
        clearInterval(magnetInterval);
    }
    
    // Start magnet timer
    magnetInterval = setInterval(() => {
        magnetTimer--;
        magnetTimerElement.innerText = `Magnet: ${magnetTimer}s`;
        
        if (magnetTimer <= 0) {
            clearInterval(magnetInterval);
            magnetActive = false;
            magnetTimerElement.classList.add('hide');
        }
    }, 1000);
}

function checkUnlockConditions() {
    // Check if player has unlocked Medium
    if (!player.unlockedLevels.medium && player.level === 'easy' && player.score >= UNLOCK_SCORES.medium) {
        player.unlockedLevels.medium = true;
        localStorage.setItem('unlocked_medium', 'true');
        updateUnlockedLevels();
        alert('Congratulations! You\'ve unlocked Medium difficulty!');
    }
    
    // Check if player has unlocked Hard
    if (!player.unlockedLevels.hard && player.level === 'medium' && player.score >= UNLOCK_SCORES.hard) {
        player.unlockedLevels.hard = true;
        localStorage.setItem('unlocked_hard', 'true');
        updateUnlockedLevels();
        alert('Congratulations! You\'ve unlocked Hard difficulty!');
    }
}

function endGame() {
    player.start = false;
    
    // Play crash sound
    playSound(crashSound);
    
    // Stop engine sound
    engineSound.pause();
    
    // Add collected coins to total coins
    player.totalCoins += player.coins;
    localStorage.setItem('totalCoins', player.totalCoins);
    updateTotalCoinsDisplay();
    
    // Clear magnet interval if active
    if (magnetInterval) {
        clearInterval(magnetInterval);
    }
    
    // Remove all coins and magnets
    coins.forEach(coin => {
        if (coin.parentNode) gameArea.removeChild(coin);
    });
    coins = [];
    
    magnets.forEach(magnet => {
        if (magnet.parentNode) gameArea.removeChild(magnet);
    });
    magnets = [];
    
    // Update high score if current score is higher for the current difficulty
    if (player.score > player.highScores[player.level]) {
        player.highScores[player.level] = player.score;
        localStorage.setItem(`highScore_${player.level}`, player.highScores[player.level]);
        updateHighScoreDisplay();
        highScoreElement.style.color = 'gold';
        setTimeout(() => {
            highScoreElement.style.color = 'white';
        }, 2000);
    }
    
    // Create game over screen
    let gameOver = document.createElement('div');
    gameOver.classList.add('game-over');
    gameOver.innerHTML = `
        <h2>Game Over!</h2>
        <p>Your Score: ${player.score}</p>
        <p>Coins Collected: ${player.coins}</p>
        <p>Difficulty: ${player.level.toUpperCase()}</p>
        <div class="game-over-buttons">
            <button onclick="playAgain()">Play Again</button>
            <button class="choose-difficulty" onclick="chooseDifficulty()">Choose Difficulty</button>
            <button onclick="exitToMenu()">Exit to Menu</button>
        </div>
    `;
    gameArea.appendChild(gameOver);
}

function playAgain() {
    // Clear game area
    gameArea.innerHTML = '';
    
    // Reset variables but keep the same difficulty level
    coins = [];
    magnets = [];
    magnetActive = false;
    
    // Remove game over screen if exists
    let gameOver = document.querySelector('.game-over');
    if (gameOver) {
        gameOver.remove();
    }
    
    // Play engine sound again
    if (audioEnabled) {
        engineSound.currentTime = 0;
        engineSound.play();
    }
    
    // Start the game again with the same difficulty
    start();
}

function exitToMenu() {
    // Clear game area
    gameArea.innerHTML = '';
    
    // Reset variables
    coins = [];
    magnets = [];
    magnetActive = false;
    
    // Remove game over screen if exists
    let gameOver = document.querySelector('.game-over');
    if (gameOver) {
        gameOver.remove();
    }
    
    // Stop engine sound
    engineSound.pause();
    
    // Show main menu
    carGame.classList.add('hide');
    mainMenu.classList.remove('hide');
}

function chooseDifficulty() {
    // Clear game area
    gameArea.innerHTML = '';
    
    // Reset variables
    coins = [];
    magnets = [];
    magnetActive = false;
    
    // Remove game over screen if exists
    let gameOver = document.querySelector('.game-over');
    if (gameOver) {
        gameOver.remove();
    }
    
    // Stop engine sound
    engineSound.pause();
    
    // Show start screen with difficulty selection
    startScreen.classList.remove('hide');
    startScreen.innerHTML = `
        <p>Press here to start<br>
           Arrow keys to move<br>
           If you hit another car you will lose.
        </p>
        <div class="difficulty">
            <p>Select Difficulty:</p>
            <button class="difficulty-btn easy ${player.level === 'easy' ? 'active' : ''}">Easy</button>
            <button class="difficulty-btn medium ${player.level === 'medium' ? 'active' : ''} ${player.unlockedLevels.medium ? '' : 'locked'}" ${player.unlockedLevels.medium ? '' : 'disabled'}>
                ${player.unlockedLevels.medium ? 'Medium' : 'Medium <span class="lock-icon">🔒</span><span class="unlock-requirement">(Score 50 in Easy to unlock)</span>'}
            </button>
            <button class="difficulty-btn hard ${player.level === 'hard' ? 'active' : ''} ${player.unlockedLevels.hard ? '' : 'locked'}" ${player.unlockedLevels.hard ? '' : 'disabled'}>
                ${player.unlockedLevels.hard ? 'Hard' : 'Hard <span class="lock-icon">🔒</span><span class="unlock-requirement">(Score 100 in Medium to unlock)</span>'}
            </button>
        </div>
        <button class="back-btn">Back</button>
    `;
    
    // Reattach difficulty buttons event listeners
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('locked')) return;
            
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            player.level = this.classList.contains('easy') ? 'easy' : 
                          this.classList.contains('medium') ? 'medium' : 'hard';
            updateHighScoreDisplay();
            
            // Show back button when a difficulty is selected
            document.querySelector('.back-btn').classList.remove('hide');
        });
    });
    
    // Reattach back button listener
    document.querySelector('.back-btn').addEventListener('click', function() {
        // Hide the back button
        this.classList.add('hide');
        
        // Reset difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.difficulty-btn.easy').classList.add('active');
        player.level = 'easy';
        updateHighScoreDisplay();
    });
}

function resetGame() {
    // Clear game area
    gameArea.innerHTML = '';
    
    // Reset variables
    coins = [];
    magnets = [];
    magnetActive = false;
    
    // Show start screen with difficulty selection
    startScreen.classList.remove('hide');
    startScreen.innerHTML = `
        <p>Press here to start<br>
           Arrow keys to move<br>
           If you hit another car you will lose.
        </p>
        <div class="difficulty">
            <p>Select Difficulty:</p>
            <button class="difficulty-btn easy ${player.level === 'easy' ? 'active' : ''}">Easy</button>
            <button class="difficulty-btn medium ${player.level === 'medium' ? 'active' : ''} ${player.unlockedLevels.medium ? '' : 'locked'}" ${player.unlockedLevels.medium ? '' : 'disabled'}>
                ${player.unlockedLevels.medium ? 'Medium' : 'Medium <span class="lock-icon">🔒</span><span class="unlock-requirement">(Score 50 in Easy to unlock)</span>'}
            </button>
            <button class="difficulty-btn hard ${player.level === 'hard' ? 'active' : ''} ${player.unlockedLevels.hard ? '' : 'locked'}" ${player.unlockedLevels.hard ? '' : 'disabled'}>
                ${player.unlockedLevels.hard ? 'Hard' : 'Hard <span class="lock-icon">🔒</span><span class="unlock-requirement">(Score 100 in Medium to unlock)</span>'}
            </button>
        </div>
        <button class="back-btn hide">Back</button>
    `;
    
    // Reattach difficulty buttons event listeners
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('locked')) return;
            
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            player.level = this.classList.contains('easy') ? 'easy' : 
                          this.classList.contains('medium') ? 'medium' : 'hard';
            updateHighScoreDisplay();
            
            // Show back button when a difficulty is selected
            document.querySelector('.back-btn').classList.remove('hide');
        });
    });
    
    // Reattach back button listener
    document.querySelector('.back-btn').addEventListener('click', function() {
        // Hide the back button
        this.classList.add('hide');
        
        // Reset difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.difficulty-btn.easy').classList.add('active');
        player.level = 'easy';
        updateHighScoreDisplay();
    });
}

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    
    if (player.start) {
        moveLines();
        moveEnemy(car);
        moveCoins(car);
        moveMagnets(car);
        
        if (keys.ArrowUp && player.y > 70) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 85)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed;
        }
        
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        
        window.requestAnimationFrame(gamePlay);
    }
}

// Shop functionality
function renderShop() {
    carsContainer.innerHTML = '';
    
    for (const [carId, carData] of Object.entries(CARS_DATA)) {
        const isOwned = player.ownedCars.includes(carId);
        const isSelected = player.selectedCar === carId;
        
        const carItem = document.createElement('div');
        carItem.className = 'car-item';
        carItem.setAttribute('data-car', carId);
        
        carItem.innerHTML = `
            <div class="car-image" style="background-image: url('${carId}.png')"></div>
            <div class="car-name">${carData.name}</div>
            <div class="car-price">Price: ${isOwned ? 'Owned' : `${carData.price} coins`}</div>
            ${isOwned ? 
                `<button class="select-car-btn" ${isSelected ? 'disabled' : ''}>${isSelected ? 'Selected' : 'Select'}</button>` : 
                `<button class="buy-car-btn" ${player.totalCoins >= carData.price ? '' : 'disabled'}>Buy</button>`
            }
        `;
        
        carsContainer.appendChild(carItem);
        
        // Add event listeners
        if (isOwned) {
            const selectBtn = carItem.querySelector('.select-car-btn');
            if (!isSelected) {
                selectBtn.addEventListener('click', () => selectCar(carId));
            }
        } else {
            const buyBtn = carItem.querySelector('.buy-car-btn');
            if (player.totalCoins >= carData.price) {
                buyBtn.addEventListener('click', () => buyCar(carId, carData.price));
            } else {
                buyBtn.addEventListener('click', () => showInsufficientCoinsMessage(carData.price));
            }
        }
    }
}

function buyCar(carId, price) {
    if (player.totalCoins >= price) {
        player.totalCoins -= price;
        player.ownedCars.push(carId);
        
        // Save to localStorage
        localStorage.setItem('totalCoins', player.totalCoins);
        localStorage.setItem('ownedCars', JSON.stringify(player.ownedCars));
        
        // Update UI
        updateTotalCoinsDisplay();
        renderShop();
        
        alert(`Congratulations! You've purchased the ${CARS_DATA[carId].name}!`);
    } else {
        showInsufficientCoinsMessage(price);
    }
}

function selectCar(carId) {
    player.selectedCar = carId;
    localStorage.setItem('selectedCar', carId);
    renderShop();
    alert(`You've selected the ${CARS_DATA[carId].name}!`);
}

function showInsufficientCoinsMessage(price) {
    messageText.textContent = `You don't have enough coins to buy this car. You need ${price} coins but you only have ${player.totalCoins}.`;
    messageBox.classList.remove('hide');
}

// Initialize the game when the page loads
initGame();