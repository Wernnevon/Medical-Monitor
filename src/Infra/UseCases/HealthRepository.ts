import { Health } from "../Entities";
import { IHealthRepository } from "../Interfaces";

class HealthRepository implements IHealthRepository {
  listAll(): Promise<Health[]> {
    throw new Error("Method not implemented.");
  }
  create(health: Health): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findOne(healthId: string): Promise<Health> {
    throw new Error("Method not implemented.");
  }
  update(health: Health): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(healthId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default HealthRepository;
