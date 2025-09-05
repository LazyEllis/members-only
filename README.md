# Members Only

Members Only is an exclusive clubhouse where club members can send anonymous messages.

![App Screenshot](./docs/screenshot.png?raw=true)

## Features

- Send Messages
- Delete Messages (Admin)
- Role-based Privileges
  - Regular User: Can create messages
  - Club Member: Can view author and timestamp of messages
  - Admin: Can delete messages

## Installation

1. Fork and clone this repository

2. Install the dependencies

   ```bash
   npm install
   ```

3. Run the database setup script

   ```bash
   node bin/seed-db.js <db-url>
   ```

4. Set up environmental variables

   ```env
   PORT=3000
   SESSION_SECRET=your-session-secret
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   CLUB_PASSCODE=your-club-passcode
   ADMIN_PASSCODE=your-admin-passcode
   ```

5. Run the development server

   ```bash
   npm run dev
   ```

6. Open the app on [http://localhost:3000](http://localhost:3000)

## Contribute

- [Issue Tracker](https://github.com/LazyEllis/members-only/issues)
- [Source Code](https://github.com/LazyEllis/members-only)

## License

The project is licensed under the [MIT](LICENSE) License.
