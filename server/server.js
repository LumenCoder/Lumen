// server/server.js
// Node.js Express server to serve static assets and support future API enhancements.

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the project root
app.use(express.static(path.join(__dirname, '..')));

// Example API endpoint (for future extensions)
app.get('/api/info', (req, res) => {
  res.json({
    message: "This is a placeholder for future API functionality."
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
