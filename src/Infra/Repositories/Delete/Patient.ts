import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class PatientRepository {
  async delete(ids: number[]): Promise<void> {
    const db = await getConnection();
    const transaction = db.transaction("patients", ConnectionType.READWRITE);
    const objectStore = transaction.objectStore("patients");
    // Itera sobre cada ID e exclui o registro correspondente
    const promises = ids.map(
      (id) =>
        new Promise<void>((resolve, reject) => {
          const request = objectStore.delete(id);
          request.onerror = () => {
            reject(request.error);
          };
          request.onsuccess = () => {
            resolve();
          };
        })
    );

    // Aguarda que todas as operações de exclusão sejam concluídas
    await Promise.all(promises);
  }
}
