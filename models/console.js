const mongoose = require("mongoose");
const { millify } = require("millify");

const Schema = mongoose.Schema;

const ConsoleSchema = new Schema({
   name: {type: String, required: true, maxLength: 50} ,
   description: {type: String, required: true},
   releaseYear: {type: Number, min: 1972, required: true},
   totalSales: {type: Number, required: true},
   originalPrice: {type:Number},
   developer: {type: Schema.Types.ObjectId, ref: "Developer", required: true},
   controllerInput: {type: String},
   display: {type: String},
   gpu: {type: String},
   cpu: {type: String},
   memory: {type: String},
   storage: {type: String},
   image: {
        data: Buffer,
        contentType: String,
    },
});

ConsoleSchema.virtual("url").get(function () {
    return `/console/${this._id}`;
});

ConsoleSchema.virtual("totalSales_formatted").get(function () {
    return millify(this.totalSales);
});

module.exports = mongoose.model("Console", ConsoleSchema);