const Card = require('./card');

class User {
    constructor(id, login, password, card, pincode) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.card = new Card(card, pincode);
    }
}

module.exports = User;