const react = require('@vitejs/plugin-react');

module.exports = {
    plugins: [react()],
    base: '/govt-ai-copilot/',
    server: {
    port: 3100,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
