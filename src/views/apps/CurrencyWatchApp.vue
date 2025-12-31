<template>
  <div class="app-container currency-watch-app">
    <div class="currency-container">
      <h1 class="app-title">💱 Currency Watch</h1>
      <p class="app-subtitle">Real-time exchange rates and currency conversion</p>

      <!-- Quick Converter -->
      <div class="converter-card glass-card">
        <h2 class="section-title">Quick Converter</h2>
        
        <div class="converter-grid">
          <!-- From Currency -->
          <div class="currency-input-group">
            <label>From</label>
            <div class="input-with-select">
              <input 
                v-model.number="fromAmount" 
                type="number" 
                placeholder="0.00"
                class="amount-input"
                @input="convertCurrency"
              />
              <select v-model="fromCurrency" @change="convertCurrency" class="currency-select">
                <option v-for="currency in popularCurrencies" :key="currency.code" :value="currency.code">
                  {{ currency.flag }} {{ currency.code }}
                </option>
              </select>
            </div>
            <div class="currency-name">{{ getCurrencyName(fromCurrency) }}</div>
          </div>

          <!-- Swap Button -->
          <button @click="swapCurrencies" class="swap-btn" title="Swap currencies">
            <span class="swap-icon">⇄</span>
          </button>

          <!-- To Currency -->
          <div class="currency-input-group">
            <label>To</label>
            <div class="input-with-select">
              <input 
                v-model="toAmount" 
                type="number" 
                placeholder="0.00"
                class="amount-input"
                readonly
              />
              <select v-model="toCurrency" @change="convertCurrency" class="currency-select">
                <option v-for="currency in popularCurrencies" :key="currency.code" :value="currency.code">
                  {{ currency.flag }} {{ currency.code }}
                </option>
              </select>
            </div>
            <div class="currency-name">{{ getCurrencyName(toCurrency) }}</div>
          </div>
        </div>

        <!-- Exchange Rate Info -->
        <div v-if="currentRate" class="rate-info">
          <div class="rate-display">
            <span class="rate-label">1 {{ fromCurrency }} =</span>
            <span class="rate-value">{{ currentRate.toFixed(4) }} {{ toCurrency }}</span>
          </div>
          <div v-if="lastUpdated" class="last-updated">
            Last updated: {{ formatTime(lastUpdated) }}
          </div>
        </div>
      </div>

      <!-- Popular Pairs -->
      <div class="popular-pairs glass-card">
        <h2 class="section-title">Popular Pairs</h2>
        <div class="pairs-grid">
          <div 
            v-for="pair in popularPairs" 
            :key="`${pair.from}-${pair.to}`"
            class="pair-card"
            @click="selectPair(pair)"
          >
            <div class="pair-header">
              <span class="pair-code">{{ pair.from }}/{{ pair.to }}</span>
              <span class="pair-flags">{{ pair.fromFlag }} → {{ pair.toFlag }}</span>
            </div>
            <div v-if="rates[pair.from]" class="pair-rate">
              {{ calculateRate(pair.from, pair.to) }}
            </div>
            <div v-else class="pair-loading">Loading...</div>
          </div>
        </div>
      </div>

      <!-- Historical Chart -->
      <div class="chart-card glass-card">
        <h2 class="section-title">Exchange Rate History</h2>
        <div class="chart-controls">
          <button 
            v-for="period in chartPeriods" 
            :key="period.value"
            @click="selectedPeriod = period.value"
            :class="['period-btn', { active: selectedPeriod === period.value }]"
          >
            {{ period.label }}
          </button>
        </div>
        <div class="chart-container">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- All Rates Table -->
      <div class="rates-table-card glass-card">
        <h2 class="section-title">All Exchange Rates (Base: {{ fromCurrency }})</h2>
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search currency..." 
            class="search-input"
          />
        </div>
        <div class="rates-table">
          <div class="table-header">
            <div>Currency</div>
            <div>Code</div>
            <div>Rate</div>
          </div>
          <div 
            v-for="currency in filteredCurrencies" 
            :key="currency.code"
            class="table-row"
          >
            <div class="currency-cell">
              <span class="currency-flag">{{ currency.flag }}</span>
              <span class="currency-name-full">{{ currency.name }}</span>
            </div>
            <div class="currency-code">{{ currency.code }}</div>
            <div class="currency-rate">
              {{ rates[fromCurrency] && rates[fromCurrency][currency.code] 
                ? rates[fromCurrency][currency.code].toFixed(4) 
                : '—' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyWatchApp',
  data() {
    return {
      fromAmount: 100,
      toAmount: 0,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      currentRate: null,
      lastUpdated: null,
      rates: {},
      searchQuery: '',
      selectedPeriod: '7D',
      chartPeriods: [
        { label: '7D', value: '7D' },
        { label: '1M', value: '1M' },
        { label: '3M', value: '3M' },
        { label: '1Y', value: '1Y' }
      ],
      popularCurrencies: [
        { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
        { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
        { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
        { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
        { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
        { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
        { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
        { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' }
      ],
      allCurrencies: [
        { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
        { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
        { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
        { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
        { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
        { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
        { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
        { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
        { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
        { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
        { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
        { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
        { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
        { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
        { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
        { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
        { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
        { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
        { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
        { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
        { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
        { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
        { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' }
      ],
      popularPairs: [
        { from: 'EUR', to: 'USD', fromFlag: '🇪🇺', toFlag: '🇺🇸' },
        { from: 'GBP', to: 'USD', fromFlag: '🇬🇧', toFlag: '🇺🇸' },
        { from: 'USD', to: 'JPY', fromFlag: '🇺🇸', toFlag: '🇯🇵' },
        { from: 'USD', to: 'CHF', fromFlag: '🇺🇸', toFlag: '🇨🇭' },
        { from: 'EUR', to: 'GBP', fromFlag: '🇪🇺', toFlag: '🇬🇧' },
        { from: 'AUD', to: 'USD', fromFlag: '🇦🇺', toFlag: '🇺🇸' }
      ],
      chart: null,
      updateInterval: null
    };
  },
  computed: {
    filteredCurrencies() {
      if (!this.searchQuery) {
        return this.allCurrencies;
      }
      const query = this.searchQuery.toLowerCase();
      return this.allCurrencies.filter(currency => 
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query)
      );
    }
  },
  mounted() {
    this.fetchRates();
    this.updateInterval = setInterval(() => {
      this.fetchRates();
    }, 60000); // Update every minute
  },
  beforeUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    if (this.chart) {
      this.chart.destroy();
    }
  },
  methods: {
    async fetchRates() {
      try {
        // Fetch rates for all popular currencies
        for (const currency of this.popularCurrencies) {
          const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency.code}`);
          const data = await response.json();
          this.rates[currency.code] = data.rates;
        }
        this.lastUpdated = new Date();
        this.convertCurrency();
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    },

    convertCurrency() {
      if (this.rates[this.fromCurrency] && this.rates[this.fromCurrency][this.toCurrency]) {
        this.currentRate = this.rates[this.fromCurrency][this.toCurrency];
        this.toAmount = (this.fromAmount * this.currentRate).toFixed(2);
      }
    },

    swapCurrencies() {
      [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
      [this.fromAmount, this.toAmount] = [this.toAmount, this.fromAmount];
      this.convertCurrency();
    },

    selectPair(pair) {
      this.fromCurrency = pair.from;
      this.toCurrency = pair.to;
      this.convertCurrency();
    },

    calculateRate(from, to) {
      if (this.rates[from] && this.rates[from][to]) {
        return this.rates[from][to].toFixed(4);
      }
      return '—';
    },

    getCurrencyName(code) {
      const currency = this.allCurrencies.find(c => c.code === code);
      return currency ? currency.name : '';
    },

    formatTime(date) {
      return date.toLocaleTimeString('en-US', { 
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
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  padding: 2rem;
}

.currency-container {
  max-width: 1400px;
  margin: 0 auto;
}

.app-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Converter */
.converter-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: start;
  margin-bottom: 2rem;
}

.currency-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.currency-input-group label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-with-select {
  display: flex;
  gap: 0.5rem;
}

.amount-input {
  flex: 1;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  transition: all 0.3s ease;
}

.amount-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.currency-select {
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.currency-select:focus {
  outline: none;
  border-color: #667eea;
}

.currency-name {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  padding-left: 0.5rem;
}

.swap-btn {
  align-self: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
}

.swap-btn:hover {
  transform: rotate(180deg) scale(1.1);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
}

.swap-icon {
  font-size: 1.5rem;
  color: #ffffff;
}

.rate-info {
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.rate-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.rate-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
}

.rate-value {
  color: #667eea;
  font-size: 1.5rem;
  font-weight: 700;
}

.last-updated {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

/* Popular Pairs */
.pairs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.pair-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pair-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.pair-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.pair-code {
  color: #ffffff;
  font-weight: 700;
  font-size: 1.1rem;
}

.pair-flags {
  font-size: 1.2rem;
}

.pair-rate {
  color: #667eea;
  font-size: 1.3rem;
  font-weight: 700;
}

.pair-loading {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

/* Chart */
.chart-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.period-btn {
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.period-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.period-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: #ffffff;
}

.chart-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
}

/* Rates Table */
.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.rates-table {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.1);
}

.currency-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.currency-flag {
  font-size: 1.5rem;
}

.currency-name-full {
  color: #ffffff;
  font-weight: 500;
}

.currency-code {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.currency-rate {
  color: #667eea;
  font-weight: 700;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .converter-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .swap-btn {
    transform: rotate(90deg);
    margin: 0 auto;
  }

  .swap-btn:hover {
    transform: rotate(270deg) scale(1.1);
  }

  .pairs-grid {
    grid-template-columns: 1fr;
  }

  .table-header,
  .table-row {
    grid-template-columns: 3fr 1.5fr 2fr;
    font-size: 0.9rem;
  }

  .app-title {
    font-size: 2rem;
  }
}
</style>
