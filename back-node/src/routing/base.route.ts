import express, { Router, type RequestHandler } from "express";
import { FileManager, type FileData } from "../fileManager";

export class RouterBase<T extends { id?: string }> {
  public readonly router: Router = express.Router();
  protected fileManager?: FileManager<T>;
  data?: FileData<T>;

  private timer = setTimeout(() => {
    this.fileManager?.load().then((data) => {
      this.data = data;
      this.init();
    });
  }, 0);

  constructor() {}
  protected init() {
    this.router.get("/", this.getAll);
    this.router.get("/:id", this.getById);
    this.router.post("/add", this.add);
    this.router.put("/", this.setData);
    this.router.delete("/:id", this.deleteById);
    this.router.put("/:id", this.patchById);
  }

  protected getAll: RequestHandler = (req, res) => {
    res.json(this.data);
  };

  protected getById: RequestHandler = (req, res) => {
    const id = req.params.id;
    const ans = this.data?.data.find((x) => x.id == id);
    res.json(ans);
  };

  protected add: RequestHandler = (req, res) => {
    const body = req.body;
    const isExist = this.data?.data.some((x) => x.id == body.id);
    if (isExist) {
      res.status(400).send("there is already entity with id: " + body.id);
      return;
    }
    if (!body.id) {
      body.id = new Date().getTime().toString();
    }
    this.data?.data.push(body);
    this.fileManager?.save(this.data!);
    res.json({ message: "Success", id: body.id });
  };

  protected patchById: RequestHandler = (req, res) => {
    const body = req.body as { id: string } & Record<string, any>;
    console.log("body", body);
    console.log("this.data?.data", this.data?.data);
    const entity = this.data?.data.find((x) => x.id == body.id);
    console.log("entity", entity);

    if (entity) {
      const index = this.data?.data.indexOf(entity);
      console.log("index", index);

      if (index != undefined && index != -1) {
        const newEntity = { ...entity, ...body };
        this.data?.data.splice(index, 1, newEntity);
        this.fileManager?.save(this.data!);
        res.json({ message: "Success" });
        return;
      }
    }
    res.status(404).send("there is no such entity with id: " + body.id);
  };

  protected setData: RequestHandler = (req, res) => {
    const body = req.body;
    this.data!.data = body;
    this.fileManager!.save(this.data!);
    res.json({ message: "Success" });
  };

  protected deleteById: RequestHandler = (req, res) => {
    const { id } = req.params;
    const index = this.data!.data.findIndex((x) => x.id == id);
    if (index != -1) {
      this.data!.data.splice(index, 1);
      this.fileManager!.save(this.data!);
      res.json({ message: "Success" });
    } else {
      res.status(404).send("there is no such entity with id: " + id);
    }
  };
}
