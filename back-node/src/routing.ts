import type { Server } from "bun";

type route = (req: Request, server: Server) => Response;
// type IResponse = ;

// export const get: route = (req: Request, server: Server) => {
//   return new Response(JSON.stringify("hello"), CORS_HEADERS);
// };

// export const add: route = (req: Request, server: Server) => {
//   return new Response(JSON.stringify("hello"), CORS_HEADERS);
// };

// export const routing: any = {
//   "/": get,
//   "/add": add,
// };

export class BunServer {
  private CORS_HEADERS = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  };
  private routingGet = new Map<string, route>();
  private routingPost = new Map<string, route>();

  constructor() {}

  serve(port: number) {
    Bun.serve({
      port: port,

      fetch: (request, server) => {
        console.log(request);
        const url = new URL(request.url);
        const path = url.pathname;
        let route;
        if (request.method === "GET") {
          route = this.routingGet.get(path);
        } else if (request.method === "POST") {
          route = this.routingPost.get(path);
        }
        const res = route?.(request, server) ?? new Response();
        res.headers.set("Access-Control-Allow-Origin", "*");
        res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.headers.set("Access-Control-Allow-Headers", "Content-Type");
        res.headers.set("Access-Control-Allow-Headers", "*");
        return res;
      },
    });
  }

  get(path: string, handler: (req: Request, server: Server) => Response) {
    this.routingGet.set(path, handler);
  }
  post(path: string, handler: (req: Request, server: Server) => Response) {
    this.routingPost.set(path, handler);
  }
}
