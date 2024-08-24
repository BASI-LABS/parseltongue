# Parseltongue (αlpha)

![parseltongue](https://github.com/user-attachments/assets/44c629cd-7545-4f95-8da0-130abed26dff)


Parseltongue is a powerful browser extension for text conversion and real-time tokenization visualization, supporting formats like leetspeak, binary, base64, and more to come. Perfect for developers, linguists, and casual users to enhance text prompts on the fly.

## Compatibility

| Feature                     | Firefox          | Chrome           |
|-----------------------------|------------------|------------------|
| Text Conversion             | ✅ | ✅ |
| Tokenization Visualization  | ✅ | ✅ |
| Popup UI                    | ✅ | ✅ |
| Context Menu Integration    | ✅ | ✅ |
| Real-time Visualization     | ✅ | ✅ |


## Features

- **Text Conversion**: Convert text to/from leetspeak, binary, base64, ROT13, and more.
- **Tokenization Visualization**: Real-time token visualization with colored tokens.
- **User Interface**: Easy access via popup and context menu integration.

**ROADMAP (To-Do)**: glitch token library, prompt library (system prompts + 'harmful' prompts for testing), language translation, text reversal, special characters + unicode, emojispeak, word order scrambling, prompt enhancer/mutator, image mutator (adds noise) 

## Installation

### Clone the Repository

```bash
git clone https://github.com/BASI-LABS/parseltongue.git
cd parseltongue
```

### Build the Extension

**NOTE**: You can use the `/dist` folder within the repo as well, the bottom instruction are just for good measure.

Parseltongue uses Webpack to bundle the extension. Follow these steps to compile the extension:

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Compile with Webpack**:
    ```bash
    npm run build
    ```



### Load the Extension

#### Chrome

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
3. Select the `manifest.json` file in the `dist` directory 

#### Firefox

1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on..."
3. Select the `manifest.json` file in the `dist` directory 

### Accessing the Sidebar
After activating the extension through the popup, you'll need to open the sidebar to access ParselTongue's full functionality. The process differs slightly between Chrome and Firefox:
#### For Chrome Users

Locate the ParselTongue icon in your browser's toolbar.
Right-click on the icon to reveal a dropdown menu.
Select "Open side panel" from the options presented.

#### For Firefox Users

Look for the sidebar icon in your browser's toolbar (usually represented by a box with lines).
Click on this icon to toggle the sidebar view.
If you don't see the sidebar icon, you can:

Use the keyboard shortcut Ctrl+B (Cmd+B on Mac) to open the sidebar.
Or, go to View > Sidebar in the main menu and select ParselTongue.



For more detailed instructions on using Firefox's sidebar feature, you can refer to Mozilla's official support page: Using the Firefox Sidebar 
Once opened, the ParselTongue sidebar will provide you with quick access to all of its text manipulation and analysis tools.

Happy prompting :)


## Usage

- **Text Conversion**: Highlight text, right-click, and select "Convert Text".
- **Tokenization Visualization**: Use the popup to visualize tokens in real-time.
- **Toggle Real-time Visualization**: Click the extension icon to enable/disable real-time token visualization.

## Contributing

We welcome contributions! Follow these steps to set up your development environment:

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page.
2. **Clone Your Fork**:
    ```bash
    git clone https://github.com/<your-username>/parseltongue.git
    cd parseltongue
    ```
3. **Create a Branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4. **Make Your Changes**: Implement your feature or fix.
5. **Commit Your Changes**:
    ```bash
    git add .
    git commit -m "Description of your changes"
    ```
6. **Push to Your Fork**:
    ```bash
    git push origin feature/your-feature-name
    ```
7. **Create a Pull Request**: Open a pull request from your branch to the `main` branch of the original repository.

## Running a Temporary Extension

To test the extension without permanently installing it, follow the loading instructions under "Load the Extension" for Chrome or Firefox.

## License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

**Parseltongue** - Convert and visualize text like magic!

