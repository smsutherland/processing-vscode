import * as search from "../search"
import {openDocErrorMessage} from "./utils"
import vscode from "vscode"

export const openDocumentation = () => {
    search.openURL("https://github.com/TobiahZ/processing-vscode#processing-for-visual-studio-code")
}

export const openProcessingDocs = (textEditor: vscode.TextEditor) => {
    // selection[0] is the start, and selection[1] is the end
    let selection = textEditor.selection
    if (!selection.isSingleLine) {
        openDocErrorMessage("Multiple lines selected, please select a class or function.")
        return
    }

    let range = undefined
    if (!selection.isEmpty) {
        // selection is not empty, get text from it
        range = new vscode.Range(selection.start, selection.end)
    } else {
        // selection is empty, get any word at cursor
        range = textEditor.document.getWordRangeAtPosition(selection.active)
    }

    if (range === undefined) {
        openDocErrorMessage(
            'Nothing is selected. Please select a class, or use "Search Documentation" instead!',
        )
        return
    }

    search.openProcessingDocs(
        textEditor.document.lineAt(range.start.line).text,
        range.start.character,
        range.end.character,
    )
}

export const searchUnityDocs = () => {
    vscode.window
        .showInputBox({
            prompt: "Search Processing Website:",
        })
        .then((result: string | undefined) => {
            if (result !== undefined) {
                // Use the node module "open" to open a web browser
                search.openURL("docs", result)
            }
        })
}
