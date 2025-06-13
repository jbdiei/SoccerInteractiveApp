import express, { Request, Response } from "express";
import { ProgramProvider } from "../ProgramProvider";

export function registerProgramRoutes(app: express.Application, programProvider: ProgramProvider) {
  // GET /api/programs → Return all programs
  app.get("/api/programs", async (req: Request, res: Response) => {
    try {
      const programs = await programProvider.getAllPrograms();
      res.json(programs);
    } catch (err) {
      console.error("Error fetching programs:", err);
      res.status(500).json({ error: "Failed to fetch programs" });
    }
  });

  // GET /api/programs/:id → Return a specific program by ID
  app.get("/api/programs/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const program = await programProvider.getProgramDetailById(id);
      if (!program) {
         res.status(404).json({ error: "Program not found" });
         return;
      }
      res.json(program);
    } catch (err) {
      console.error(`Error fetching program with ID ${id}:`, err);
      res.status(500).json({ error: "Failed to fetch program" });
    }
  });


  
}
