# Auto-Commit Message

**Auto-Commit Message** is a VS Code extension that helps you generate consistent Git commit messages based on the type of changes you make. It can also automatically add and commit your changes, and optionally push them. If no terminal is available, the commit message is copied to your clipboard.

---

## Features

- Generate commit messages with conventional commit types:
  - `feat` – A new feature
  - `fix` – A bug fix
  - `docs` – Documentation changes
  - `style` – Formatting, missing semicolons, etc.
  - `refactor` – Code changes that don’t fix a bug or add a feature
  - `perf` – Performance improvements
  - `test` – Adding or fixing tests
  - `chore` – Maintenance tasks, build scripts, configs
- Optional commit scope.
- Auto-generated commit messages on file save.
- Executes `git add .` and `git commit -m "message"`.
- Push command is written in terminal; press Enter to execute.
- Fallback: copies commit message to clipboard if no terminal is available.

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
- Select **Generate Commit Message** from the context menu.
- Follow the prompts.

### Auto Commit on File Save
- When a file is saved, the extension detects changes and suggests a commit type.
- Enter optional scope and confirm the commit message.
- Terminal executes Git commands if open; otherwise, message is copied to clipboard.

---

## Installation

1. Open VS Code.
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for **Viza Commit Helper** and install.

Or install from a VSIX file:

```bash
vsce package
code --install-extension auto-commit-message-0.0.1.vsix
