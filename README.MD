# Hodlnaut Coding Challenge

Thanks for taking the time to review my coding test submission!

On the Hodlnaut website, users can have balances in various cryptocurrency assets including BTC and ETH. Users also want to view their total balance in another asset such as USD. To be able to do this, we need to fetch prices for pairs such as BTC/USD and ETH/USD to convert between assets.

To give an example, let’s say the user’s balance is 0.5 BTC and 2 ETH. If the current BTC/USD price is 60000 and the ETH/USD price is 3000, then the user’s total balance in USD would be 60000 \* 0.5 + 3000 \* 2 = 36000 USD.

## Task

---

Create **one API endpoint using Node and Express that takes in a user id and returns the user's total balance in USD**.

Keep the user’s balances stored in memory. An example of the data to be stored is provided at the end of this section. Feel free to add more entries or change the way the data is stored if you want, but this is not necessary.

You will need to fetch the current prices from a third party public API. You can use the price from any cryptocurrency exchange but it is recommended that you use Bitstamp.

Here is a link to their API docs: https://www.bitstamp.net/api/#ticker

Assume that the only assets that the user’s balance can contain are **BTC and ETH**.

Ensure the API endpoint works correctly by writing at least one test case using the **Mocha and Chai** frameworks.

There is a test scaffold `test.js` that you can use and `package.json` has been changed so that `npm run test` will run the unit tests.

It’s expected that this task should take less than 2-3 hours to complete. If you find yourself spending too much time on this task, then just give a short explanation about what aspects were particularly time consuming and what steps you would’ve done in order to complete the task.

Aim to write clear and concise code.

```
const userBalances = {
  "user-1": {
    "BTC": "0.5",
    "ETH": "2"
  },
  "user-2": {
    "BTC": "0.1",
  },
  "user-3": {
    "ETH": "5",
  },
}
```

## System

---

This repository was developed with the system below:

- Node.js v16.13.1 (Code may not work on lower versions of Node which do not support dynamic import and named imports from CommonJS modules)
- npm 8.1.2
- Windows 11 (But was tested to work on Unix-based system)

## How to use

---

### Installation

```
npm install
```

### Setup

Clone your .env.template to a new file and rename it '.env'. Fill in the credentials below:

- PORT: Port number (defaults to 3000)

### Populate the "database"

Populate the userBalances object located in mockUserDataStorage/index.js with your preferred user data. A few dummy data points has been placed in the object.

Note:

- The app assumes that there are no duplicate user-ids, which should be handled by the POST/PUT endpoint. Given duplicate user-ids, the app will return the first user it finds.
- Each user may have as many coins as possible, and the app is case-insensitive, i.e. 'btc' works the same as 'BTC'. HOWEVER, the app again assumes that there are no duplicate coins, which should be handled by the POST/PUT endpoint.

### Start the API server

```
npm run start
```

### Run tests

```
npm run test
```

## Style Guide

---

