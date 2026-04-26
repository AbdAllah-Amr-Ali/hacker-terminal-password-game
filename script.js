document.addEventListener('DOMContentLoaded', () => {
    // Theme logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const favicon = document.getElementById('favicon');
    const siteLogo = document.getElementById('site-logo');

    // We already checked and set the class in the head, but we can bind the toggle here
    themeToggleBtn.addEventListener('click', () => {
        const root = document.documentElement;
        if (root.classList.contains('light-theme')) {
            // Switch to Dark Theme
            root.classList.remove('light-theme');
            localStorage.setItem('hacker-theme', 'dark');
            favicon.setAttribute('href', 'themes/dark/icon.png');
            siteLogo.setAttribute('src', 'themes/dark/icon.png');
        } else {
            // Switch to Light Theme
            root.classList.add('light-theme');
            localStorage.setItem('hacker-theme', 'light');
            favicon.setAttribute('href', 'themes/light/icon.png');
            siteLogo.setAttribute('src', 'themes/light/icon.png');
        }
    });

    // Screens
    const startScreen = document.getElementById('start-screen');
    const gameInterface = document.getElementById('game-interface');
    const gameCompleteScreen = document.getElementById('game-complete');

    // UI Elements
    const terminalBootText = document.getElementById('terminal-boot-text');
    const passwordInput = document.getElementById('password');
    const feedbackContainer = document.getElementById('feedback-circles');
    const nextBtn = document.getElementById('next-level-btn');
    const successMessage = document.getElementById('success-message');
    const elCurrentLevel = document.getElementById('current-level');
    const elMaxLevel = document.getElementById('max-level-indicator');
    const elTargetLength = document.getElementById('target-length');
    const elCharsetInfo = document.getElementById('charset-info');

    // Buttons
    const btnCampaign = document.getElementById('mode-campaign');
    const btnRoulette = document.getElementById('mode-roulette');
    const btnRestart = document.getElementById('restart-btn');

    // Game Configuration
    const CAMPAIGN_MAX_LEVEL = 100;

    // State
    let currentMode = 'campaign'; // 'campaign' | 'roulette'
    let currentLevel = 1;
    let targetPassword = "";
    let circles = [];

    // Mode Selection Logic
    btnCampaign.addEventListener('click', () => {
        currentMode = 'campaign';
        initGame();
    });

    btnRoulette.addEventListener('click', () => {
        currentMode = 'roulette';
        initGame();
    });

    btnRestart.addEventListener('click', () => {
        showStartScreen();
    });

    function showStartScreen() {
        startScreen.classList.remove('hidden');
        gameInterface.classList.add('hidden');
        gameCompleteScreen.classList.add('hidden');
    }

    // Initialize Game
    function initGame() {
        startScreen.classList.add('hidden');
        gameCompleteScreen.classList.add('hidden');
        gameInterface.classList.remove('hidden');

        currentLevel = 1;
        passwordInput.disabled = false;

        if (currentMode === 'campaign') {
            elMaxLevel.textContent = '/100';
            terminalBootText.innerHTML = '<p>SYSTEM.OVERRIDE_ENABLED::CAMPAIGN</p><p>> Awaiting linear decryption sequence...</p>';
        } else {
            elMaxLevel.textContent = '/∞'; // Roulette goes forever
            terminalBootText.innerHTML = '<p>SYSTEM.OVERRIDE_ENABLED::ROULETTE</p><p>> Awaiting randomized chaos sequence...</p>';
        }

        startLevel(currentLevel);
    }

    // Core Logic
    function generatePasswordForLevel(level, mode) {
        let length = 0;
        let pool = '';
        let charsetName = '';

        if (mode === 'campaign') {
            if (level <= 20) {
                length = Math.floor(level / 5) + 3; // L1: 3 -> L20: 7
                pool = 'abcdefghijklmnopqrstuvwxyz';
                charsetName = 'a-z';
            } else if (level <= 40) {
                length = Math.floor((level - 20) / 5) + 4; // L21: 4 -> L40: 8
                pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                charsetName = 'a-zA-Z';
            } else if (level <= 70) {
                length = Math.floor((level - 40) / 6) + 4; // L41: 4 -> L70: 9
                pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                charsetName = 'a-zA-Z0-9';
            } else {
                length = Math.floor((level - 70) / 6) + 5; // L71: 5 -> L100: 10
                pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
                charsetName = 'ALL';
            }
        }
        else if (mode === 'roulette') {
            length = Math.floor(Math.random() * 7) + 4;

            const types = [
                { pool: 'abcdefghijklmnopqrstuvwxyz', name: 'a-z' },
                { pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', name: 'a-zA-Z' },
                { pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', name: 'a-zA-Z0-9' },
                { pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=', name: 'ALL' }
            ];

            let typeIndex;
            if (level < 5) {
                typeIndex = Math.floor(Math.random() * 2);
            } else if (level < 15) {
                typeIndex = Math.floor(Math.random() * 3);
            } else {
                typeIndex = Math.floor(Math.random() * 4);
            }

            const selectedType = types[typeIndex];
            pool = selectedType.pool;
            charsetName = selectedType.name;
        }

        let result = '';
        for (let i = 0; i < length; i++) {
            result += pool.charAt(Math.floor(Math.random() * pool.length));
        }

        return { password: result, length: length, charsetName: charsetName };
    }

    function startLevel(level) {
        if (currentMode === 'campaign' && level > CAMPAIGN_MAX_LEVEL) {
            gameInterface.classList.add('hidden');
            gameCompleteScreen.classList.remove('hidden');
            return;
        }

        const config = generatePasswordForLevel(level, currentMode);
        console.log(`[SYS ADMIN] Lvl ${level} Target: ${config.password}`);

        targetPassword = config.password;

        elCurrentLevel.textContent = level;
        elTargetLength.textContent = config.length;
        elCharsetInfo.textContent = config.charsetName;

        passwordInput.value = '';
        passwordInput.maxLength = config.length;
        passwordInput.focus();
        successMessage.classList.add('hidden');
        nextBtn.classList.add('hidden');

        feedbackContainer.innerHTML = '';
        circles = [];
        for (let i = 0; i < config.length; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            feedbackContainer.appendChild(circle);
            circles.push(circle);
        }
    }

    passwordInput.addEventListener('input', () => {
        const guess = passwordInput.value;
        const targetLen = targetPassword.length;

        successMessage.classList.add('hidden');
        nextBtn.classList.add('hidden');

        if (guess.length === 0) {
            circles.forEach(c => c.className = 'circle');
            return;
        }

        const states = Array(targetLen).fill('default');
        const targetChars = targetPassword.split('');
        const guessChars = guess.split('');

        for (let i = 0; i < guessChars.length && i < targetLen; i++) {
            if (guessChars[i] === targetChars[i]) {
                states[i] = 'green';
                targetChars[i] = null;
                guessChars[i] = null;
            }
        }

        for (let i = 0; i < guessChars.length && i < targetLen; i++) {
            if (guessChars[i] !== null) {
                const char = guessChars[i];
                const foundIndex = targetChars.indexOf(char);

                if (foundIndex !== -1) {
                    states[i] = 'orange';
                    targetChars[foundIndex] = null;
                } else {
                    states[i] = 'red';
                }
            }
        }

        for (let i = 0; i < targetLen; i++) {
            circles[i].className = 'circle';
            if (i < guess.length) {
                circles[i].classList.add(states[i]);
            }
        }

        const allGreen = states.every(s => s === 'green');
        if (allGreen && guess.length === targetLen) {
            successMessage.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        }
    });

    nextBtn.addEventListener('click', () => {
        currentLevel++;
        startLevel(currentLevel);
    });

    showStartScreen();
});
