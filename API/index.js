const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 4000;
const history = [];

app.post("/", async (req, res) => {
  const { message } = req.body;

  const messages = [
   
  ];
  for (const [input_text, completion_text] of history) {
    messages.push({ role: "user", content: input_text });
    messages.push({ role: "assistant", content: completion_text });
  }

  messages.push({ role: "user", content: message });


    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const completion_text = completion.data.choices[0].message.content;
    console.log(completion_text);
    res.json({ message: completion_text });

    history.push([message, completion_text]);
 
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

//const response = await openai.listEngines();

//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
