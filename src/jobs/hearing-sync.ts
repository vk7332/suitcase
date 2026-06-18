import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {

    console.log("Running hearing sync");

    // Fetch active cases

    // Re-run CNR fetch

    // Compare next dates

    // Update hearings table

    // Notify advocates
});