# Project description

- This is an accopanying backend API to bridge end-user client with the librarian-server.
- This is used as a jump layer to ensure following;
    - Developer machine may not have access to librarian server directly if it is behind a virtual privat cloud.
    - Client submitting the build need not install librarian interfaces to execute required command.
    - Moreover, the chosen server _'Librarian'_ does not support a remote submission command.
- Works for both Android and IOS builds.

# Prerequisites list

- Node.js (v8) should be installed.
- The backend server on which this API runs should have a publicly available access point.
- PM2 or equivalent Node process manager should be utilised to start this server.

# Environment setup instructions

1. npm install
2. npm start (running manually)
3. pm2 npm start (using pm2)
