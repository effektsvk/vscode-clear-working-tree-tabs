// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-clear-working-tree-tabs" is now active!')

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-clear-working-tree-tabs.clearEditors', async () => {
		const initialActiveEditorHash = JSON.stringify(vscode.window.activeTextEditor)
		// NOTE: first pass is to get the number of tabs
		let tabs = 0
		let tabsToClose = 0
		do {
			tabs++
			if (vscode.window.activeTextEditor?.document.uri.scheme === 'git' || !vscode.window.activeTextEditor?.viewColumn) {
				tabsToClose++
			}
			await vscode.commands.executeCommand('workbench.action.nextEditor')
		} while (JSON.stringify(vscode.window.activeTextEditor) !== initialActiveEditorHash)
		console.log(`Found ${tabs} tabs`)
		console.log(`Found ${tabsToClose} tabs to close`)

		while (tabsToClose > 0) {
			if (vscode.window.activeTextEditor?.document.uri.scheme === 'git' || !vscode.window.activeTextEditor?.viewColumn) {
				await vscode.commands.executeCommand('workbench.action.closeActiveEditor')
				tabsToClose--
			} else {
				await vscode.commands.executeCommand('workbench.action.nextEditor')
			}
		}
	})

	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
