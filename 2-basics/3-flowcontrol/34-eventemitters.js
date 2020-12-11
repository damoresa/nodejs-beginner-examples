'use strict';

const EventEmitter = require('events');

// Create a sample emitter object
class SampleEmitter extends EventEmitter {
    sampleFunction(result, delay) {
        // When invoked, emit an event
        console.log('Executing sample function');
        this.emit('executing', {});
        setTimeout(() => {
            // Emit execution result
            this.emit(result ? 'finished' : 'error', {});
        }, delay && !isNaN(delay) ? delay : 1000);
    }
}

// Use 'on' to subscribe to specific events for a given emitter
const emitter = new SampleEmitter();
emitter.on('executing', (data) => {
    console.log('Executing listener', data);
});
emitter.on('executed', (data) => {
    console.log('Executed listener', data);
});
emitter.on('error', (data) => {
    console.error('Error listener', data);
});

// Invoke the function and check how the listeners are executed
emitter.sampleFunction(true, 5000);
emitter.sampleFunction(false, 5000);

// Check the amount of registered listeners
['executing', 'executed', 'error'].forEach((event) => {
    const noListeners = EventEmitter.listenerCount(emitter, event);
    console.log(`${noListeners} listener/s for event ${event}`);
});


