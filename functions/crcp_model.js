import mongoose from "mongoose"

const crcpSchema = new mongoose.Schema({
  sid: String,
  title: String,
  desc : String,
  chapter : Number,
}, {
	collection : `code_of_criminal_procedure`
})

export default new mongoose.model('code_of_criminal_procedure', crcpSchema)
