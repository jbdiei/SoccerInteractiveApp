import { MongoClient, Collection } from "mongodb";
import type { IAPIHistoryItem } from "./shared/APIProgramData";

export class HistoryProvider {
  private historyCollection: Collection<IAPIHistoryItem>;

  constructor(private readonly mongoClient: MongoClient) {
    const historyColName = process.env.HISTORY_COLLECTION_NAME;
    if (!historyColName) {
      throw new Error("Missing HISTORY_COLLECTION_NAME from environment variables");
    }
    this.historyCollection = this.mongoClient.db().collection<IAPIHistoryItem>(historyColName);
  }

  async getAllHistoryItems(): Promise<IAPIHistoryItem[]> {
    return this.historyCollection.find().toArray();
  }

  async getHistoryItemsByUserId(userId: string): Promise<IAPIHistoryItem[]> {
    return this.historyCollection.find({ userId }).toArray();
  }
} 
