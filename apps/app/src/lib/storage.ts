// TODO: use localforage or whatever capacitor uses

import { STORAGE_KEY } from './config';

const loadPersistedState = () => {
  const persistedState = localStorage.getItem(STORAGE_KEY);
  if (persistedState) {
    return JSON.parse(persistedState);
  }
  return {};
};

const storage = {
  getFingerprint() {
    return localStorage.getItem('fingerprint');
  },
  setFingerprint(fingerprint: string) {
    return localStorage.setItem('fingerprint', fingerprint);
  },
  getToken() {
    const state = loadPersistedState();
    return state?.state?.token;
  },
  setToken(token: string) {
    const state = loadPersistedState();
    state.state = { ...state.state, token };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
};

export default storage;
