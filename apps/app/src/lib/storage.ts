// TODO: use localforage or whatever capacitor uses

const storage = {
  getToken() {
    return localStorage.getItem('token'); //
  },
  setToken(token: string) {
    return localStorage.setItem('token', token);
  }
};

export default storage;
