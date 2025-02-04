<diff path="src/main/Backtester.js">
      @@ -7,6 +7,7 @@
     const RiskManager = require('./RiskManager');
     const StrategyManager = require('./StrategyManager');
     const MLManager = require('./MLManager');
+    const Util = require('./Util');
 
     const Backtester = {
 
@@ -16,13 +17,14 @@
         let totalTrades = 0;
 
         for (const dataPoint of historicalData) {
+          StrategyManager.getMarketConditions(dataPoint);
+          StrategyManager.selectStrategy();
           for (const trade of trades) {
             try {
               const depthSnapshot = {
                 ab: dataPoint[trade.ab.ticker],
                 bc: dataPoint[trade.bc.ticker],
                 ca: dataPoint[trade.ca.ticker]
-              };
               const calculated = CalculationNode.optimize(trade, depthSnapshot);
               const marketConditions = StrategyManager.getMarketConditions();
               const adjustedCalculation = StrategyManager.applyStrategy(calculated, marketConditions);
@@ -30,7 +32,7 @@
               const hedgedCalculation = await RiskManager.dynamicHedging(adjustedCalculation);
               const mlPrediction = MLManager.predictArbitrageSuccess(hedgedCalculation);
 
-              if (mlPrediction > 0.5 && calculated.percent > CONFIG.EXECUTION.THRESHOLD.PROFIT) {
+              if (mlPrediction > 0.5 && calculated.percent > CONFIG.EXECUTION.THRESHOLD.PROFIT && RiskManager.checkMaxExposure({}, [trade])) {
                 totalProfit += calculated.percent;
                 totalTrades++;
               }
@@ -47,28 +49,41 @@
         return { totalProfit, totalTrades };
       },
 
-      generateHistoricalData(trades, dataPoints = 100) {
+      generateHistoricalData(trades, dataPoints = 100, volatility = 0.01) {
         const historicalData = [];
+        const initialPrices = {};
+
+        // Generate initial prices
         for (let i = 0; i < dataPoints; i++) {
           const dataPoint = {};
           for (const trade of trades) {
+            if (!initialPrices[trade.ab.ticker]) initialPrices[trade.ab.ticker] = 0.06 + Math.random() * 0.01;
+            if (!initialPrices[trade.bc.ticker]) initialPrices[trade.bc.ticker] = 0.02 + Math.random() * 0.01;
+            if (!initialPrices[trade.ca.ticker]) initialPrices[trade.ca.ticker] = 0.01 + Math.random() * 0.005;
+
+            const abPrice = initialPrices[trade.ab.ticker] + (Math.random() - 0.5) * volatility;
+            const bcPrice = initialPrices[trade.bc.ticker] + (Math.random() - 0.5) * volatility;
+            const caPrice = initialPrices[trade.ca.ticker] + (Math.random() - 0.5) * volatility;
+
             dataPoint[trade.ab.ticker] = {
-              bids: { '0.06': 10 + Math.random() * 5 },
-              asks: { '0.07': 10 + Math.random() * 5 },
+              bids: { [abPrice.toFixed(5)]: 10 + Math.random() * 5 },
+              asks: { [(abPrice + 0.001).toFixed(5)]: 10 + Math.random() * 5 },
               eventTime: Date.now()
             };
             dataPoint[trade.bc.ticker] = {
-              bids: { '0.02': 10 + Math.random() * 5 },
-              asks: { '0.03': 10 + Math.random() * 5 },
+              bids: { [bcPrice.toFixed(5)]: 10 + Math.random() * 5 },
+              asks: { [(bcPrice + 0.001).toFixed(5)]: 10 + Math.random() * 5 },
               eventTime: Date.now()
             };
             dataPoint[trade.ca.ticker] = {
-              bids: { '0.01': 10 + Math.random() * 5 },
-              asks: { '0.02': 10 + Math.random() * 5 },
+              bids: { [caPrice.toFixed(5)]: 10 + Math.random() * 5 },
+              asks: { [(caPrice + 0.001).toFixed(5)]: 10 + Math.random() * 5 },
               eventTime: Date.now()
             };
           }
           historicalData.push(dataPoint);
+
         }
         return historicalData;
       }
    </diff>
