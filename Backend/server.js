const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

app.use(cors());
app.use(bodyParser.json());

// Serve Static Files (Frontend)
const frontendPath = path.join(__dirname, '../Frontend');
console.log('Serving frontend from:', frontendPath);
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Sync Database and Start Server
db.sequelize.sync({ alter: true }) // alter: true to update tables without dropping
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to sync database:', err);
    });

module.exports = app; // For testing
