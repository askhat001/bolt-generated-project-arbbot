const Backtester = require('../src/main/Backtester');
    const MarketCache = require('../src/main/MarketCache');
    const Config = require('../src/main/Config');

    describe('Backtester', () => {
      it('should run a backtest', async () => {
        const trades = [{
          ab: { ticker: 'ETHBTC' },
          bc: { ticker: 'LTCETH' },
          ca: { ticker: 'LTCBTC' }
        }];
        const historicalData = Backtester.generateHistoricalData(trades, 10);
        const result = await Backtester.runBacktest(trades, historicalData);
        expect(result).toBeDefined();
      });

      it('should generate historical data', () => {
        const trades = [{
          ab: { ticker: 'ETHBTC' },
          bc: { ticker: 'LTCETH' },
          ca: { ticker: 'LTCBTC' }
        }];
        const historicalData = Backtester.generateHistoricalData(trades, 10);
        expect(historicalData).toBeDefined();
        expect(historicalData.length).toBe(10);
      });
    });
