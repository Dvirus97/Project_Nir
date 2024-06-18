import type { Person } from "../../../types/models/person.model";
import { FileManager } from "../fileManager";
import { RouterBase } from "./base.route";

export class PersonRouter extends RouterBase<Person> {
  override fileManager = new FileManager<Person>("person.json");
}

// export const personRouter = express.Router();
// const personManager = new FileManager<Person>("person.json");
// const personData = await personManager.load();
// console.log(personData);

// personRouter.get("/", (req, res) => {
//   res.json(personData);
// });

// personRouter.get("/:id", (req, res) => {
//   const id = req.params.id;
//   const ans = personData.data.find((x) => x.id == id);
//   res.json(ans);
// });

// personRouter.post("/add", (req, res) => {
//   const person = req.body as Person;
//   const isExist = personData.data.some((x) => x.id == person.id);
//   if (isExist) {
//     return res.status(400).send("there is already person with id: " + person.id);
//   }
//   if (!person.id) {
//     person.id = new Date().getTime().toString();
//   }
//   personData.data.push(person);
//   personManager.save(personData);
//   res.json({ message: "Success" });
// });

// personRouter.post("/", (req, res) => {
//   const body = req.body as Person[];
//   personData.data = body;
//   personManager.save(personData);
//   res.json({ message: "Success" });
// });

// personRouter.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const index = personData.data.findIndex((x) => x.id == id);
//   if (index != -1) {
//     personData.data.splice(index, 1);
//     personManager.save(personData);
//     res.json({ message: "Success" });
//   } else {
//     res.status(404).send("there is no such person with id: " + id);
//   }
// });
