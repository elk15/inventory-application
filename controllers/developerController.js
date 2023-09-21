const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Developer = require("../models/developer");
const Console = require("../models/console");

require('dotenv').config();

exports.developer_get = asyncHandler(async (req, res, next) => {
    const [allConsoles, developer, allDevelopers] = await Promise.all([
        Console.find({developer: req.params.id}, "name releaseYear totalSales developer")
        .sort({name: 1})
        .exec(),
        Developer.findById(req.params.id).exec(),
        Developer.find().sort({name: 1}).exec(),
    ]) 
    
    res.render("index", {title: developer.name, consoles: allConsoles, developers: allDevelopers})
});

exports.developer_add_get = asyncHandler(async (req, res, next) => {
    const allDevelopers = await Developer.find().sort({name: 1}).exec();

    res.render("developer_form", {title: "Add A Developer", developers: allDevelopers,});
});

exports.developer_add_post = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({min: 3})
        .withMessage("Name must be at least 3 characters long")
        .isLength({max: 50})
        .withMessage("Name cannot exceed 50 characters")
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const developer = new Developer({name: req.body.name});

        if (!errors.isEmpty()) {
            const allDevelopers = await Developer.find().sort({name: 1}).exec();

            res.render("developer_form", {
                title: "Add A Developer", 
                developers: allDevelopers,
                developer: developer,
                errors: errors.array(),
            })
        } else {
            const developerExists = await Developer.findOne({name: req.body.name})
            .collation({locale: "en", strength: 2})
            .exec();

            if (developerExists) {
                res.redirect(developerExists.url);
            } else {
                await developer.save();
                res.redirect(developer.url);
            }
        }
    })
]

exports.developer_delete_get = asyncHandler(async (req, res, next) => {
    const [developer, allDeveloperConsoles, allDevelopers] = await Promise.all([
        Developer.findById(req.params.id).exec(),
        Console.find({developer: req.params.id}, "name").exec(),
        Developer.find().sort({name: 1}).exec(),
    ]) 

    if (developer === null) {
        res.redirect("/");
    }

    res.render("developer_delete", {
        title: "Delete Developer", 
        developers: allDevelopers, 
        developer: developer,
        developer_consoles: allDeveloperConsoles,
    });
})

exports.developer_delete_post = [
    body("password", "Incorrect Password")
        .trim()
        .equals(process.env.SECRET_PASSWORD)
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const [developer,allDeveloperConsoles, allDevelopers] = await Promise.all([
                Developer.findById(req.params.id).exec(),
                Console.find({developer: req.params.id}, "name").exec(),
                Developer.find().sort({name: 1}).exec(),
            ]) 


            if (developer === null) {
                res.redirect("/");
            }

            res.render("developer_delete", {
                title: "Delete Developer",
                developer: developer,
                developers: allDevelopers,
                developer_consoles: allDeveloperConsoles,
                errors: errors.array(),
            });
        } else {
            await Developer.findByIdAndRemove(req.body.developerid);
            res.redirect("/");
        }

    })
]

exports.developer_update_get = asyncHandler(async (req, res, next) => {
    const [developer, allDevelopers] = await Promise.all([
        Developer.findById(req.params.id).exec(),
        Developer.find().sort({name: 1}).exec(),
    ]);

    res.render("developer_form", {
        title: "Update Developer", 
        developer: developer, 
        developers: allDevelopers,
        update: true,
    });
})

exports.developer_update_post = [
    body("name", "Name is required")
        .trim()
        .notEmpty()
        .escape(),
    body("password", "Incorrect Password")
        .trim()
        .equals(process.env.SECRET_PASSWORD)
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const developer = new Developer({name: req.body.name, _id: req.params.id});

        if (!errors.isEmpty()) {
            const allDevelopers = await Developer.find().sort({name: 1}).exec();

            res.render("developer_form", {
                title: "Update Developer",
                developer: developer,
                developers: allDevelopers,
                update: true,
                errors: errors.array(),
            });
        } else {
            console.log('hi!')
            const updatedDeveloper = await Developer.findByIdAndUpdate(req.params.id, developer, {});
            res.redirect(updatedDeveloper.url);
        }

    }),
]