import Bot from './bot';

const pokemonByIdCommand = /\/pokemon (\d+)/;

export default class Bot2 extends Bot {
  constructor() {
    super('Pokemon', 'Bot donnant des infos sur les pokemons');
  }

  public getHelp(): string {
    return `Commandes disponibles:
        - /pokemon: Affiche la liste des pokemons
        - /pokemon [id]: Affiche les informations d'un pokemon`;
  }

  public async onMessage(message: string): Promise<void> {
    console.log(message);
    if (pokemonByIdCommand.test(message)) {
      const match = message.match(pokemonByIdCommand);
      if (match) {
        console.log('test détail pokemon : ');
        const response = await this.getPokemonInfo(+match[1]);
        this.addMessage(JSON.stringify(response));
      }
    } else if (message === '/pokemon') {
      console.log('test tous les pokemons : ');
      const response = await this.getAllPokemon();
      this.addMessage(JSON.stringify(response));
    } else {
      this.addMessage('Commande non reconnue');
    }
  }

  private async getAllPokemon(): Promise<{ id: number; name: string }[]> {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    const results = data.results.map((pokemon: { name: string; url: string }) => {
      const id = this.extractIdFromUrl(pokemon.url);
      //   console.log(id);
      //   return { id, name: pokemon.name };
      return `Identifiant: ${id}, Nom: ${pokemon.name}`;
    });

    return results.toString();
  }

  private extractIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\/$/);
    return match ? parseInt(match[1], 10) : -1; // Retourne -1 si l'ID n'est pas trouvé
  }

  private async getPokemonInfo(id: number): Promise<string> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return `Identifiant: ${data.id}, Nom: ${data.name}`;
  }
}
