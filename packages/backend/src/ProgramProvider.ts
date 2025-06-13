import { MongoClient, Collection } from "mongodb";
import type { IAPIProgram, IAPIProgramDetail } from "./shared/APIProgramData";

export class ProgramProvider {
  private programCollection: Collection<IAPIProgram>;
  private detailCollection: Collection<IAPIProgramDetail>;

  constructor(private readonly mongoClient: MongoClient) {
    const programColName = process.env.PROGRAMS_COLLECTION_NAME;
    const detailColName = process.env.PROGRAM_DETAILS_COLLECTION_NAME;

    if (!programColName || !detailColName) {
      throw new Error("Missing PROGRAMS_COLLECTION_NAME or PROGRAM_DETAILS_COLLECTION_NAME from .env");
    }

    this.programCollection = this.mongoClient.db().collection<IAPIProgram>(programColName);
    this.detailCollection = this.mongoClient.db().collection<IAPIProgramDetail>(detailColName);
  }

  async getAllPrograms(): Promise<IAPIProgram[]> {
    return this.programCollection.find().toArray();
  }

  async getProgramDetailById(id: string): Promise<IAPIProgramDetail | null> {
    return this.detailCollection.findOne({ id });
  }
} 
