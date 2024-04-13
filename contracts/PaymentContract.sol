// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract PaymentContract {
    enum OrderStatus {Pending,Delivered}

    struct Order {
        OrderStatus status;
        string productId;
        string orderId;
        uint price;
        uint quantity;
        string timeofOrdered;
        string timeofDelivered;
        address seller;
    }

    struct Buyer {
        address buyer;
        Order[] orders;
    }

    mapping(address => Buyer) buyer;
    event orderProductEvent();
    event productDeliveredEvent();

    function orderProduct(string memory pid,uint price,address seller,string memory time,uint quantity,string memory oid) public payable {
        require(msg.value == price, "PAYMENT FAILED");
        Order memory newOrder = Order({status: OrderStatus.Pending,productId: pid,orderId: oid,price: price,quantity: quantity,timeofOrdered: time,timeofDelivered: time,seller: seller});

        buyer[msg.sender].orders.push(newOrder);
        payable(seller).transfer(price);
        emit orderProductEvent();
    }

    function getAllOrderIds() view public returns(string[] memory) {
        string[] memory orderIds = new string[](buyer[msg.sender].orders.length);
        for (uint256 i = 0; i < buyer[msg.sender].orders.length; i++) {
            orderIds[i] = buyer[msg.sender].orders[i].orderId;
        }
        return orderIds;
    }

    function productDelivered(address customer,string memory pid,string memory oid,string memory time) public {
        Order[] storage orders = buyer[customer].orders;
        for (uint i = 0; i < orders.length; i++) {
            if (keccak256(abi.encodePacked(orders[i].productId)) ==keccak256(abi.encodePacked(pid)) &&keccak256(abi.encodePacked(orders[i].orderId)) ==keccak256(abi.encodePacked(oid))) {
                orders[i].status = OrderStatus.Delivered;
                orders[i].timeofDelivered = time;
                break;
            }
        }
        emit productDeliveredEvent();
    }
}
