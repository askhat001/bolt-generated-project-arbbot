<diff path="src/main/BinanceApi.js">
      @@ -40,7 +40,7 @@
     marketBuy(ticker, quantity) {
         logger.execution.info(`${binance.getOption('test') ? 'Test: Buying' : 'Buying'} ${quantity} ${ticker} @ market price`);
         const before = Date.now();
-        return BinanceApi.circuit.fire(() => binance.marketBuy(ticker, quantity, { type: 'MARKET' }))
+        return BinanceApi.circuit.fire(() => binance.marketBuy(ticker, quantity, { type: 'MARKET' })).catch(BinanceApi.handleBinanceError)
             .then(response => {
                 if (binance.getOption('test')) {
                     logger.execution.info(`Test: Successfully bought ${ticker} @ market price`);
@@ -55,7 +55,7 @@
     marketSell(ticker, quantity) {
         logger.execution.info(`${binance.getOption('test') ? 'Test: Selling' : 'Selling'} ${quantity} ${ticker} @ market price`);
         const before = Date.now();
-        return binance.marketSell(ticker, quantity, { type: 'MARKET' })
+        return BinanceApi.circuit.fire(() => binance.marketSell(ticker, quantity, { type: 'MARKET' })).catch(BinanceApi.handleBinanceError)
             .then(response => {
                 if (binance.getOption('test')) {
                     logger.execution.info(`Test: Successfully sold ${ticker} @ market price`);
@@ -70,15 +70,22 @@
         return method === 'BUY' ? BinanceApi.marketBuy : BinanceApi.marketSell;
     },
 
-    handleBuyOrSellError(error) {
+    handleBinanceError(error) {
         try {
-            return Promise.reject(new Error(JSON.parse(error.body).msg));
+            const parsedError = JSON.parse(error.body);
+            const errorMessage = parsedError.msg || error.message || 'Unknown Binance API error';
+            const errorCode = parsedError.code || error.code || 'UNKNOWN';
+            logger.binance.error(`Binance API error: ${errorMessage} (Code: ${errorCode})`);
+            const errorWithCode = new Error(errorMessage);
+            errorWithCode.code = errorCode;
+            return Promise.reject(errorWithCode);
         } catch (e) {
             logger.execution.error(error);
             return Promise.reject(new Error(error.body));
         }
     },
 
+
     time() {
         return binance.time(null);
     },
    </diff>
