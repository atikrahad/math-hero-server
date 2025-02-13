import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import config from './app/config';


let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`The server is running on port ${config.port}`);
    });

  } catch (err) {
    console.error(err);
  }
};

// Graceful error handling
process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection detected, shutting down...`);
  if (server) {
    server.close(() => process.exit(1));
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException detected, shutting down...`);
  process.exit(1);
});

main();