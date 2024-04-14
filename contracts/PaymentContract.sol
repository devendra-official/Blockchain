// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract PaymentContract {
    enum OrderStatus {
        Ordered,
        Picked,
        Delivered
    }

    struct Item{
        OrderStatus status;
        string productId;
        string productName;
        address farmer;
        address customer;
        uint totalPrice;
        uint totalQuantity;
        string timeofPicked;
        string timeofDelivered;
        string timeofOrdered;
    }

    struct Order {
        Item[] items;
        string orderId;
        uint totalPrice;
        address customer;
        address courier;
    }

    Order[] orders;
    event orderProductEvent();
    event productDeliveredEvent();
    event orderPickedEvent();

    function orderProduct(Item[] memory items,string memory oid,uint totalPrice) public payable {
        require(msg.value == totalPrice, "PAYMENT FAILED");
        Order memory newOrder = Order({items: items,orderId: oid,totalPrice: totalPrice,customer: msg.sender,courier: address(0)});
        for (uint i=0; i < items.length; i++) {
            payable(items[i].farmer).transfer(items[i].totalPrice);
        }
        orders.push(newOrder);
        emit orderProductEvent();
    }

    function getAllOrderIds() public view returns (string[] memory) {
        string[] memory orderIds = new string[](orders.length);
        for (uint256 i = 0; i < orders.length; i++) {
            orderIds[i] = orders[i].orderId;
        }
        return orderIds;
    }


    function orderPicked(string memory pid,string memory oid,string memory time) public {
        for (uint i=0;i<orders.length;i++){
            if(keccak256(abi.encodePacked(orders[i].orderId)) == keccak256(abi.encodePacked(oid))){
                for(uint j=0;j<orders[i].items.length;j++){
                    if(keccak256(abi.encodePacked(orders[i].items[j].productId)) == keccak256(abi.encodePacked(pid))){
                        orders[i].items[j].status = OrderStatus.Picked;
                        orders[i].items[j].timeofPicked = time;
                        break;
                    }
                }
            }
        }
        emit orderPickedEvent();
    }

    function productDelivered(string memory pid,string memory oid,string memory time) public {
        for (uint i=0;i<orders.length;i++){
            if(keccak256(abi.encodePacked(orders[i].orderId)) == keccak256(abi.encodePacked(oid))){
                for(uint j=0;j<orders[i].items.length;j++){
                    if(keccak256(abi.encodePacked(orders[i].items[j].productId)) == keccak256(abi.encodePacked(pid))){
                        orders[i].items[j].status = OrderStatus.Delivered;
                        orders[i].items[j].timeofPicked = time;
                        break;
                    }
                }
            }
        }
        emit productDeliveredEvent();
    }

    function getOrders() public view returns (Order[] memory) {
        return orders;
    }

    function getOrderBySender() public view returns (Order[] memory){
        Order[] storage orderList;
        for (uint i=0;i<orders.length;i++){
            if(keccak256(abi.encodePacked(orders[i].customer)) == keccak256(abi.encodePacked(msg.sender))){
                orderList.push(orders[i]);
            }
        }
        return orderList;
    }
}
