class KeyEvent {

    constructor(event) {
        const { keycode, rawcode, type, altKey, shiftKey, ctrlKey, metaKey } = event
        this.keycode = keycode
        this.rawcode = rawcode
        this.type = type
        this.altKey = altKey
        this.shiftKey = shiftKey
        this.ctrlKey = ctrlKey
        this.metaKey = metaKey
    }
}

module.exports = KeyEvent
