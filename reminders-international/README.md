# Overview
Many non-profits provide business training to thousands of adult clients around the world. This app allows messages and reminders to be scheduled and sent to any device via SMS or WhatsApp. It helps both clients remember material between sessions, remind them to come to trainings, and remove travel barriers.

You can find our project at: https://reminders-international-fe.netlify.com/

### Features
* Ability for admins to create an organization, create a group and manage groups in the organization, and manage contacts in the group 
* Create and edit reminders
* Save common reminders as templates
* Schedule reminders to be sent immediately or sent at designated future time
* Send reminders automatically to a group
* List/recipient will receive text notifications through Twilio sent to their phone 

# Our Tech Stack
### Frontend:

#### React
React is a simple implementation and given the time constraints of this project is well suited to build a robust solution when time is tight. It is also a framework rapidly gaining in popularity, and given it is developed by Facebook we expect this trend to continue - this means there will be increasing numbers of developers comfortable with the framework to fill the needs of the app as it grows. It’s reasonable to expect it to adapt easily to the changing online environment. 

#### Reactstrap & CSS
Reactstrap is the version of bootstrap specifically for react. Bootstrap is an extremely popular framework for online styling. As such there are robust resources for learning how to implement the framework and the framework itself has been built out to offer extensive options. 
CSS is classic and timeless and also well suited to be used for styling--we will use a combination of both Reactstrap and CSS.

### Backend:

#### Node.js
Node.js is a server-side JavaScript environment. It uses an asynchronous event-driven model and is designed for writing scalable internet applications. Given the nature of our app with many organizations and several potential relationships and dynamic actions between users this is an appropriate framework to handle the backend. 

#### PostgreSQL
PostgreSQL will provide the data persistence not available when deploying with SQlite. Most deployment services will require either PostgreSQL or MySQL in order to provide a persistent data solution. Our primary reasons for choosing this solution is:  our team has the most experience with PostgreSQL, it is growing in popularity as a database solution, it offers higher data integrity over MySQL and it is the preferred framework of our primary deployment provider for backend, Heroku and compatible with GSC our secondary option. 

### Deployments:
#### Netlify - frontend
#### Heroku - backend
We choose these solutions because the team has the most experience with these tools. Deployment can often produce unforeseen bugs, taking more time than anticipated to address. Due to the time restraints on this project we decided these tools would best enable us to deliver a working solution to our client.

# Twilio


# Auth0
The site is currently set up using a free Auth0 account. There are limitations on the free tier, such as a cap on active users, how many social connections you can use to authenticate (ie: Facebook, Google, etc), and whether or not you can import your own user database into the Auth0 system. The full list of differences can be found here: https://auth0.com/pricing#full-features

(There might be some features moving forward that the client might want to implement that are paid only.)

Auth0’s documentation is really extensive and easy to read and follow. The current codebase is set up to have secured routes on the backend implemented using middleware.

(See the documentation here: 
https://auth0.com/docs/quickstart/webapp/nodejs/01-login - in the middleware to protect the routes section.)

The current Auth0 login functionality on the front end was primarily set-up using this quick start guide: https://auth0.com/docs/quickstart/spa/react

In the current file structure all of the Auth0 code lives in the Auth0 folder. That being said, auth is passed to routes and components in App.js and the Auth0 profile is used to connect the information that Auth0 collects upon a user signup and our user database. 
When a user signs up with Auth0 on our site they are given an Auth0 user id, which is unique, called sub. This is saved in our user table as auth0_sub and can then be used to connect the Auth0 profile information with our user database. In the current codebase file Auth.js (lines 139-174) handles the setting of the Auth0 profile.

The last and final thing is remembering to set your .env variables, both locally and in your deployment settings for Auth0. These variables will be found in the dashboard of your Auth0 account	, in addition to the 3 listed below you will also need to include your callback URL (REACT_APP_CALLBACKURL=http://yourdomain/callback).

```.env
AUTH0_CLIENT_ID=YOUR_CLIENT_ID
AUTH0_DOMAIN=YOUR_DOMAIN
AUTH0_CLIENT_SECRET=YOUR_CLIENT_SECRET
```




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
