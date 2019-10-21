const EventEmitter = require('events')

class Logger extends EventEmitter {
    execute(callbac) {
        console.log('Before')
        this.emit('start')
        callbac()
        this.emit('finish')
        console.log('After')
    }
}

const logger = new Logger();

logger.on('start', () => console.log('Starting'))
logger.on('finish', () => console.log('Finishing'))
logger.on('finish', () => console.log('Its Done'))

logger.execute(() => console.log('hello world'))