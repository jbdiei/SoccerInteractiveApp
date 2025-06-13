

import express, { Request, Response } from "express";
import { ProgramProvider } from "../ProgramProvider";
import { HistoryProvider } from "../HistoryProvider";
import { IAPIStat } from "shared/APIProgramData";

export function registerDashboardRoutes(
  app: express.Application,
  programProvider: ProgramProvider,
  historyProvider: HistoryProvider,
  stats: IAPIStat[],
) {
  app.get("/api/dashboard-data", async (req: Request, res: Response) => {
    try {
      const [programs, history] = await Promise.all([
        programProvider.getAllPrograms(),
        historyProvider.getAllHistoryItems(),
      ]);

      res.json({
        stats,     // still mock
        programs,
        history,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}
