import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Auto-Commit extension is now active!');

    // Manual commit command
    const manualCommit = vscode.commands.registerCommand('viza.generateCommit', async () => {
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

        if (!type) return;

        const scope = await vscode.window.showInputBox({
            prompt: "Enter scope (optional, e.g., ui, api)",
            placeHolder: "scope or leave empty"
        });

        const message = await vscode.window.showInputBox({
            prompt: "Enter the commit message",
            placeHolder: "Describe your changes",
            validateInput: text => text.length === 0 ? "Message cannot be empty" : null
        });

        if (!message) return;

        const typeWithScope = scope ? `${type.label}(${scope})` : type.label;
        const commitMsg = `${typeWithScope}: ${message}`;

        const terminal = vscode.window.activeTerminal;
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

    // Auto commit on file save
    const autoCommit = vscode.workspace.onDidSaveTextDocument(async (document) => {
        const text = document.getText();

        // Detect commit type based on simple rules
        let type = "chore";
        if (text.includes("function")) type = "feat";
        else if (text.includes("console.log")) type = "test";
        else if (text.includes("//") || text.includes("/*")) type = "docs";
        else if (text.match(/^\s*$/m)) type = "style"; // only whitespace changes

        const scope = await vscode.window.showInputBox({
            prompt: "Enter scope for auto commit (optional)",
            placeHolder: "scope or leave empty"
        });

        const autoMessage = `${type}${scope ? `(${scope})` : ""}: auto-generated commit message`;

        const commitMsg = await vscode.window.showInputBox({
            value: autoMessage,
            prompt: "Confirm or edit the auto-generated commit message"
        });

        if (!commitMsg) return;

        const terminal = vscode.window.activeTerminal;
        if (terminal) {
            terminal.show();
            terminal.sendText("git add .");
            terminal.sendText(`git commit -m "${commitMsg}"`);
            terminal.sendText("git push", false);
            vscode.window.showInformationMessage(
                `Auto-commit executed. Press Enter in terminal to run 'git push'.`
            );
        } else {
            await vscode.env.clipboard.writeText(commitMsg);
            vscode.window.showInformationMessage(
                `No terminal found! Commit message copied to clipboard: "${commitMsg}"`
            );
        }
    });

    context.subscriptions.push(autoCommit);
}

export function deactivate() {}
