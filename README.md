# LocalBotify Package

```js
const { commandType, parseSlashCommandsFromJSON } = require("localbotify");
```

## .commandType()

```js
commandType(event) // --> message / interaction
```

**Possible types:**

- `message`
- `slashCommand`
- `button`
- `selectMenu`
- `contextMenu`
- `autocomplete`
- `modal`
- `other` _(none match)_

## .parseSlashCommandsFromJSON()

```js
const { SlashCommandBuilder } = require("discord.js");

parseSlashCommandsFromJSON(SlashCommandBuilder, commandJSON);
```#   L o c a l B o t i f y - P a c k a g e  
 