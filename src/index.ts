import env from "./config/env";
import server from "./config/server";
import { testConnection } from "./config/db";
import { RouteInit } from "./routes";
import path from "path";
export const file_path = path.resolve(__dirname);
RouteInit(server);
server.listen(env.serverPort, () => {
  console.log("Server is Running in the port : ", env.serverPort);
});
testConnection().then((isConnected) => {
  if (isConnected) {
    console.log("✅ Database connected successfully!");
  } else {
    console.error("❌ Database connection failed:");
  }
});
