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
  parseSlashCommandsFromJSON(SlashCommandBuilder, commandJSON) {
    function applyOptionData(optionBuilder, option) {
      optionBuilder.setName(option.name).setDescription(option.description);

      if (option.required) optionBuilder.setRequired(option.required);
      if (option.maxLength) optionBuilder.setMaxLength(option.maxLength);
      if (option.minLength) optionBuilder.setMinLength(option.minLength);
      if (option.minValue !== undefined) optionBuilder.setMinValue(option.minValue);
      if (option.maxValue !== undefined) optionBuilder.setMaxValue(option.maxValue);
      if (option.choices) optionBuilder.addChoices(...option.choices);
      if (option.autocomplete) optionBuilder.setAutocomplete(option.autocomplete);
      if (option.channelTypes) optionBuilder.addChannelTypes(...option.channelTypes);
      if (option.nameLocalizations) optionBuilder.setNameLocalizations(option.nameLocalizations);
      if (option.descriptionLocalizations) optionBuilder.setDescriptionLocalizations(option.descriptionLocalizations);

      return optionBuilder;
    };

    function buildOption(option) {
      switch (option.type) {
        case "STRING": return applyOptionData(new SlashCommandBuilder().addStringOption(() => {}), option);
        case "INTEGER": return applyOptionData(new SlashCommandBuilder().addIntegerOption(() => {}), option);
        case "BOOLEAN": return applyOptionData(new SlashCommandBuilder().addBooleanOption(() => {}), option);
        case "USER": return applyOptionData(new SlashCommandBuilder().addUserOption(() => {}), option);
        case "CHANNEL": return applyOptionData(new SlashCommandBuilder().addChannelOption(() => {}), option);
        case "ROLE": return applyOptionData(new SlashCommandBuilder().addRoleOption(() => {}), option);
        case "MENTIONABLE": return applyOptionData(new SlashCommandBuilder().addMentionableOption(() => {}), option);
        case "NUMBER": return applyOptionData(new SlashCommandBuilder().addNumberOption(() => {}), option);
        case "ATTACHMENT": return applyOptionData(new SlashCommandBuilder().addAttachmentOption(() => {}), option);
        case "SUB_COMMAND":
          return (sub) => {
            sub.setName(option.name).setDescription(option.description);
            if (option.options) {
              for (const subOpt of option.options) {
                const handler = buildOption(subOpt);
                if (typeof handler === "function") handler(sub);
              };
            };
            return sub;
          };
        default:
          return null;
      };
    };

    return commandsArray = commandJSON.map((cmd) => {
      const builder = new SlashCommandBuilder()
        .setName(cmd.name)
        .setDescription(cmd.description);

      if (cmd.options) {
        for (const option of cmd.options) {
          if (option.type === "SUB_COMMAND") {
            builder.addSubcommand(buildOption(option));
          } else {
            const handler = buildOption(option);
            if (handler && typeof handler === "object") {
              if (option.type === "STRING") builder.addStringOption(o => applyOptionData(o, option));
              if (option.type === "INTEGER") builder.addIntegerOption(o => applyOptionData(o, option));
              if (option.type === "BOOLEAN") builder.addBooleanOption(o => applyOptionData(o, option));
              if (option.type === "USER") builder.addUserOption(o => applyOptionData(o, option));
              if (option.type === "CHANNEL") builder.addChannelOption(o => applyOptionData(o, option));
              if (option.type === "ROLE") builder.addRoleOption(o => applyOptionData(o, option));
              if (option.type === "MENTIONABLE") builder.addMentionableOption(o => applyOptionData(o, option));
              if (option.type === "NUMBER") builder.addNumberOption(o => applyOptionData(o, option));
              if (option.type === "ATTACHMENT") builder.addAttachmentOption(o => applyOptionData(o, option));
            };
          };
        };
      };

      return builder.toJSON();
    });
  },
  alert: (...args) => {
    if (!fs.existsSync(path.join(process.cwd(), "channels"))) fs.mkdirSync(path.join(process.cwd(), "channels"));

    let id = Date.now();
    fs.writeFileSync(path.join(process.cwd(), "channels/dialog.txt"), id + "\nalert\n" + JSON.stringify(args));

    return new Promise((resolve, reject) => {
      fs.watch(path.join(process.cwd(), "channels/dialog.txt"), (eventType) => {
        if ((eventType !== "change") || (fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[0] !== id.toString()))  return;

        if (Array.isArray(JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(1).join("\n") || null))) {
          resolve(...JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(1).join("\n") || "[]"));
        };
      });
    });
  },
  confirm: (...args) => {
    if (!fs.existsSync(path.join(process.cwd(), "channels"))) fs.mkdirSync(path.join(process.cwd(), "channels"));

    fs.writeFileSync(path.join(process.cwd(), "channels/dialog.txt"), id + "\nconfirm\n" + JSON.stringify(args));

    return new Promise((resolve, reject) => {
      fs.watch(path.join(process.cwd(), "channels/dialog.txt"), (eventType) => {
        if ((eventType !== "change") || (fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[0] !== id.toString()))  return;

        if (Array.isArray(JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(1).join("\n") || null))) {
          resolve(...JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(1).join("\n") || "[]"));
        };
      });
    });
  },
  prompt: (...args) => {
    if (!fs.existsSync(path.join(process.cwd(), "channels"))) fs.mkdirSync(path.join(process.cwd(), "channels"));

    fs.writeFileSync(path.join(process.cwd(), "channels/dialog.txt"), id + "\nprompt\n" + JSON.stringify(args));

    return new Promise((resolve, reject) => {
      fs.watch(path.join(process.cwd(), "channels/dialog.txt"), (eventType) => {
        if ((eventType !== "change") || (fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n")[0] !== id.toString()))  return;

        if (Array.isArray(JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(1).join("\n") || null))) {
          resolve(...JSON.parse(fs.readFileSync(path.join(process.cwd(), "channels/dialog.txt"), "utf8").split("\n").slice(1).join("\n") || "[]"));
        };
      });
    });
  }
};