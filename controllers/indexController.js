const asyncHandler = require("express-async-handler");
const Console = require("../models/console");
const Developer = require("../models/developer");

exports.index = asyncHandler(async (req, res, next) => {
    const [allDevelopers, allConsoles] = await Promise.all([
        Developer.find({})
            .sort({name: 1})
            .exec(),
        Console.find({}, "name releaseYear totalSales developer image")
            .populate("developer")
            .sort({name: 1})
            .exec(),
    ])
    res.render("index", { title: "Console DB", developers: allDevelopers, consoles: allConsoles});
})