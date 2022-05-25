// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

const waitForValue = async <VALUE>(value: () => (VALUE | undefined), timeout: number, startTime?: number): Promise<VALUE> => {
	const start = startTime ?? Date.now()
	return (
		new Promise((resolve, reject) => {
			const resolvedValue = value()
			if (resolvedValue) {
				resolve(resolvedValue)
			} else {
				setTimeout(() => waitForValue(value, timeout, start).then(resolve), 100)
			}
			if (start + timeout < Date.now()) {
				reject('Failed to get value in time')
			}
		})
	)
}

const sleep = async (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

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
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			cancellable: true,
		}, async (progress, token) => {
			let isRunning = true
			token.onCancellationRequested(() => {
				isRunning = false
			})
			progress.report({ message: 'Parsing tabs to close...' })

			const initialActiveEditorHash = JSON.stringify(vscode.window.activeTextEditor)

			// NOTE: first pass is to get the number of tabs
			let tabs = 0
			let tabsToClose = 0
			do {
				if (!isRunning || !initialActiveEditorHash) {
					break
				}
				tabs++
				if (vscode.window.activeTextEditor?.document.uri.scheme === 'git' || !vscode.window.activeTextEditor?.viewColumn) {
					tabsToClose++
				}
				await vscode.commands.executeCommand('workbench.action.nextEditor')
				// NOTE: this is a hack to wait for the next editor to be loaded
				await sleep(50)
			} while (JSON.stringify(vscode.window.activeTextEditor) !== initialActiveEditorHash)

			const increment = 100 / tabsToClose

			console.log(`Found ${tabs} tabs`)
			console.log(`Found ${tabsToClose} tabs to close`)
	
			if (tabs === 0) {
				vscode.window.showInformationMessage('No tabs are open')
			} else if (tabsToClose === 0) {
				vscode.window.showInformationMessage('No tabs to close')
			}
	
			while (tabsToClose > 0) {
				if (!isRunning) {
					break
				}
				try {
					// HACK: activeTextEditor is undefined after tab is closing
					const activeTextEditor = await waitForValue(() => vscode.window.activeTextEditor, 5000)
		
					if (vscode.window.activeTextEditor?.document.uri.scheme === 'git' || !activeTextEditor?.viewColumn) {
						await vscode.commands.executeCommand('workbench.action.closeActiveEditor')
						tabsToClose--
						if (tabsToClose > 0) {
							progress.report({ increment, message: 'Closing tabs...' })
						} else {
							return Promise.resolve()
						}
					} else {
						await vscode.commands.executeCommand('workbench.action.nextEditor')
					}
				} catch (error) {
					vscode.window.showErrorMessage(`Failed to close all tabs: ${error}`)
					return Promise.reject(error)
				}
			}
		})
	})

	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
