import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/Schema.js';
import { passOnlyGuests } from '../middleware/gatekeeper.js';

const router = Router();

router.get('/login', passOnlyGuests, (req, res) => res.render('auth-form', { action: 'login', notice: null }));
router.get('/signup', passOnlyGuests, (req, res) => res.render('auth-form', { action: 'signup', notice: null }));

router.post('/signup', async (req, res) => {
    const { alias, passcode } = req.body;
    try {
        const tracking = await User.findOne({ alias: alias.toLowerCase() });
        if (tracking) return res.render('auth-form', { action: 'signup', notice: 'Alias already locked.' });

        const hashed = await bcrypt.hash(passcode, 11);
        const freshUser = new User({ alias: alias.toLowerCase(), passcode: hashed });
        await freshUser.save();

        res.redirect('/gate/login');
    } catch (e) {
        res.render('auth-form', { action: 'signup', notice: 'Processing error.' });
    }
});

router.post('/login', async (req, res) => {
    const { alias, passcode } = req.body;
    try {
        const match = await User.findOne({ alias: alias.toLowerCase() });
        if (!match || !(await bcrypt.compare(passcode, match.passcode))) {
            return res.render('auth-form', { action: 'login', notice: 'Invalid credentials.' });
        }
        req.session.userToken = match._id;
        req.session.aliasName = match.alias;
        res.redirect('/dashboard');
    } catch (e) {
        res.render('auth-form', { action: 'login', notice: 'System anomaly.' });
    }
});

router.post('/exit', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/gate/login');
    });
});

export default router;