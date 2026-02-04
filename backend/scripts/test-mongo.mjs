import dotenv from "dotenv";
import dns from 'dns'
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "stayDB";

async function run() {
  if (!uri) {
    console.error("MONGO_URI not set in .env");
    process.exit(2);
  }

  console.log("Testing MongoDB connection to:", uri);
  // If local DNS proxy blocks SRV queries, force public resolvers for this process
  try {
    const servers = dns.getServers()
    if (servers && servers.length && servers[0].startsWith('127.')) {
      dns.setServers(['1.1.1.1','8.8.8.8'])
      console.log('Overrode Node DNS servers to 1.1.1.1,8.8.8.8 for this test')
    }
  } catch (e) {
    // ignore
  }
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  });
  try {
    await client.connect();
    const admin = client.db(dbName).admin();
    const info = await admin.ping();
    console.log("Ping OK:", info);
    console.log("Successfully connected to MongoDB and pinged the server");
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error("MongoDB connection test failed");
    console.error(err);
    try {
      await client.close();
    } catch (e) {}
    process.exit(1);
  }
}

run();
