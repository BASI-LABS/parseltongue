const isTextInput = (element) => {
    return element instanceof HTMLTextAreaElement || 
           (element instanceof HTMLInputElement && element.type === 'text');
  };
  
  const observeDOM = () => {
    const observer = new MutationObserver((mutations) => {
      console.log("observe");
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const textInputs = node.querySelectorAll('textarea, input[type="text"]');
              textInputs.forEach((input) => {
                input.addEventListener('input', (event) => {
                  if (isTextInput(event.target) && event.target === activeElement) {
                    console.log(event.target.value);
                    browser.runtime.sendMessage({
                      action: 'updateElementText',
                      text: event.target.value,
                      tagName: event.target.tagName.toLowerCase(),
                      inputType: event.target.type
                    }).catch(error => console.error('Error sending message:', error));
                  }
                });
  
                // Add event listener for focus to update activeElement
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
  
    observer.observe(document.body, { childList: true, subtree: true });
  };
  
  // Ensure the DOM is fully loaded before observing
  document.addEventListener('DOMContentLoaded', () => {
    observeDOM();
  });
  
  // Initial event listeners for existing elements
  document.addEventListener('click', (event) => {
    if (isTextInput(event.target)) {
      activeElement = event.target;
    } else {
      activeElement = null;
    }
  });
  
  document.addEventListener('input', (event) => {
    if (isTextInput(event.target) && event.target === activeElement) {
      browser.runtime.sendMessage({
        action: 'updateElementText',
        text: event.target.value,
        tagName: event.target.tagName.toLowerCase(),
        inputType: event.target.type
      }).catch(error => console.error('Error sending message:', error));
    }
  });
  