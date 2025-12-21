<template>
  <div class="app-container atomwatch-app">
    <div class="main-container">
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
  </div>
</template>

<script>
export default {
  name: 'AtomWatchApp',
  data() {
    return {
      currentTime: '',
      currentDate: '',
      beamRunning: false,
      updateInterval: null
    };
  },
  mounted() {
    this.startClock();
    this.syncLoadBeam();
  },
  beforeUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  },
  methods: {
    startClock() {
      this.updateTime();
      // Update every 100ms for smooth display (better than 1ms, still precise)
      this.updateInterval = setInterval(() => {
        this.updateTime();
      }, 100);
    },
    
    updateTime() {
      const now = new Date();
      
      // Format time (HH:MM:SS)
      this.currentTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      // Format date (e.g., "December 21st 2025")
      this.currentDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    syncLoadBeam() {
      // Start beam animation synchronized with next full second
      const currentTime = new Date();
      const millisecondsUntilNextSecond = 1000 - currentTime.getMilliseconds();
      
      setTimeout(() => {
        this.beamRunning = true;
      }, millisecondsUntilNextSecond);
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

/* Responsive Design */
@media (max-width: 1200px) {
  .time-display {
    font-size: 12vw;
  }
  .date-display {
    font-size: 4vw;
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
}
</style>
