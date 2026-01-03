# Auto-Commit Message

**Auto-Commit Message** is a VS Code extension that helps you generate consistent Git commit messages based on the type of changes you make. It can also automatically add and commit your changes, and optionally push them. If no terminal is available, the commit message is copied to your clipboard.

---

## Features

- Generate commit messages with conventional commit types:
  - `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- Optional commit scope.
- Executes `git add .` and `git commit -m "message"`.
- Push command is written in terminal; press Enter to execute.
- Fallback: copies commit message to clipboard if no terminal is available.
- **Right-click menu:**
  - **Git Status**: Shows git status in a notification and full output in the Output panel.
  - **Git Init**: Initializes a git repository and shows the result in a notification.

> ⚠️ **Note:** Automatic detection of file changes on save is not supported. You need to trigger the command manually.

---

## Usage

### Command Palette
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).  
2. Type **Generate Commit Message**.  
3. Press **Enter** and follow the prompts:  
   - Select commit type.  
   - Enter optional scope.  
   - Enter commit message.  
4. Terminal executes Git commands if open, otherwise the message is copied to clipboard.

### Keyboard Shortcut
- Press **Ctrl+Alt+H** (while the editor is focused) to trigger the command directly.  
- Follow the same prompts as above.

### Editor Context Menu
- Right-click inside the editor.
- Select from these context menu options:
  - **Generate Commit Message**: Prompts for type, scope, and message, then runs git add/commit/push or copies to clipboard.
  - **Git Status**: Shows a summary of `git status` in a notification, with a "Show More" button to view the full output in the Output panel.
  - **Git Init**: Initializes a new git repository and shows the result in a notification.

---

## Installation

### From VS Code Marketplace
1. Open VS Code.  
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`).  
3. Search for **Viza Commit Helper** and install.

### From VSIX File
```bash
vsce package
code --install-extension auto-commit-message-0.0.1.vsix
