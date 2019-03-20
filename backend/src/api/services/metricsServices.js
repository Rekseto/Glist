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
    }
  };
};
