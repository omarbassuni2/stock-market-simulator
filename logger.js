import winston from "winston";
class Winston {
    constructor(H) {
        this.H = H
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.simple()
        ),
            transports: [],
          });
          this.createAndAddNewFileTransport()
          this.intervalId = setInterval(() => {
                this.createAndAddNewFileTransport();
            }, 1000 * 60 * this.H);
          this.logUpdate = this.logUpdate.bind(this);
    }
    createAndAddNewFileTransport() {
        const date = new Date().toLocaleDateString('pt-BR',{ year: 'numeric', month: '2-digit', day: '2-digit'}).split( '/' ).reverse( ).join( '-' );
        const time = new Date().toLocaleTimeString('pt-BR',{ hour: '2-digit', minute: '2-digit' });
        const filename = process.env.NODE_ENV !== 'test' ? `./logs/${date} ${time}.log` : `./logs/tests-generated/test-${date} ${time}.log`;
        if(this.hasTransport) {
            this.hasTransport = false
            this.logger.clear()
        }
        this.logger.add(new winston.transports.File({
            maxFiles: 5,
            level: 'info',
            filename,
            maxsize: 10242880,
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
                })
            ),
        }))
        this.hasTransport = true
    }
    logUpdate(message) {
        this.logger.log({ level: 'info', message });
    }
    getLogger() {
        return this.logger;
    }
    clearInterval() {
        clearInterval(this.intervalId);
    }
}

export default Winston;