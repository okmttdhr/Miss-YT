# YoutuVote

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)
* [Ignite Documentation](https://github.com/infinitered/ignite/wiki)

## Setup

```sh
yarn install
yarn start
```

## Debugging

```sh
yarn debug
```

## Testing

### Lint

```sh
yarn lint
yarn lint:fix
```

## Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```JavaScript
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```JavaScript
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Different environments

Setting config for different environments in different files: `.env.staging` and `.env.production`.

```sh
# build for different environments
npm start -- --scheme YOUR_APP_SCHEMA_FOR_ENVIRONMENTS
```

About `Scheme`, see [Different environments](https://github.com/luggit/react-native-config#different-environments) iOS section.
