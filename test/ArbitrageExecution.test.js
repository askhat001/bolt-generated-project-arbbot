<diff path="test/ArbitrageExecution.test.js">
      @@ -1,6 +1,7 @@
     const ArbitrageExecution = require('../src/main/ArbitrageExecution');
     const BinanceApi = require('../src/main/BinanceApi');
+    const logger = require('../src/main/Loggers');
     const Util = require('../src/main/Util');
     const CONFIG = require('../config/config');
 
@@ -89,6 +91,14 @@
         const result = ArbitrageExecution.handleSlippage(actual);
         expect(result).toBeDefined();
       });
+
+      it('should log slippage warning', () => {
+        const actual = { symbol: { a: 'BTC', b: 'ETH', c: 'LTC' }, a: { earned: 0.99, spent: 1 }, b: { earned: 1, spent: 1 }, c: { earned: 1, spent: 1 } };
+        const spy = jest.spyOn(logger.execution, 'warn');
+        ArbitrageExecution.handleSlippage(actual);
+        expect(spy).toHaveBeenCalled();
+        spy.mockRestore();
+      });
     });
    </diff>
