<diff path="src/main/Config.js">
      @@ -31,7 +31,8 @@
         STRATEGY: process.env.EXECUTION_STRATEGY || 'linear',
         TEMPLATE: (process.env.EXECUTION_TEMPLATE || 'BUY,SELL,SELL').split(','),
         FEE: parseFloat(process.env.EXECUTION_FEE || '0.075'),
-        THRESHOLD: {
+        DYNAMIC_FEE: process.env.DYNAMIC_FEE === 'true',
+          THRESHOLD: {
           PROFIT: parseFloat(process.env.EXECUTION_THRESHOLD_PROFIT || '0.00'),
           AGE: parseInt(process.env.EXECUTION_THRESHOLD_AGE || '25')
         }
    </diff>
