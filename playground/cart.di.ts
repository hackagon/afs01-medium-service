import "reflect-metadata";
import { injectable, inject, Container } from "inversify"

// interface
interface IDatabase {
  connect?(url: string): Promise<void>
  disconnect?(): Promise<void>
  save(orderId: number): Promise<void>
}

@injectable()
class MySQLDatabase implements IDatabase {
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

@injectable()
class NoSQLDatabase implements IDatabase {
  async connect(url: string): Promise<void> {
    console.log("Connected to MySQL NoSQL DB")
  }

  async disconnect?(): Promise<void> {
    console.log("DisConnected to MySQL NoSQL DB")
  }
  async save(orderId: number): Promise<void> {
    console.log("Order Saved");
  }
}

@injectable()
class Mockup implements IDatabase {
  async save(orderId: number): Promise<void> {
    console.log("Order Saved");
  }
}

// email interface
interface IEmail {
  send(userId: number, template?: string, font?: string): Promise<void>
}

@injectable()
class SimpleEmail implements IEmail {
  async send(userId: number): Promise<void> {
    console.log("Email sent")
  }
}

@injectable()
class BeautifulEmail implements IEmail {
  async send(userId: number, template: string): Promise<void> {
    console.log(`Email sent with ${template}`)
  }
}

// Cart
const cartContainer = new Container();
cartContainer.bind<IDatabase>("Database").to(MySQLDatabase)
cartContainer.bind<IEmail>("Email").to(BeautifulEmail)

@injectable()
class Cart {
  constructor(
    @inject("Database") public db: IDatabase,
    @inject("Email") public email: IEmail
  ) { }

  async checkout(orderId: number, userId: number) {
    await this.db.connect("localhost....")
    await this.db.save(orderId)

    await this.email.send(userId, "material")

    await this.db.disconnect()
  }
}

const cart: Cart = cartContainer.resolve<Cart>(Cart)
cartContainer.rebind<IDatabase>("Database").to(NoSQLDatabase)
cart.checkout(1, 2)