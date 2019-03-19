const fs = require("fs");
const fsPromises = require("fs").promises;

async function* chunksToLines(chunksAsync) {
  let previous = "";
  for await (const chunk of chunksAsync) {
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\r\n")) >= 0) {
      const line = previous.slice(0, eolIndex + 1);

      yield line;

      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}

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
    /*
    @TODO
    Consider moving metrics to database (time series data)
    **/
    const { statsPath } = this;
    try {
      const names = await fsPromises.readdir(statsPath);
      const result = [];
      for await (const name of names) {
        const date = new Date(name.substring(0, name.length - 6));
        if ((date > startingDate) & (date < endingDate)) {
          const readStream = fs.createReadStream(`${statsPath}/${name}`, {
            encoding: "utf8",
            highWaterMark: 1024
          });

          for await (const line of chunksToLines(readStream)) {
            try {
              result.push(JSON.parse(line.replace("\r", "").replace("\n", "")));
            } catch (error) {}
          }
        }
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Statistics;
