export class PrescriptionRepository {
  constructor(private readonly OBJECT_STORE: IDBObjectStore) {}

  delete(id: number): Promise<void> {
    const request = this.OBJECT_STORE.delete(id);
    return new Promise((resolve, reject) => {
      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }
}
