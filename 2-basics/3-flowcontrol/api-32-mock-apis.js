'use strict';

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const main = async () => {
    // Get the hotel list
    const uri = 'http://localhost:3000/api/hotels';

    // Retrieve hotel information
    const hotelsResponse = await axios.get(uri);
    const hotels = hotelsResponse.data;

    // Using the received hotels information, allocate their rooms
    // 1. Good old for loop
    /*
    for (const hotel of hotels) {
        const uri = `http://localhost:3000/api/hotels/${hotel.code}/rooms`;
        const roomsResponse = await axios.get(uri);

        hotel.rooms = roomsResponse.data;
    }
    const result = hotels;
     */

    // 2. A functional approach
    const uris = hotels.map((hotel) => `http://localhost:3000/api/hotels/${hotel.code}/rooms`);
    const requests = uris.map((uri) => axios.get(uri));
    const roomsResponses = await Promise.all(requests);
    const result = hotels.map((hotel, index) => {
        hotel.rooms = roomsResponses[index].data;
        return hotel;
    });

    // Allocate the output file path and write the file
    const outputFilePath = path.join(__dirname, 'output.json');
    await fs.writeFile(outputFilePath, JSON.stringify(result));

    return "OK";
};

// Since await can only be used within async blocks, we must
// process the main Promise "manually". This is being looked up
// and will probably be addressed in future NodeJS versions.
main()
    .then(console.log)
    .catch(console.error);
