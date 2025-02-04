<diff path="test/BinanceApi.test.js">
      @@ -1,5 +1,6 @@
     const BinanceApi = require('../src/main/BinanceApi');
+    const logger = require('../src/main/Loggers');
     const Binance = require('node-binance-api');
 
     jest.mock('node-binance-api', () => {
@@ -109,6 +111,7 @@
     describe('BinanceApi', () => {
       it('should fetch exchange info', async () => {
         const result = await BinanceApi.exchangeInfo();
+
         expect(result).toBeDefined();
       });
 
@@ -149,6 +152,14 @@
         BinanceApi.depthCacheStaggered(tickers, 10, 10, cb);
         expect(Binance().websockets.depthCacheStaggered).toHaveBeenCalled();
       });
+
+      it('should handle Binance API error', async () => {
+        const error = { body: '{"msg": "Test error", "code": -1013}' };
+        const spy = jest.spyOn(logger.binance, 'error');
+        await expect(BinanceApi.handleBinanceError(error)).rejects.toThrow('Test error');
+        expect(spy).toHaveBeenCalled();
+        spy.mockRestore();
+      });
     });
