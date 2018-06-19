
const vscode = require('vscode');
const checkList = require('./utils/check-list.js');

module.exports = () => {
	const editor = vscode.window.activeTextEditor;
	const text = editor.document.getText();
	checkList.forEach((item) => {
		if (item.rule.test(text)) {
			const showMsgType = item.type === 'warn' ? 'showWarningMessage' : 'showErrorMessage';
			vscode.window[showMsgType](item.msg);
		}
	});
};
