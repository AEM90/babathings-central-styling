<template>
  <div class="app-container moneyburn-app">
    <div class="container">
      <h1>💰 MoneyBurn Calculator</h1>
      <p class="subtitle">Track how much your meeting costs in real-time</p>

      <!-- Setup Section -->
      <div v-if="!isRunning" class="setup-section">
        <div class="participants-table">
          <h3>Add Participants</h3>
          <div v-for="role in roles" :key="role.id" class="participant-row">
            <span class="role-name">{{ role.name }}</span>
            <span class="role-rate">€{{ role.hourlyRate }}/hour</span>
            <div class="counter-controls">
              <button @click="decrement(role.id)" class="btn-counter">−</button>
              <input 
                v-model.number="role.count" 
                type="number" 
                min="0"
                class="count-input"
                @input="validateCount(role)"
              />
              <button @click="increment(role.id)" class="btn-counter">+</button>
            </div>
          </div>

          <div class="start-time-row">
            <label for="startTime">Meeting started at:</label>
            <input 
              v-model="startTime" 
              type="time" 
              id="startTime"
              class="time-input"
            />
            <small>(Optional: calculate retroactive costs)</small>
          </div>
        </div>

        <button @click="startMeeting" class="btn-start" :disabled="totalParticipants === 0">
          {{ totalParticipants === 0 ? 'Add participants to start' : `Start Meeting (€${costPerHour}/hour)` }}
        </button>
      </div>

      <!-- Running Meeting Display -->
      <div v-else class="meeting-display">
        <div class="cost-display">
          <div class="cost-amount">{{ formattedCost }}</div>
          <div class="cost-label">Total Cost</div>
        </div>

        <div class="meeting-info">
          <div class="info-item">
            <span class="info-label">Participants:</span>
            <span class="info-value">{{ totalParticipants }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Duration:</span>
            <span class="info-value">{{ formattedDuration }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Cost/Hour:</span>
            <span class="info-value">€{{ costPerHour }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="stopMeeting" class="btn-stop">Stop Meeting</button>
          <button @click="exportSession" class="btn-export">Export Report</button>
        </div>
      </div>

      <!-- Celebration GIF -->
      <transition name="fade">
        <div v-if="showGif" class="gif-container">
          <img :src="currentGif" alt="Milestone celebration" class="celebration-gif" />
          <div class="milestone-text">€{{ lastMilestone }} milestone! 🎉</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoneyBurnApp',
  data() {
    return {
      roles: [
        { id: 'senior', name: 'Senior Consultant', hourlyRate: 155, count: 0 },
        { id: 'mid', name: 'Mid-Level Consultant', hourlyRate: 130, count: 0 },
        { id: 'junior', name: 'Junior Consultant', hourlyRate: 125, count: 0 },
        { id: 'manager', name: 'Manager', hourlyRate: 180, count: 0 }
      ],
      startTime: '',
      isRunning: false,
      currentCost: 0,
      seconds: 0,
      timerInterval: null,
      showGif: false,
      lastMilestone: 0,
      currentGif: '',
      meetingStartTime: null,
      gifs: [
        'https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif',
        'https://media.giphy.com/media/l0HlNQo6nKWMF7HhK/giphy.gif',
        'https://media.giphy.com/media/3o7TKxckvS2EiRNpNK/giphy.gif',
        'https://media.giphy.com/media/LdOyjZ7io5Msw/giphy.gif',
        'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'
      ]
    };
  },
  computed: {
    totalParticipants() {
      return this.roles.reduce((sum, role) => sum + role.count, 0);
    },
    costPerHour() {
      return this.roles.reduce((sum, role) => sum + (role.count * role.hourlyRate), 0);
    },
    costPerSecond() {
      return this.costPerHour / 3600;
    },
    formattedCost() {
      return `€${Math.floor(this.currentCost).toLocaleString()}`;
    },
    formattedDuration() {
      const hours = Math.floor(this.seconds / 3600);
      const minutes = Math.floor((this.seconds % 3600) / 60);
      const secs = this.seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
  methods: {
    increment(roleId) {
      const role = this.roles.find(r => r.id === roleId);
      if (role) role.count++;
    },
    decrement(roleId) {
      const role = this.roles.find(r => r.id === roleId);
      if (role && role.count > 0) role.count--;
    },
    validateCount(role) {
      // Ensure count is a valid number and not negative
      if (role.count === null || role.count === undefined || isNaN(role.count)) {
        role.count = 0;
      } else if (role.count < 0) {
        role.count = 0;
      } else {
        // Round to integer
        role.count = Math.floor(role.count);
      }
    },
    startMeeting() {
      this.meetingStartTime = new Date();
      this.isRunning = true;
      this.seconds = 0;
      this.currentCost = this.calculateInitialCost();
      this.lastMilestone = Math.floor(this.currentCost / 1000) * 1000;
      
      this.timerInterval = setInterval(() => {
        this.seconds++;
        this.currentCost += this.costPerSecond;
        this.checkMilestone();
      }, 1000);
    },
    calculateInitialCost() {
      if (!this.startTime) return 0;
      
      const [hours, minutes] = this.startTime.split(':').map(Number);
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);
      
      const now = new Date();
      const diffSeconds = Math.abs((now - startDate) / 1000);
      this.seconds = Math.floor(diffSeconds);
      
      return diffSeconds * this.costPerSecond;
    },
    checkMilestone() {
      const currentMilestone = Math.floor(this.currentCost / 1000) * 1000;
      if (currentMilestone > this.lastMilestone && currentMilestone > 0) {
        this.lastMilestone = currentMilestone;
        this.showCelebration();
      }
    },
    showCelebration() {
      this.currentGif = this.gifs[Math.floor(Math.random() * this.gifs.length)];
      this.showGif = true;
      setTimeout(() => {
        this.showGif = false;
      }, 5000);
    },
    stopMeeting() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.isRunning = false;
    },
    exportSession() {
      const report = `
MoneyBurn Meeting Report
========================
Date: ${new Date().toLocaleDateString()}
Start Time: ${this.meetingStartTime.toLocaleTimeString()}
Duration: ${this.formattedDuration}
Participants: ${this.totalParticipants}

Breakdown:
${this.roles.filter(r => r.count > 0).map(r => 
  `- ${r.count}x ${r.name} (€${r.hourlyRate}/h) = €${(r.count * r.hourlyRate * this.seconds / 3600).toFixed(2)}`
).join('\n')}

Total Cost: €${Math.floor(this.currentCost)}
Cost per Hour: €${this.costPerHour}
      `.trim();

      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `meeting-report-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
};
</script>

<style scoped>
.app-container {
  min-height: calc(100vh - 80px);
  padding: 2rem;
  background: linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.setup-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.participants-table {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.participants-table h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.participant-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.role-name {
  font-weight: 600;
  color: #333;
}

.role-rate {
  color: #666;
  font-size: 0.9rem;
}

.counter-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-counter {
  width: 36px;
  height: 36px;
  border: none;
  background: linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%);
  color: white;
  border-radius: 8px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-counter:hover {
  transform: scale(1.1);
}

.count-input {
  width: 60px;
  text-align: center;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
}

.start-time-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #e8f4f8;
  border-radius: 8px;
}

.start-time-row label {
  font-weight: 600;
  color: #333;
}

.time-input {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.start-time-row small {
  color: #666;
  font-size: 0.85rem;
}

.btn-start {
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-start:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 106, 0, 0.4);
}

.btn-start:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.meeting-display {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.cost-display {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%);
  border-radius: 20px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(255, 106, 0, 0.3);
}

.cost-amount {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  font-family: 'Courier New', monospace;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.cost-label {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.5rem;
}

.meeting-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
}

.info-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.info-label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.info-value {
  display: block;
  color: #333;
  font-size: 1.5rem;
  font-weight: 700;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.btn-stop,
.btn-export {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-stop {
  background: #dc3545;
  color: white;
}

.btn-export {
  background: #28a745;
  color: white;
}

.btn-stop:hover,
.btn-export:hover {
  transform: translateY(-2px);
}

.gif-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  text-align: center;
}

.celebration-gif {
  max-width: 500px;
  width: 90vw;
  border-radius: 15px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
}

.milestone-text {
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .participant-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .cost-amount {
    font-size: 3rem;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
