import mongoose from "mongoose";

let cachedDb = null;

export const connectToDatabase = async () => {
    console.log('Attempting to connect to database...');
    if (cachedDb && mongoose.connection.readyState === 1) {
        console.log('Using cached database connection');
        return cachedDb;
    }

    try {
        // Connection options
        console.log('Creating new database connection...');
        const options = {
            // serverSelectionTimeoutMS: 10000, // Timeout after 5s instead of 30s
            maxPoolSize: 10, // Maintain up to 10 socket connections
        };

        // Connect to database
        const connection = await mongoose.connect(process.env.DB_URI, options);
        
        cachedDb = connection;

        console.log('Connection successful!');
        
        // Handle connection events
        mongoose.connection.on('connected', () => {
            console.log(`Database connected: ${connection.connection.host}`);
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            cachedDb = null;
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            cachedDb = null;
        });

        return cachedDb;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error; // Rethrow to handle it in the calling function
    }
};

// Clean up function for Lambda container reuse
export const disconnectFromDatabase = async () => {
    if (cachedDb) {
        try {
            await mongoose.disconnect();
            cachedDb = null;
            console.log('Database disconnected');
        } catch (error) {
            console.error('Error disconnecting from database:', error);
            throw error;
        }
    }
};
