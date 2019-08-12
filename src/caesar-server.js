const { Server } = require('ws')
const robot = require("robotjs")
const keyMap = require('../keymap')


class CaesarServer {
    constructor(host, port) {
        this.host = host || 'localhost'
        this.port = port || 3000
        this.wsServer = new Server({ host: this.host, port: this.port })
        this.onConnect()
    }

    onConnect() {
        this.wsServer.on('connection', (ws) => {
            ws.on('message', (message) => {
                console.log('received: %s', message)
                const event = JSON.parse(message)
                if (event.type === 'mousemove') {
                    robot.moveMouse(event.x, event.y)
                } else if (event.type === 'mouseclick') {
                    if (event.button === 1) {
                        robot.mouseClick()
                    } else if (event.button) {
                        robot.mouseClick('right')
                    }
                } else if (event.type === 'keydown') {
                    if (keyMap[event.rawcode]) {
                        robot.keyTap(keyMap[event.rawcode])
                    }
                }
            })
        })
    }
}

module.exports = CaesarServer