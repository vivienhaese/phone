# ☎️ Phone ☎️

This project is part of the [Aircall hiring process](https://github.com/aircall/frontend-hiring-test).\
_Do not copy this project_, 🤫 do your own stuffs!

## 💡 Project

This project is a simple Phone call web app, using React/GraphQL/Context/Typescript stack.

### ⚒️ Configuration

Clone the project and run `yarn` to install dependancies.

`yarn start` runs the app in the development mode at [http://localhost:3000](http://localhost:3000).\
`yarn test` launches the test runner in the interactive watch mode.\
`yarn build` builds the app for production to the `build` folder, but seriously, this is a test project, don't use it in a production environement.

### ⏫ To be optimized

The project could be optimized to provide a better user experience, here's tasks that could have been done with more time :

- [ ] Refresh user token when token has expired
- [ ] Intercept and handle unauthorized GraphQL calls
- [ ] Use GraphQL subscriptions to handle real time changes

### 🐬 Dive into the code

- `index.tsx` contains Appolo client configuration and other providers
- `App.tsx` contains route Configuration, with protected route
- `Login.tsx` is the login page
- `Home.tsx` is the main app page, with a subroute to a Call detail
- `Details.tsx` is the détail page
- `components/*` containes component to display a phone call list or a phone call item
- `context/*` contains Context and Reducer for authentication

### Demo

[Access to an online demonstration](https://vivienhaese.github.io/phone/) or watch the video.

https://user-images.githubusercontent.com/6751231/139743279-ce763fc1-e189-4433-8b08-97378a69d5aa.mov

