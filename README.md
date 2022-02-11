
( Project Name: Code Translator Web-Console Application)


# PURPOSE

For those who choose to code in native languages and translate their code to English (or other).
Ability to create dictionary.json file for later translations. 

![Alt Text](images/attach1.jpg?raw=true "ScreenShot")

![Alt Text](images/attach2.jpg?raw=true "ScreenShot")


## Example Usage
- Put your JS Code into src/inputFile.js
- Open index.html in your Browser and open Console (F12 or Ctrl+Shift+I)
- Follow the instructions in the console (example ask() cv="translation" saveDictionary() codeTranslate())


## Advanced Usage

1. Can be modified for programming languages other than Javascript. Add/subtract desired keywords to dictionary.json> terms
2. Can be modified for native alphabets other than Turkish. Find and edit unicode character range "\u00C7-\u0160" in src> translator.js