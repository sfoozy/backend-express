# EXPRESS-JS + PRISMA + TYPESCRIPT

1. Installations

- runtime dependecies
```sh
$> npm install express
$> npm install @prisma/client
$> npm install @prisma/adapter-pg
$> npm install pg
$> npm install jsonwebtoken
$> npm install bcryptjs
```

- dev depencies
```sh
$> npm install prisma --save-dev
$> npm install typescript --save-dev
$> npm install @types/node --save-dev
$> npm install @types/express --save-dev
$> npm install nodemon --save-dev (for hot reloading)
$> npm install dotenv --save-dev
$> npm install @types/jsonwebtoken --save-dev
```

2. Configure `package.json`

- update
```json
"type": "module" (to use ESMA syntax)
"scripts": {
  "start": "tsc && node dist/app.js",
  "dev": "nodemon"
}
```

3. Typescript

- initialize
```sh
$> npx tsc --init (creates tsconfig.json file)
```

- update `tsconfig.json`
```json
"outDir": "./dist",
```

4. Nodemon

- create `nodemon.json`
```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "npm run start"
}
```

5. Initialize Prisma

- initialize
```sh
$> npx prisma init (creates prisma.config.ts and .env files)
```

- update `.env` file with database information
```
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```

- update prisma.config.ts
```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
   schema: "prisma/schema.prisma",
   migrations: {
     path: "prisma/migrations"
   },
   datasource: {
      url: env("DATABASE_URL"),
   },
});
```

- add models to schema.prisma

- apply migrations
```sh
$> npx prisma migrate dev --name init
$> npx primsa generate
```

6. Authorization

- generate secret
```sh
$> node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
```

- update .env file
```
JWT_TOKEN=<secret>
```