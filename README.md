[![Build Status](https://travis-ci.org/Shopify/starter-theme.svg?branch=master)](https://travis-ci.org/Shopify/starter-theme)

# Starter Theme

> **Starter Theme and [Slate v1](https://github.com/Shopify/slate) are currently in beta!** You should expect potentially breaking changes between updates and more bugs than a finalized release. Slate v1.0 has not yet been tested on Windows.

Starter Theme represents the Shopify Themes Team's opinionated starting point for new Slate theme projects. It strives to include up-to-date best practices and solutions that we have deemed needed for the majority of themes we build. It is a reflection of what’s possible when building a theme!

## Intentional lack of styles

When launching Starter Theme for the first time, you may notice a lack of CSS styles. Is Starter Theme broken? Definitely not! Keep in mind this was done intentionally. Starter Theme is not a framework but rather a starting point for your project. It contains all the files the Shopify Themes team considers to be the bare essentials to building a Shopify theme.

For templates and snippets, standard Liquid tags and logic have been included with little to no markup, classes, or other code that you will need to remove. The [`src/styles/theme.scss`](https://github.com/Shopify/starter-theme/blob/master/src/assets/styles/theme.scss) file contains extremely limited styling to not get in the way of developers' CSS preferences. The JavaScript files contain most of our [helper scripts](https://github.com/Shopify/theme-scripts/tree/master/packages) and [lazysizes](https://github.com/aFarkas/lazysizes) for responsive image lazy loading.

## System requirements

You'll want to ensure you have the following already installed on your local machine before getting started with Starter theme:

- **Node:** The current LTS (long-term support) release. We like to use a Node Version Manager like [NVM](https://github.com/creationix/nvm).

- **NPM 5+ or Yarn:** Both of these package managers have [ups and downs](https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/), choose whichever you prefer. Follow the installation instructions [for Yarn](https://yarnpkg.com/en/docs/install) or [NPM](https://www.npmjs.com/get-npm) to make sure you're using the latest version.

## Getting started

To get started with Starter Theme, run the following command in your terminal:

```
$ yarn create slate-theme my-new-theme
```

For more information on connecting your new project with a Shopify store, see the [Slate docs](https://github.com/Shopify/slate/wiki/3.-Connect-to-your-store).

## Project structure

Once the scaffolding has been created, your project will consist of the following file structure:

```bash
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

#### 1. Babel config

`.babelrc` (optional)

Starter Theme comes with [Babel](https://babeljs.io/) preconfigured with [`shopify/babel-preset-shopify`](https://github.com/Shopify/babel-preset-shopify). You can modify this config file based on your project requirements, or remove it completely if you do not wish to take advantage of ES6+ transpilation for legacy browser support

#### 2. Shopify API environment variables

`.env`

Slate will use the environment variables declared in this file to connect to deploy files to your Shopify store. For more information, visit the [`@shopify/slate-env` docs](https://github.com/Shopify/slate/wiki/Deploy-environments).

This file, along with any other `.env.{environment}` files, contain sensitive information and should not be commited to Github. These environment files are ignored by default in `.gitignore`.

#### 3. ESLint config

`.eslintrc` (optional)

Starter Theme comes with [ESLint](https://eslint.org/) preconfigured with [`shopify/eslint-plugin-shopify`](https://github.com/Shopify/eslint-plugin-shopify). You can modify this config file based on your project requirements, or remove it completely if you do not wish to have JavaScript linting in your project.

#### 4. Stylelint config

`.stylelintrc` (optional)

Starter Theme comes with [Stylelint](https://stylelint.io/) preconfigured with [`shopify/stylelint-config-shopify`](https://github.com/Shopify/stylelint-config-shopify). You can modify this config file based on your project requirements, or remove it completely if you do not wish to have style linting in your project.

#### 5. Package.json

`package.json`

A copy of the theme `package.json` will be included in your new project. It's a good idea to update its contents to match your new project, such as updating the name, version, repository, author and description.

The `package.json` includes NPM/Yarn scripts for you to be able to use Slate Tools commands easily (e.g. `yarn start`).

#### 6. Slate config

`slate.config.js`

The Slate config file enables users to customize Slate to their specific needs. For more information, visit the [`@shopify/slate-config` docs](https://github.com/Shopify/slate/wiki/Slate-Configuration).

#### 7. Yarn.lock

`yarn.lock`

The Shopify Themes Team uses [Yarn](https://yarnpkg.com/en/) while developing themes because of its speed. However, Starter Theme works with NPM as well. Simply delete the `yarn.lock` file and run `npm install` to install the list of dependencies.

#### 8. JavaScript files

`src/assets/scripts`

This folder constains all your JS modules. A `theme.js` must be present, as it will act as the entry point for your JS application.

You can use ES6/ES2015's standard, which allows you to require your modules with the `import` syntax:

```js
import { contains } from 'lodash';
import Foo from './modules/foo';
// const Bar = require('./modules/bar') is also available if that's your jam!
```

#### 9. Sass, SCSS and CSS files

`src/assets/styles`

Slate fully supports `.css`, `.scss` and `.sass` files and their syntax, including `@import`.

You **must** include your style index file at the top of your `theme.js` file for Webpack to be able to load your styles into its build process. For example:

```js
import '../styles/theme.scss';
```

Liquid variables are accessible in `.css`, `.scss`, and `.sass` files via CSS custom properties that are declared in the `layout/theme.liquid`. For more information, visit the [Slate docs](https://github.com/Shopify/slate/wiki/Local-SASS-compilation).

#### 10. SVGs

`src/assets/svg`

On build, Slate moves all SVGs contained within this folder to the `snippets/` folder and renames them to `.liquid` files. To use an SVG in your theme, include it like any other snippet:

```liquid
{% include 'icon-shopify' %}
```

#### 11. Static folder

`src/assets/static`

Sometimes you need the ability to upload unmodified files to the Shopify server. This is where the `static` directory comes in. Any files placed inside this directory will be uploaded, as-is, to Shopify. To reference them in your `.liquid` files, you'll want to [ensure Webpack doesn't parse your liquid filters](https://github.com/Shopify/slate/wiki/Slate%20Tools#how-to-prevent-webpack-from-parsing-some-liquid-methods-and-filters) when referencing those files.

This special directory can be useful for files added by plugins you've installed, or for when you need to construct an image URL in Liquid.

#### 12. Shopify required files and folders

`src/config`, `src/layout/theme.liquid`, `src/locales`, `src/sections`, `src/snippets`, `src/templates/*.liquid`

The aforementioned [files and folders are required by Shopify](https://help.shopify.com/themes/development/templates) for any given theme.

## Contributing

For help on setting up the repository locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/starter-theme/blob/master/CONTRIBUTING.md).

## Code of Conduct

All developers who wish to contribute through code or issues, take a look at the
[Code of Conduct](https://github.com/Shopify/starter-theme/blob/master/CODE_OF_CONDUCT.md).

## License

Copyright © 2018 Shopify. See [LICENSE](https://github.com/Shopify/starter-theme/blob/master/LICENSE) for further details.
