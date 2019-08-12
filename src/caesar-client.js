const ioHook = require('iohook')
const WebSocket = require('ws')

class CaesarClient {
    constructor(host, port) {
        this.host = host || 'localhost'
        this.port = port || 3000
        this.ws = new WebSocket(`ws://${this.host}:${this.port}`)
        this.registerDefaultHandlers()
    }

    registerDefaultHandlers() {
        this.onOpen()
        this.onClose()
        this.onError()
    }

    onOpen() {
        this.ws.on('open', () => {
            console.log(`Client is connected...`)
            ioHook.on('mousemove', event => {
                this.ws.send(JSON.stringify(event))
            })
            ioHook.on('mouseclick', event => {
                this.ws.send(JSON.stringify(event))
            })
            ioHook.on('keydown', event => {
                this.ws.send(JSON.stringify(event))
            })
            ioHook.start()
        })
    }

    onClose() {
        this.ws.on('close', () => {
            ioHook.stop()
            console.log('Client is disconnected...')
        })
    }

    onError() {
        this.ws.on('error', () => {
            ioHook.stop()
            console.error('Client is disconnected by error...')
        })
    }

    disconnect() {
        this.ws.close()
    }
}

module.exports = CaesarClient