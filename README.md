## Generic transfromer (UCI)

### Workflow

1. Fork this repo
2. Setup the repo locally by creating an .env using the .env.sample file. You will have to get the Kafka broker details from the admin of the deployed UCI instance.
3. Run `yarn install`
4. Run dev server using `yarn start:dev`
5. Make change to `src/app.sevice.ts` in the method transform.
6. Play around using the Whatsapp chatbot. You will need to use `Hi UCI` as the first message then can do whatever.
7. Once done, deployment can be done using the container.
