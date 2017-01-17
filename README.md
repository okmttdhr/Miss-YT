# YoutuVote

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)
* [Ignite Documentation](https://github.com/infinitered/ignite/wiki)

## How to Setup

1. git clone this repo
2. cd to the repo
3. `npm install`

## How to Run App

```sh
`npm start`
```

## Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [ghooks](https://github.com/gtramontina/ghooks). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

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
// build for different environments
npm start -- --scheme YOUR_APP_SCHEMA_FOR_ENVIRONMENTS
```

About `Scheme`, see [Different environments](https://github.com/luggit/react-native-config#different-environments) iOS section.
