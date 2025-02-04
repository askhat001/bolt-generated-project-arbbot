<diff path="src/main/StrategyManager.js">
      @@ -1,5 +1,6 @@
     const ArbitrageExecution = require('./ArbitrageExecution');
     const BinanceApi = require('./BinanceApi');
+    const Config = require('./Config');
     const logger = require('./Loggers');
     const Util = require('./Util');
     const CONFIG = require('../config/config');
@@ -12,6 +13,7 @@
         const startTime = Date.now();
 
         const { symbol } = calculated.trade;
+        const fee = Config.EXECUTION.FEE;
         const age = {
         const hedgedCalculation = await RiskManager.dynamicHedging(adjustedCalculation);
           const mlPrediction = MLManager.predictArbitrageSuccess(hedgedCalculation);
    </diff>
