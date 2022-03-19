import { mongoConnect } from './db.js';
import * as dotenv from 'dotenv';
dotenv.config();

describe('given a connection with MongoDB', () => {
    test('then it should be possible connect to our DB ', async () => {
        const connect = await mongoConnect();
        expect(connect).toBeTruthy();
        expect(connect.connections[0].name).toBe(
            process.env.NODE_ENV === 'test' ? 'Kukify' : 'Kukify'
        );
    });
});
