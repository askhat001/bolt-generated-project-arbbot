<diff path="src/main/RiskManager.js">
      @@ -74,11 +74,14 @@
         return 1;
       },
 
-      getRiskAdjustedPositionSize(calculated) {
+      async getRiskAdjustedPositionSize(calculated) {
         const base = calculated.trade.symbol.a;
         const winProbability = 0.6; // Placeholder
         const winRatio = 1 + (calculated.percent / 100);
         const lossRatio = 1; // Placeholder
+        const systematicRisk = await RiskManager.calculateSystematicRisk(calculated.trade);
+        const riskAdjustedWinProbability = winProbability * (1 - systematicRisk);
+
         const kellyFraction = RiskManager.calculateKellyCriterion(winProbability, winRatio, lossRatio);
         const maxPositionSize = CONFIG.INVESTMENT[base].MAX;
         const riskAdjustedSize = maxPositionSize * kellyFraction;
@@ -94,12 +97,16 @@
         return calculated;
       },
 
-      calculateSystematicRisk(trades) {
+      async calculateSystematicRisk(trade) {
         // Placeholder for systematic risk calculation
         // Requires historical data and statistical analysis
         // For now, return a default value
-        return 0.1;
+        const volatility = Math.random() * 0.05;
+        const correlation = Math.random() * 0.2;
+        const historicalVolatility = await RiskManager.getHistoricalVolatility(trade);
+        return (volatility + historicalVolatility) * correlation;
       },
+      async getHistoricalVolatility(trade) { return Math.random() * 0.02 }
     };
 
     module.exports = RiskManager;
    </diff>
