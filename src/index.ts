import Bot1 from './class/bot1';
import Bot2 from './class/bot2';
import { Bot3 } from './class/bot3';
import './index.scss';


const trigger = document.querySelector('.input-group-append') as HTMLElement;
const input = document.querySelector('.form-control') as HTMLInputElement;
const botSelector = document.getElementById('bot-selector') as HTMLSelectElement;
const buttonSelector = document.getElementById('selector-button') as HTMLButtonElement;
let selectedValue = 'bot1';


const handleTriggerClick = () => {
    if (!input.value.trim()) {
        alert('Veuillez entrer une valeur valide');
        return;
    }
    const inputValue = input.value;
    addMessage(inputValue);

    switch (selectedValue) {
        case 'bot1':
            new Bot1().onMessage(inputValue);
            break;
        case 'bot2':
            new Bot2().onMessage(inputValue);
            break;
        case 'bot3':
            new Bot3().onMessage(inputValue);
            break;
        default:
            console.error(`Unknown bot type: ${inputValue}`);
    }
    input.value = '';
};

const addMessage = (message: string): void => {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) throw new Error('No chat messages container found');

    chatContainer.innerHTML += `
      <div class="message text-left">
        <p><strong>Utilisateur</strong> <span class="user-message">${message}</span></p>
      </div>
    `;
};


const handleButtonClick = () => {
    selectedValue = botSelector.value;
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }
};

if (trigger) {
    trigger.addEventListener('click', handleTriggerClick);
}

if (buttonSelector) {
    buttonSelector.addEventListener('click', handleButtonClick);
}