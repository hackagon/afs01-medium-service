// Database


class MySQLDatabase {
  async connect(url: string) {
    console.log("Connected to MySQL DB")
  }

  async disconnect() {
    console.log("Dis-Connected to MySQL DB")
  }

  async save(orderId: number) {
    console.log("Order saved")
  }
}

class NoSQLDatabase {
  async connect(url: string, username: string, password: string) {
    console.log("Connected to NoSQL DB")
  }

  async disconnect() {
    console.log("Dis-Connected to NoSQL DB")
  }

  async save(orderId: number) {
    console.log("Order saved")
  }
}

class MockupData {

}

// Email
class SimpleEmail {
  async send(userId: number) { }
}

class BeautifulEmail {
  async send(userId: number, theme: string, font: string) { }
}

// Cart
class Cart {
  async checkout(orderId: number, userId: number) {
    // const db = new MySQLDatabase();
    const db = new NoSQLDatabase();
    await db.connect("locahost:3306/username-password/db_name", "root", "hackagon")
    await db.save(orderId)

    // const email = new SimpleEmail()
    const email = new SimpleEmail()
    await email.send(userId);

    await db.disconnect()
  }
}

const newCart = new Cart()
newCart.checkout(1, 2);