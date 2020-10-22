export default class CodeMirror {
    constructor(ref, options) {
        const { CodeMirror: cm } = window
        this.core = cm.fromTextArea(ref, {
            ...options,
        })
    }

    getValue() {
        return this.core.getValue()
    }

    setValue(value) {
        this.core.setValue(value)
    }

    updateTheme(theme) {
        this.core.setOption("theme", theme)
    }

    updateMode(mode) {
        this.core.setOption("mode", mode)
    }

    onValueChange(handler) {
        if (!this.core) return
        this.core.on("change", ({ doc }) => handler(doc.getValue()))
    }

    setDefaultValue(value) {
        this.core.setValue(value)
    }
}
