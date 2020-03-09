import * as vscode from 'vscode';
import * as langclient from 'vscode-languageclient';
import * as npmWhich from "npm-which";


export function activate(context: vscode.ExtensionContext) {
	const languageServerToolPath = npmWhich.sync("hlb-langserver", { cwd: context.extensionPath });
	let client = new langclient.LanguageClient(
		languageServerToolPath,
		{
			command: languageServerToolPath,
			args: [],
			options: {}
		},
		{
			initializationOptions: {},
			documentSelector: ['hlb'],
			// uriConverters: {
			// 	// Apply file:/// scheme to all file paths.
			// 	code2Protocol: (uri: vscode.Uri): string =>
			// 		(uri.scheme ? uri : uri.with({ scheme: 'file' })).toString(),
			// 	protocol2Code: (uri: string) => vscode.Uri.parse(uri)

			// },
			// 	revealOutputChannelOn: langclient.RevealOutputChannelOn.Never,
			// 	middleware: {
			// 		provideDocumentFormattingEdits: (
			// 			document: vscode.TextDocument,
			// 			options: vscode.FormattingOptions,
			// 			token: vscode.CancellationToken,
			// 			next: langclient.ProvideDocumentFormattingEditsSignature
			// 		) => {
			// 			return next(document, options, token);
			// 		},
			// 		handleDiagnostics: (
			// 			uri: vscode.Uri,
			// 			diagnostics: vscode.Diagnostic[],
			// 			next: langclient.HandleDiagnosticsSignature
			// 		) => {
			// 			return next(uri, diagnostics);
			// 		},
			// 		provideDocumentLinks: (
			// 			document: vscode.TextDocument,
			// 			token: vscode.CancellationToken,
			// 			next: langclient.ProvideDocumentLinksSignature
			// 		) => {
			// 			return next(document, token);
			// 		}
			// 	}
		}
	);

	client.onReady().then(() => {
		const capabilities = client.initializeResult && client.initializeResult.capabilities;
		if (!capabilities) {
			return vscode.window.showErrorMessage(
				'The language server is not able to serve any features at the moment.'
			);
		}
	});

	let disposable = client.start();
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
