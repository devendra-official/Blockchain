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
    await UserManager.orderProduct([{ status: 0, productId: "PID", productName: "product", farmer: "0x447185547f73d4b3780e28cE0B55Aaf4F0405469", customer: "0x447185547f73d4b3780e28cE0B55Aaf4F0405469", totalPrice: 540000, totalQuantity: 34, timeofOrdered: "time", timeofPicked: "time", timeofDelivered: "time" }], "OID", price, { value: price });
  });

  it("getAllOrderIds", async function () {
    await UserManager.getAllOrderIds();
  });

  it("orderPicked", async function () {
    await UserManager.orderPicked("PID", "OID", "time");
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

  it("getOrderBySender", async function () {
    await UserManager.getOrderBySender();
  });

});