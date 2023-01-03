# Exemplo de Chat GPT com Z-API

## 1. Clone o projeto

```bash
$ git clone https://github.com/Z-API/chat-gpt-example.git
```

<br />

## 2. Instale as dependências

```bash
$ npm install
```

<br />

## 3. Configure o arquivo de ambiente

Crie um arquivo .env na raiz do projeto com suas credencias do open ai e da z-api, algo parecido com:

```env
OPEN_AI_API_KEY=
Z_API_INSTANCE_ID=
Z_API_INSTANCE_TOKEN=
```

Caso você não possui o ID e TOKEN da z-api, crie sua conta em https://z-api.io.

Agora, caso já possua conta na z-api mas ainda não possui a chave de acesso da OpenAi, visite: https://beta.openai.com/account/api-keys

<br />

## 4. Teste seu Chat GPT.

Com seu ambiente configurado, instância na Z-API conectada, peça para um amigo te enviar o texto "!gpt" para iniciar o chat de conversa, é importante lembrar que este exemplo está em memoria e sempre que reiniar a aplicação os chats serão perdidos.

# Observações:

Como é um ambiente de desenvolvimento e testes, lembre-se de configurar o webhook de mensagem recebida do Z-API da sua instância para apontar para seu projeto local, você pode gerar esse link de webhook com o https://ngrok.com/

Ficaria algo parecido com: https://HASH-GERADO.ngrok.io/on-new-message onde "/on-new-message" é a rota deste projeto que está disponivel na porta 3000.
