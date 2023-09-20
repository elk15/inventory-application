const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 50},
})

DeveloperSchema.virtual("url").get(function() {
    return `/developer/${this._id}`;
});

module.exports = mongoose.model("Developer", DeveloperSchema);