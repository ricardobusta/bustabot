https://github.com/RicardoBusta/BustaBot

![Node.js CI](https://github.com/ricardobusta/bustabot/workflows/Node.js%20CI/badge.svg)

Setup:

Create bot_info.js file with the proper information. Use the template as base.
    - Key: Provided on Bot Creation.
    - BotName: The @ of your bot.
    - Google Project ID: ProjectID on google cloud console.

Get credential json file from https://console.cloud.google.com/apis/credentials and save it as google_key.json on project root.

deploy your bot using gcloud app commands

Set the bot webhook: https://api.telegram.org/bot{my_bot_token}/setWebhook?url=https://{my-service-name}.appspot.com/{my_bot_token}

# GCloud Commands

## Publish
```shell
gcloud app deploy
```

## Logs
```shell
gcloud app logs tail -s default
```

## Together
```shell
gcloud app deploy;gcloud app logs tail -s default
```

## Running locally

Ngrok - https redirect to localhost
```shell
C:\Projects\ngrok.exe http 18080
```
```shell
tsc -p .;node --trace-deprecation app.js
```

## No cache
```shell
gcloud app deploy --no-cache;gcloud app logs tail -s default
```

## Check for compilation errors
```shell
tsc -p .
```

## Clean ts build files
```shell
tsc --build --clean
```

## Run Npm Commands
```shell
npm run <_command_>
```

## Clean Cloud Storage
```shell
gsutil rm -r gs://<_bucketname_>/*
gsutil rb gs://<_bucketname_>/*
```