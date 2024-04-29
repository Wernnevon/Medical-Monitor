import { Health } from "../Entities";

interface IHealthRepository {
  listAll(): Promise<Health[]>;
  create(health: Health): Promise<void>;
  findOne(healthId: string): Promise<Health>;
  update(health: Health): Promise<void>;
  remove(healthId: string): Promise<void>;
}

export default IHealthRepository;
