import fs from 'fs';
import path from 'path';
import Winston from '../logger.js';

describe('Winston Logger', () => {
    it('should add new file transport after interval', async () => {
        const winstonInstance = new Winston(1);
        await new Promise((resolve) => {
            setTimeout(() => {
                expect(winstonInstance.getLogger().transports.length).toBeGreaterThan(0);
                resolve();
            }, 100);
        });
        winstonInstance.getLogger().clear();
        winstonInstance.clearInterval();
        const d = "./logs/tests-generated"
        const files = fs.readdirSync(d);
        expect(files.length).toBeGreaterThan(0);
        files.forEach(file => fs.unlinkSync(path.join(d, file)));
        
    });
});
