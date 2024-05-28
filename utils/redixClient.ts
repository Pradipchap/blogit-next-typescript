import { createClient } from "redis";

const client = createClient({
  password: "9khiNbKzD1OBF1s80Xp1CtzJ1W8Ejo83",
  socket: {
    host: "redis-19045.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 19045,
  },
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export default client;

