// app.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log('Service Worker registered:', registration))
        .catch((error) => console.log('Service Worker registration failed:', error));
    });
  }

  // app.js
let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show the install button
  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  // Handle install button click
  installButton.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferredPrompt variable
      deferredPrompt = null;
      // Hide the install button
      //installButton.style.display = 'none';
    });
  });
});

// Optional: Track successful installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
});