# Z-API + OpenAI — WhatsApp Chatbot Example

Explore how to connect WhatsApp to OpenAI using Z-API and Node.js. This example receives messages through a webhook, generates AI responses, and sends them back to WhatsApp.

## Compatibility Notice

This example uses the retired OpenAI model `text-davinci-003`. Update the OpenAI integration in `index.js` to a supported model and compatible API request format before testing AI responses.

See the [OpenAI documentation](https://developers.openai.com/api/docs) for current integration guidance.

## Prerequisites

- Node.js and npm installed.
- A Z-API instance connected to WhatsApp.
- An OpenAI API key.
- A public HTTPS URL for receiving webhooks. For local development, you can use [ngrok](https://ngrok.com).

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Z-API/chat-gpt-example.git
cd chat-gpt-example
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your environment

Create a `.env` file in the project root:

```env
OPEN_AI_API_KEY=your_openai_api_key
Z_API_INSTANCE_ID=your_zapi_instance_id
Z_API_INSTANCE_TOKEN=your_zapi_instance_token
```

Get your instance credentials from your [Z-API account](https://z-api.io) and your API key from the [OpenAI platform](https://platform.openai.com/api-keys).

Keep your credentials private and do not commit your `.env` file.

### 4. Start the application

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

The server listens on port **3000**.

### 5. Configure the webhook

For local testing, install and configure ngrok, then expose port 3000:

```bash
ngrok http 3000
```

Copy the public HTTPS URL provided by ngrok and append `/on-new-message`:

```text
https://YOUR-NGROK-DOMAIN/on-new-message
```

Set this address as the **received-message webhook** in your Z-API instance.

Keep the application and ngrok running while testing. If your tunnel URL changes, update the webhook address in Z-API.

### 6. Start a conversation

After updating the OpenAI integration and completing the setup:

1. Send `!gpt` from another WhatsApp account to the number connected to your Z-API instance.
2. Wait for the welcome message.
3. Send a text message to continue the conversation.

## How It Works

1. Z-API forwards an incoming WhatsApp message to `/on-new-message`.
2. The application starts a chat session when it receives `!gpt`.
3. Subsequent text messages are sent to OpenAI.
4. The generated response is sent back through Z-API.

## Development Notes

- Conversations are stored in memory and are lost when the application restarts.
- The welcome and error messages are in Portuguese and can be customized in `index.js`.
- This is a learning example. Review API compatibility, authentication, error handling, and persistent storage before adapting it for production.

## Resources

- [Z-API Documentation](https://developer.z-api.io)
- [Z-API Website](https://z-api.io)
- [OpenAI Documentation](https://developers.openai.com/api/docs)
- [ngrok](https://ngrok.com)
