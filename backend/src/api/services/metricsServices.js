module.exports = function({ database, logger }) {
  const { Metric } = database.models;

  return {
    createMetric: async function({ language, browser, system, languages }) {
      try {
        const metric = await Metric.create({
          language,
          browser,
          system,
          languages,
          date: new Date()
        });

        return metric;
      } catch (error) {
        throw error;
      }
    },
    fetchInRange: async function({ startingDate, endingDate }) {
      try {
        const metrics = await Metric.find({
          date: {
            $gt: startingDate,
            $lt: endingDate
          }
        });

        return metrics;
      } catch (error) {
        throw error;
      }
    }
  };
};
