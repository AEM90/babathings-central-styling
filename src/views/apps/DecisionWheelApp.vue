<template>
  <div class="app-container decision-wheel-app">
    <div class="container">
      <h1>🎡 Decision Wheel</h1>
      
      <div class="content-wrapper">
        <div class="wheel-section">
          <div class="wheel-container">
            <div class="wheel-pointer"></div>
            <canvas ref="wheelCanvas"></canvas>
          </div>
          <button @click="spin" :disabled="isSpinning" class="spin-btn">SPIN THE WHEEL</button>
          <div class="result-section" :class="{ show: showResult }">
            <div class="result-label">The wheel has decided:</div>
            <div class="result-text">{{ resultText }}</div>
          </div>
        </div>

        <div class="input-section">
          <div class="input-group">
            <label for="optionsInput">Enter your options:</label>
            <textarea 
              v-model="optionsInput"
              @input="updateOptions"
              placeholder="Enter each option on a new line&#10;&#10;Example:&#10;Pizza&#10;Burger&#10;Sushi&#10;Pasta"
            ></textarea>
            <div class="help-text">
              Enter one option per line. If you provide less than 8 options, they will be automatically replicated to fill 8 slots.
            </div>
          </div>
          <button @click="updateOptions" class="update-btn">UPDATE WHEEL</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DecisionWheelApp',
  data() {
    return {
      canvas: null,
      ctx: null,
      options: [],
      currentRotation: 0,
      isSpinning: false,
      optionsInput: '',
      showResult: false,
      resultText: '',
      colors: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
      ],
      centerX: 0,
      centerY: 0,
      radius: 0
    };
  },
  mounted() {
    this.initCanvas();
    this.loadDefaultOptions();
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.wheelCanvas;
      this.ctx = this.canvas.getContext('2d');
      
      const size = 400;
      this.canvas.width = size;
      this.canvas.height = size;
      this.centerX = size / 2;
      this.centerY = size / 2;
      this.radius = size / 2 - 10;
    },
    
    loadDefaultOptions() {
      const defaultOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
      this.optionsInput = defaultOptions.join('\n');
      this.updateOptions();
    },
    
    updateOptions() {
      const rawOptions = this.optionsInput.split('\n')
        .map(opt => opt.trim())
        .filter(opt => opt.length > 0);

      if (rawOptions.length === 0) {
        this.options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 
                       'Option 5', 'Option 6', 'Option 7', 'Option 8'];
      } else if (rawOptions.length < 8) {
        this.options = [];
        while (this.options.length < 8) {
          for (let i = 0; i < rawOptions.length && this.options.length < 8; i++) {
            this.options.push(rawOptions[i]);
          }
        }
      } else {
        this.options = rawOptions;
      }

      this.drawWheel();
    },
    
    drawWheel() {
      const ctx = this.ctx;
      const numSegments = this.options.length;
      const anglePerSegment = (2 * Math.PI) / numSegments;

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.save();
      ctx.translate(this.centerX, this.centerY);
      ctx.rotate(this.currentRotation);

      for (let i = 0; i < numSegments; i++) {
        const startAngle = i * anglePerSegment;
        const endAngle = startAngle + anglePerSegment;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, this.radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = this.colors[i % this.colors.length];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.save();
        ctx.rotate(startAngle + anglePerSegment / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        const text = this.options[i];
        const maxWidth = this.radius - 40;
        const textRadius = this.radius * 0.7;
        
        let displayText = text;
        if (ctx.measureText(text).width > maxWidth) {
          while (ctx.measureText(displayText + '...').width > maxWidth && displayText.length > 0) {
            displayText = displayText.slice(0, -1);
          }
          displayText += '...';
        }
        
        ctx.fillText(displayText, textRadius, 5);
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    },
    
    spin() {
      if (this.isSpinning || this.options.length === 0) return;

      this.isSpinning = true;
      this.showResult = false;

      const crypto = window.crypto || window.msCrypto;
      const randomBuffer = new Uint32Array(1);
      crypto.getRandomValues(randomBuffer);
      const randomValue = randomBuffer[0] / (0xFFFFFFFF + 1);
      
      const selectedIndex = Math.floor(randomValue * this.options.length);
      const anglePerSegment = (2 * Math.PI) / this.options.length;
      const targetAngle = -(selectedIndex * anglePerSegment + anglePerSegment / 2) - Math.PI / 2;
      
      const minSpins = 8;
      const maxSpins = 10;
      const numSpins = Math.floor(randomValue * (maxSpins - minSpins + 1)) + minSpins;
      const actualSpins = Math.min(numSpins, maxSpins);
      const normalizedRotation = this.currentRotation % (2 * Math.PI);
      const totalRotation = this.currentRotation - normalizedRotation + (actualSpins * 2 * Math.PI) + targetAngle;

      const duration = 6000;
      const startTime = Date.now();
      const startRotation = this.currentRotation;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        this.currentRotation = startRotation + (totalRotation - startRotation) * easeProgress;
        this.drawWheel();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.currentRotation = totalRotation;
          this.drawWheel();
          this.showResultFunc(selectedIndex);
          this.isSpinning = false;
        }
      };

      animate();
    },
    
    showResultFunc(index) {
      this.resultText = this.options[index];
      this.showResult = true;
    }
  }
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5em;
}

.content-wrapper {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.wheel-section {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wheel-container {
  position: relative;
  width: 400px;
  height: 400px;
  margin-bottom: 20px;
}

canvas {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.wheel-pointer {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 40px solid #ff4444;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3));
  z-index: 10;
}

.input-section {
  flex: 1;
  min-width: 300px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
}

textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s;
}

textarea:focus {
  outline: none;
  border-color: #667eea;
}

.help-text {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.spin-btn,
.update-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 10px;
}

.spin-btn:hover,
.update-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.spin-btn:active,
.update-btn:active {
  transform: translateY(0);
}

.spin-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.result-section {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
  display: none;
}

.result-section.show {
  display: block;
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-text {
  font-size: 1.5em;
  color: #333;
  font-weight: 600;
}

.result-label {
  font-size: 1em;
  color: #666;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  h1 {
    font-size: 2em;
  }

  .wheel-container {
    width: 300px;
    height: 300px;
  }

  .content-wrapper {
    flex-direction: column;
  }
}
</style>
