import MistralClient from '@mistralai/mistralai';

// TODO REPLACE API_KEY
const apiKey = 'API_KEY';
const client = new MistralClient(apiKey);

export default abstract class Bot {
  abstract messages: string[];

  abstract name: string;

  abstract description: string;

  public abstract getHelp(): string;
  public abstract onMessage(message: string): void;
  public abstract sayWelcome(): void;

  async messageAI(message: string): Promise<string> {
    if (message.length > 100) throw new Error('Message is too long');

    const chatResponse = await client.chat({
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: message }]
    });

    return chatResponse.choices[0].message.content;
  }
}
