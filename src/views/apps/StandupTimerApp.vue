<template>
  <div class="app-container standup-timer-app">
    <div class="standup-container">
      <h1 class="app-title">⏰ Standup Timer</h1>
      <p class="app-subtitle">Keep your daily standups on track and efficient</p>

      <!-- Quick Stats -->
      <div class="stats-row">
        <div class="stat-card glass-card">
          <div class="stat-icon">👥</div>
          <div class="stat-value">{{ participants.length }}</div>
          <div class="stat-label">Participants</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-value">{{ timePerPerson }}s</div>
          <div class="stat-label">Time/Person</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon">📊</div>
          <div class="stat-value">{{ sessions.length }}</div>
          <div class="stat-label">Past Sessions</div>
        </div>
      </div>

      <!-- Setup Section (when not running) -->
      <div v-if="!isRunning" class="setup-section glass-card">
        <h2>Setup Standup</h2>

        <!-- Participants List -->
        <div class="participants-section">
          <div class="section-header">
            <h3>Participants</h3>
            <button @click="showAddParticipant = true" class="btn-add-small">+ Add</button>
          </div>
          
          <div v-if="participants.length === 0" class="empty-message">
            <p>No participants yet. Add team members to get started!</p>
          </div>

          <div v-else class="participant-list">
            <div v-for="(participant, index) in participants" :key="index" class="participant-item">
              <span class="participant-name">{{ participant }}</span>
              <button @click="removeParticipant(index)" class="btn-remove">×</button>
            </div>
          </div>
        </div>

        <!-- Timer Settings -->
        <div class="settings-section">
          <h3>Timer Settings</h3>
          <div class="setting-row">
            <label>Time per person (seconds):</label>
            <input 
              v-model.number="timePerPerson" 
              type="number" 
              min="30" 
              max="300"
              class="setting-input"
            />
          </div>
          <div class="setting-row">
            <label>Warning at (seconds):</label>
            <input 
              v-model.number="warningTime" 
              type="number" 
              min="5" 
              :max="timePerPerson - 5"
              class="setting-input"
            />
          </div>
          <div class="setting-row checkbox-row">
            <label>
              <input v-model="soundEnabled" type="checkbox" />
              Enable sound alerts
            </label>
          </div>
        </div>

        <button 
          @click="startStandup" 
          :disabled="participants.length === 0"
          class="btn-start"
        >
          {{ participants.length === 0 ? 'Add participants to start' : 'Start Standup' }}
        </button>
      </div>

      <!-- Running Standup Display -->
      <div v-else class="standup-display glass-card">
        <!-- Current Speaker -->
        <div class="current-speaker">
          <div class="speaker-label">Now Speaking:</div>
          <div class="speaker-name">{{ currentParticipant }}</div>
        </div>

        <!-- Timer Display -->
        <div 
          class="timer-display" 
          :class="{ 
            warning: timeRemaining <= warningTime && timeRemaining > 0,
            overtime: timeRemaining <= 0
          }"
        >
          <div class="timer-value">{{ formattedTime }}</div>
          <div class="timer-label">{{ timeRemaining <= 0 ? 'OVERTIME' : 'Time Remaining' }}</div>
        </div>

        <!-- Progress Indicator -->
        <div class="progress-section">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
          <div class="progress-text">
            {{ currentIndex + 1 }} of {{ participants.length }} participants
          </div>
        </div>

        <!-- Participant Queue -->
        <div class="queue-section">
          <h3>Up Next:</h3>
          <div class="queue-list">
            <div 
              v-for="(participant, index) in upcomingParticipants" 
              :key="index"
              class="queue-item"
            >
              <span class="queue-number">{{ currentIndex + index + 2 }}</span>
              <span class="queue-name">{{ participant }}</span>
            </div>
            <div v-if="upcomingParticipants.length === 0" class="queue-empty">
              No more participants
            </div>
          </div>
        </div>

        <!-- Control Buttons -->
        <div class="control-buttons">
          <button @click="pauseTimer" v-if="!isPaused" class="btn-control btn-pause">
            ⏸️ Pause
          </button>
          <button @click="resumeTimer" v-else class="btn-control btn-resume">
            ▶️ Resume
          </button>
          <button @click="nextParticipant" class="btn-control btn-next">
            ⏭️ Next Person
          </button>
          <button @click="endStandup" class="btn-control btn-stop">
            ⏹️ End Standup
          </button>
        </div>
      </div>

      <!-- Summary Modal -->
      <div v-if="showSummary" class="modal-overlay" @click.self="closeSummary">
        <div class="modal-content glass-card">
          <div class="modal-header">
            <h2>Standup Complete! 🎉</h2>
            <button @click="closeSummary" class="close-btn">×</button>
          </div>

          <div class="summary-content">
            <div class="summary-stat">
              <strong>Total Duration:</strong>
              <span>{{ formatDuration(currentSession.totalTime) }}</span>
            </div>
            <div class="summary-stat">
              <strong>Participants:</strong>
              <span>{{ currentSession.participants.length }}</span>
            </div>
            <div class="summary-stat">
              <strong>Average Time/Person:</strong>
              <span>{{ Math.round(currentSession.totalTime / currentSession.participants.length) }}s</span>
            </div>
            <div class="summary-stat">
              <strong>Date:</strong>
              <span>{{ formatDate(currentSession.date) }}</span>
            </div>

            <div class="participant-times">
              <h3>Individual Times:</h3>
              <div v-for="(time, index) in currentSession.individualTimes" :key="index" class="time-item">
                <span>{{ currentSession.participants[index] }}:</span>
                <span :class="{ overtime: time > timePerPerson }">{{ time }}s</span>
              </div>
            </div>
          </div>

          <button @click="closeSummary" class="btn-close-summary">Close</button>
        </div>
      </div>

      <!-- Add Participant Modal -->
      <div v-if="showAddParticipant" class="modal-overlay" @click.self="showAddParticipant = false">
        <div class="modal-content glass-card add-participant-modal">
          <div class="modal-header">
            <h2>Add Participant</h2>
            <button @click="showAddParticipant = false" class="close-btn">×</button>
          </div>

          <form @submit.prevent="addParticipant" class="add-form">
            <input 
              v-model="newParticipantName" 
              type="text" 
              placeholder="Enter name..."
              class="participant-input"
              ref="participantInput"
            />
            <div class="form-actions">
              <button type="button" @click="showAddParticipant = false" class="btn-cancel">Cancel</button>
              <button type="submit" class="btn-add">Add</button>
            </div>
          </form>

          <!-- Quick Add Common Team -->
          <div v-if="savedTeams.length > 0" class="quick-add-section">
            <h3>Quick Add Team:</h3>
            <div class="team-buttons">
              <button 
                v-for="(team, index) in savedTeams" 
                :key="index"
                @click="loadTeam(team)"
                class="team-btn"
              >
                {{ team.name }} ({{ team.members.length }})
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Past Sessions -->
      <div v-if="sessions.length > 0 && !isRunning" class="sessions-section glass-card">
        <h2>Past Sessions</h2>
        <div class="sessions-list">
          <div v-for="(session, index) in recentSessions" :key="index" class="session-item">
            <div class="session-info">
              <div class="session-date">{{ formatDate(session.date) }}</div>
              <div class="session-details">
                {{ session.participants.length }} participants • {{ formatDuration(session.totalTime) }}
              </div>
            </div>
            <button @click="viewSession(session)" class="btn-view">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StandupTimerApp',
  data() {
    return {
      participants: [],
      timePerPerson: 90, // seconds
      warningTime: 15, // seconds
      soundEnabled: true,
      isRunning: false,
      isPaused: false,
      currentIndex: 0,
      timeRemaining: 90,
      timerInterval: null,
      showAddParticipant: false,
      newParticipantName: '',
      savedTeams: [],
      sessions: [],
      currentSession: null,
      showSummary: false,
      individualTimes: []
    };
  },
  computed: {
    currentParticipant() {
      return this.participants[this.currentIndex] || '';
    },
    upcomingParticipants() {
      return this.participants.slice(this.currentIndex + 1, this.currentIndex + 4);
    },
    formattedTime() {
      const absTime = Math.abs(this.timeRemaining);
      const minutes = Math.floor(absTime / 60);
      const seconds = absTime % 60;
      const sign = this.timeRemaining < 0 ? '-' : '';
      return `${sign}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    progressPercentage() {
      return ((this.currentIndex) / this.participants.length) * 100;
    },
    recentSessions() {
      return this.sessions.slice(0, 5);
    }
  },
  mounted() {
    this.loadData();
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
  watch: {
    showAddParticipant(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.participantInput?.focus();
        });
      }
    }
  },
  methods: {
    loadData() {
      const savedParticipants = localStorage.getItem('standupParticipants');
      if (savedParticipants) {
        this.participants = JSON.parse(savedParticipants);
      }

      const savedSettings = localStorage.getItem('standupSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        this.timePerPerson = settings.timePerPerson || 90;
        this.warningTime = settings.warningTime || 15;
        this.soundEnabled = settings.soundEnabled !== false;
      }

      const savedSessions = localStorage.getItem('standupSessions');
      if (savedSessions) {
        this.sessions = JSON.parse(savedSessions);
      }

      const savedTeams = localStorage.getItem('standupTeams');
      if (savedTeams) {
        this.savedTeams = JSON.parse(savedTeams);
      }
    },
    saveData() {
      localStorage.setItem('standupParticipants', JSON.stringify(this.participants));
      localStorage.setItem('standupSettings', JSON.stringify({
        timePerPerson: this.timePerPerson,
        warningTime: this.warningTime,
        soundEnabled: this.soundEnabled
      }));
      localStorage.setItem('standupSessions', JSON.stringify(this.sessions));
    },
    addParticipant() {
      if (this.newParticipantName.trim()) {
        this.participants.push(this.newParticipantName.trim());
        this.newParticipantName = '';
        this.showAddParticipant = false;
        this.saveData();
      }
    },
    removeParticipant(index) {
      this.participants.splice(index, 1);
      this.saveData();
    },
    loadTeam(team) {
      this.participants = [...team.members];
      this.showAddParticipant = false;
      this.saveData();
    },
    startStandup() {
      this.isRunning = true;
      this.isPaused = false;
      this.currentIndex = 0;
      this.timeRemaining = this.timePerPerson;
      this.individualTimes = [];
      this.currentSession = {
        date: new Date().toISOString(),
        participants: [...this.participants],
        totalTime: 0,
        individualTimes: []
      };
      this.startTimer();
    },
    startTimer() {
      const startTime = Date.now();
      const initialRemaining = this.timeRemaining;
      
      this.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        this.timeRemaining = initialRemaining - elapsed;
        
        // Sound alert at warning time
        if (this.timeRemaining === this.warningTime && this.soundEnabled) {
          this.playSound('warning');
        }
        
        // Sound alert at 0
        if (this.timeRemaining === 0 && this.soundEnabled) {
          this.playSound('timeup');
        }
      }, 1000);
    },
    pauseTimer() {
      this.isPaused = true;
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
    },
    resumeTimer() {
      this.isPaused = false;
      this.startTimer();
    },
    nextParticipant() {
      // Record time for current participant
      const timeSpent = this.timePerPerson - this.timeRemaining;
      this.currentSession.individualTimes.push(timeSpent);
      this.currentSession.totalTime += timeSpent;

      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      if (this.currentIndex < this.participants.length - 1) {
        this.currentIndex++;
        this.timeRemaining = this.timePerPerson;
        this.isPaused = false;
        this.startTimer();
      } else {
        // Standup complete
        this.completeStandup();
      }
    },
    endStandup() {
      if (confirm('Are you sure you want to end the standup?')) {
        // Record time for current participant
        const timeSpent = this.timePerPerson - this.timeRemaining;
        this.currentSession.individualTimes.push(timeSpent);
        this.currentSession.totalTime += timeSpent;
        
        this.completeStandup();
      }
    },
    completeStandup() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      
      this.sessions.unshift(this.currentSession);
      this.saveData();
      this.showSummary = true;
      this.isRunning = false;
      this.isPaused = false;
    },
    closeSummary() {
      this.showSummary = false;
      this.currentSession = null;
    },
    viewSession(session) {
      this.currentSession = session;
      this.showSummary = true;
    },
    playSound(type) {
      // Simple beep using Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'warning') {
          oscillator.frequency.value = 440; // A4
          gainNode.gain.value = 0.3;
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
        } else if (type === 'timeup') {
          oscillator.frequency.value = 880; // A5
          gainNode.gain.value = 0.3;
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
        }
      } catch (e) {
        console.log('Audio not supported');
      }
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.app-container {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  padding: 2rem;
}

.standup-container {
  max-width: 1200px;
  margin: 0 auto;
}

.app-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  color: #ff6a00;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.app-subtitle {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #ff6a00;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Setup Section */
.setup-section {
  padding: 2rem;
  margin-bottom: 2rem;
}

.setup-section h2 {
  color: #ff6a00;
  margin-bottom: 1.5rem;
  text-align: center;
}

.participants-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h3 {
  color: #333;
  font-size: 1.2rem;
}

.btn-add-small {
  padding: 0.5rem 1rem;
  background: #ff6a00;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-add-small:hover {
  background: #ff5500;
  transform: translateY(-2px);
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 2rem;
  font-style: italic;
}

.participant-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.participant-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 106, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.participant-item:hover {
  background: rgba(255, 106, 0, 0.2);
}

.participant-name {
  font-weight: 600;
  color: #333;
}

.btn-remove {
  width: 30px;
  height: 30px;
  background: rgba(220, 53, 69, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  line-height: 1;
}

.btn-remove:hover {
  background: #dc3545;
  transform: scale(1.1);
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-section h3 {
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.setting-row label {
  font-weight: 600;
  color: #333;
}

.setting-input {
  width: 100px;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
}

.checkbox-row {
  cursor: pointer;
}

.checkbox-row input[type="checkbox"] {
  margin-right: 0.5rem;
  cursor: pointer;
}

.btn-start {
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #ff9a56 0%, #ff6a00 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-start:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255, 106, 0, 0.4);
}

.btn-start:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Running Standup Display */
.standup-display {
  padding: 2rem;
  text-align: center;
}

.current-speaker {
  margin-bottom: 2rem;
}

.speaker-label {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.speaker-name {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff6a00;
}

.timer-display {
  padding: 2rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.timer-display.warning {
  background: rgba(255, 193, 7, 0.3);
  border: 3px solid #ffc107;
}

.timer-display.overtime {
  background: rgba(220, 53, 69, 0.3);
  border: 3px solid #dc3545;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.timer-value {
  font-family: 'Courier New', monospace;
  font-size: 5rem;
  font-weight: 900;
  color: #333;
  margin-bottom: 0.5rem;
}

.timer-label {
  font-size: 1.2rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.progress-section {
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff9a56 0%, #ff6a00 100%);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.progress-text {
  color: #666;
  font-weight: 600;
}

.queue-section {
  margin-bottom: 2rem;
  text-align: left;
}

.queue-section h3 {
  color: #333;
  margin-bottom: 1rem;
}

.queue-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.queue-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
}

.queue-number {
  width: 30px;
  height: 30px;
  background: #ff6a00;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.queue-name {
  font-weight: 600;
  color: #333;
}

.queue-empty {
  text-align: center;
  color: #999;
  padding: 1rem;
  font-style: italic;
}

.control-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.btn-control {
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-pause {
  background: #ffc107;
  color: #333;
}

.btn-resume {
  background: #28a745;
  color: white;
}

.btn-next {
  background: #007bff;
  color: white;
}

.btn-stop {
  background: #dc3545;
  color: white;
}

.btn-control:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  color: #ff6a00;
  font-size: 1.8rem;
}

.close-btn {
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* Add Participant Modal */
.add-participant-modal {
  max-width: 500px;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.participant-input {
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.participant-input:focus {
  outline: none;
  border-color: #ff6a00;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-add {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: rgba(0, 0, 0, 0.1);
  border: none;
  color: #333;
}

.btn-add {
  background: #ff6a00;
  border: none;
  color: white;
}

.btn-add:hover {
  background: #ff5500;
}

.quick-add-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.quick-add-section h3 {
  color: #333;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.team-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.team-btn {
  padding: 0.75rem;
  background: rgba(255, 106, 0, 0.1);
  border: 2px solid rgba(255, 106, 0, 0.3);
  border-radius: 8px;
  color: #ff6a00;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.team-btn:hover {
  background: rgba(255, 106, 0, 0.2);
  border-color: #ff6a00;
}

/* Summary */
.summary-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-stat {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 106, 0, 0.1);
  border-radius: 8px;
}

.summary-stat strong {
  color: #333;
}

.summary-stat span {
  color: #ff6a00;
  font-weight: 700;
}

.participant-times {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
}

.participant-times h3 {
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.time-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.time-item span.overtime {
  color: #dc3545;
  font-weight: 700;
}

.btn-close-summary {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: #ff6a00;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-close-summary:hover {
  background: #ff5500;
}

/* Sessions Section */
.sessions-section {
  padding: 2rem;
  margin-top: 2rem;
}

.sessions-section h2 {
  color: #ff6a00;
  margin-bottom: 1.5rem;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.session-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 106, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.session-item:hover {
  background: rgba(255, 106, 0, 0.2);
}

.session-info {
  flex: 1;
}

.session-date {
  font-weight: 700;
  color: #333;
  margin-bottom: 0.25rem;
}

.session-details {
  color: #666;
  font-size: 0.9rem;
}

.btn-view {
  padding: 0.5rem 1rem;
  background: #ff6a00;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-view:hover {
  background: #ff5500;
}

/* Responsive */
@media (max-width: 768px) {
  .app-container {
    padding: 1rem;
  }

  .app-title {
    font-size: 2rem;
  }

  .timer-value {
    font-size: 3.5rem;
  }

  .control-buttons {
    grid-template-columns: 1fr 1fr;
  }

  .modal-content {
    padding: 1rem;
  }
}
</style>
