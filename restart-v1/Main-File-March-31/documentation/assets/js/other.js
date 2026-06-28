// sentence copied

  // Get all sentences on the page
  const sentences = document.querySelectorAll('.sentence');

  // Add event listener to each sentence
  sentences.forEach(sentence => {
    sentence.addEventListener('click', function() {
      const textToCopy = sentence.getAttribute('data-text'); // Get the exact text from the data attribute

      // Copy the text to clipboard
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Create and show the popup dynamically
        let popup = sentence.querySelector('.popup');
        if (!popup) {
          popup = document.createElement('span');
          popup.classList.add('popup');
          sentence.appendChild(popup);
        }
        popup.textContent = `Copied: "${textToCopy}"`; // Show popup with the correct copied message

        // Show the popup after copying
        sentence.classList.add('show-popup');

        // Hide the popup after 2 seconds
        setTimeout(() => {
          sentence.classList.remove('show-popup');
        }, 500);
      }).catch(err => {
        console.log('Error copying to clipboard: ', err);
      });
    });
  });