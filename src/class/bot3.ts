import Bot from './bot';
import axios from 'axios';

export class Bot3 extends Bot {
    constructor(name: string, description: string) {
        super(name, description);
    }

    public getHelp(): string {
        return `Commandes disponibles:
        - help: Affiche les commandes disponibles
        - get character [id]: Affiche les informations d'un personnage
        - get planet [id]: Affiche les informations d'une planète
        - common action: Action commune à tous les bots`;
    }

    public async onMessage(message: string): Promise<void> {
        const [command, ...args] = message.split(' ');
        const fullCommand = command + (args.length > 0 ? ' ' + args.join(' ') : '');

        let response;
        switch (fullCommand) {
            case 'help':
                response = this.getHelp();
                break;
            case 'get character':
                response = await this.getCharacter(args.join(' '));
                break;
            case 'get planet':
                response = await this.getPlanet(args.join(' '));
                break;
            case 'common action':
                response = await this.commonAction(args.join(' '));
                break;
            default:
                response = 'Commande non reconnue. Tapez "help" pour voir les commandes disponibles.';
        }

        this.addMessage(response);
    }

    // Fonction pour obtenir les informations d'un personnage
    private async getCharacter(id: string): Promise<string> {
        try {
            const response = await axios.get(`https://swapi.dev/api/people/${id}`);
            const character = response.data.results[0];
            if (character) {
                return `Nom: ${character.name}, Taille: ${character.height}, Poids: ${character.mass}`;
            } else {
                return 'Personnage non trouvé.';
            }
        } catch (error) {
            return 'Erreur lors de la récupération des informations du personnage.';
        }
    }

    // Fonction pour obtenir les informations d'une planète
    private async getPlanet(id: string): Promise<string> {
        try {
            const response = await axios.get(`https://swapi.dev/api/planets/?search=${id}`);
            const planet = response.data.results[0];
            if (planet) {
                return `Nom: ${planet.name}, Climat: ${planet.climate}, Population: ${planet.population}`;
            } else {
                return 'Planète non trouvée.';
            }
        } catch (error) {
            return 'Erreur lors de la récupération des informations de la planète.';
        }
    }

    // Fonction pour l'action commune à tous les bots
    private async commonAction(args: string): Promise<string> {
        return 'Action commune déclenchée.';
    }
}
