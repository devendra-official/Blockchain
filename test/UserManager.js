const { expect } = require("chai");

let UserManager;

before(async function () {
  UserManager = await ethers.deployContract("UserManager");
});

describe("Users and Payment testing", function () {
  it("createCustomer", async function () {
    const eventPromise = new Promise((resolve, reject) => {
      UserManager.once("createCustomerEvent", (name, email, password, role) => {
        try {
          expect("customer").to.equal(role);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
    await UserManager.createCustomer("Devendra", "dev@gmail.com", "pass", "customer");
    await eventPromise;
  });

  it("createFarmer", async function () {
    const eventPromise = new Promise((resolve, reject) => {
      UserManager.once("createFarmerEvent", (name, email, password, role) => {
        try {
          expect("farmer").to.equal(role);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
    await UserManager.createFarmer("Devendra", "dev@gmail.com", "pass", "farmer");
    await eventPromise;
  });

  it("createAuthority", async function () {
    const eventPromise = new Promise((resolve, reject) => {
      UserManager.once("createAuthorityEvent", (name, email, password, role) => {
        try {
          expect("authority").to.equal(role);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
    await UserManager.createAuthority("Devendra", "dev@gmail.com", "pass", "authority");
    await eventPromise;
  });

  it("createCourier", async function () {
    const eventPromise = new Promise((resolve, reject) => {
      UserManager.once("createCourierEvent", (name, email, password, role) => {
        try {
          expect("courier").to.equal(role);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
    await UserManager.createCourier("Devendra", "dev@gmail.com", "pass", "courier");
    await eventPromise;
  });

  it("getCustomer", async function () {
    await UserManager.getCustomer("pass");
  });

  it("getFarmer", async function () {
    await UserManager.getFarmer("pass");
  });

  it("getAuthority", async function () {
    await UserManager.getAuthority("pass");
  });

  it("getCourier", async function () {
    await UserManager.getCourier("pass");
  });

  // Payment Contract

  it("orderProduct", async function () {
    let price = 5400000000000000; // Make sure that price in wei not in ethers
    await UserManager.orderProduct("PID", price, "time", 23, "OID", {
      value: price
    });
  });

  it("getAllOrderIds", async function () {
    await UserManager.getAllOrderIds();
  });

  it("picked", async function () {
    await UserManager.picked();
  });

  it("productDelivered", async function () {
    const eventPromise = new Promise((resolve, reject) => {
      try {
        UserManager.once("productDeliveredEvent", () => { });
        resolve();
      } catch (error) {
        reject(error);
      }
    })
    await UserManager.productDelivered("0x447185547f73d4b3780e28cE0B55Aaf4F0405469", "OID", "time");
    await eventPromise;
  });

  it("getOrders", async function () {
    await UserManager.getOrders();
  });

  it("courierslist", async function () {
    await UserManager.courierslist();
  });

});