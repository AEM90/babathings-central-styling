<template>
  <div class="app-container moneyburn-app">
    <div class="app-header">
      <h1 class="app-title">
        <span class="app-icon">💰</span>
        MoneyBurn
      </h1>
      <p class="app-description">Meeting cost calculator - watch the money burn!</p>
    </div>

    <div class="app-content">
      <div class="calculator-placeholder">
        <div class="money-display">
          <span class="currency">$</span>
          <span class="amount">0.00</span>
        </div>
        <p class="placeholder-text">Meeting Cost Calculator</p>
        <p class="placeholder-hint">
          Replace this with your actual calculator implementation
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoneyBurnApp',
  data() {
    return {
      // Your calculator data
    };
  }
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
}

.app-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.app-icon {
  font-size: 3.5rem;
}

.app-description {
  font-size: 1.25rem;
  color: var(--text-secondary, #666);
}

.app-content {
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calculator-placeholder {
  text-align: center;
  padding: 3rem;
}

.money-display {
  width: 300px;
  height: 300px;
  margin: 0 auto 2rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(79, 172, 254, 0.3);
}

.currency {
  font-size: 2rem;
  color: white;
  font-weight: 700;
}

.amount {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  font-family: 'Courier New', monospace;
}

.placeholder-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.placeholder-hint {
  color: var(--text-secondary, #666);
}
</style>
