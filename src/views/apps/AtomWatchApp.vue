<template>
  <div class="app-container atomwatch-app">
    <!-- Mode Toggle -->
    <div class="mode-toggle">
      <button 
        @click="mode = 'clock'" 
        :class="{ active: mode === 'clock' }"
        class="mode-btn"
      >
        ⏱️ Clock
      </button>
      <button 
        @click="mode = 'countdown'" 
        :class="{ active: mode === 'countdown' }"
        class="mode-btn"
      >
        ⏳ Countdown
      </button>
    </div>

    <!-- Clock Mode -->
    <div v-if="mode === 'clock'" class="main-container">
      <div class="top-row">
        <div class="top-div">
          <div class="time-display">{{ currentTime }}</div>
        </div>
      </div>
      <div class="load-beam" :style="{ animationPlayState: beamRunning ? 'running' : 'paused' }"></div>
      <div class="bottom-div">
        <div class="date-display">{{ currentDate }}</div>
      </div>
    </div>

    <!-- Countdown Mode -->
    <div v-else class="countdown-container">
      <h2 class="countdown-title">Countdown Timer</h2>
      
      <!-- Countdown Setup (when not running) -->
      <div v-if="!countdownRunning" class="countdown-setup">
        <div class="preset-buttons">
          <button @click="setPreset('nye')" class="preset-btn">🎆 New Year's Eve</button>
          <button @click="setPreset('custom')" class="preset-btn">⚙️ Custom</button>
        </div>

        <div v-if="showCustom" class="custom-input">
          <label>Event Name:</label>
          <input v-model="eventName" type="text" placeholder="e.g., Soccer Match" class="event-input" />
          
          <label>Target Date & Time:</label>
          <input v-model="targetDateTime" type="datetime-local" class="datetime-input" />
        </div>

        <button 
          @click="startCountdown" 
          :disabled="!canStartCountdown"
          class="start-countdown-btn"
        >
          Start Countdown
        </button>
      </div>

      <!-- Countdown Display (when running) -->
      <div v-else class="countdown-display">
        <div class="event-name">{{ eventName }}</div>
        
        <div v-if="countdownFinished" class="finished-message">
          <div class="celebration">🎉</div>
          <div class="finished-text">Time's Up!</div>
        </div>
        
        <div v-else class="countdown-grid">
          <div class="countdown-unit">
            <div class="countdown-value">{{ days }}</div>
            <div class="countdown-label">Days</div>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-unit">
            <div class="countdown-value">{{ hours }}</div>
            <div class="countdown-label">Hours</div>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-unit">
            <div class="countdown-value">{{ minutes }}</div>
            <div class="countdown-label">Minutes</div>
          </div>
          <div class="countdown-separator">:</div>
          <div class="countdown-unit">
            <div class="countdown-value">{{ seconds }}</div>
            <div class="countdown-label">Seconds</div>
          </div>
        </div>

        <button @click="stopCountdown" class="stop-countdown-btn">Stop Countdown</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AtomWatchApp',
  data() {
    return {
      mode: 'clock', // 'clock' or 'countdown'
      currentTime: '',
      currentDate: '',
      beamRunning: false,
      updateInterval: null,
      
      // Countdown
      countdownRunning: false,
      countdownInterval: null,
      eventName: '',
      targetDateTime: '',
      showCustom: false,
      countdownFinished: false,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    };
  },
  computed: {
    canStartCountdown() {
      return this.eventName && this.targetDateTime;
    }
  },
  mounted() {
    this.startClock();
    this.syncLoadBeam();
  },
  beforeUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  },
  methods: {
    startClock() {
      this.updateTime();
      this.updateInterval = setInterval(() => {
        this.updateTime();
      }, 100);
    },
    
    updateTime() {
      const now = new Date();
      
      this.currentTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      this.currentDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    syncLoadBeam() {
      const currentTime = new Date();
      const millisecondsUntilNextSecond = 1000 - currentTime.getMilliseconds();
      
      setTimeout(() => {
        this.beamRunning = true;
      }, millisecondsUntilNextSecond);
    },

    setPreset(type) {
      if (type === 'nye') {
        const now = new Date();
        const nextYear = now.getFullYear() + 1;
        this.eventName = `New Year's ${nextYear}`;
        const nyeDate = new Date(nextYear, 0, 1, 0, 0, 0);
        this.targetDateTime = this.formatDateTimeLocal(nyeDate);
        this.showCustom = true;
      } else {
        this.eventName = '';
        this.targetDateTime = '';
        this.showCustom = true;
      }
    },

    formatDateTimeLocal(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },

    startCountdown() {
      this.countdownRunning = true;
      this.countdownFinished = false;
      this.updateCountdown();
      this.countdownInterval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    },

    updateCountdown() {
      const now = new Date().getTime();
      const target = new Date(this.targetDateTime).getTime();
      const difference = target - now;

      if (difference <= 0) {
        this.countdownFinished = true;
        this.days = '00';
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
        }
        return;
      }

      this.days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
      this.hours = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      this.minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      this.seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');
    },

    stopCountdown() {
      this.countdownRunning = false;
      this.countdownFinished = false;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      this.eventName = '';
      this.targetDateTime = '';
      this.showCustom = false;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

.app-container {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  padding: 2rem;
}

.main-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.top-row {
  width: 100%;
  display: flex;
  justify-content: center;
}

.top-div {
  position: relative;
}

.time-display {
  font-family: 'Orbitron', monospace;
  font-size: 14em;
  font-weight: 900;
  color: #00ff88;
  text-shadow: 
    0 0 10px #00ff88,
    0 0 20px #00ff88,
    0 0 30px #00ff88,
    0 0 40px #00ff88;
  letter-spacing: 0.1em;
  text-align: center;
}

.load-beam {
  width: 0%;
  height: 8px;
  background: linear-gradient(90deg, #00ff88, #00ffff);
  box-shadow: 
    0 0 10px #00ff88,
    0 0 20px #00ff88;
  animation: loadBeam 1s linear infinite;
  border-radius: 4px;
}

@keyframes loadBeam {
  0% { width: 0%; }
  100% { width: 100%; }
}

.bottom-div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.date-display {
  font-family: 'Orbitron', monospace;
  font-size: 5em;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 
    0 0 5px rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
  text-align: center;
}

/* Mode Toggle */
.mode-toggle {
  position: absolute;
  top: 100px;
  left: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 10;
}

.mode-btn {
  padding: 0.75rem 1.5rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(0, 255, 136, 0.3);
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-btn:hover {
  background: rgba(0, 255, 136, 0.2);
  border-color: #00ff88;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
}

.mode-btn.active {
  background: #00ff88;
  color: #0f0c29;
  border-color: #00ff88;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

/* Countdown Container */
.countdown-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.countdown-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #00ff88;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  margin: 0;
}

/* Countdown Setup */
.countdown-setup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
}

.preset-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.preset-btn {
  padding: 1rem 2rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(0, 255, 136, 0.3);
  color: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.preset-btn:hover {
  background: rgba(0, 255, 136, 0.2);
  border-color: #00ff88;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
}

.custom-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.custom-input label {
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
}

.event-input,
.datetime-input {
  padding: 1rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(0, 255, 136, 0.3);
  color: #ffffff;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.event-input:focus,
.datetime-input:focus {
  outline: none;
  border-color: #00ff88;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.start-countdown-btn {
  padding: 1rem 3rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  background: #00ff88;
  color: #0f0c29;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-countdown-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 255, 136, 0.5);
}

.start-countdown-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Countdown Display */
.countdown-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

.event-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.countdown-grid {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.countdown-value {
  font-family: 'Orbitron', monospace;
  font-size: 8rem;
  font-weight: 900;
  color: #00ff88;
  text-shadow: 
    0 0 10px #00ff88,
    0 0 20px #00ff88,
    0 0 30px #00ff88;
  min-width: 150px;
  text-align: center;
}

.countdown-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.countdown-separator {
  font-family: 'Orbitron', monospace;
  font-size: 6rem;
  font-weight: 900;
  color: #00ff88;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.finished-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.celebration {
  font-size: 10rem;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.finished-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 4rem;
  font-weight: 900;
  color: #00ff88;
  text-shadow: 
    0 0 10px #00ff88,
    0 0 20px #00ff88,
    0 0 30px #00ff88;
}

.stop-countdown-btn {
  padding: 1rem 3rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stop-countdown-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .time-display {
    font-size: 12vw;
  }
  .date-display {
    font-size: 4vw;
  }
  .countdown-value {
    font-size: 6rem;
    min-width: 120px;
  }
  .countdown-separator {
    font-size: 4rem;
  }
}

@media (max-width: 768px) {
  .time-display {
    font-size: 16vw;
  }
  .date-display {
    font-size: 6vw;
  }
  .load-beam {
    height: 6px;
  }
  .mode-toggle {
    position: static;
    margin-bottom: 2rem;
  }
  .countdown-value {
    font-size: 4rem;
    min-width: 80px;
  }
  .countdown-separator {
    font-size: 3rem;
  }
  .countdown-grid {
    gap: 1rem;
  }
  .event-name {
    font-size: 2rem;
  }
  .countdown-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 1rem;
  }
  .time-display {
    font-size: 18vw;
    letter-spacing: 0.05em;
  }
  .date-display {
    font-size: 8vw;
  }
  .load-beam {
    height: 4px;
  }
  .countdown-value {
    font-size: 3rem;
    min-width: 60px;
  }
  .countdown-separator {
    font-size: 2rem;
    gap: 0.5rem;
  }
  .countdown-label {
    font-size: 0.9rem;
  }
  .celebration {
    font-size: 6rem;
  }
  .finished-text {
    font-size: 2.5rem;
  }
}
</style>
