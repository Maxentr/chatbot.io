// Définition de l'URL de l'API
const apiUrl = 'https://pokeapi.co/api/v2/pokemon';

// Fonction pour afficher les données des Pokémon
function displayPokemonData(pokemonData: { name: string; url: string }[]) {
  const pokemonList = document.getElementById('pokemon-list');
  if (pokemonList) {
    pokemonList.innerHTML = '<h5>Liste des Pokémon:</h5>';
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    pokemonData.forEach((pokemon) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = pokemon.name;
      ul.appendChild(li);
    });
    pokemonList.appendChild(ul);
  }
}

// Fonction pour obtenir les données de l'API
async function fetchPokemonData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    const data = await response.json();
    console.log('Données des Pokémon:', data.results); // Ajout du console.log
    displayPokemonData(data.results);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

// Appel de la fonction pour récupérer et afficher les données
fetchPokemonData();
