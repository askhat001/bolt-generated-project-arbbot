<diff path="src/main/CalculationNode.js">
      @@ -267,6 +267,36 @@
         return i;
     },
 
+    simulateOrderBookImpact(method, quantity, depthSnapshot) {
+      let simulatedDepth = { ...depthSnapshot, bids: { ...depthSnapshot.bids }, asks: { ...depthSnapshot.asks } };
+      let remainingQuantity = quantity;
+
+      if (method === 'SELL') {
+        for (const price in simulatedDepth.bids) {
+          if (remainingQuantity <= 0) break;
+          const availableQuantity = simulatedDepth.bids[price];
+          if (remainingQuantity >= availableQuantity) {
+            delete simulatedDepth.bids[price];
+            remainingQuantity -= availableQuantity;
+          } else {
+            simulatedDepth.bids[price] -= remainingQuantity;
+            remainingQuantity = 0;
+          }
+        }
+      } else {
+        for (const price in simulatedDepth.asks) {
+          if (remainingQuantity <= 0) break;
+          const availableQuantity = simulatedDepth.asks[price];
+          if (remainingQuantity >= availableQuantity) {
+            delete simulatedDepth.asks[price];
+            remainingQuantity -= availableQuantity;
+          } else {
+            simulatedDepth.asks[price] -= remainingQuantity;
+            remainingQuantity = 0;
+          }
+        }
+      }
+      return simulatedDepth;
     calculateDustless(amount, dustDecimals, depthSnapshot, depthThreshold = 10) {
         if (Number.isInteger(amount)) return amount;
         const amountString = amount.toFixed(12);
    </diff>
