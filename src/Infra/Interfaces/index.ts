import { Store } from "./UseCases/store";
import { List } from "./UseCases/list";
import { Find } from "./UseCases/find";
import { Update } from "./UseCases/update";
import { Delete } from "./UseCases/delete";
import { Client } from "./Protocols/resquest";

// Dependecy inversion
export type { Store, Delete, Find, List, Update, Client };
