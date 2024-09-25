// const text = "Hi there";
// const encode = new TextEncoder();
// const data = encode.encode(text);
// await Deno.writeFile("message.txt", data);
// import { Server } from "https://deno.land/std@0.199.0/http/server.ts";
// const handler = () => {
//   const body = `Hi there I am a Server`;
//   return new Response(body, { status: 200 });
// };
// const server = new Server({ port: 4505, handler });

// console.log("server listening on http://localhost:4505");

// await server.listenAndServe();
//   .then(() => {
//     console.log("Server Starts Running");
//   }).catch((err) => {
//     console.log(err);
//   });





import { Application } from "https://deno.land/x/oak/mod.ts"; // using oak library similarly like Express in Node.js

import todosRoutes from './routes/todos.ts';
const app = new Application();

app.use(async (ctx,next) => {
  console.log("Middleware");
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods())
await app.listen({ port: 3000 });
