import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
    alias: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    passcode: { type: String, required: true }
}, { timestamps: true });

const DailyLogSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    heading: { type: String, required: true, trim: true, max: 150 },
    bodyText: { type: String, required: true },
    moodTag: { type: String, default: 'neutral' }
}, { timestamps: true });

export const User = mongoose.model('User', UserProfileSchema);
export const Log = mongoose.model('Log', DailyLogSchema);