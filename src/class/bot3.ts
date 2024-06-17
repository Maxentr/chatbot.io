import axios from 'axios';

interface Command {
    action: (args: string) => Promise<string>;
    description: string;
}

export class ChatBot {
    private name: string;
    private commands: Map<string, Command>;

    constructor(name: string) {
        this.name = name;
        this.commands = new Map<string, Command>();

        // Enregistrement des commandes
        this.registerCommand('help', this.getHelp, 'Affiche les commandes disponibles');
        this.registerCommand('get character', this.getCharacter, 'Affiche les informations d\'un personnage');
        this.registerCommand('get planet', this.getPlanet, 'Affiche les informations d\'une planète');
        this.registerCommand('common action', this.commonAction, 'Action commune à tous les bots');
    }

    private registerCommand(command: string, action: (args: string) => Promise<string>, description: string) {
        this.commands.set(command, { action, description });
    }

    public async handleMessage(message: string): Promise<string> {
        const [command, ...args] = message.split(' ');
        const fullCommand = command + (args.length > 0 ? ' ' + args.join(' ') : '');

        if (this.commands.has(fullCommand)) {
            const commandObject = this.commands.get(fullCommand);
            return commandObject!.action(args.join(' '));
        }

        return 'Commande non reconnue. Tapez "help" pour voir les commandes disponibles.';
    }

    // Fonction pour la commande help
    private async getHelp(args: string): Promise<string> {
        return `Commandes disponibles:
        - help: Affiche les commandes disponibles
        - get character [nom]: Affiche les informations d'un personnage
        - get planet [nom]: Affiche les informations d'une planète
        - common action: Action commune à tous les bots`;
    }

    // Fonction pour obtenir les informations d'un personnage
    private async getCharacter(name: string): Promise<string> {
        try {
            const response = await axios.get(`https://swapi.dev/api/people/?search=${name}`);
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
    private async getPlanet(name: string): Promise<string> {
        try {
            const response = await axios.get(`https://swapi.dev/api/planets/?search=${name}`);
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
