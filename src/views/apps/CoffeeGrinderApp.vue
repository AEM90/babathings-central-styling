<template>
  <div class="app-container coffee-grinder-app">
    <div class="coffee-container">
      <h1 class="app-title">☕ Coffee Grinder Logbook</h1>
      <p class="app-subtitle">Track your perfect grind settings and coffee journey</p>

      <!-- Quick Stats -->
      <div class="stats-row">
        <div class="stat-card glass-card">
          <div class="stat-icon">📊</div>
          <div class="stat-value">{{ entries.length }}</div>
          <div class="stat-label">Total Brews</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">{{ averageRating }}</div>
          <div class="stat-label">Avg Rating</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon">☕</div>
          <div class="stat-value">{{ favoriteBean }}</div>
          <div class="stat-label">Favorite Bean</div>
        </div>
      </div>

      <!-- Add New Entry Button & Data Management -->
      <div class="action-buttons">
        <button @click="showAddModal = true" class="add-entry-btn">
          <span class="btn-icon">+</span>
          Log New Brew
        </button>
        <div class="data-actions">
          <button @click="exportToCSV" class="btn-export" title="Export to CSV">
            📥 Export
          </button>
          <button @click="triggerImportCSV" class="btn-import" title="Import from CSV">
            📤 Import
          </button>
          <input 
            ref="csvInput" 
            type="file" 
            accept=".csv" 
            @change="importFromCSV"
            style="display: none"
          />
        </div>
      </div>

      <!-- Filter & Search -->
      <div class="filter-section glass-card">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search by coffee name, roaster, or notes..." 
            class="search-input"
          />
        </div>
        <div class="filter-row">
          <select v-model="filterMethod" class="filter-select">
            <option value="">All Methods</option>
            <option value="Espresso">Espresso</option>
            <option value="Pour Over">Pour Over</option>
            <option value="French Press">French Press</option>
            <option value="Aeropress">Aeropress</option>
            <option value="Moka Pot">Moka Pot</option>
            <option value="Cold Brew">Cold Brew</option>
          </select>
          <select v-model="filterRating" class="filter-select">
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
          <select v-model="sortBy" class="filter-select">
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      <!-- Entries Grid -->
      <div class="entries-grid">
        <div 
          v-for="entry in filteredEntries" 
          :key="entry.id"
          class="entry-card glass-card"
          @click="viewEntry(entry)"
        >
          <div class="entry-image" :style="{ backgroundImage: `url(${entry.image || '/placeholder-coffee.jpg'})` }">
            <div class="entry-badge" :class="getMethodClass(entry.method)">
              {{ entry.method }}
            </div>
          </div>
          <div class="entry-content">
            <h3 class="entry-name">{{ entry.coffeeName }}</h3>
            <p class="entry-roaster">{{ entry.roaster }}</p>
            
            <div class="entry-details">
              <div class="detail-item">
                <span class="detail-icon">⚙️</span>
                <span class="detail-text">{{ entry.grindSetting }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">⚖️</span>
                <span class="detail-text">{{ entry.weight }}g</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">💧</span>
                <span class="detail-text">{{ entry.waterRatio }}:1</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">🌡️</span>
                <span class="detail-text">{{ entry.temperature }}°C</span>
              </div>
            </div>

            <div class="entry-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= entry.rating }">★</span>
            </div>

            <div class="entry-tags">
              <span v-for="tag in entry.flavorNotes" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredEntries.length === 0" class="empty-state">
        <div class="empty-icon">☕</div>
        <h3>No brews found</h3>
        <p>{{ searchQuery ? 'Try adjusting your search or filters' : 'Start logging your coffee journey!' }}</p>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showAddModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content glass-card">
          <div class="modal-header">
            <h2>{{ editingEntry ? 'Edit Brew' : 'Log New Brew' }}</h2>
            <button @click="closeModal" class="close-btn">×</button>
          </div>

          <form @submit.prevent="saveEntry" class="entry-form">
            <!-- Image Upload -->
            <div class="form-group">
              <label>Coffee Photo</label>
              <div class="image-upload-area" @click="triggerFileInput">
                <input 
                  ref="fileInput" 
                  type="file" 
                  accept="image/*" 
                  @change="handleImageUpload"
                  style="display: none"
                />
                <div v-if="currentEntry.image" class="preview-image" :style="{ backgroundImage: `url(${currentEntry.image})` }"></div>
                <div v-else class="upload-placeholder">
                  <span class="upload-icon">📷</span>
                  <span>Click to upload photo</span>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Coffee Name *</label>
                <input v-model="currentEntry.coffeeName" type="text" required placeholder="e.g., Ethiopian Yirgacheffe" />
              </div>
              <div class="form-group">
                <label>Roaster</label>
                <input v-model="currentEntry.roaster" type="text" placeholder="e.g., Blue Bottle Coffee" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Brew Method *</label>
                <select v-model="currentEntry.method" required>
                  <option value="">Select method</option>
                  <option value="Espresso">Espresso</option>
                  <option value="Pour Over">Pour Over (V60, Chemex, etc.)</option>
                  <option value="French Press">French Press</option>
                  <option value="Aeropress">Aeropress</option>
                  <option value="Moka Pot">Moka Pot</option>
                  <option value="Cold Brew">Cold Brew</option>
                </select>
              </div>
              <div class="form-group">
                <label>Grinder Type</label>
                <input v-model="currentEntry.grinderType" type="text" placeholder="e.g., Baratza Encore, 1Zpresso JX-Pro" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Grind Setting *</label>
                <input v-model="currentEntry.grindSetting" type="text" required placeholder="e.g., 15, Medium-Fine" />
              </div>
              <div class="form-group">
                <label>Coffee Weight (g) *</label>
                <input v-model.number="currentEntry.weight" type="number" step="0.1" required placeholder="18.0" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Water Ratio (coffee:water)</label>
                <input v-model.number="currentEntry.waterRatio" type="number" step="0.1" placeholder="15.5" />
                <small>e.g., 1:15.5 means 15.5g water per 1g coffee</small>
              </div>
              <div class="form-group">
                <label>Water Temperature (°C)</label>
                <input v-model.number="currentEntry.temperature" type="number" placeholder="93" />
              </div>
            </div>

            <div class="form-group">
              <label>Roast Level</label>
              <select v-model="currentEntry.roastLevel">
                <option value="">Select roast</option>
                <option value="Light">Light</option>
                <option value="Medium-Light">Medium-Light</option>
                <option value="Medium">Medium</option>
                <option value="Medium-Dark">Medium-Dark</option>
                <option value="Dark">Dark</option>
              </select>
            </div>

            <div class="form-group">
              <label>Brew Time</label>
              <input v-model="currentEntry.brewTime" type="text" placeholder="e.g., 2:30, 25 seconds" />
            </div>

            <div class="form-group">
              <label>Flavor Notes</label>
              <div class="flavor-tags">
                <button 
                  v-for="flavor in commonFlavors" 
                  :key="flavor"
                  type="button"
                  @click="toggleFlavor(flavor)"
                  :class="['flavor-tag', { active: currentEntry.flavorNotes.includes(flavor) }]"
                >
                  {{ flavor }}
                </button>
              </div>
              <input 
                v-model="customFlavor" 
                type="text" 
                placeholder="Add custom flavor note..."
                @keypress.enter.prevent="addCustomFlavor"
              />
            </div>

            <div class="form-group">
              <label>Rating *</label>
              <div class="rating-input">
                <button 
                  v-for="i in 5" 
                  :key="i"
                  type="button"
                  @click="currentEntry.rating = i"
                  class="star-btn"
                  :class="{ filled: i <= currentEntry.rating }"
                >
                  ★
                </button>
              </div>
            </div>

            <div class="form-group">
              <label>Tasting Notes & Comments</label>
              <textarea 
                v-model="currentEntry.notes" 
                rows="4" 
                placeholder="How did it taste? Would you change anything next time?"
              ></textarea>
            </div>

            <div class="form-actions">
              <button type="button" @click="closeModal" class="btn-cancel">Cancel</button>
              <button type="submit" class="btn-save">{{ editingEntry ? 'Update' : 'Save' }} Brew</button>
            </div>
          </form>
        </div>
      </div>

      <!-- View Entry Modal -->
      <div v-if="viewingEntry" class="modal-overlay" @click.self="viewingEntry = null">
        <div class="modal-content view-modal glass-card">
          <div class="modal-header">
            <h2>{{ viewingEntry.coffeeName }}</h2>
            <button @click="viewingEntry = null" class="close-btn">×</button>
          </div>

          <div class="view-content">
            <div v-if="viewingEntry.image" class="view-image" :style="{ backgroundImage: `url(${viewingEntry.image})` }"></div>
            
            <div class="view-details">
              <div class="detail-row">
                <strong>Roaster:</strong>
                <span>{{ viewingEntry.roaster || 'Not specified' }}</span>
              </div>
              <div class="detail-row">
                <strong>Method:</strong>
                <span>{{ viewingEntry.method }}</span>
              </div>
              <div class="detail-row">
                <strong>Grinder:</strong>
                <span>{{ viewingEntry.grinderType || 'Not specified' }}</span>
              </div>
              <div class="detail-row">
                <strong>Grind Setting:</strong>
                <span>{{ viewingEntry.grindSetting }}</span>
              </div>
              <div class="detail-row">
                <strong>Coffee Weight:</strong>
                <span>{{ viewingEntry.weight }}g</span>
              </div>
              <div class="detail-row">
                <strong>Water Ratio:</strong>
                <span>1:{{ viewingEntry.waterRatio }}</span>
              </div>
              <div class="detail-row">
                <strong>Temperature:</strong>
                <span>{{ viewingEntry.temperature }}°C</span>
              </div>
              <div class="detail-row">
                <strong>Roast Level:</strong>
                <span>{{ viewingEntry.roastLevel || 'Not specified' }}</span>
              </div>
              <div class="detail-row">
                <strong>Brew Time:</strong>
                <span>{{ viewingEntry.brewTime || 'Not specified' }}</span>
              </div>
              <div class="detail-row">
                <strong>Date:</strong>
                <span>{{ formatDate(viewingEntry.date) }}</span>
              </div>
              
              <div class="rating-display">
                <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= viewingEntry.rating }">★</span>
              </div>

              <div v-if="viewingEntry.flavorNotes.length" class="flavor-display">
                <strong>Flavor Notes:</strong>
                <div class="tags-row">
                  <span v-for="tag in viewingEntry.flavorNotes" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </div>

              <div v-if="viewingEntry.notes" class="notes-display">
                <strong>Notes:</strong>
                <p>{{ viewingEntry.notes }}</p>
              </div>
            </div>

            <div class="view-actions">
              <button @click="editEntry(viewingEntry)" class="btn-edit">Edit</button>
              <button @click="deleteEntry(viewingEntry.id)" class="btn-delete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoffeeGrinderApp',
  data() {
    return {
      entries: [],
      showAddModal: false,
      viewingEntry: null,
      editingEntry: null,
      searchQuery: '',
      filterMethod: '',
      filterRating: '',
      sortBy: 'date',
      customFlavor: '',
      currentEntry: this.getEmptyEntry(),
      commonFlavors: [
        'Chocolate', 'Caramel', 'Nutty', 'Fruity', 'Floral',
        'Citrus', 'Berry', 'Sweet', 'Bright', 'Smooth',
        'Bold', 'Balanced', 'Earthy', 'Spicy', 'Wine-like'
      ]
    };
  },
  computed: {
    filteredEntries() {
      let filtered = [...this.entries];

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(entry => 
          entry.coffeeName.toLowerCase().includes(query) ||
          entry.roaster.toLowerCase().includes(query) ||
          entry.notes.toLowerCase().includes(query) ||
          entry.flavorNotes.some(note => note.toLowerCase().includes(query))
        );
      }

      // Method filter
      if (this.filterMethod) {
        filtered = filtered.filter(entry => entry.method === this.filterMethod);
      }

      // Rating filter
      if (this.filterRating) {
        const minRating = parseInt(this.filterRating);
        filtered = filtered.filter(entry => entry.rating >= minRating);
      }

      // Sort
      filtered.sort((a, b) => {
        if (this.sortBy === 'date') {
          return new Date(b.date) - new Date(a.date);
        } else if (this.sortBy === 'rating') {
          return b.rating - a.rating;
        } else if (this.sortBy === 'name') {
          return a.coffeeName.localeCompare(b.coffeeName);
        }
        return 0;
      });

      return filtered;
    },
    averageRating() {
      if (this.entries.length === 0) return '—';
      const sum = this.entries.reduce((acc, entry) => acc + entry.rating, 0);
      return (sum / this.entries.length).toFixed(1);
    },
    favoriteBean() {
      if (this.entries.length === 0) return '—';
      const counts = {};
      this.entries.forEach(entry => {
        counts[entry.coffeeName] = (counts[entry.coffeeName] || 0) + 1;
      });
      return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }
  },
  mounted() {
    this.loadEntries();
  },
  methods: {
    getEmptyEntry() {
      return {
        id: null,
        coffeeName: '',
        roaster: '',
        method: '',
        grinderType: '',
        grindSetting: '',
        weight: null,
        waterRatio: 15.5,
        temperature: 93,
        roastLevel: '',
        brewTime: '',
        flavorNotes: [],
        rating: 5,
        notes: '',
        image: null,
        date: new Date().toISOString()
      };
    },
    loadEntries() {
      const saved = localStorage.getItem('coffeeGrinderEntries');
      if (saved) {
        this.entries = JSON.parse(saved);
      }
    },
    saveEntries() {
      localStorage.setItem('coffeeGrinderEntries', JSON.stringify(this.entries));
    },
    saveEntry() {
      if (this.editingEntry) {
        const index = this.entries.findIndex(e => e.id === this.editingEntry.id);
        this.entries[index] = { ...this.currentEntry, date: new Date().toISOString() };
      } else {
        this.currentEntry.id = Date.now();
        this.entries.unshift(this.currentEntry);
      }
      this.saveEntries();
      this.closeModal();
    },
    editEntry(entry) {
      this.editingEntry = entry;
      this.currentEntry = { ...entry };
      this.viewingEntry = null;
      this.showAddModal = true;
    },
    deleteEntry(id) {
      if (confirm('Are you sure you want to delete this brew log?')) {
        this.entries = this.entries.filter(e => e.id !== id);
        this.saveEntries();
        this.viewingEntry = null;
      }
    },
    viewEntry(entry) {
      this.viewingEntry = entry;
    },
    closeModal() {
      this.showAddModal = false;
      this.editingEntry = null;
      this.currentEntry = this.getEmptyEntry();
      this.customFlavor = '';
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.currentEntry.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    toggleFlavor(flavor) {
      const index = this.currentEntry.flavorNotes.indexOf(flavor);
      if (index > -1) {
        this.currentEntry.flavorNotes.splice(index, 1);
      } else {
        this.currentEntry.flavorNotes.push(flavor);
      }
    },
    addCustomFlavor() {
      if (this.customFlavor.trim()) {
        this.currentEntry.flavorNotes.push(this.customFlavor.trim());
        this.customFlavor = '';
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    getMethodClass(method) {
      const classes = {
        'Espresso': 'badge-espresso',
        'Pour Over': 'badge-pourover',
        'French Press': 'badge-french',
        'Aeropress': 'badge-aero',
        'Moka Pot': 'badge-moka',
        'Cold Brew': 'badge-cold'
      };
      return classes[method] || 'badge-default';
    },
    
    // CSV Export
    exportToCSV() {
      if (this.entries.length === 0) {
        alert('No entries to export');
        return;
      }

      // CSV Headers
      const headers = [
        'Date', 'Coffee Name', 'Roaster', 'Method', 'Grinder Type',
        'Grind Setting', 'Weight (g)', 'Water Ratio', 'Temperature (°C)',
        'Roast Level', 'Brew Time', 'Rating', 'Flavor Notes', 'Notes', 'Image URL'
      ];

      // Convert entries to CSV rows
      const rows = this.entries.map(entry => [
        entry.date,
        this.escapeCSV(entry.coffeeName),
        this.escapeCSV(entry.roaster),
        this.escapeCSV(entry.method),
        this.escapeCSV(entry.grinderType),
        this.escapeCSV(entry.grindSetting),
        entry.weight,
        entry.waterRatio,
        entry.temperature,
        this.escapeCSV(entry.roastLevel),
        this.escapeCSV(entry.brewTime),
        entry.rating,
        this.escapeCSV(entry.flavorNotes.join('; ')),
        this.escapeCSV(entry.notes),
        entry.image ? 'base64-image-data' : '' // Note: images are large, marked but not exported
      ]);

      // Create CSV content
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().split('T')[0];
      
      link.setAttribute('href', url);
      link.setAttribute('download', `coffee-logbook-${timestamp}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    escapeCSV(str) {
      if (!str) return '';
      const stringValue = String(str);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    },

    // CSV Import
    triggerImportCSV() {
      this.$refs.csvInput.click();
    },

    async importFromCSV(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csv = e.target.result;
          const lines = csv.split('\n');
          
          if (lines.length < 2) {
            alert('CSV file is empty or invalid');
            return;
          }

          // Skip header row
          const dataLines = lines.slice(1).filter(line => line.trim());
          
          const importedEntries = dataLines.map(line => {
            // Simple CSV parser (handles quoted fields)
            const values = this.parseCSVLine(line);
            
            return {
              id: Date.now() + Math.random(), // Generate unique ID
              date: values[0] || new Date().toISOString(),
              coffeeName: values[1] || 'Unknown Coffee',
              roaster: values[2] || '',
              method: values[3] || '',
              grinderType: values[4] || '',
              grindSetting: values[5] || '',
              weight: parseFloat(values[6]) || 0,
              waterRatio: parseFloat(values[7]) || 15.5,
              temperature: parseFloat(values[8]) || 93,
              roastLevel: values[9] || '',
              brewTime: values[10] || '',
              rating: parseInt(values[11]) || 5,
              flavorNotes: values[12] ? values[12].split(';').map(n => n.trim()) : [],
              notes: values[13] || '',
              image: null // Images not imported from CSV
            };
          });

          const confirmImport = confirm(
            `Import ${importedEntries.length} entries?\n\n` +
            `This will ADD to your existing ${this.entries.length} entries.\n` +
            `Note: Images are not included in CSV import.`
          );

          if (confirmImport) {
            this.entries = [...importedEntries, ...this.entries];
            this.saveEntries();
            alert(`Successfully imported ${importedEntries.length} entries!`);
          }
        } catch (error) {
          console.error('Import error:', error);
          alert('Error importing CSV file. Please check the file format.');
        }
      };

      reader.readAsText(file);
      event.target.value = ''; // Reset input
    },

    parseCSVLine(line) {
      const values = [];
      let currentValue = '';
      let insideQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
          if (insideQuotes && nextChar === '"') {
            currentValue += '"';
            i++; // Skip next quote
          } else {
            insideQuotes = !insideQuotes;
          }
        } else if (char === ',' && !insideQuotes) {
          values.push(currentValue);
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue); // Push last value

      return values;
    }
  }
};
</script>

<style scoped>
.app-container {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #2c1810, #4a2c1a, #3d2415);
  padding: 2rem;
}

.coffee-container {
  max-width: 1400px;
  margin: 0 auto;
}

.app-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, #d4a574 0%, #8b6f47 100%);
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
  color: #d4a574;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* Add Entry Button */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.add-entry-btn {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem;
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #d4a574 0%, #8b6f47 100%);
  color: #2c1810;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-entry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(212, 165, 116, 0.4);
}

.btn-icon {
  font-size: 1.5rem;
}

.data-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-export,
.btn-import {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(212, 165, 116, 0.3);
  color: #d4a574;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-export:hover,
.btn-import:hover {
  background: rgba(212, 165, 116, 0.2);
  border-color: #d4a574;
  transform: translateY(-2px);
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Filter Section */
.filter-section {
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.search-box {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
}

.search-input:focus {
  outline: none;
  border-color: #d4a574;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-select {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
}

/* Entries Grid */
.entries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.entry-card {
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.entry-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(212, 165, 116, 0.3);
}

.entry-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.05);
  position: relative;
}

.entry-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.badge-espresso { background: rgba(139, 69, 19, 0.9); color: #fff; }
.badge-pourover { background: rgba(70, 130, 180, 0.9); color: #fff; }
.badge-french { background: rgba(184, 134, 11, 0.9); color: #fff; }
.badge-aero { background: rgba(106, 90, 205, 0.9); color: #fff; }
.badge-moka { background: rgba(178, 34, 34, 0.9); color: #fff; }
.badge-cold { background: rgba(100, 149, 237, 0.9); color: #fff; }
.badge-default { background: rgba(128, 128, 128, 0.9); color: #fff; }

.entry-content {
  padding: 1.5rem;
}

.entry-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.entry-roaster {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.entry-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.detail-icon {
  font-size: 1.1rem;
}

.entry-rating {
  margin-bottom: 0.75rem;
}

.star {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.2);
  margin-right: 0.2rem;
}

.star.filled {
  color: #d4a574;
}

.entry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: rgba(212, 165, 116, 0.2);
  border: 1px solid rgba(212, 165, 116, 0.4);
  border-radius: 12px;
  font-size: 0.85rem;
  color: #d4a574;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  color: #d4a574;
  font-size: 1.8rem;
}

.close-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Form */
.entry-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #d4a574;
}

.form-group small {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

/* Image Upload */
.image-upload-area {
  min-height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.image-upload-area:hover {
  border-color: #d4a574;
  background: rgba(212, 165, 116, 0.1);
}

.upload-placeholder {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.upload-icon {
  font-size: 3rem;
}

.preview-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

/* Flavor Tags */
.flavor-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.flavor-tag {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.flavor-tag:hover {
  background: rgba(255, 255, 255, 0.15);
}

.flavor-tag.active {
  background: rgba(212, 165, 116, 0.3);
  border-color: #d4a574;
  color: #d4a574;
}

/* Rating Input */
.rating-input {
  display: flex;
  gap: 0.5rem;
}

.star-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.star-btn:hover,
.star-btn.filled {
  color: #d4a574;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-cancel,
.btn-save {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

.btn-save {
  background: linear-gradient(135deg, #d4a574 0%, #8b6f47 100%);
  border: none;
  color: #2c1810;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(212, 165, 116, 0.4);
}

/* View Modal */
.view-modal {
  max-width: 700px;
}

.view-image {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.view-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.detail-row strong {
  color: rgba(255, 255, 255, 0.8);
}

.detail-row span {
  color: #d4a574;
  font-weight: 600;
}

.rating-display {
  text-align: center;
  padding: 1rem;
}

.flavor-display,
.notes-display {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.notes-display p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-top: 0.5rem;
}

.view-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-edit,
.btn-delete {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit {
  background: rgba(212, 165, 116, 0.2);
  border: 2px solid #d4a574;
  color: #d4a574;
}

.btn-delete {
  background: rgba(220, 53, 69, 0.2);
  border: 2px solid #dc3545;
  color: #dc3545;
}

.btn-edit:hover,
.btn-delete:hover {
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .app-container {
    padding: 1rem;
  }

  .app-title {
    font-size: 2rem;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .entries-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    padding: 1rem;
  }
}
</style>
