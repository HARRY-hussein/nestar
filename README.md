# Nestar — Real-Estate Marketplace API

Backend for **Nestar**, a property marketplace where agents list properties and members browse, like, comment, follow and post in a community board.

Built as a **NestJS monorepo** with two apps:

| App | What it does |
|---|---|
| `apps/nestar-api` | GraphQL API: members, auth, properties, board articles, comments, likes, follows, views, real-time notifications over WebSockets |
| `apps/nestar-batch` | Scheduled batch worker that recalculates top properties and top agents |

## Tech stack
NestJS 10 · TypeScript · GraphQL (Apollo) · MongoDB + Mongoose · JWT auth with role guards · WebSockets · `@nestjs/schedule` · class-validator · file uploads (graphql-upload)

## Highlights
- Role-based access (`@Roles`, `AuthGuard`, `RolesGuard`, optional-auth `WithoutGuard`)
- DTO validation on every input, global logging interceptor
- Separate batch process so heavy ranking jobs never slow down the API
- Image uploads served from `/uploads`

## Project structure
```
apps/
  nestar-api/src/
    components/   # auth, member, property, board-article, comment, like, follow, view
    schemas/      # Mongoose models
    libs/         # DTOs, enums, types, interceptors
    socket/       # WebSocket gateway
  nestar-batch/src/   # ranking jobs
```

## Run locally
```bash
npm install
touch .env             # fill in the variables listed below
npm run start:dev        # API  → http://localhost:3000/graphql
npm run start:dev:batch  # batch worker
```

`.env` variables: `MONGO_DEV`, `MONGO_PROD`, `PORT_API`, `PORT_BATCH`, `SECRET_TOKEN`, `NODE_ENV`

## Related
Frontend: Next.js client (`nestar-next`, private for now).
