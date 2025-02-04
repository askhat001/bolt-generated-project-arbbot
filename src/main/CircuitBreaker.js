const logger = require('./Loggers');

    const circuitBreaker = (failureThreshold = 3, callTimeout = 5000, resetTimeout = 10000) => {
      let state = 'CLOSED';
      let failureCount = 0;
      let nextTry = 0;

      const checkState = () => {
        if (state === 'OPEN') {
          if (Date.now() < nextTry) {
            const error = new Error('Circuit Breaker is OPEN');
            error.code = 'CIRCUIT_OPEN';
            throw error;
          }
          state = 'HALF_OPEN';
        }
      };

      const succeed = () => {
        logger.binance.info('Circuit Breaker state: CLOSED');
        failureCount = 0;
        state = 'CLOSED';
      };

      const fail = () => {
        failureCount++;
        logger.binance.warn(`Failure #${failureCount}`);
        if (failureCount >= failureThreshold) {
          state = 'OPEN';
          nextTry = Date.now() + resetTimeout;
          logger.binance.warn(`Circuit Breaker state: OPEN (for ${resetTimeout}ms)`);
        }
      };

      const fire = async (fn) => {
        checkState();
        try {
          const timer = setTimeout(() => {
            const error = new Error('Call timed out');
            error.code = 'TIMEOUT';
            fail();
            throw error;
          }, callTimeout);
          const result = await fn();
          clearTimeout(timer);
          succeed();
          return result;
        } catch (error) {
          fail();
          throw error;
        }
      };

      return { fire };
    };

    module.exports = circuitBreaker;
