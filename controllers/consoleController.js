const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Console = require("../models/console");
const Developer = require("../models/developer");
require('dotenv').config();

exports.console_add_get = asyncHandler(async (req, res, next) => {
    const allDevelopers = await Developer.find({}).exec();
    
    res.render("console_form", { title: "Add A Console", developers: allDevelopers});
})

exports.console_add_post = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength( {max: 50} )
        .withMessage("Length cannot exceed 50 characters")
        .escape(),
    body("description", "Description is required")
        .trim()
        .notEmpty()
        .escape(),
    body("releaseYear")
        .trim()
        .notEmpty()
        .withMessage("Release year is required")
        .isInt( {min: 1972})
        .withMessage("Must be an integer greater or equal to 1972")
        .escape(),
    body("totalSales")
        .trim()
        .notEmpty()
        .withMessage("Total sales is required")
        .isInt()
        .withMessage("Must be an integer")
        .escape(),
    body("developer", "Developer is required")
        .trim()
        .notEmpty()
        .escape(),
    body("originalPrice")
        .trim()
        .toFloat()
        .escape(),
    body("controllerInput")
        .trim()
        .escape(),
    body("display")
        .trim()
        .escape(),
    body("gpu")
        .trim()
        .escape(),
    body("cpu")
        .trim()
        .escape(),
    body("memory")
        .trim()
        .escape(),
    body("storage")
        .trim()
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const gameconsole = new Console({
            name: req.body.name,
            description: req.body.description,
            releaseYear: req.body.releaseYear,
            totalSales: req.body.totalSales,
            developer: req.body.developer,
            originalPrice: req.body.originalPrice,
            controllerInput: req.body.controllerInput,
            display: req.body.display,
            gpu: req.body.gpu,
            cpu: req.body.cpu,
            memory: req.body.memory,
            storage: req.body.storage,
        })

        if (!errors.isEmpty()) {
            const allDevelopers = await Developer.find({}).exec();
    
            res.render("console_form", { 
                title: "Add A Console", 
                developers: allDevelopers,
                gameconsole: gameconsole,
                errors: errors.array(),
            });
        } else {
            await gameconsole.save();
            res.redirect(gameconsole.url);
        }
    })
]

exports.console_delete_get = asyncHandler(async (req, res, next) => {
    const [gameconsole, allDevelopers] = await Promise.all([
        Console.findById(req.params.id).exec(),
        Developer.find().sort({name: 1}).exec(),
    ]) 

    if (gameconsole === null) {
        res.redirect("/");
    }

    res.render("console_delete", {
        title: "Delete Console",
        gameconsole: gameconsole,
        developers: allDevelopers,
    });
})

exports.console_delete_post = [
    body("password", "Incorrect Password")
        .trim()
        .equals(process.env.SECRET_PASSWORD)
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const [gameconsole, allDevelopers] = await Promise.all([
                Console.findById(req.params.id).exec(),
                Developer.find().sort({name: 1}).exec(),
            ]) 

            if (gameconsole === null) {
                res.redirect("/");
            }

            res.render("console_delete", {
                title: "Delete Console",
                gameconsole: gameconsole,
                developers: allDevelopers,
                errors: errors.array(),
            });
        } else {
            await Console.findByIdAndRemove(req.body.consoleid);
            res.redirect("/");
        }
    })
]

exports.console_update_get = asyncHandler(async (req, res, next) => {
    const [gameconsole, allDevelopers] = await Promise.all([
        Console.findById(req.params.id).populate("developer").exec(),
        Developer.find().exec(),
    ]);

    if (gameconsole === null) {
        const err = new Error("Console not found");
        err.status = 404;
        return next(err);
    }

    res.render("console_form", {
        title: "Update Console",
        developers: allDevelopers,
        gameconsole: gameconsole,
        update: true,
    })
})

exports.console_update_post = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength( {max: 50} )
        .withMessage("Length cannot exceed 50 characters")
        .escape(),
    body("description", "Description is required")
        .trim()
        .notEmpty()
        .escape(),
    body("releaseYear")
        .trim()
        .notEmpty()
        .withMessage("Release year is required")
        .isInt( {min: 1972})
        .withMessage("Must be an integer greater or equal to 1972")
        .escape(),
    body("totalSales")
        .trim()
        .notEmpty()
        .withMessage("Total sales is required")
        .isInt()
        .withMessage("Must be an integer")
        .escape(),
    body("developer", "Developer is required")
        .trim()
        .notEmpty()
        .escape(),
    body("originalPrice")
        .trim()
        .toFloat()
        .escape(),
    body("controllerInput")
        .trim()
        .escape(),
    body("display")
        .trim()
        .escape(),
    body("gpu")
        .trim()
        .escape(),
    body("cpu")
        .trim()
        .escape(),
    body("memory")
        .trim()
        .escape(),
    body("storage")
        .trim()
        .escape(),
    body("password", "Incorrect Password")
        .trim()
        .equals(process.env.SECRET_PASSWORD)
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const gameconsole = new Console({
            name: req.body.name,
            description: req.body.description,
            releaseYear: req.body.releaseYear,
            totalSales: req.body.totalSales,
            developer: req.body.developer,
            originalPrice: req.body.originalPrice,
            controllerInput: req.body.controllerInput,
            display: req.body.display,
            gpu: req.body.gpu,
            cpu: req.body.cpu,
            memory: req.body.memory,
            storage: req.body.storage,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            const allDevelopers = await Developer.find().exec();

            res.render("console_form", {
                title: "Update Console",
                developers: allDevelopers,
                gameconsole: gameconsole,
                update: true,
            })
        } else {
            const updatedGameConsole = await Console.findByIdAndUpdate(req.params.id, gameconsole, {});
            res.redirect(updatedGameConsole.url);
        }

    })
]

exports.console_detail = asyncHandler(async (req, res, next) => {
    const [gameconsole, allDevelopers] = await Promise.all([
        Console.findById(req.params.id).populate("developer").exec(),
        Developer.find().sort({name: 1}).exec(),
    ]) 

    if (gameconsole === null) {
        const err = new Error("Console not found");
        err.status = 404;
        return next(err);
    }

    res.render("console_detail", {
        title: gameconsole.name,
        gameconsole: gameconsole,
        developers: allDevelopers,
    });
})