import { Exams } from "../Entities";

interface IExamsRepository {
  listAll(): Promise<Exams[]>;
  listByPatient(): Promise<Exams[]>;
  create(exams: Exams): Promise<void>;
  findOne(examsId: string): Promise<Exams>;
  update(exams: Exams): Promise<void>;
  remove(examsId: string): Promise<void>;
}

export default IExamsRepository;
