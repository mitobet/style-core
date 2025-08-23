// Create the new div element
const newDiv = document.createElement('div');

// Create the button element
const button = document.createElement('button');
button.className = 'contact_button_new'; // Only use contact_button_new
button.type = 'button';

// Create the span inside the button
const span = document.createElement('span');
span.textContent = 'Beni Ara';
button.appendChild(span);

// Append the button to the new div
newDiv.appendChild(button);

// Find the header__signin element
const signInElement = document.querySelector('#header .header__actions .header__signin');

// Insert the new div before the header__signin element
if (signInElement && signInElement.parentNode) {
    signInElement.parentNode.insertBefore(newDiv, signInElement);
}