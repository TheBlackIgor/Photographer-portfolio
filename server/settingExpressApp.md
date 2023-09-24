## SETTING UP NEW EXPRESS SERVER

1. Clone the template from github: *https://github.com/greenroach/express-ts-template*

2. Update dependencies by simply pasting `package.json` to *https://updatepackagejson.com/*

3. Setup typescript paths:

    - Install
        ```
        npm i tsconfig-paths ts-node
        ```
    - In `package.json`

        - paste
            ```
            "nodemonConfig": {
            "ignore":
                [
                "**/*.test.ts",
                "**/*.spec.ts",
                ".git",
                "node_modules"
                ],
            "watch": [
                "src"
            ],
            "exec": "node -r tsconfig-paths/register -r ts-node/register ./src/server.ts",
            "ext": "ts, js"
            },
            ```
        - change scripts to following:

            ```
                "serve": "node -r tsconfig-paths/register -r ts-node/register dist/server.js",
            ```

    - In `tsconfig.json` add to paths:
        ```
        "~/*": ["./src/*"],
        ```
    - Source: *https://stackoverflow.com/questions/58187115/typescript-paths-not-working-in-an-express-project*

4. Docker

    - Dockerfile

        ```Dockerfile
        FROM node:18-alpine

        WORKDIR /usr/src/app

        COPY package\*.json ./

        RUN npm install

        COPY . .

        RUN npm run build

        EXPOSE 8080

        CMD [ "npm", "start" ]

        ```

    - .dockerignore

        ```
        logs
        *.log

        pids
        *.pid
        *.seed

        lib-cov

        coverage

        .grunt

        .lock-wscript

        build/Release

        node_modules

        *.spec.js
        kubernetes
        ```
