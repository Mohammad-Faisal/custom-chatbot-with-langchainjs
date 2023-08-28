# How to run the project?

First, clone the repository and add a `.env` file in the root directory with the following content:

```bash
PORT=4000
```

Then, run the following command to install dependencies.

```bash
npm install
```

Finally run the server by running the following command.

```bash
npm start
```

You will have a NodeJS server running at `http://localhost:3000`.

## Train the model

First, add some training data into the `training-data.txt` file. Then, hit the following endpoint to train the model.

```bash
curl -X GET http://localhost:4000/train
```

## Ask a question

```bash
curl -X POST -H "Content-Type: application/json" -d '{"question": "YOUR_QUESTION_HERE"}' http://localhost:4000/get-answer
```

And wait for the answer!

Now you have a custom chatbot that can answer your questions. You can add more training data to make it more accurate and relevant!
