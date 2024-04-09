# Posterr Social Network

This project was created as an assignment and does not contain real life information.

## Project created using:

- Yarn
- Vite
- React 18
- Typescript
- Redux
- React Router
- Bootstrap
- SASS
- CSSModules
- React-bootstrap
- Axios
- Date-fns
- Posterr structure, pallete and references [Using Figma](https://www.figma.com/file/nEEDnAQWzIDciQAo7OSX1W/Posterr-structure?type=whiteboard&node-id=0%3A1&t=aRoZTGLRXziomxtn-1)
- Mock data nd api created using [Mockapi.io](https://mockapi.io) Althought not asked I believe that a functional API can change the way we create code so I used Mockapi to simulate a functional API.

## This project is formated with:

- Eslint
- Prettier
- Lint-staged
- Husky
- Commitlint

## Comments about the project:

- Kanban methodology was used to develop the project
- I decided to create intelligent components to prevent long files with too much logic in them.
- Just for clarification, the assignment said that posts and users cannot be updated, although I implemented methods to update user followers and post likes and comments to better show the repercussions from API calls.
- User's name are dynamically generated so the maximum length username may not be working properly. In a real application I would add a truncate function to display the user name and prevent them to add more than 14 characters on a new user.
- I like to sort the imports from my files by react, libs, style, images, API, store, models, components, imports
- I documented the components to be easy to understand how each component can be used.

## If I had more time:

- Create custom hooks to handle API calls to follow the DRY and SOLID methodology.
- Add more components to break even more the amount od lines from the pages.
- Add more util functions.
- Implement tests using Jest and/or Cypress.
- Improve the color pallet and usage.

## Actions

- `yarn dev`
- `yarn build`
- `yarn lint`
