#! /usr/bin/env node

console.log(
    'This script populates some test consoles and developers'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Console = require("./models/console");
  const Developer = require("./models/developer");
  
  const developers = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createDevelopers();
    await createConsoles();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function developerCreate(index, name) {
    const developer = new Developer({ name: name });
    await developer.save();
    developers[index] = developer;
    console.log(`Added developer: ${name}`);
  }
  
  async function consoleCreate(index, name, description, releaseYear, totalSales, originalPrice, developer, controllerInput, display, gpu, cpu, memory, storage) {
    const consoleDetail = {
      name: name,
      description: description,
      releaseYear: releaseYear,
      totalSales: totalSales,
      developer: developer,
    };
    if (originalPrice != false) consoleDetail.originalPrice = originalPrice;
    if (controllerInput != false) consoleDetail.controllerInput = controllerInput;
    if (display != false) consoleDetail.display = display;
    if (gpu != false) consoleDetail.gpu = gpu;
    if (cpu != false) consoleDetail.cpu = cpu;
    if (memory != false) consoleDetail.memory = memory;
    if (storage != false) consoleDetail.storage = storage;
  
    const gameconsole = new Console(consoleDetail);
    await gameconsole.save();
    console.log(`Added console: ${name}`);
  }
  
  async function createDevelopers() {
    console.log("Adding developers");
    await Promise.all([
      developerCreate(0, "Sony"),
      developerCreate(1, "Microsoft"),
      developerCreate(2, "Nintendo"),
    ]);
  }
  
  async function createConsoles() {
    console.log("Adding consoles");
    await Promise.all([
      consoleCreate(0, 
        "Nintendo Switch", 
        "The Nintendo Switch is a video game console developed by Nintendo and released worldwide in most regions on March 3, 2017. The console itself is a tablet that can either be docked for home console use or used as a portable device, making it a hybrid console. Its wireless Joy-Con controllers, with standard buttons and directional analog sticks for user input, motion sensing, and tactile feedback, can attach to both sides of the console to support handheld-style play.",
        2017,
        129000000,
        329.99,
        developers[2],
        "Joy-Con",
        false,
        false,
        false,
        false,
        false,
        ),
      consoleCreate(1, 
        "Playstation 5", 
        "The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment. It was announced as the successor to the PlayStation 4 in April 2019, was launched on November 12, 2020, in Australia, Japan, New Zealand, North America, and South Korea, and was released worldwide one week later. The PS5 is part of the ninth generation of video game consoles, along with Microsoft's Xbox Series X/S consoles, which were released in the same month. ",
        2020,
        40000000,
        499.99,
        developers[0],
        "DualSense, DualShock 4, PlayStation Move",
        false,
        false,
        false,
        false,
        false,
        ),
      consoleCreate(2, 
        "Xbox One", 
        "The Xbox One is a home video game console developed by Microsoft. Announced in May 2013, it is the successor to Xbox 360 and the third console in the Xbox series. It was first released in North America, parts of Europe, Australia, and South America in November 2013 and in Japan, China, and other European countries in September 2014. It is the first Xbox game console to be released in China, specifically in the Shanghai Free-Trade Zone. Microsoft marketed the device as an \"all-in-one entertainment system\", hence the name \"Xbox One\".[18][19] An eighth-generation console, it mainly competed against Sony's PlayStation 4 and Nintendo's Wii U and later the Switch. ",
        2013,
        58000000,
        499.99,
        developers[1],
        "Xbox Wireless Controller, Kinect for Xbox One, keyboard, mouse",
        false,
        false,
        false,
        false,
        false,
        ),
    ]);
  }
  