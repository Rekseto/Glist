const fs = require("fs");
const fsPromises = require("fs").promises;
const fsHelpers = require("./helpers/fsHelpers");

class Statistics {
  constructor(options) {
    this.statsPath = options.statsPath;
  }
  /**
   * Saves particular content of metrics to file
   *
   * @param   {string} content        Content to save
   *
   */
  async saveStat(content) {
    const { statsPath } = this;
    const date = new Date()
      .toLocaleDateString("en-US")
      .split("/")
      .join(".");

    const fileName = `${statsPath}/${date}.stats`;

    const text = content + "\r\n";
    try {
      await fsPromises.appendFile(fileName, text, "utf8");
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Returns metrics for given range.
   *
   * @param   {Date}    startingDate       starting range Date
   * @param   {Date}    endingDate         ending range Date
   * @return  {Array}
   */
  async getStats(startingDate, endingDate) {
    // @TODO
    const { statsPath } = this;
    try {
      const names = await fsPromises.readdir(statsPath);

      for await (const name of names) {
        const date = new Date(name.substring(0, name.length - 6));
        if ((date > startingDate) & (date < endingDate)) {
          const readStream = fs.createReadStream(`${statsPath}/${name}`, {
            encoding: "utf8",
            highWaterMark: 1024
          });

          for await (const chunk of readStream) {
            console.log(chunk);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Statistics;
