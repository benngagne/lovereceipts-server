# LoveReceipts Server

A message system powered by NodeJS, Express, and WS.

## Usage

First, install all node package dependencies with `npm install`.

To start the server, clone repo and enter either `node server.js` or run with npm using `npm start`. The app will then print to the console the HTTP and websockets ports respectively.

From there you can then run our LoveReceipts ESC/POS Client on a device like a Raspberry Pi for example with a thermal printer plugged in to be able to print the LoveReceipts to a printer. That seperate project uses python and the `escpos` library.
