import axios from "axios";
import cheerio from "cheerio";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ipcSchema from "./ipc_model.js";
dotenv.config();
const db_uri = process.env.DB_URI;

const total_chapters = 24;
const addZeroBefore = (n) => {
  return (n < 10 ? "0" : "") + n;
};

async function scrape_chapters() {
  const data = [];

  for (let z = 1; total_chapters > z; z++) {
    const url = `http://devgan.in/ipc/chapter_${addZeroBefore(z)}.php`;
    const req = await axios.get(url);
    const res = await req.data;
    const chapter = z;
    const $ = cheerio.load(res);
    $(".sectxt").map(function (x, elm) {
      const desc = $(elm).text().replace(/\s+/g, " ").trim();
      const sid = $(elm)
        .prev()
        .children()
        .attr("name")
        .replace("s", "section_");
      const title = $(elm).prev().text().replace(/\s+/g, " ").trim();
      data.push({
        sid,
        title,
        desc,
        chapter,
      });
    });
  }

  return data;
}

function startSracping() {
  scrape_chapters()
    .then((data) => {
      mongoose
        .connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
          for (let i in data) {
            const ipc = data[i];
            await new ipcSchema(ipc).save();
          }
        });
    })
    .then(() => {
      console.log(`Database Created`);
    });
      return;
}

startSracping();
