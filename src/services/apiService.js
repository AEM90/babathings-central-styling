/**
 * API Service Layer for BabaThings Apps
 * 
 * This service provides a centralized interface for data persistence.
 * Currently uses localStorage, but is designed to easily switch to AWS API calls
 * when authentication is implemented.
 * 
 * To enable AWS integration:
 * 1. Set up AWS API Gateway + Lambda functions
 * 2. Implement authentication (e.g., AWS Cognito)
 * 3. Replace localStorage methods with API calls
 * 4. Add error handling and retry logic
 */

class ApiService {
  constructor() {
    this.apiEndpoint = import.meta.env.VITE_API_ENDPOINT || null;
    this.authToken = null;
    this.useLocalStorage = !this.apiEndpoint; // Fallback to localStorage if no API endpoint
  }

  /**
   * Set authentication token for API requests
   * @param {string} token - JWT or auth token from login
   */
  setAuthToken(token) {
    this.authToken = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  /**
   * Get current authentication token
   * @returns {string|null}
   */
  getAuthToken() {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('authToken');
    }
    return this.authToken;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getAuthToken();
  }

  /**
   * Make authenticated API request
   * @private
   */
  async makeRequest(endpoint, method = 'GET', data = null) {
    if (this.useLocalStorage) {
      // For now, return null to indicate local storage should be used
      return null;
    }

    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    const options = {
      method,
      headers
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.apiEndpoint}${endpoint}`, options);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  /**
   * Coffee Grinder API methods
   */
  async getCoffeeEntries() {
    if (this.useLocalStorage) {
      const saved = localStorage.getItem('coffeeGrinderEntries');
      return saved ? JSON.parse(saved) : [];
    }
    
    return await this.makeRequest('/coffee/entries');
  }

  async saveCoffeeEntries(entries) {
    if (this.useLocalStorage) {
      localStorage.setItem('coffeeGrinderEntries', JSON.stringify(entries));
      return { success: true };
    }

    return await this.makeRequest('/coffee/entries', 'POST', { entries });
  }

  async addCoffeeEntry(entry) {
    if (this.useLocalStorage) {
      const entries = await this.getCoffeeEntries();
      entry.id = Date.now();
      entries.unshift(entry);
      await this.saveCoffeeEntries(entries);
      return { success: true, entry };
    }

    return await this.makeRequest('/coffee/entries', 'POST', { entry });
  }

  async updateCoffeeEntry(entryId, entry) {
    if (this.useLocalStorage) {
      const entries = await this.getCoffeeEntries();
      const index = entries.findIndex(e => e.id === entryId);
      if (index !== -1) {
        entries[index] = entry;
        await this.saveCoffeeEntries(entries);
      }
      return { success: true, entry };
    }

    return await this.makeRequest(`/coffee/entries/${entryId}`, 'PUT', { entry });
  }

  async deleteCoffeeEntry(entryId) {
    if (this.useLocalStorage) {
      const entries = await this.getCoffeeEntries();
      const filtered = entries.filter(e => e.id !== entryId);
      await this.saveCoffeeEntries(filtered);
      return { success: true };
    }

    return await this.makeRequest(`/coffee/entries/${entryId}`, 'DELETE');
  }

  /**
   * Standup Timer API methods
   */
  async getStandupSessions() {
    if (this.useLocalStorage) {
      const saved = localStorage.getItem('standupSessions');
      return saved ? JSON.parse(saved) : [];
    }

    return await this.makeRequest('/standup/sessions');
  }

  async saveStandupSession(session) {
    if (this.useLocalStorage) {
      const sessions = await this.getStandupSessions();
      sessions.unshift(session);
      localStorage.setItem('standupSessions', JSON.stringify(sessions));
      return { success: true, session };
    }

    return await this.makeRequest('/standup/sessions', 'POST', { session });
  }

  async getStandupSettings() {
    if (this.useLocalStorage) {
      const saved = localStorage.getItem('standupSettings');
      return saved ? JSON.parse(saved) : null;
    }

    return await this.makeRequest('/standup/settings');
  }

  async saveStandupSettings(settings) {
    if (this.useLocalStorage) {
      localStorage.setItem('standupSettings', JSON.stringify(settings));
      return { success: true };
    }

    return await this.makeRequest('/standup/settings', 'POST', { settings });
  }

  async getStandupParticipants() {
    if (this.useLocalStorage) {
      const saved = localStorage.getItem('standupParticipants');
      return saved ? JSON.parse(saved) : [];
    }

    return await this.makeRequest('/standup/participants');
  }

  async saveStandupParticipants(participants) {
    if (this.useLocalStorage) {
      localStorage.setItem('standupParticipants', JSON.stringify(participants));
      return { success: true };
    }

    return await this.makeRequest('/standup/participants', 'POST', { participants });
  }

  /**
   * User authentication methods
   * These will be implemented when authentication is added
   */
  async login(email, password) {
    // TODO: Implement AWS Cognito or custom authentication
    console.log('Login not yet implemented');
    throw new Error('Authentication not yet implemented');
  }

  async logout() {
    this.setAuthToken(null);
    // TODO: Call logout endpoint if needed
  }

  async register(email, password, username) {
    // TODO: Implement user registration
    console.log('Registration not yet implemented');
    throw new Error('Registration not yet implemented');
  }

  async getCurrentUser() {
    if (!this.isAuthenticated()) {
      return null;
    }
    
    if (this.useLocalStorage) {
      // Return mock user for local development
      return {
        id: 'local-user',
        email: 'local@example.com',
        username: 'Local User'
      };
    }

    return await this.makeRequest('/auth/me');
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export class for testing
export { ApiService };
