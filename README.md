# wallet

Tech Stack Used:

- `NodeJs (ExpressJs)` : Backend
- `MongoDB (Mongoose)` : Backend
- `VueJs [VueRouter, Axios]` : Frontend

- `Heroku` : Server (Deploying)
- `Github` : Cloud Version Control

Loom Video : [https://www.loom.com/share/feb1a769d06d427a85df9f8678de2482](https://www.loom.com/share/feb1a769d06d427a85df9f8678de2482)

## Server Documentation

---

This is the Documentation for the Server Side of the Application.

- Code for Server lies in `/server` Directory.
- The root file for Server execution is `index.js`

### Packages:

- `ajv` : For Schema Validation on Request.
- `express` : Node framework for easy and quick server setup.
- `json-2-csv` : To convert JSON data to CSV formatted data.
- `mongoose` : ORM to connect with MongoDB

### Project Setup:

Installing:

```sh
npm install
```

ENV variable:

```
DB_URL=<MongoDB URL>
```

Running:

```sh
npm run start
```

### Routes

**All server routes are prefixed with `/api`**

- `/setup` : This route creates wallet for the specified `name`

**_Body_**

```json
{
	"name": "Prashant Singh", // String [Required]
	"balance": 1000 // String
}
```

**_Response [Status: 200]_**

```json
// Without Initial Balance
{
	"id": "6111292eb354ed4c583af9c6",
	"balance": 0,
	"name": "Prashant",
	"date": "2021-08-09T13:10:06.142Z"
}
// With Initial Balance
{
  "id": "61112948b354ed4c583af9c8",
  "transactionId": "61112949b354ed4c583af9ca",
  "balance": 1000,
  "name": "Prashant",
  "date": "2021-08-09T13:10:32.978Z"
}
```

---

- `/transact` : This route is used to do transactions.

**_Body_**

```json
{
	"amount": 1000, // Number [Required]
	"description": "Test" // String
}
```

**_Response [Status: 200]_**

```json
{
	"transactionId": "611129a8b354ed4c583af9cd",
	"balance": 1300
}
```

---

- `/wallet/:walletId` : This route gives the basic wallet information.

**_Response [Status: 200]_**

```json
{
	"id": "61112948b354ed4c583af9c8",
	"balance": 1300,
	"name": "Prashant",
	"date": "2021-08-09T13:10:32.978Z"
}
```

---

- `/transactions/:walletId` : For listing all the Transactions for the Wallet

**_Query_**

```json
{
	"limit": 20, // Number
	"skip": 0, // Number
	"order": "asc" // String
}
```

**_Response [Status: 200]_**

```json
[
	{
		"id": "61112949b354ed4c583af9ca",
		"walletId": "61112948b354ed4c583af9c8",
		"amount": 1000,
		"balance": 1000,
		"description": "Wallet Setup",
		"date": "2021-08-09T13:10:33.007Z",
		"type": "CREDIT"
	},
	{
		"id": "611129a8b354ed4c583af9cd",
		"walletId": "61112948b354ed4c583af9c8",
		"amount": 300,
		"balance": 1300,
		"description": "Zomato",
		"date": "2021-08-09T13:12:08.335Z",
		"type": "CREDIT"
	}
]
```

---

- `/transactions/download/:walletId` : For Downloading CSV file for the Transactions for the wallet.

**_Query_**

```json
{
	"limit": 20, // Number
	"skip": 0, // Number
	"order": "asc" // String
}
```

## UI Implementation

---

This is the Documentation for the Client Side of the Application. It is implemented using `VueJs` created using `vue cli`.

- Code for Client lies in `/client` Directory.
- Pagination Implemented Using Infinte Loading intead of Buttons.
- `TailWindCSS` is used for the UI.

### Packages:

- `axios` : For Requesting Data to Server.
- `vue-infinite-loading` : For Infinite Loading in VueJs.
- `vue-router` : For Routing in Vue Application.

### Project Setup:

Installing:

```sh
npm install
```

Running:

```sh
npm run serve
```

### Routes:

- `/` : For Doing Transactions. It is a validated Route, user needs to have `walletId` in order to access this page otherwise the user will be redirected to `/wallet-signin`. Already having `walletId` users will be redirected back to `/` route.
- `/wallet-signin` : For Creating Wallet or Continueing using exisiting WalletId.

  - User can create New Wallet by Entering `name` and `balance`. Once the wallet is created from server. It will store `walletId` in localStorage for further use.
  - User can also continue with the Existing `WalletId`.

- `/transactions` : For Viewing all the exisiting transaction records, and downloading the CSV file for the transaction Records.

## Future Optimization (For Scaling)

1. Optimize Transaction code for better performance.
2. Run multiple nodes behind nginx load balancer.
3. Convert JSON data to CSV file in Client Side.
4. Server Side Caching Implementation for Transaction Records.
5. Streaming Transaction data
