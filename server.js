import { WebSocket } from 'ws';
import { generateInitialiserPacket } from './protocol.js';

const BOT_COUNT = 10;

let count = 0;

const createWebSocketInstance = async () => {
    let hasSpawned = false;
    
    const websocket = new WebSocket('wss://eu2.hornex.pro/', {
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            Connection: 'Upgrade',
            Host: 'eu1.hornex.pro',
            'Origin': 'https://hornex.pro',
            Pragma: 'no-cache',
            'Sec-Websocket-Extensions': 'permessage-deflate; client_max_window_bits',
            'Sec-Websocket-Key': 'WOtJYR+NRiNtA8rv4MaVzg==',
            'Sec-Websocket-Version': '13',
            Upgrade: 'websocket',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)' +
                ' Chrome/120.0.0.0 Safari/537.36'
        }
    });
    
    await new Promise(r => websocket.once('open', r));
    ['open', 'close'].forEach(x => websocket.addEventListener(x, () => hasSpawned && console.log(--count)), { once: true });
    
    websocket.send(generateInitialiserPacket());
    
    await new Promise(r => websocket.addEventListener('message', ({ data }) =>
        void (websocket.send(new Uint8Array([217, 218]))) ?? r()), { once: true });
    
    hasSpawned = true;
    count++;
    console.log(count);
};

for (let index = 0; index < 10; index++) createWebSocketInstance();