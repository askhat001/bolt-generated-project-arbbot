const MLManager = require('../src/main/MLManager');

    describe('MLManager', () => {
      it('should load a model', () => {
        MLManager.loadModel();
        expect(MLManager.model).toBeDefined();
      });

      it('should make a prediction', () => {
        const calculated = {
          trade: { symbol: { a: 'BTC', b: 'ETH', c: 'LTC' } },
          depth: {
            ab: { bids: { '0.06': 10 }, asks: { '0.07': 10 }, eventTime: Date.now() },
            bc: { bids: { '0.02': 10 }, asks: { '0.03': 10 }, eventTime: Date.now() },
            ca: { bids: { '0.01': 10 }, asks: { '0.02': 10 }, eventTime: Date.now() }
          },
          percent: 1
        };
        const prediction = MLManager.predictArbitrageSuccess(calculated);
        expect(prediction).toBeGreaterThanOrEqual(0);
        expect(prediction).toBeLessThanOrEqual(1);
      });
    });
