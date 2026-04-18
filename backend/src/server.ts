import cron from "node-cron";
import { env } from "./config/env.js";
import { createApp } from "./app.js";
import { runFollowUpReminderJob } from "./jobs/followup.job.js";

const app = createApp();

cron.schedule("0 * * * *", runFollowUpReminderJob);

app.listen(env.PORT, () => {
  console.log(`Backend listening on http://localhost:${env.PORT}`);
});
