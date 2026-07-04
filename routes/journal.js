import { Router } from 'express';
import { Log } from '../models/Schema.js';
import { passOnlyMembers } from '../middleware/gatekeeper.js';

const router = Router();
router.use(passOnlyMembers);


router.get('/', async (req, res) => {
    const streams = await Log.find({ authorId: req.session.userToken }).sort({ createdAt: -1 });
    res.render('board', { user: req.session.aliasName, streams });
});


router.get('/write', (req, res) => res.render('compose', { targetLog: null }));


router.post('/write', async (req, res) => {
    const { heading, bodyText, moodTag } = req.body;
    await new Log({ heading, bodyText, moodTag, authorId: req.session.userToken }).save();
    res.redirect('/dashboard');
});


router.get('/modify/:id', async (req, res) => {
    const targeted = await Log.findOne({ _id: req.params.id, authorId: req.session.userToken });
    if (!targeted) return res.redirect('/dashboard');
    res.render('compose', { targetLog: targeted });
});


router.put('/modify/:id', async (req, res) => {
    const { heading, bodyText, moodTag } = req.body;
    await Log.findOneAndUpdate(
        { _id: req.params.id, authorId: req.session.userToken },
        { heading, bodyText, moodTag }
    );
    res.redirect('/dashboard');
});


router.delete('/purge/:id', async (req, res) => {
    await Log.findOneAndDelete({ _id: req.params.id, authorId: req.session.userToken });
    res.redirect('/dashboard');
});

export default router;