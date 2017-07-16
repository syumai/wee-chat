# wee-chat

Sample chat app implemented in Weex and WebSocket.

## Setup

```bash
npm install
```

## Usage

```bash
npm run dev
npm run ws
npm run serve
```

* Then, scan QR code on your [Weex playground](https://weex.incubator.apache.org/playground.html)
* This app worked on my Android phones (local area network only)

## File structure

* `src/*`: all source code
* `app.js`: entrance of the Weex page
* `build/*`: some build scripts
* `dist/*`: where places generated code
* `assets/*`: some assets for Web preview
* `index.html`: a page with Web preview and qrcode of Weex js bundle
* `weex.html`: Web render
* `.babelrc`: babel config (preset-2015 by default)
* `.eslintrc`: eslint config (standard by default)

## npm scripts

```bash
# build both two js bundles for Weex and Web
npm run build

# build the two js bundles and watch file changes
npm run dev

# start a Web server at 8080 port
npm run serve

# start a WebSocket server at 8181 port
npm run ws

# start weex-devtool for debugging with native
npm run debug
```
