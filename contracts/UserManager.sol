// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.2 <0.9.0;


contract UserManager {
    
    // USERS FUNCTIONS AND EVENTS
    struct Customer {
        string name;
        string email;
        string password;
        string role;
        address ETHAddress;
    }

    mapping(address => Customer) customers;
    event createCustomerEvent(string name,string email,string password,string role);

    function createCustomer(string memory name,string memory email,string memory password,string memory role) public {
        require(keccak256(abi.encodePacked(customers[msg.sender].ETHAddress)) != keccak256(abi.encodePacked(msg.sender)),"Customer already exist!");
        customers[msg.sender] = Customer(name,email,password,role,msg.sender);
        emit createCustomerEvent(name, email, password, role);
    }

    function getCustomer(string memory password) public view returns (Customer memory) {
        require(keccak256(abi.encodePacked(customers[msg.sender].ETHAddress)) == keccak256(abi.encodePacked(msg.sender)),"Customer Not exist!");
        require(keccak256(abi.encodePacked(customers[msg.sender].password)) == keccak256(abi.encodePacked(password)),"Wrong password,Please Try Again!");
        return customers[msg.sender];
    }

    // FARMERS FUNCTIONS AND EVENTS (Similarly for Authorities)

    struct Farmer {
        string name;
        string email;
        string password;
        string role;
        address ETHAddress;
    }

    mapping(address => Farmer) farmers;
    event createFarmerEvent(string name,string email,string password,string role);

    function createFarmer(string memory name,string memory email,string memory password,string memory role) public {
        require(keccak256(abi.encodePacked(farmers[msg.sender].ETHAddress)) != keccak256(abi.encodePacked(msg.sender)),"Farmer already exist!");
        farmers[msg.sender] = Farmer(name, email, password, role, msg.sender);
        emit createFarmerEvent(name, email, password, role);
    }

    function getFarmer(string memory password) public view returns (Farmer memory) {
        require(keccak256(abi.encodePacked(farmers[msg.sender].ETHAddress)) == keccak256(abi.encodePacked(msg.sender)),"Farmer Not exist!");
        require(keccak256(abi.encodePacked(farmers[msg.sender].password)) == keccak256(abi.encodePacked(password)),"Wrong password,Please Try Again!");
        return farmers[msg.sender];
    }

    // AUTHORITIES FUNCTIONS AND EVENTS

    struct Authority {
        string name;
        string email;
        string password;
        string role;
        address ETHAddress;
    }

    mapping(address => Authority) authority;
    event createAuthorityEvent(string name,string email,string password,string role);

    function createAuthority(string memory name,string memory email,string memory password,string memory role) public {
        require(keccak256(abi.encodePacked(authority[msg.sender].ETHAddress)) != keccak256(abi.encodePacked(msg.sender)),"Authority already exist!");
        authority[msg.sender] = Authority(name,email,password,role,msg.sender);
        emit createAuthorityEvent(name, email, password, role);
    }

    function getAuthority(string memory password) public view returns (Authority memory) {
        require(keccak256(abi.encodePacked(authority[msg.sender].ETHAddress)) == keccak256(abi.encodePacked(msg.sender)),"Authority Not exist!");
        require(keccak256(abi.encodePacked(authority[msg.sender].password)) == keccak256(abi.encodePacked(password)),"Wrong password,Please Try Again!");
        return authority[msg.sender];
    }

    struct Item{
        string id;
        uint quantity;
    }

    struct Cart{
        Item[] items;
        address ETHAddress;
    }

    mapping (address => Cart) carts;
    event addCartEvent();
    event updateCartEvent();
    event removeProductEvent();

    function addCart(string memory id,uint quantity) public {
        bool isAdded = false;
        for(uint i=0;i<carts[msg.sender].items.length;i++){
            if(keccak256(abi.encodePacked(carts[msg.sender].items[i].id)) == keccak256(abi.encodePacked(id))){
                isAdded = true;
                break;
            }
        }
        require(!isAdded,"product already in cart");
        carts[msg.sender].items.push(Item(id,quantity));
        carts[msg.sender].ETHAddress = msg.sender;
        emit addCartEvent();
    }

    function getCart() public view returns (Cart memory){
        return carts[msg.sender];
    }

    function updateCart(string memory id,uint quantity) public {
        for(uint i=0;i<carts[msg.sender].items.length;i++){
            if(keccak256(abi.encodePacked(carts[msg.sender].items[i].id)) == keccak256(abi.encodePacked(id))){
                carts[msg.sender].items[i].quantity = quantity;
                break;
            }
        }
        emit updateCartEvent();
    }

    function removeProduct(string memory id) public {
        for (uint i = 0; i < carts[msg.sender].items.length; i++) {
            if (keccak256(abi.encodePacked(carts[msg.sender].items[i].id)) == keccak256(abi.encodePacked(id))) {
                for (uint j = i; j < carts[msg.sender].items.length - 1; j++) {
                    carts[msg.sender].items[j] = carts[msg.sender].items[j + 1];
                }
                carts[msg.sender].items.pop();
                break;
            }
        }
        emit removeProductEvent();
    }
}
