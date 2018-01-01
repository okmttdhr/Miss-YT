
# Miss YT

An iOS App for finding top female YouTubers in Japan (who are _actually_ popular).

<img src="/screenshots/1.png" alt="" style="height: 90vh;">

<img src="/screenshots/2.png" alt="" style="height: 90vh;">

<img src="/screenshots/3.png" alt="" style="height: 90vh;">

<img src="/screenshots/4.png" alt="" style="height: 90vh;">

<img src="/screenshots/5.png" alt="" style="height: 90vh;">

- un-released yet ⚠️
- [more screenshots](https://github.com/okmttdhr/YoutuVote/tree/master/screenshots) 📸
- [motivation👇](https://github.com/okmttdhr/YoutuVote#motivation)

## Technologies

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

- Using [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## TODO

- [ ] avoid uppercase for directory names
  - Why?: to use uppercase only for React Components or JavaScript Classes
- [ ] create `style.js` in the same directory as components
  - Why?: to do component-driven development
- [ ] create `.spec.js` files in the same directory as business logic
  - Why?: to increase efficiency for unit testing (`The unit tests for a module shouldn’t be shoved in some far-away corner of the source tree. They need to be conveniently located.` by The Pragmatic Programmer)
- [ ] create `index.js` for `constant`/`function`/`class`/`redux-functions`/etc indexing (no need to use `export default` which is not easy to find what is exported sometimes.)
  - Why?: to find exported functions easily
- [ ] remove all the flow warnings
- [ ] remove un-used files/libraries
- [ ] migrate from Realtime Database to Cloud Firestore


## Motivation

I love [Japanese YouTubers](https://okmttdhr.github.io/youtubers-timeline-in-japan/) like [MEGWIN](https://www.youtube.com/user/megwin), [東海オンエア](https://www.youtube.com/user/TokaiOnAir), [禁断ボーイズ](https://www.youtube.com/channel/UCvtK7490fPF0TacbsvQ2H3g), [スカイピース](https://www.youtube.com/channel/UC8_wmm5DX9mb4jrLiw8ZYzw), [アバンティーズ](https://www.youtube.com/user/avntisdouga). They talk about female YouTubers sometimes, so I wanted to give something valuable for them.
