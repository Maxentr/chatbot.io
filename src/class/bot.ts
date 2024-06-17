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

  Bot(name: string, description: string) {
    this.name = name;
    this.description = description;
    }

  protected addMessage(message: string): void {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) throw new Error('No chat messages container found');

    chatContainer.innerHTML += `
      <div class="message text-left">
        <p><strong>${this.name}</strong> <span class="bot-message">${message}</span></p>
      </div>
    `;
  }

  protected async messageAI(message: string): Promise<string> {
    if (message.length > 100) throw new Error('Message is too long');

    const chatResponse = await client.chat({
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: message }]
    });

    return chatResponse.choices[0].message.content;
  }
}
