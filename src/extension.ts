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
		// const initialActiveEditor = vscode.window.activeTextEditor

		// TODO: figure out how to differentiate between editors and source control tabs
		const editors = []
		for (let index = 0; index < 4; index++) {
			editors.push(vscode.window.activeTextEditor)
			await vscode.commands.executeCommand('workbench.action.nextEditor')
		}
		console.log(editors)
		console.log(editors.map(editor => editor?.document.getText()))
		// if (initialActiveEditor) {
		// 	while (true) {
		// 		await vscode.commands.executeCommand('workbench.action.nextEditor')
		// 		if (vscode.window.activeTextEditor?.document.uri.scheme === 'git') {
		// 			vscode.commands.executeCommand('workbench.action.closeActiveEditor')
		// 		}
		// 		if (vscode.window.activeTextEditor === initialActiveEditor) {
		// 			break
		// 		}
		// 	}
		// }
	})

	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
