[<img alt="Feature Flag, Remote Config and A/B Testing platform, Flagsmith" width="100%" src="./hero.png"/>](https://bullet-train.io/)

[![Donate](https://liberapay.com/assets/widgets/donate.svg)](https://liberapay.com/Bullet-Train/donate)

Bullet Train is now Flagsmith read about it [here](https://flagsmith.com/blog/rebrand). 

# Flagsmith Frontend

The frontend application for [https://bullet-train.io/](https://www.bullet-train.io/). Flagsmith allows you to manage feature flags and remote config across multiple projects, environments and organisations.

This project connects to the [Flagsmith API](https://github.com/BulletTrainHQ/Bullet-Train-API).

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

## ENV variables

Variables that differ per environment are exported globally to ``window.Project in`` [common/project.js](./common/project.js), this file gets replaced by a project.js located in [env](./env) by webpack based on what is set to the "ENV" environment variable (e.g. ENV=prod).
 
You can override each variable individually or add more by editing [environment.js](./environment.js). 

Current variables used between [environment.js](./environment.js) and [common/project.js](./common/project.js):

- API_URL: The API to hit for requests 
- BULLET_TRAIN: The flagsmith project we use to manage features
- GA: Google analytics key
- CRISP_CHAT: Chat widget key
- MIXPANEL: Mixpanel analytics key
- SENTRY: Sentry key
- ASSET_URL: Used for replacing local static paths with a cdn, .e.g https://cdn.bullet-train.io

## E2E testing

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

## Running locally against your own Flagsmith API instance

We use Bullet Train to manage features we rollout, if you are using your own flagsmith environment (i.e. by editing project_x.js-> bulletTrain) then you will need to have a replica of our flags.

A list of the flags and remote config we're currently using in production can be found here https://gist.github.com/kyle-ssg/55f3b869c28bdd13c02c6688bc76c67f.


## Useful links

[Website](https://bullet-train.io)

[Product Roadmap](https://product-hub.io/roadmap/5d81f2406180537538d99f28)

[Documentation](https://docs.bullet-train.io/)

[Code Examples](https://github.com/BulletTrainHQ/bullet-train-docs)

[Youtube Tutorials](https://www.youtube.com/channel/UCki7GZrOdZZcsV9rAIRchCw)
