/**
 * Checks if the given element is a text input element.
 * @param {HTMLElement} element - The element to check.
 * @returns {boolean} True if the element is a text input, false otherwise.
 */
const isTextInput = (element) => {
    return element instanceof HTMLTextAreaElement ||
      (element instanceof HTMLInputElement && element.tagName === 'TEXT') ||
      (element instanceof HTMLDivElement && element.tagName === 'DIV') ||
      (element instanceof HTMLParagraphElement && element.tagName === 'P');
  };
  
  /**
   * Observes DOM changes and attaches event listeners to new text input elements.
   */
  const observeDOM = () => {
    const observer = new MutationObserver((mutations) => {
      console.log("observe");
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const textInputs = node.querySelectorAll('textarea, input[type="text"]');
              textInputs.forEach((input) => {
                // Add input event listener
                input.addEventListener('input', (event) => {
                  if (isTextInput(event.target) && event.target === activeElement) {
                    console.log(event.target.value);
                    // Send message to browser runtime
                    browser.runtime.sendMessage({
                      action: 'updateElementText',
                      text: event.target.value,
                      tagName: event.target.tagName.toLowerCase(),
                      inputType: event.target.type
                    }).catch(error => console.error('Error sending message:', error));
                  }
                });
  
                // Add focus event listener to update activeElement
                input.addEventListener('focus', (event) => {
                  if (isTextInput(event.target)) {
                    activeElement = event.target;
                  }
                });
              });
            }
          });
        }
      });
    });
  
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
  };
  
  // Ensure the DOM is fully loaded before observing
  document.addEventListener('DOMContentLoaded', () => {
    observeDOM();
  });
  
  /**
   * Global input event listener for all text input elements.
   */
  document.addEventListener('input', (event) => {
    if (isTextInput(event.target)) {
      // Send message to browser runtime
      browser.runtime.sendMessage({
        action: 'updateElementText',
        text: event.target.value || event.target.innerText,
        tagName: event.target.tagName.toLowerCase(),
        inputType: event.target.type
      }).catch(error => console.error('Error sending message:', error));
    }
  });