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
  
  // Ensure the DOM is fully loaded before observing
  document.addEventListener('DOMContentLoaded', () => {
    console.log("happy prompting :)")
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