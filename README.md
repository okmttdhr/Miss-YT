
# Miss YT

## What is this?

Check out Top female YouTubers in Japan (who are actually popular).

![](/images/2017/12/i)

![](/images/2017/12/i)

![](/images/2017/12/i)

[Motivation](↓)

## Features

- Using [Ignite](https://github.com/infinitered/ignite)
- React Native
- Redux + Redux-Saga
- Firebase
- AVA
- Enzyme
- ESLint
- Flow

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

### All

```sh
yarn test
```

### Unit

```sh
yarn test:unit
```

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
yarn start -- --scheme YOUR_APP_SCHEMA_FOR_ENVIRONMENTS
```

About `Scheme`, see [Different environments](https://github.com/luggit/react-native-config#different-environments) iOS section.

## Icon

[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## Motivation

I love [Japanese YouTubers](https://okmttdhr.github.io/youtubers-timeline-in-japan/) like [MEGWIN](https://www.youtube.com/user/megwin), [東海オンエア](https://www.youtube.com/user/TokaiOnAir), [禁断ボーイズ](https://www.youtube.com/channel/UCvtK7490fPF0TacbsvQ2H3g), [スカイピース](https://www.youtube.com/channel/UC8_wmm5DX9mb4jrLiw8ZYzw), [アバンティーズ](https://www.youtube.com/user/avntisdouga). I wanted to give something valuable for them.
