const Util = require('../src/main/Util');

    describe('Util', () => {
      it('should calculate the sum of an array', () => {
        const array = [1, 2, 3, 4, 5];
        const sum = Util.sum(array);
        expect(sum).toBe(15);
      });

      it('should calculate the average of an array', () => {
        const array = [1, 2, 3, 4, 5];
        const average = Util.average(array);
        expect(average).toBe(3);
      });

      it('should prune an object', () => {
        const object = { a: 1, b: 2, c: 3, d: 4, e: 5 };
        const prunedObject = Util.prune(object, 3);
        expect(Object.keys(prunedObject).length).toBe(3);
        expect(prunedObject.a).toBe(1);
        expect(prunedObject.b).toBe(2);
        expect(prunedObject.c).toBe(3);
      });

      it('should prune a snapshot', () => {
        const snapshot = {
          bids: { a: 1, b: 2, c: 3, d: 4, e: 5 },
          asks: { a: 1, b: 2, c: 3, d: 4, e: 5 }
        };
        const prunedSnapshot = Util.pruneSnapshot(snapshot, 3);
        expect(Object.keys(prunedSnapshot.bids).length).toBe(3);
        expect(Object.keys(prunedSnapshot.asks).length).toBe(3);
      });

      it('should calculate milliseconds since', () => {
        const now = Date.now();
        const ms = Util.millisecondsSince(now - 1000);
        expect(ms).toBeGreaterThanOrEqual(999);
        expect(ms).toBeLessThanOrEqual(1001);
      });
    });
