import mongoose from "mongoose"

const ipcSchema = new mongoose.Schema({
  sid: String,
  title: String,
  desc : String,
  chapter : Number,
}, {
	collection : `indian_penal_codes`
})

export default new mongoose.model('indian_penal_codes', ipcSchema)
