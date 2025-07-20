// Example: Scroll animation or interactive buttons
console.log("Welcome to my portfolio!");

// Theme Switcher
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Typing Animation
const typingTextElement = document.getElementById('typing-text');
const textToType = "I'm Lokesh";
const typingSpeed = 150; // Speed in milliseconds
// const deletingSpeed = 100; // Speed in milliseconds - Not used for one-time typing
// const delayBetweenWords = 2000; // Delay before typing next word (in milliseconds) - Not used for one-time typing

let charIndex = 0;

function type() {
  if (charIndex < textToType.length) {
    typingTextElement.textContent = textToType.substring(0, charIndex + 1) + '|';
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    // Remove the cursor after typing is complete
    typingTextElement.textContent = textToType;
  }
}

/* Remove the del() function as it's not needed for one-time typing */
// function del() {
//   if (charIndex > 0) {
//     typingTextElement.textContent = textToType.substring(0, charIndex - 1);
//     charIndex--;
//     setTimeout(del, deletingSpeed);
//   } else {
//     setTimeout(type, typingSpeed);
//   }
// }

// Tagline sliding animation
const taglineRoles = document.querySelectorAll('.tagline-role');
// No need to set initial opacity to 0 here, done in CSS

let currentRoleIndex = 0;
const delayBeforeNextRole = 500; // Delay before the next role starts animating

function animateRolesSequentially() {
  if (currentRoleIndex < taglineRoles.length) {
    const role = taglineRoles[currentRoleIndex];

    // Determine starting position and direction based on index
    let startX = 0;
    if (currentRoleIndex === 0 || currentRoleIndex === 2) { // First and third role from left
      startX = -100; // Start 100px to the left
    } else if (currentRoleIndex === 1) { // Second role from right
      startX = 100; // Start 100px to the right
    }

    // Apply initial position
    role.style.transform = `translateX(${startX}px)`;
    // role.style.opacity = 0; // Opacity handled by CSS initial state and transition

    // Animate to final position (translateX(0)) and full opacity
    setTimeout(() => {
      role.style.transform = 'translateX(0)';
      role.style.opacity = 1; // Trigger opacity transition

      currentRoleIndex++;
      // Wait for the delay before animating the next role
      setTimeout(animateRolesSequentially, delayBeforeNextRole);
    }, 50); // Small initial delay before starting the slide animation for *this* role

  } else {
    // All roles have animated.
    // To loop the animation, uncomment the following lines:
    // setTimeout(() => {
    //   taglineRoles.forEach(role => {
    //     role.style.opacity = 0;
    //     role.style.transform = 'translateX(0)'; // Reset transform for restart
    //   });
    //   currentRoleIndex = 0;
    //   animateRolesSequentially(); // Start animation from the beginning
    // }, delayBeforeNextRole + 2000); // Delay before restarting the sequence

     // Or, to make them stay visible after one cycle, do nothing here
  }
}

// Project card click to reveal sub-projects
const projectCardsWithSubprojects = document.querySelectorAll('.project-card[data-project]');

projectCardsWithSubprojects.forEach(card => {
  const mainContent = card.querySelector('.main-project-content');
  const subProjectsContainer = card.querySelector('.sub-projects-container');
  const backButton = card.querySelector('.back-to-main');

  // Show sub-projects on main content click
  mainContent.addEventListener('click', () => {
    card.classList.add('show-subprojects');
  });

  // Hide sub-projects and show main content on back button click
  backButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click on back button from propagating to the card
    card.classList.remove('show-subprojects');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Clear initial text before starting animation
  typingTextElement.textContent = ''; 
  type(); // Start the one-time typing animation
  animateRolesSequentially(); // Start the tagline animation simultaneously

  // Remove the delay before starting the tagline animation
  // const typingDuration = textToType.length * typingSpeed + 500; // Estimate typing duration + small buffer
  // setTimeout(animateRolesSequentially, typingDuration);
});

// Start typing animation when the page loads
window.addEventListener('load', type); 