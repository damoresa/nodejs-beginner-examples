'use strict';

class CacheService {
    constructor() {
        this._cache = {};
    }

    put(key, value) {
        console.log(`Added ${key}: ${value}`);
        this._cache[key] = value;
    }

    get(key) {
        return this._cache[key];
    }

    hasKey(key) {
        return this._cache.hasOwnProperty(key);
    }

    getKeys() {
        return Object.keys(this._cache);
    }
}

module.exports = new CacheService();
