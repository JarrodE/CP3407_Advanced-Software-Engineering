/**
 * firebase-config.js — Firebase Realtime Database configuration.
 *
 * Uses the Firebase CDN (loaded via script tag in HTML).
 * This module provides a thin data-access layer that mirrors
 * the localStorage API, making it easy to swap between local and cloud storage.
 *
 * Cloud service requirement: CP3407 HD criterion.
 */

// Firebase project configuration
// Using a dedicated FeedMe Firebase project (free Spark plan)
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForFeedMeApp",
  authDomain: "feedme-cp3407.firebaseapp.com",
  databaseURL: "https://feedme-cp3407-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "feedme-cp3407",
  storageBucket: "feedme-cp3407.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:abcdef1234567890"
};
/**
 * Storage backend abstraction.
 * Falls back to localStorage when Firebase is unavailable (offline/demo mode).
 */
const StorageBackend = {
  _useFirebase: false,
  _db: null,

  /**
   * Initialise storage. Attempts Firebase first, falls back to localStorage.
   */
  async init() {
    try {
      if (typeof firebase !== "undefined" && firebase.database) {
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        this._db = firebase.database();
        this._useFirebase = true;
        console.log("[StorageBackend] Connected to Firebase Realtime Database");
        return true;
      }
    } catch (e) {
      console.warn("[StorageBackend] Firebase unavailable, using localStorage fallback", e);
    }
    this._useFirebase = false;
    console.log("[StorageBackend] Using localStorage (offline mode)");
    return false;
  },
  /**
   * Read data from storage.
   * @param {string} key  Storage key (e.g. "feedme_cart")
   * @returns {Promise<*>} Parsed data or null
   */
  async get(key) {
    if (this._useFirebase) {
      const snapshot = await this._db.ref(key).once("value");
      return snapshot.val();
    }
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },

  /**
   * Write data to storage.
   * @param {string} key
   * @param {*} value  Will be JSON-serialised
   */
  async set(key, value) {
    if (this._useFirebase) {
      await this._db.ref(key).set(value);
    }
    // Always write to localStorage as a local cache
    localStorage.setItem(key, JSON.stringify(value));
  },
  /**
   * Subscribe to real-time changes on a key (Firebase only).
   * Falls back to a no-op for localStorage.
   * @param {string} key
   * @param {Function} callback  Called with new value on change
   * @returns {Function} Unsubscribe function
   */
  onChange(key, callback) {
    if (this._useFirebase) {
      const ref = this._db.ref(key);
      ref.on("value", snapshot => callback(snapshot.val()));
      return () => ref.off("value");
    }
    // localStorage fallback: poll every 2 seconds
    const interval = setInterval(() => {
      try {
        callback(JSON.parse(localStorage.getItem(key)));
      } catch { /* ignore */ }
    }, 2000);
    return () => clearInterval(interval);
  },

  /**
   * Check if using cloud (Firebase) or local storage.
   * @returns {boolean}
   */
  isCloud() {
    return this._useFirebase;
  }
};

// Export for Node/Jest; guard for browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { firebaseConfig, StorageBackend };
}