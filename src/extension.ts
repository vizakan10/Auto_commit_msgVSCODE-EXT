import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Auto-Commit extension is now active!');

    const manualCommit = vscode.commands.registerCommand('viza.generateCommit', async () => {
        // Ask user to pick a commit type
        const type = await vscode.window.showQuickPick(
            [
                { label: "feat", description: "A new feature" },
                { label: "fix", description: "A bug fix" },
                { label: "docs", description: "Documentation changes" },
                { label: "style", description: "Formatting, missing semicolons, etc." },
                { label: "refactor", description: "Code changes that don’t fix a bug or add a feature" },
                { label: "perf", description: "Performance improvements" },
                { label: "test", description: "Adding or fixing tests" },
                { label: "chore", description: "Maintenance tasks, build scripts, configs" }
            ],
            { placeHolder: "Select the type of commit" }
        );

        if (!type) return; // exit if user cancels

        // Ask for optional scope
        const scope = await vscode.window.showInputBox({
            prompt: "Enter scope (optional, e.g., ui, api)",
            placeHolder: "scope or leave empty"
        });

        // Ask for commit message
        const message = await vscode.window.showInputBox({
            prompt: "Enter the commit message",
            placeHolder: "Describe your changes",
            validateInput: text => text.length === 0 ? "Message cannot be empty" : null
        });

        if (!message) return;

        const typeWithScope = scope ? `${type.label}(${scope})` : type.label;
        const commitMsg = `${typeWithScope}: ${message}`;

        // Send to terminal if open, else copy to clipboard
        const terminal = vscode.window.activeTerminal || vscode.window.createTerminal("Git Auto Commit");
        if (terminal) {
            terminal.show();
            terminal.sendText("git add .");
            terminal.sendText(`git commit -m "${commitMsg}"`);
            terminal.sendText("git push", false);
            vscode.window.showInformationMessage(
                `Git add & commit executed. Press Enter to run 'git push' in terminal.`
            );
        } else {
            await vscode.env.clipboard.writeText(commitMsg);
            vscode.window.showInformationMessage(
                `No terminal found! Commit message copied to clipboard: "${commitMsg}"`
            );
        }
    });

    context.subscriptions.push(manualCommit);
}

export function deactivate() {}
