import * as path from 'path';
import * as url from 'url';
import { createWSSGlobalInstance, onHttpServerUpgrade } from './websocket';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

createWSSGlobalInstance();

const { server } = await import(path.resolve(__dirname, './index.js'));
server.server.on('upgrade', onHttpServerUpgrade);
