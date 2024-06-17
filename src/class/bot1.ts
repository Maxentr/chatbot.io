import Bot from './bot';

export default class Bot1 extends Bot {
  COMMAND_WELCOME = 'welcome';

  COMMAND_NEXT_MCU = 'next-mcu';

  COMMAND_GEOLOCATION = 'geolocation';

  messages: string[] = [];

  name: string = 'Jason Statham Bot';

  description: string = "I'm like a dog with a bone. I never let go.";

  public getHelp(): string {
    return `The commands available on this bot are : "${this.COMMAND_WELCOME}", "${this.COMMAND_NEXT_MCU}" and "${this.COMMAND_GEOLOCATION}"`;
  }

  public async onMessage(message: string): Promise<void> {
    switch (true) {
      case message.includes(this.COMMAND_WELCOME):
        this.addMessage(this.sayWelcome());
        break;
      case message.includes(this.COMMAND_NEXT_MCU):
        this.addMessage((await this.getNextMCUFilm()) ?? '');
        break;
      case message.includes(this.COMMAND_GEOLOCATION):
        this.addMessage((await this.getUserLocation()) ?? '');
        break;
      default:
        this.addMessage('Unknown command, type "help" to find out the available commands');
    }
  }

  public sayWelcome(): string {
    return `Hello, I am ${this.name} : ${this.description}`;
  }

  public async getNextMCUFilm(): Promise<string | null> {
    let data = null;
    try {
      const response = await fetch('https://www.whenisthenextmcufilm.com/api');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      return `The next MCU film is "${data.title}" : ${data.overview}`;
    } catch (error) {
      console.error('Error fetching the MCU film data:', error);
      return null;
    }
  }

  public async getUserLocation(): Promise<string | null> {
    try {
      const ipResponse = await fetch('https://api.ipify.org/?format=json');
      if (!ipResponse.ok) {
        throw new Error(`IP API error: ${ipResponse.statusText}`);
      }
      const ipData = await ipResponse.json();
      const { ip } = ipData;
      const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
      if (!locationResponse.ok) {
        throw new Error(`Location API error: ${locationResponse.statusText}`);
      }
      const locationData = await locationResponse.json();
      return `Your are located in ${locationData.city}, ${locationData.country}`;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
