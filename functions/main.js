import dotenv from "dotenv";
import mongoose from "mongoose";
import ipcSchema from "./ipc_model.js";
dotenv.config();
const db_uri = process.env.DB_URI;

export async function fetch_ipc(res) {
      mongoose
        .connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
	
	  ipcSchema.find({}, (err,items) => {
	    res.render('index', { items })
	  })

    })
}

