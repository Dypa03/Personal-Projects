// Example code to update social stats and confidant ranks
const charmValue = 3;
const charmElement = document.querySelector('#social-stats .stat .value');
charmElement.textContent = charmValue;

// Update other stats and confidants in a similar way

// Example code to increment charm when a button is clicked
const incrementButton = document.querySelector('#social-stats .stat .increment-button');
incrementButton.addEventListener('click', () => {
  charmValue += 1;
  charmElement.textContent = charmValue;
});
