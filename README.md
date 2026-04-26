# 💻 Hacker Terminal - Password Breaker Game

![Hacker Terminal](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

> **Play the game live:** [https://passwordgame-seven.vercel.app/](https://passwordgame-seven.vercel.app/)

A 100-level Mastermind-style terminal hacking game. Figure out the randomly generated password sequence before you get locked out of the system!

## 🎮 Game Modes

### 1. CAMPAIGN MODE
Progress through **100 linear levels** of increasing difficulty.
- **Levels 1-20**: Lowercase letters (`a-z`)
- **Levels 21-40**: Mixed case letters (`a-zA-Z`)
- **Levels 41-70**: Alphanumeric (`a-zA-Z0-9`)
- **Levels 71-100**: Full ASCII combinations (`ALL`)

### 2. ROULETTE (CHAOS) MODE
Test your limits in endless mode where every level generates a completely random length (4 to 10 characters) and a totally random character pool.

## 🕵️‍♂️ How to Play
1. The terminal provides the target **LENGTH** and the **CHARSET** of the password.
2. Type your sequence guess into the terminal.
3. Use the visual feedback indicators to crack the sequence:
   - ✅ **Green:** The character is strictly correct and in the right position.
   - 🟡 **Orange:** The character is in the password, but in the wrong position.
   - ❌ **Red:** The character is not in the password at all.
4. Keep adjusting your guess character-by-character until they are all Green!

## 🚀 Local Setup
Since this project runs entirely on vanilla client-side technologies, no build tools or package managers are required!
1. Clone the repository: `git clone https://github.com/AbdAllah-Amr-Ali/hacker-terminal-password-game.git`
2. Open `index.html` in your favorite web browser.
3. Start hacking!

---
*Built with pure HTML, CSS, and vanilla JS. Styled for elite hackers.*
