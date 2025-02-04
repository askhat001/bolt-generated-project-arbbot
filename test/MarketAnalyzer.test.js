<diff path="test/MarketAnalyzer.test.js">
      @@ -1,4 +1,5 @@
     const MarketAnalyzer = require('../src/main/MarketAnalyzer');
+    const BinanceApi = require('../src/main/BinanceApi');
 
     describe('MarketAnalyzer', () => {
       it('should calculate spread', () => {
@@ -34,6 +35,12 @@
         expect(volume).toBe(20);
       });
 
+      it('should analyze market data', async () => {
+        const ticker = 'ETHBTC';
+        const result = await MarketAnalyzer.analyzeMarketData(ticker);
+        expect(result).toBeDefined();
+      });
+
       it('should calculate trend', async () => {
         const ticker = 'ETHBTC';
         const trend = await MarketAnalyzer.calculateTrend(ticker);
    </diff>
