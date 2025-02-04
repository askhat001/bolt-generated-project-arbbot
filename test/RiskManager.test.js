<diff path="test/RiskManager.test.js">
      @@ -1,5 +1,7 @@
     const RiskManager = require('../src/main/RiskManager');
+    const Config = require('../src/main/Config');
+    Config.INVESTMENT = { BTC: { MIN: 0.01, MAX: 0.1, STEP: 0.01 } };
+    Config.EXECUTION = {THRESHOLD: {PROFIT: 0.01}}
 
     describe('RiskManager', () => {
       it('should calculate Kelly Criterion', () => {
@@ -48,6 +50,12 @@
         ];
         expect(RiskManager.checkMaxExposure(balances, trades2)).toBe(true);
       });
+
+      it('should calculate risk adjusted position size', async () => {
+        const calculated = { trade: { symbol: { a: 'BTC' } }, percent: 1 };
+        const size = await RiskManager.getRiskAdjustedPositionSize(calculated);
+        expect(size).toBeGreaterThan(0);
+      });
     });
    </diff>
