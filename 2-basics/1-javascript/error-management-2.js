'use strict';

// Implement a sample event emitter which emits error events every 5 seconds
const EventEmitter = require('events');

class SampleEmitter extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('data', 'Sample data');
        }, 1000);
        setInterval(() => {
            this.emit('error', new Error('Sample error!'));
        }, 5000);
    }
}

// Subscribe to the events
const emitter = new SampleEmitter();
emitter.on('data', console.log)
emitter.on('error', (err) => {
    console.error(err);
});
