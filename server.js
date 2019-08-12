const { Server } = require('ws')
const robot = require("robotjs")
const keyMap = require('./keymap')

const wsServer = new Server({ port: 3000 })
robot.setMouseDelay(2)

wsServer.on('connection', (ws) => {
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