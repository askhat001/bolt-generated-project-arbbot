<diff path="src/main/Main.js">
      @@ -1,5 +1,6 @@
+    const MarketAnalyzer = require('./MarketAnalyzer');
     const logger = require('./Loggers');
     const CONFIG = require('./Config');
     const Util = require('./Util');
@@ -108,7 +109,7 @@
         (calculated) => {
           const adjustedCalculation = StrategyManager.applyStrategy(calculated);
           const riskAdjustedSize = RiskManager.getRiskAdjustedPositionSize(adjustedCalculation);
-          const hedgedCalculation = RiskManager.dynamicHedging(adjustedCalculation);
+          const hedgedCalculation = await RiskManager.dynamicHedging(adjustedCalculation);
           const mlPrediction = MLManager.predictArbitrageSuccess(hedgedCalculation);
           if (mlPrediction < 0.5) {
             logger.execution.trace(`Blocking execution due to low ML prediction: ${mlPrediction.toFixed(2)}`);
    </diff>
