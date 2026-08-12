import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"] || "3000";
const port = Number(rawPort);

if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    logger.info({ port }, "Server listening");
  });
}

export default app;