- [Prettier](https://prettier.io/) for formatting
- [Airbnb Style Guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) for code linting

## APIs

---

#### Balance

Get Balance: `GET /balance/:userId`

- **Params**  
  Required

  - userId

- **Returns**
  - userBalance object
    - Balance

## References

---

- [BitStamp API Documentation](https://www.bitstamp.net/api/#ticker)
- [JSDocs Documentation](https://jsdoc.app/)
- [Chai documentation](https://www.chaijs.com)
- [And of course, Stack Overflow](https://stackoverflow.com)

## Questions

**1. (Optional) If you didn’t have time to complete your intended design, what else would you have done?**

Assuming I was given unlimited time, I would probably build this with TypeScript, Docker, Swagger documentation, and set up a CI/CD Pipeline on the project to be deployed on a cloud server.

Development infrastructure aside, One thing I would do is to include a local cache of the results. As the company scales, I assume this API could possibly be called many times within even a millisecond. In that case it might be unwise to ping the BitStamp API for every request, since that would be expensive and would bring little value. We could instead have a cache of each coins' latest value, and expire it after a given amount of time, depending on how time-sensitive is that data. Alternatively, if we know that the get balance API is called 24/7, we could periodically update the cache with the latest value on fixed intervals, instead of the earlier suggestion of expiring the cache and refetching the data only when the API is next called. Either ways, this will eliminate the need for many API calls to BitStamp's server that would probably return the same or extremely close value anyways.

**2. Which took the most time? What did you find most difficult?**

The assignment is relatively straightforward and I do not recall any section being particularly difficult or time-consuming. The prototype with the main logic was actually completed within a very short amount of time. The bulk of the time was spent on restructuring and refactoring the prototype's code into a more scalable project structure.

Some time was also spent debating with myself on certain features that would depend heavily on the usecase. For example, for all invalid GET routes, I am redirecting the user to the GET balance/:userId API. This makes it easy and convenient for the user to know which API to call. However, if the API was not meant to be exposed to the public, this also means that it is easier for any potentially malicious actor to find our endpoint route.

**3. If we wanted the balance to update on the frontend more often (10 times per second), how would you improve the current system to handle this?**

Firstly I would measure the current performance and check if the system does have any performance issues, testing the API at the intended rate to check if it can keep up. If there is no problem, then there might not be a problem to solve. After all, premature optimization is the root of all evil. While not representative of the scale we are dealing with, I tested calling the API from one machine to another machine using httperf, and the server has no problem handling 10 requests per second for prolonged period. Reviewing through the API logs also revealed that even though I was calling the API 10 times per second, the balance amount only changes once every second or more. Things might be different if the user was holding more types of coins and thus more changing factors, but given the case as it is I might suggest reconsidering the need to update 10 times per second.

Assuming that this API will be called by each user (since it displays one single user's data), we also need to measure our current user volume to get an idea of load. 10,000 users calling the API once every second is far worse than 1 single user calling the API 10 times per second, so the number of users arguably matter more than the number of times the frontend updates the value.

Assuming that we do need to improve performance. Some of the hard limitations can only be solved by investing in more resources, such as allocating a better virtual machine, load balancing within multiple machines, auto-scaling whenever required, and moving the server location closer to the end user.

On the code level, the API does the following things -- receives userId --> search 'database' for userObject --> fetch user coin amount --> convert coin amount to USD value **if** coin exists in wallet --> sums up the values --> converts to string --> wrap in object --> send to client. We can cut down small things like logging, string conversion, or object wrapping to improve the performance ever so slightly, but the bulk of operation here would most likely be searching 'database' for userObject, and converting coin amount to USD value.

Right now the 'database' is a local object in memory that has O(1) time complexity for search, so I doubt there's much we can do there. Assuming it is stored in an external database, we might want to make sure that userId is indexed within the database, and we could make use of a Redis cache for faster retrieval.

On my point from question 1, we could actually cache BitStamp's API to reduce the time taken here. Assuming the number of users greatly outweigh the number of times the frontend needs to update, say 1000 users updating 10 times per second, that would be 10,000 BitStamp API calls per second, out of which 9990 would be duplicate values if we assume that the end users call the APIs on the exact same time and interval. To prevent this from happening, we can apply a local memory cache (or Redis) to store BitStamp's API results, and expire it every 0.1 second. This will effectively serve as a rate-limiter to ensure we only do call BitStamp's API for a maximum of 10 times per second, no matter how many users are requesting it. That means every 0.1 second, only one user might experience a slight delay in their API call, while all the other users enjoy the fast response time where the server fetches from local storage. As also mentioned above, an alternative approach would be to call BitStamp's API every 0.1 second, but the former approach is more efficient if the server is not constantly loaded.

**4. How did you find the test overall? If you have any suggestions on how we can improve the test, we'd love to hear them!**

I think it was a really great test! I had a lot of fun building this, and I learned a few things along the way as well. The basic requirements are straightforward enough for someone to complete it under a short amount of time, but also leaves enough space for people who wants to build something more.
