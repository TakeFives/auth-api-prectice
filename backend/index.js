import { app } from "./src/app.js";

// TODO: is my server running?
const PORT = process.env.PORT || 5080;
// NOTE: Lines you could make use to complete this file
// process.env.PORT

app.listen(PORT, () => {
  console.info(`Running server using PORT: ${PORT}`);
});
