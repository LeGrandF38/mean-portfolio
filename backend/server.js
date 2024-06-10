const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/mean-portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Route par défaut
app.get('/', (req, res) => res.send('API is working'));

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

