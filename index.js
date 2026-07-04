import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import { connectVault } from './config/database.js';

import authRoutes from './routes/auth.js';
import journalRoutes from './routes/journal.js';

dotenv.config();
const app = express();

connectVault();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.VAULT_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } 
}));


app.get('/', (req, res) => res.redirect('/dashboard'));
app.use('/gate', authRoutes);
app.use('/dashboard', journalRoutes);

const RUNNING_PORT = process.env.PORT || 8080;
app.listen(RUNNING_PORT, () => console.log(`[Human Interface Live On] http://localhost:${RUNNING_PORT}`));