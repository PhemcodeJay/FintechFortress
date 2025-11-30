import { 
  type User, type InsertUser,
  type Account, type InsertAccount,
  type Transaction, type InsertTransaction,
  type Card, type InsertCard,
  type Investment, type InsertInvestment,
  users, accounts, transactions, cards, investments
} from "@shared/schema";
import { db } from "../db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;

  // Accounts
  getAccountsByUserId(userId: string): Promise<Account[]>;
  getAccount(id: string): Promise<Account | undefined>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccountBalance(id: string, balance: string): Promise<Account | undefined>;

  // Transactions
  getTransactionsByAccountId(accountId: string, limit?: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Cards
  getCardsByUserId(userId: string): Promise<Card[]>;
  createCard(card: InsertCard): Promise<Card>;
  updateCard(id: string, data: Partial<Card>): Promise<Card | undefined>;

  // Investments
  getInvestmentsByUserId(userId: string): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestment(id: string, data: Partial<Investment>): Promise<Investment | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const result = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Accounts
  async getAccountsByUserId(userId: string): Promise<Account[]> {
    return db.select().from(accounts).where(eq(accounts.userId, userId));
  }

  async getAccount(id: string): Promise<Account | undefined> {
    const result = await db.select().from(accounts).where(eq(accounts.id, id));
    return result[0];
  }

  async createAccount(account: InsertAccount): Promise<Account> {
    const result = await db.insert(accounts).values(account).returning();
    return result[0];
  }

  async updateAccountBalance(id: string, balance: string): Promise<Account | undefined> {
    const result = await db.update(accounts).set({ balance }).where(eq(accounts.id, id)).returning();
    return result[0];
  }

  // Transactions
  async getTransactionsByAccountId(accountId: string, limit = 50): Promise<Transaction[]> {
    return db.select().from(transactions)
      .where(eq(transactions.accountId, accountId))
      .orderBy(desc(transactions.date))
      .limit(limit);
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const result = await db.insert(transactions).values(transaction).returning();
    return result[0];
  }

  // Cards
  async getCardsByUserId(userId: string): Promise<Card[]> {
    return db.select().from(cards).where(eq(cards.userId, userId));
  }

  async createCard(card: InsertCard): Promise<Card> {
    const result = await db.insert(cards).values(card).returning();
    return result[0];
  }

  async updateCard(id: string, data: Partial<Card>): Promise<Card | undefined> {
    const result = await db.update(cards).set(data).where(eq(cards.id, id)).returning();
    return result[0];
  }

  // Investments
  async getInvestmentsByUserId(userId: string): Promise<Investment[]> {
    return db.select().from(investments).where(eq(investments.userId, userId));
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const result = await db.insert(investments).values(investment).returning();
    return result[0];
  }

  async updateInvestment(id: string, data: Partial<Investment>): Promise<Investment | undefined> {
    const result = await db.update(investments).set(data).where(eq(investments.id, id)).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
