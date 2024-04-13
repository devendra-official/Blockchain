let UserManager;

before(async function () {
    UserManager = await ethers.deployContract("UserManager");
});

describe("PaymentContract", function () {
    it("orderProduct", async function () {
        await UserManager.orderProduct("PID", 5400000000000000, "0xA133e8275c2AdfC29C9541b4978F233F23AcC0f6", "time", 23, "OID", {
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
})