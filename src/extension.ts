// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ToolsConfig } from './tools';
import { OperatorSdk } from './operatorsdk';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('vscode-operator-sdk" is now active!');


	const disposable = [
		vscode.commands.registerCommand('operatorsdk.version', () => execute(OperatorSdk.getSDkVersion)),
        vscode.commands.registerCommand('operatorsdk.new', () => execute(OperatorSdk.newOperator)),
        vscode.commands.registerCommand('operatorsdk.addAPI', async () => execute(await OperatorSdk.add("api"))),
        vscode.commands.registerCommand('operatorsdk.addController', async () => execute(await OperatorSdk.add('controller'))),
        vscode.commands.registerCommand('operatorsdk.addCRD', async () => execute( await OperatorSdk.add('crd'))),
        vscode.commands.registerCommand('operatorsdk.generateK8s', async () => execute( await OperatorSdk.generate('k8s'))),
        vscode.commands.registerCommand('operatorsdk.generateOpenapi', async () => execute( await OperatorSdk.generate('openapi-gen'))),
        vscode.commands.registerCommand('operatorsdk.run',  () => execute(OperatorSdk.run)),
        vscode.commands.registerCommand('operatorsdk.setpath',  () => execute(OperatorSdk.setOperatorPath)),
        vscode.commands.registerCommand('operatorsdk.printdeps',  () => execute(OperatorSdk.printDeps)),
        
	];

	disposable.forEach((value) => context.subscriptions.push(value));

}

function execute<T>(command: (...args: T[]) => Promise<any> | void, ...params: T[]) {
    try {
        const res = command.call(null, ...params);
        return res && res.then
            ? res.then((result: any) => {
                displayResult(result);

            }).catch((err: any) => {
                vscode.window.showErrorMessage(err.message ? err.message : err);
            })
            : undefined;
    } catch (err) {
        vscode.window.showErrorMessage(err);
    }
}

function displayResult(result?: any) {
    if (result && typeof result === 'string') {
        vscode.window.showInformationMessage(result);
    }
}


// this method is called when your extension is deactivated
export function deactivate() {}
