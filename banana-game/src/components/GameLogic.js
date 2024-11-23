// GameLogic.js
class GameLogic {
    constructor() {
      this.lives = 3; // Initial lives
      this.timer = 0; // Timer for the cooldown
    }
  
    // Decreases lives and starts a cooldown if lives run out
    decreaseLives() {
      if (this.lives > 0) {
        this.lives--;
      }
      if (this.lives === 0) {
        this.startCooldown();
      }
    }
  
    // Starts a cooldown timer when lives run out
    startCooldown() {
      this.timer = 30; // 10 seconds cooldown
      const interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(interval); // Stop the timer when it reaches 0
        }
      }, 1000);
    }
  
    // Returns the current lives and timer
    getLives() {
      return this.lives;
    }
  
    getCooldownTimer() {
      return this.timer;
    }
  }
  
  export default GameLogic;
  