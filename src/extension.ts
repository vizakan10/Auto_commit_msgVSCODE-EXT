import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Auto-Commit extension is now active!');

    const disposable = vscode.commands.registerCommand('viza.generateCommit', async () => {

        // Step 1: Pick commit type
        const type = await vscode.window.showQuickPick(
            ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore"],
            { placeHolder: "Select the type of commit" }
        );
        if (!type) return;

        // Step 2: Enter commit message
        const message = await vscode.window.showInputBox({
            prompt: "Enter the commit message",
            placeHolder: "Describe your changes",
            validateInput: text => text.length === 0 ? "Message cannot be empty" : null
        });
        if (!message) return;

        // Step 3: Build git commands
        const gitCommands = [
            "git add .",
            `git commit -m "${type}: ${message}"`,
            "git push"
        ];

        // Step 4: Use existing terminal or create new
        let terminal = vscode.window.activeTerminal;
        if (!terminal) {
            terminal = vscode.window.createTerminal("Git Auto Commit");
            terminal.show();
        }

        // Step 5: Send commands to terminal
        gitCommands.forEach(cmd => terminal!.sendText(cmd));

        vscode.window.showInformationMessage("Git commands executed in the terminal!");
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
