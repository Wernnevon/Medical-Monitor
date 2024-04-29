import { Exams } from "../Entities";
import { IExamsRepository } from "../Interfaces";

class ExamsRepository implements IExamsRepository {
  listAll(): Promise<Exams[]> {
    throw new Error("Method not implemented.");
  }
  listByPatient(): Promise<Exams[]> {
    throw new Error("Method not implemented.");
  }
  create(exams: Exams): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findOne(examsId: string): Promise<Exams> {
    throw new Error("Method not implemented.");
  }
  update(exams: Exams): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(examsId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default ExamsRepository;
