const ioHook = require('iohook')
const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:3000')

ws.on('open', () => {
    ioHook.on('mousemove', event => {
        ws.send(JSON.stringify(event))
    })
    ioHook.on('mouseclick', event => {
        ws.send(JSON.stringify(event))
    })
    ioHook.on('keydown', event => {
        ws.send(JSON.stringify(event))
    })
    ioHook.start()
})