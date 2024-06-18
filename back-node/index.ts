import Database from "bun:sqlite";
import { FileManager } from "./src/fileManager";
import { BunServer } from "./src/routing";
import { URL } from "url";
import express from "express";
import path from "path";
import cors from "cors";
import { type Person } from "../types/models/person.model";
import { PersonRouter } from "./src/routing/person.route";
import { CourseRoute, SemesterRoute } from "./src/routing/course.route";

const port = 3030 as const;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const person = ;
app.use("/person", new PersonRouter().router);
app.use("/course", new CourseRoute().router);
app.use("/semester", new SemesterRoute().router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// const server = new BunServer();
// server.get("/", (req) => {
//   //   req.json().then((x) => console.log(x));
//   const res = new Response("aaa");
//   return res;
// });

// server.post("/test1", (req, server) => {
//   //   console.log(req);
//   //   console.log(server);
//   req.formData().then((x) => console.log(x));
//   return new Response(JSON.stringify("bbbb"));
// });

// server.serve(port);

// const server = Bun.serve({
//   port: port,
//   hostname: "localhost",
//   fetch(req, server) {
//     const url = new URL(req.url);
//     const route = routing[url.pathname];
//     console.log(req.method);
//     if (route) {
//       const res = route(req, server);
//       return res;
//     }

//     // return new Response();
//   },
// });

// Bun.file("./package.json")
//   .json()
//   .then((x) => {
//     console.log(x);
//   });

// const data = { name: "dvir", age: 27 };
// // Bun.write("./db.json", JSON.stringify(data));
// const file = await Bun.file("db.json");
// const res = await file.json();
// console.log(res);
