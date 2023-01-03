import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;
import * as dotenv from "dotenv";
dotenv.config();

app.use(bodyParser.json());

const initialMessage = "Bem-vindo ao Chat GPT, como posso te ajudar?";
const secretKey = process.env.OPEN_AI_API_KEY;
const zapiUrl = `https://api.z-api.io/instances/${process.env.Z_API_INSTANCE_ID}/token/${process.env.Z_API_INSTANCE_TOKEN}/send-text`;

const chats = {};

const replyMessage = async (phone, message) => {
  await axios.post(zapiUrl, {
    phone,
    message,
    delayTyping: 3,
  });
};

const appendChat = (phone, message) => {
  chats[phone].messages.push(message);
  if (chats[phone].messages.length > 6) {
    chats[phone].messages.shift();
  }
};

const onNewMessage = async (message) => {
  if (chats[message.phone] && chats[message.phone].blocked) {
    return await replyMessage(message.phone, "Um momento por favor");
  }
  chats[message.phone].blocked = true;
  const text = `${message.phone}: ${message.text.message}\nOPENAI:`;

  await appendChat(message.phone, text);

  try {
    const prompt = chats[message.phone].messages.join("");
    const response = await axios.post(
      `https://api.openai.com/v1/completions`,
      {
        model: "text-davinci-003",
        prompt,
        temperature: 0.9,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [` ${message.phone}:`, " OPENAI:"],
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );
    if (response.data.choices.length > 0) {
      await appendChat(message.phone, `${response.data.choices[0].text}\n`);
      await replyMessage(message.phone, response.data.choices[0].text.trim());
    } else {
      throw "NOT_FOUND";
    }
  } catch (e) {
    console.log(e);
    return await replyMessage(
      message.phone,
      "Desculpe, mas tive problemas no processamento, você pode reiniciar nossa conversando mandando novamente o comando !gpt"
    );
  } finally {
    chats[message.phone].blocked = false;
  }
};

app.post("/on-new-message", async (req, res) => {
  if (
    !req.body.fromMe &&
    chats[req.body.phone] &&
    req.body.text &&
    req.body.text.message
  ) {
    await onNewMessage(req.body);
  }
  if (req.body.text && req.body.text.message === "!gpt") {
    chats[req.body.phone] = {
      blocked: false,
      messages: [],
    };
    await replyMessage(req.body.phone, initialMessage);
    await appendChat(req.body.phone, `OPENAI: ${initialMessage}\n`);
  }
  res.status(200).send({
    message: "success",
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
