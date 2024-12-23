const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "https": require.resolve("https-browserify"),        // Polyfill for https
      "stream": require.resolve("stream-browserify"),      // Polyfill for stream
      "assert": require.resolve("assert/"),                // Polyfill for assert
      "url": require.resolve("url/"),                      // Polyfill for url
    },
  },
  // If you have other configurations, you can add them here (e.g., entry, output, plugins, etc.)
};
