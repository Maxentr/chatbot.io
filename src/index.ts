import Bot1 from './class/bot1';
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

  if (selectedValue === 'bot3') {
    const bot3 = new Bot3();
    bot3.onMessage(inputValue);
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
