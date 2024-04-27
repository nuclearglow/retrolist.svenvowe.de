import * as path from 'path';
import * as url from 'url';
import { createWSSGlobalInstance, onHttpServerUpgrade } from './websocket';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting RetroList production server...');
console.log('Filename:', __filename);
console.log('Dirname:', __dirname);
console.log('Starting script: ', path.resolve(__dirname, './index.js'));

createWSSGlobalInstance();

const { server } = await import(path.resolve(__dirname, './index.js'));
server.server.on('upgrade', onHttpServerUpgrade);
