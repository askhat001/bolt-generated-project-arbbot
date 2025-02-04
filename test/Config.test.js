const Config = require('../src/main/Config');

    describe('Config', () => {
      it('should load configuration from environment variables', () => {
        process.env.API_KEY = 'test';
        process.env.API_SECRET = 'test';
        const config = require('../src/main/Config');
        expect(config.KEYS.API).toBe('test');
        expect(config.KEYS.SECRET).toBe('test');
      });
    });
