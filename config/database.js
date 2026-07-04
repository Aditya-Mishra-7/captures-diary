import mongoose from 'mongoose';

export const connectVault = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`[Vault Locked On]: ${conn.connection.host}`);
    } catch (error) {
        console.error(`🚨 Vault Access Failed: ${error.message}`);
        process.exit(1);
    }
};