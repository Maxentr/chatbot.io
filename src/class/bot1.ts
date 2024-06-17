import Bot from './bot';

export default class Bot1 extends Bot {
  COMMAND_WELCOME = 'welcome';

  COMMAND_NEXT_MCU = 'next-mcu';

  COMMAND_GEOLOCATION = 'geolocation';

  messages: string[] = [];

  name: string = 'Jason Statham Bot';

  description: string = 'Sometimes we have to do things against our principles... It\'s better to forget that we have them...';

  public getHelp(): string {
    return `The commands available on this bot are : "${this.COMMAND_WELCOME}", "${this.COMMAND_NEXT_MCU}" and "${this.COMMAND_GEOLOCATION}"`;
  }

  public async onMessage(message: string): Promise<string | null> {
    switch (true) {
      case message.includes(this.COMMAND_WELCOME):
        return this.sayWelcome();
      default:
        return null;
    }
  }

  public sayWelcome(): string {
    return `Hello, I am ${this.name} : ${this.description}`;
  }
}
