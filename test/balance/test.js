import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index.js";
import { USDStringToNumber } from "../../src/utils/index.js";

chai.use(chaiHttp);

describe("GET /balance/:userId tests", () => {
  it("should return valid user portfolio value in USD given valid user id with non-zero ETH and BTC", async () => {
    const res = await chai.request(server).get("/balance/user-both-coins");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("Balance");

    const userBalanceUSD = res.body.Balance;
    expect(userBalanceUSD).to.be.a("string");
    expect(userBalanceUSD).to.satisfy((s) => s.startsWith("US$")); // Check that it is returning the correct currency

    const userBalanceUSDNumber = USDStringToNumber(userBalanceUSD.substring(3));
    expect(userBalanceUSDNumber).to.be.least(0);
    expect(userBalanceUSDNumber * 100).to.be.above(0); // Check that is it 2 decimal places
  });

  it("should return valid user portfolio value in USD given valid user id with non-zero ETH only", async () => {
    const res = await chai.request(server).get("/balance/user-eth-only");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("Balance");

    const userBalanceUSD = res.body.Balance;
    expect(userBalanceUSD).to.be.a("string");
    expect(userBalanceUSD).to.satisfy((s) => s.startsWith("US$")); // Check that it is returning the correct currency

    const userBalanceUSDNumber = USDStringToNumber(userBalanceUSD.substring(3));
    expect(userBalanceUSDNumber).to.be.least(0);
    expect(userBalanceUSDNumber * 100).to.be.above(0); // Check that is it 2 decimal places
  });

  it("should return valid user portfolio value in USD given valid user id with non-zero BTC only", async () => {
    const res = await chai.request(server).get("/balance/user-btc-only");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("Balance");

    const userBalanceUSD = res.body.Balance;
    expect(userBalanceUSD).to.be.a("string");
    expect(userBalanceUSD).to.satisfy((s) => s.startsWith("US$")); // Check that it is returning the correct currency

    const userBalanceUSDNumber = USDStringToNumber(userBalanceUSD.substring(3));
    expect(userBalanceUSDNumber).to.be.least(0);
    expect(userBalanceUSDNumber * 100).to.be.above(0); // Check that is it 2 decimal places
  });

  it("should return balance as 0 given valid user id with no coins", async () => {
    const res = await chai.request(server).get("/balance/empty-user");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("Balance");

    const userBalanceUSD = res.body.Balance;
    expect(userBalanceUSD).to.be.a("string");
    expect(userBalanceUSD).to.satisfy((s) => s.startsWith("US$")); // Check that it is returning the correct currency

    const userBalanceUSDNumber = USDStringToNumber(userBalanceUSD.substring(3));
    expect(userBalanceUSDNumber).to.equal(0);
  });

  it("should return balance as 0 given valid user id with coins of 0 balance", async () => {
    const res = await chai.request(server).get("/balance/empty-user");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("Balance");

    const userBalanceUSD = res.body.Balance;
    expect(userBalanceUSD).to.be.a("string");
    expect(userBalanceUSD).to.satisfy((s) => s.startsWith("US$")); // Check that it is returning the correct currency

    const userBalanceUSDNumber = USDStringToNumber(userBalanceUSD.substring(3));
    expect(userBalanceUSDNumber).to.equal(0);
  });

  it("should return balance as 0 given valid user id with only non-BTC and non-ETH coins", async () => {
    const res = await chai.request(server).get("/balance/user-bnb-only");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("Balance");

    const userBalanceUSD = res.body.Balance;
    expect(userBalanceUSD).to.be.a("string");
    expect(userBalanceUSD).to.satisfy((s) => s.startsWith("US$")); // Check that it is returning the correct currency

    const userBalanceUSDNumber = USDStringToNumber(userBalanceUSD.substring(3));
    expect(userBalanceUSDNumber).to.equal(0);
  });
});
