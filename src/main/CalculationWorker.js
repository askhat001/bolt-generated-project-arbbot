const { parentPort } = require('worker_threads');
    const CalculationNode = require('./CalculationNode');

    parentPort.on('message', (data) => {
      const { trades, depthSnapshots } = data;
      const results = {};
      for (const trade of trades) {
        try {
          const calculated = CalculationNode.optimize(trade, depthSnapshots);
          results[calculated.id] = calculated;
        } catch (error) {
          // Ignore errors in worker
        }
      }
      parentPort.postMessage(results);
    });
