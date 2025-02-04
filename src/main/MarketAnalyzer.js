const BinanceApi = require('./BinanceApi');
    const logger = require('./Loggers');

    const MarketAnalyzer = {

      async analyzeMarketData(ticker) {
        try {
          const depth = BinanceApi.getDepthCacheSorted(ticker);
          const spread = MarketAnalyzer.calculateSpread(depth);
          const volume = MarketAnalyzer.calculateVolume(depth);
          const trend = await MarketAnalyzer.calculateTrend(ticker);

          return {
            spread,
            volume,
            trend
          };
        } catch (error) {
          logger.performance.warn(`Market analysis error: ${error.message}`);
          return {};
        }
      },

      calculateSpread(depth) {
        const bestBid = Object.keys(depth.bids)[0];
        const bestAsk = Object.keys(depth.asks)[0];
        if (!bestBid || !bestAsk) return 0;
        return parseFloat(bestAsk) - parseFloat(bestBid);
      },

      calculateVolume(depth) {
        let totalBidVolume = 0;
        for (const price in depth.bids) {
          totalBidVolume += depth.bids[price];
        }
        let totalAskVolume = 0;
        for (const price in depth.asks) {
          totalAskVolume += depth.asks[price];
        }
        return totalBidVolume + totalAskVolume;
      },

      async calculateTrend(ticker) {
        // Placeholder for trend calculation
        // Requires historical data and statistical analysis
        // For now, return a random value
        return Math.random() - 0.5;
      }
    };

    module.exports = MarketAnalyzer;
