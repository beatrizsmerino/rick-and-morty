![GitHub dependabot](https://img.shields.io/badge/dependabot-enabled-025e8c?logo=Dependabot)
![node](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/beatrizsmerino/rick-and-morty/master/package.json&query=$.engines.node&label=node&logo=node.js&color=339933)
![npm](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/beatrizsmerino/rick-and-morty/master/package.json&query=$.engines.npm&label=npm&logo=npm&color=CB3837)  
![GitHub last commit](https://img.shields.io/github/last-commit/beatrizsmerino/rick-and-morty)
![GitHub issues](https://img.shields.io/github/issues/beatrizsmerino/rick-and-morty)
![GitHub forks](https://img.shields.io/github/forks/beatrizsmerino/rick-and-morty)
![GitHub stars](https://img.shields.io/github/stars/beatrizsmerino/rick-and-morty)
![GitHub watchers](https://img.shields.io/github/watchers/beatrizsmerino/rick-and-morty)

# Rick and Morty

[![App Rick and Morty](./README/videos/rick-morty.gif)](https://beatrizsmerino.github.io/rick-and-morty/)

## 🎯 Description

This project fetches data from the [Rick and Morty API](https://rickandmortyapi.com/) and displays it in an interactive interface. It generates a navigation menu filtering through the 3 types of data (characters, locations and episodes). It has pagination in each of them and a search input to filter by name.

> **App**: [beatrizsmerino.github.io/rick-and-morty](https://beatrizsmerino.github.io/rick-and-morty/)
>
> **Documentation**: [beatrizsmerino.github.io/rick-and-morty/jsdocs](https://beatrizsmerino.github.io/rick-and-morty/jsdocs/index.html)

## 📂 Project Structure

```
rick-and-morty/
├── assets/
│   ├── css/          # Compiled CSS styles
│   ├── favicon/      # Favicon files
│   ├── icomoon/      # Icon fonts
│   ├── images/       # Project images
│   └── js/           # JavaScript files
│       └── scripts.js
├── jsdocs/           # JSDoc generated documentation
├── README/
│   └── images/       # README screenshots
├── .husky/           # Git hooks
├── jsdoc.json        # JSDoc configuration
└── package.json
```

## 🏗️ Developed with

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-2173F6?style=for-the-badge&logo=css3&logoColor=white)
[![SASS/SCSS](https://img.shields.io/badge/-SASS/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
![Javascript](https://img.shields.io/badge/-Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

[![JSDoc](https://img.shields.io/badge/-JSDoc-006FBB?style=for-the-badge)](https://jsdoc.app/)
[![Husky](https://img.shields.io/badge/-Husky-10b981?style=for-the-badge)](https://typicode.github.io/husky/)
[![Commitlint](https://img.shields.io/badge/-Commitlint-F7B93E?style=for-the-badge&logo=commitlint&logoColor=black)](https://commitlint.js.org/)
[![Conventional Commits](https://img.shields.io/badge/-Conventional%20Commits-FE5196?style=for-the-badge&logo=conventionalcommits&logoColor=FEFEFE)](https://www.conventionalcommits.org)

### API

#### Rate Limit

The Rick and Morty API is an open API, no authentication is required for use. Nonetheless, to prevent malicious usage of the API there is a limit on the number of requests a given IP address can make. This limit is 10000 requests per day. If you happen to hit the limit you'll receive a 429 status (Too Many Requests) on all your requests during a period of 12 hours.

```json
{
  "characters": "https://rickandmortyapi.com/api/character",
  "locations": "https://rickandmortyapi.com/api/location",
  "episodes": "https://rickandmortyapi.com/api/episode"
}
```

#### Adblock Extension

If you have installed the [Adblock](https://chrome.google.com/webstore/detail/adblock-%E2%80%94-best-ad-blocker/gighmmpiobklfepjocnamgkkbiglidom) browser extension, you must select 'pause on this website' for the app to work correctly.

#### VPN Extension

If you need more API requests, you can use a VPN browser extension to change your IP address.

### JSDoc

This project uses [JSDoc](https://jsdoc.app/) to generate documentation from the JavaScript source code comments.

The documentation is generated from `assets/js/scripts.js` and exported to the `jsdocs` folder. It is published on GitHub Pages and can be accessed at [beatrizsmerino.github.io/rick-and-morty/jsdocs](https://beatrizsmerino.github.io/rick-and-morty/jsdocs/index.html).

[![JSDoc Documentation](./README/images/Screenshot_1.jpg)](https://beatrizsmerino.github.io/rick-and-morty/jsdocs/index.html)

## 🚀 Commands

### Install dependencies

```bash
npm install
```

### Clean install dependencies

Remove `node_modules` and `package-lock.json` to reinstall from scratch.

```bash
npm run install:clean
```

### Lint after install

Runs automatically after `npm install` to run `npm run lint` on all project files.

```bash
npm run postinstall
```

### Set up Husky git hooks

Runs automatically after `postinstall` to enable `pre-commit` and `commit-msg` hooks of [Husky](https://typicode.github.io/husky/).

```bash
npm run prepare
```

### Lint all files

Run [Prettier](https://prettier.io/) (`prettier:fix`), [ESLint](https://eslint.org/) (`eslint:fix`) and [Stylelint](https://stylelint.io/) (`stylelint:fix`) to format and lint all project files.

```bash
npm run lint
```

### Format files with Prettier

Format CSS, JSON, YAML, JS and HTML files with [Prettier](https://prettier.io/).

```bash
npm run prettier:fix
```

### Lint and fix files with ESLint

Lint and fix JSON and JS files with [ESLint](https://eslint.org/).

```bash
npm run eslint:fix
```

### Lint and fix styles with Stylelint

Lint and fix CSS files with [Stylelint](https://stylelint.io/).

```bash
npm run stylelint:fix
```

### Generate JSDoc documentation

```bash
npm run jsdocs
```

## 🤝 Contributing

This project uses [Husky](https://typicode.github.io/husky/) for Git hooks and [Commitlint](https://commitlint.js.org/) for commit message validation.

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description
```

## 🔗 References

### API
- [Rick and Morty API](https://rickandmortyapi.com/)
- [Rick and Morty API Documentation](https://rickandmortyapi.com/documentation)

### Documentation
- [JSDoc](https://jsdoc.app/)
- [DevDocs - JSDoc](https://devdocs.io/jsdoc/)

## 📄 License

This project is licensed under the `MIT` License, which allows free use, modification and distribution. See [LICENSE](LICENSE) for details.
