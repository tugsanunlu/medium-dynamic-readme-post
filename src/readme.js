const fs = require("fs");
const axios = require("axios");

const APP = {
  FEED: "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tugsanunlu",
  README_PATH: "README.md",
};

axios.get(APP.FEED).then((resp) => {
  const { items } = resp.data;
  const template = items.reduce((list, item) => {
    return list + `\n* [${item.title}](${item.link})\n`;
  }, "");

  fs.readFile(APP.README_PATH, "utf-8", (err, data) => {
    if (err) throw err;
    fs.writeFile(
      APP.README_PATH,
      data.replace(
        /<!-- DATA:START -->([\s\S]*?)<!-- DATA:END -->/m,
        `<!-- DATA:START -->${template}<!-- DATA:END -->`
      ),
      "utf-8",
      (err) => {
        if (err) throw err;
        console.log("README updated 🎉.");
      }
    );
  });
});
