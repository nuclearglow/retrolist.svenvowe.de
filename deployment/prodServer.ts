import * as path from 'path';
import * as url from 'url';
import { createWSSGlobalInstance, onHttpServerUpgrade } from './websocket';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.warn('Starting RetroList production server...');
console.warn('Filename:', __filename);
console.warn('Dirname:', __dirname);
console.warn('Starting script: ', path.resolve(__dirname, './index.js'));

createWSSGlobalInstance();

const { server } = await import(path.resolve(__dirname, './index.js'));
server.server.on('upgrade', onHttpServerUpgrade);
