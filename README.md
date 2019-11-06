<img width="100%" src="./hero.png"/>

[![Donate](https://liberapay.com/assets/widgets/donate.svg)](https://liberapay.com/Bullet-Train/donate)

# Bullet Train Frontend

The frontend application for [https://bullet-train.io/](https://www.bullet-train.io/). Bullet Train allows you to manage feature flags and remote config across multiple projects, environments and organisations.

This project connects to the [Bullet Train API](https://github.com/SolidStateGroup/Bullet-Train-API).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See running in production for notes on how to deploy the project on a live system.

## Prerequisites

What things you need to install the software and how to install them

| Location                                                     | Suggested Version       |
| -------------                                                |:-------------:|
| <a href="https://nodejs.org/en/">NodeJS</a>                     | >= 6.0.0 |
| <a href="https://nodejs.org/en/">npm</a>                        | >= 4.0.0 |

## Installing

```bash
npm i
```

## Running

**Development**

Hot reloading for client / server

```bash
npm run dev
```

**Production**

You can deploy this application on [Heroku](https://www.heroku.com/) and [Dokku](http://dokku.viewdocs.io/dokku/) without making any changes, other than the API URL in [project_prod.js](/env/project_prod.js)  

Bundles, minifies and cache busts the project to a build folder and runs node in production. This can be used as part of your deployment script.

```bash
npm run bundle
npm start
```

**E2E Testing**

This project uses [Nightwatch](http://nightwatchjs.org/) for automated end to end testing with chromedriver.

```bash
npm test
```

## Built With

- React
- Webpack
- Node

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/kyle-ssg/c36a03aebe492e45cbd3eefb21cb0486) for details on our code of conduct, and the process for submitting pull requests to us.

## Getting Help

If you encounter a bug or feature request we would like to hear about it. Before you submit an issue please search existing issues in order to prevent duplicates.

## Get in touch

If you have any questions about our projects you can email <a href="mailto:projects@solidstategroup.com">projects@solidstategroup.com</a>.

## Useful links

[Website](https://bullet-train.io)

[Documentation](https://docs.bullet-train.io/)

[Code Examples](https://github.com/SolidStateGroup/bullet-train-docs)

[Youtube Tutorials](https://www.youtube.com/channel/UCki7GZrOdZZcsV9rAIRchCw)
