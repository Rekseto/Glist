const fs = require("fs");

class Statistics {
  constructor(options) {
    this.statsPath = options.statsPath;
  }

  saveStat() {
    const date = new Date().toLocaleDateString("en-US");
  }
}

module.exports = Statistics;
