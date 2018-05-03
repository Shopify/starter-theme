# Shopify Starter Theme

> **Shopify Starter Theme and [Slate v1](https://github.com/Shopify/slate) are currently in beta!** You should expect potentially breaking changes between updates and more bugs than a finalized release. Slate v1.0 has not yet been tested on Windows.

The Starter Theme represents the Shopify Themes Team opinionated starting point for new a Slate theme project. It strives to include up-to-date best-practices and solutions that we have deemed needed for the majority of themes we build. It is a reflection of what’s possible when building a theme.

## Getting Started

To get started with Shopify Starter Theme, run the following command in your terminal:

```
$ yarn create slate-theme my-new-theme
```

For more information on connecting your new project with a Shopify store, see the [Slate docs](https://github.com/Shopify/slate/wiki/2.-Connect-to-your-store).

## Project Structure

Once Slate has created the scaffolding of your project, it will have the following structure:

```
├── .babelrc [1]
├── .env [2]
├── .eslintrc [3]
├── .gitignore
├── .stylelintrc [4]
├── package.json [5]
├── slate.config.js [6]
├── yarn.lock [7]
└── src
    ├── assets
    │   ├── fonts
    │   ├── images
    │   ├── scripts [8]
    │   └── styles [9]
    │   └── svg [10]
    │   └── static [11]
    ├── config [12]
    ├── layout [12]
    ├── locales [12]
    ├── sections [12]
    ├── snippets [12]
    └── templates [12]
```

#### [1] Babel Config

`.babelrc` (optional)

Starter Theme comes with [Babel](https://babeljs.io/) preconfigured with [`shopify/babel-preset-shopify`](https://github.com/Shopify/babel-preset-shopify). You can modify this config file based on your project requirements, or remove it completely if you wish to not take advantage of ES6+ transpilation for legacy browser support.

#### [2] Shopify API Environment Variables

`.env` (optional)

Slate will use the environment variables declared in this file to connect to deploy files to your Shopify store. For more information, visit the [`@shopify/slate-env` docs](https://github.com/Shopify/slate/wiki/Deploy-environments).

This file, along with any other `.env.[environment]` files, contain sensitive information and should not be commited to Github.

#### [3] ESlint Config

`.eslintrc` (optional)

Starter Theme comes with [ESLint](https://eslint.org/) preconfigured with [`shopify/eslint-plugin-shopify`](https://github.com/Shopify/eslint-plugin-shopify). You can modify this config file based on your project requirements, or remove it completely if you wish to not have JavaScript linting in your project.

#### [4] Stylelint Config

`.stylelintrc` (optional)

Starter Theme comes with [Stylelint](https://stylelint.io/) preconfigured with [`shopify/stylelint-config-shopify`](https://github.com/Shopify/stylelint-config-shopify). You can modify this config file based on your project requirements, or remove it completely if you wish to not have style linting in your project.

#### [5] Packages

`package.json`

A copy of the theme `package.json` will be included in your new project. It's a good idea to update its contents to match your new project, such as updating the name, version, repository, and description.

The `package.json` includes npm/yarn scripts for you to be able to use Slate's CLI easily from the terminal (e.g. `yarn serve`).

#### [6] Slate Config

`slate.config.js`

The Slate Config file allows you to custimize Slate to the specific needs of your project. For more information, visit the [`@shopify/slate-config` docs](https://github.com/Shopify/slate/wiki/Slate-config).

#### [7] Yarn.lock

`yarn.lock`

The Shopify Themes Team uses [Yarn](https://yarnpkg.com/en/) while developing themes because of its speed. However, Starter Theme should work just fine with NPM -- just delete the `yarn.lock` file if you wish to do so.

#### [8] JS Files

`src/assets/scripts`

This folder will contain all your JS modules. An `theme.js` must be present, as it will act as the entry point for your JS application.

You can use ES6/ES2015's standard, which incidently allows you to require your modules with the `import` syntax:

```
import { contains } from 'lodash'
import Foo from './modules/foo'
// const Bar = require('./modules/bar') is also available if that's your jam!
```

#### [9] Sass and CSS Files

`src/assets/styles`

Slate fully supports `.css`, `.scss` and `.sass` files and their syntax, including `@import`.

You **must** include your style index file at the top of your `theme.js` file for Webpack to be able to load your styles into its build process, as such:

```
import '../sass/index.scss';
```

Liquid variables are accesible in `.css`, `.scss`, and `.sass` files via CSS Custom Properties that are declared in the `snippets/css-variables.liquid`. For more information, visit the [Slate Docs](https://github.com/Shopify/slate).

#### [10] SVGs

`src/assets/svg`

On build, Slate moves all SVGs in this folder to the `snippets/` folder and renames them to `.liquid` files. To use an SVG in your theme, include it like any other snippet:

```
{% include 'icon-shopify' %}
```

#### [11] Static

`src/assets/static`

Sometimes you need the ability to upload unmodified files to the Shopify server. This is where the `static` directory comes in. Any files placed inside this directory will be uploaded, as-is, to Shopify. To reference them in your `.liquid` files, you'll want to [ensure Webpack doesn't parse your liquid filters](https://github.com/Shopify/slate/wiki/Slate%20Tools#how-to-prevent-webpack-from-parsing-some-liquid-methods-and-filters) when referencing those files.

This special directory can be useful for files added by plugins you've installed, or for when you need to construct an image URL in Liquid.

#### [12] Shopify Required

`src/config`, `src/layout/theme.liquid`, `src/locales`, `src/sections`, `src/snippets`, `src/templates/*.liquid`

The aforementioned [files and folders are required by Shopify](https://help.shopify.com/themes/development/templates) for any given theme.

## Contributing

For help on setting up the repo locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/starter-theme/blob/master/CONTRIBUTING.md).

## Code of Conduct

All developers who wish to contribute through code or issues, take a look at the
[Code of Conduct](https://github.com/Shopify/starter-theme/blob/master/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](https://github.com/Shopify/starter-theme/blob/master/LICENSE) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
