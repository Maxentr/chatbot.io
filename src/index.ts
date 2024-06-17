import './index.scss';

const hello = 'hello';

console.log(hello);


const trigger = document.getElementsByClassName('input-group-append');
const input = document.getElementsByClassName('form-control')[0] as HTMLInputElement;
const botSelector = document.getElementById('bot-selector') as HTMLSelectElement;
const buttonSelector = document.getElementById('selector-button') as HTMLButtonElement;
let selectedValue = 'bot1';

if (trigger && botSelector) {
    trigger[0].addEventListener('click', () => {
        if (input.value === '') {
            alert('Veuillez entrer une valeur valide');
            return;
        }
        let inputValue = input.value;
        console.log(input.value);
        console.log(selectedValue);
        //const bot = new Bot();
        //const response = bot.messageAI(inputValue);
        //console.log(response);
    });
}

if (buttonSelector) {
    buttonSelector.addEventListener('click', () => {
        selectedValue = botSelector.value;
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
    });
}