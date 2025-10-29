import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_ATLAS_URI;

if (!uri) {
  console.warn('MongoDB Atlas URI not configured. Vector search will be disabled.');
}

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise && uri) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise || Promise.reject(new Error('MongoDB URI not configured'));
} else {
  // In production mode, it's best to not use a global variable.
  if (uri) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  } else {
    clientPromise = Promise.reject(new Error('MongoDB URI not configured'));
  }
}

export default clientPromise;