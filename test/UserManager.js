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

  it("addCart", async function () {
    const eventPromise = new Promise((resolve, reject) => {
      try {
        UserManager.once("addCartEvent", () => { })
        resolve();
      } catch (error) {
        reject(error);
      }
    })

    await UserManager.addCart("PID", 23);
    await eventPromise;
  });

  it("getCart", async function () {
    await UserManager.getCart();
  });

  it("updateCart", async function () {
    await UserManager.updateCart([{ id: "PID", quantity: 76 }]);
  });

  it("removeProduct", async function () {
    const eventPromise = new Promise((resolve, reject) => {
      try {
        UserManager.once("removeProductEvent", () => { });
        resolve();
      } catch (error) {
        reject(error);
      }
    })
    await UserManager.removeProduct("PID");
    await eventPromise;
  });

  it("orderProduct", async function () {
    await UserManager.orderProduct("PID", 5400000000000000, "0x5D0185B079BE40a7bE1698E706526a6951a45303", "time", 23, "OID", {
      value: 5400000000000000
    });
  });

  it("getAllOrderIds", async function () {
    await UserManager.getAllOrderIds();
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
    await UserManager.productDelivered("0x447185547f73d4b3780e28cE0B55Aaf4F0405469", "PID", "OID", "time");
    await eventPromise;
  });

});