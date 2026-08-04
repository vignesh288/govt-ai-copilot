const react = require('@vitejs/plugin-react');

module.exports = {
  plugins: [react()],
  server: {
    port: 3100,
    host: '0.0.0.0'
  }
};
