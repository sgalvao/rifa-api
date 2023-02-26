## Divisio backend graphql boilerplate

### Tech stack
- [Node](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [GraphQL](https://github.com/graphql/graphql-js)
- [Apollo Server](https://github.com/apollographql/apollo-server)
- [Typescript](https://www.typescriptlang.org/)

### Includes
- Boilerplate setup
  - Graphql boilerplate sample
  - Module alias
  - Dev tooling setup: EditorConfig, Prettier, ESLint
  - Dependabot
  - GH Action CI
- Apollo custom directive for resolver authentication
- API Rest support

## Dependencies
- Node js => v10

## Up and Running
- Install dependencies `yarn (or npm i)`
- Run `yarn dev (or npm dev)` to run development server (will be available in `http://localhost:9000` and GraphQL in `http://localhost:9000/graphql`)

## Available scripts
- `yarn start (or npm start)`: Run server in production mode
- `yarn dev (or npm dev)`: Run server in development mode
- `yarn build (or npm run build)`: Generate production build (files will be available on `build` directory)
- `yarn lint (or npm run lint)`: Run linter based on eslint configurations
- `yarn lint:fix (or npm run lint:fix )`: Run linter and fix errors


