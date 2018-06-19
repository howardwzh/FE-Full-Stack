// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const CheckNow = require('./CheckNow.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "checklist-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.checkList', function() {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showWarningMessage('Hello World!');
		CheckNow();
	});

	const didSaveEvent = vscode.workspace.onDidSaveTextDocument(() => {
		CheckNow();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(didSaveEvent);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	console.log('deactivate');
}
exports.deactivate = deactivate;