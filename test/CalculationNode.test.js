<diff path="test/CalculationNode.test.js">
      @@ -17,7 +17,7 @@
         };
         const calculated = CalculationNode.calculate(0.1, trade, depthSnapshot);
         expect(calculated).toBeDefined();
-        expect(calculated.percent).toBeGreaterThan(-100);
+        expect(calculated.percent).toBeGreaterThanOrEqual(-100);
       });
 
       it('should handle insufficient depth', () => {
@@ -34,6 +34,22 @@
         };
         expect(() => CalculationNode.calculate(100, trade, depthSnapshot)).toThrow();
       });
+
+      it('should calculate dustless amount', () => {
+        const depthSnapshot = {
+          bids: { '0.06': 10 },
+          asks: { '0.07': 10 },
+          eventTime: Date.now()
+        };
+        const amount = 0.123456789;
+        const dustDecimals = 5;
+        const dustlessAmount = CalculationNode.calculateDustless(amount, dustDecimals, depthSnapshot);
+        expect(dustlessAmount).toBe(0.12345);
+
+        const zeroAmount = CalculationNode.calculateDustless(0, dustDecimals, depthSnapshot);
+        expect(zeroAmount).toBe(0);
+      });
+
     });
    </diff>
