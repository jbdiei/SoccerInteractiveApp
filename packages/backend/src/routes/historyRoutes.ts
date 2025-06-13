import express, { Request, Response } from "express";
import { HistoryProvider } from "../HistoryProvider";

export function registerHistoryRoutes(app: express.Application, historyProvider: HistoryProvider) {
  app.get("/api/history", async (req: Request, res: Response) => {
    try {
      const items = await historyProvider.getAllHistoryItems();
      res.json(items);
    } catch (err) {
      console.error("Failed to fetch history items", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Later, you can add: app.post("/api/history", ...), app.delete(...), etc.
}