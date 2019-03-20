module.exports = mongoose => {
  const Schema = mongoose.Schema;

  const Metric = new Schema({
    browser: {
      type: String,
      enum: ["Google Chrome", "Firefox", "Opera", "Safari", "Edge", "Unknown"]
    },
    language: { type: String },
    system: {
      type: String,
      enum: ["Windows", "MacOS", "UNIX", "Linux", "Unknown"]
    },
    languages: { type: Array },
    date: Date
  });

  return { schema: Metric, modelName: "Metric" };
};
