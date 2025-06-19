const fs = require("fs");
const path = require("path");

module.exports = {
  commandType: (event) => {
    if (event.content) return "message";
    if (event.isCommand()) return "slashCommand";
    if (event.isButton()) return "button";
    if (event.isSelectMenu()) return "selectMenu";
    if (event.isContextMenu()) return "contextMenu";
    if (event.isAutocomplete()) return "autocomplete";
    if (event.isModalSubmit()) return "modal";
    return "other";
  },

  alert: (...args) => {
    if (!fs.existsSync(path.join(process.cwd(), "channels"))) fs.mkdirSync(path.join(process.cwd(), "channels"));

    let id = Date.now();
    fs.writeFileSync(path.join(process.cwd(), "channels/dialog.txt"), id + "\nalert\n" + JSON.stringify(args));

    return new Promise((resolve, reject) => {
      fs.watch(path.join(process.cwd(), "channels/dialog.txt"), (eventType) => {
        if ((eventType !== "change") || (fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[0] !== id.toString()) || !fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[1].startsWith("response")) return;

        if (Array.isArray(JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(2).join("\n") || null))) {
          ((fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[1].slice(8).toLowerCase() === "resolve") ? resolve : reject)(...JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(2).join("\n") || "[]"));
        };
      });
    });
  },

  confirm: (...args) => {
    if (!fs.existsSync(path.join(process.cwd(), "channels"))) fs.mkdirSync(path.join(process.cwd(), "channels"));

    let id = Date.now();
    fs.writeFileSync(path.join(process.cwd(), "channels/dialog.txt"), id + "\nconfirm\n" + JSON.stringify(args));

    return new Promise((resolve, reject) => {
      fs.watch(path.join(process.cwd(), "channels/dialog.txt"), (eventType) => {
        if ((eventType !== "change") || (fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[0] !== id.toString()) || !fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[1].startsWith("response")) return;

        if (Array.isArray(JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(2).join("\n") || null))) {
          ((fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[1].slice(8).toLowerCase() === "resolve") ? resolve : reject)(...JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(2).join("\n") || "[]"));
        };
      });
    });
  },

  prompt: (...args) => {
    if (!fs.existsSync(path.join(process.cwd(), "channels"))) fs.mkdirSync(path.join(process.cwd(), "channels"));

    let id = Date.now();
    fs.writeFileSync(path.join(process.cwd(), "channels/dialog.txt"), id + "\nprompt\n" + JSON.stringify(args));

    return new Promise((resolve, reject) => {
      fs.watch(path.join(process.cwd(), "channels/dialog.txt"), (eventType) => {
        if ((eventType !== "change") || (fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[0] !== id.toString()) || !fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[1].startsWith("response")) return;

        if (Array.isArray(JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(2).join("\n") || null))) {
          ((fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[1].slice(8).toLowerCase() === "resolve") ? resolve : reject)(...JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(2).join("\n") || "[]"));
        };
      });
    });
  }
};