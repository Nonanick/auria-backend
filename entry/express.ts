import express from 'express';
import http from 'http';
import { ExpressAdapter } from '../src/ExpressAdapter.js';

const app = express();
const server = http.createServer(app);

const adapter = new ExpressAdapter(app);
adapter.start();

server.listen(3000);