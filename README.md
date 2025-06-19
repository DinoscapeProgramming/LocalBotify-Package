# LocalBotify Package

```js
const { commandType, alert, confirm, prompt } = require("localbotify");
```

## .commandType()

```js
commandType(event);
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

## .alert()

```js
alert("Title", "Body / Description");
```

## .confirm()

```js
alert("Title", "Body / Description");
```

## .prompt()

```js
prompt("Title", "Placeholder");
```