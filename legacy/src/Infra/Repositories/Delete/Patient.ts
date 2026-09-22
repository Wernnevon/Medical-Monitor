import {
  ConnectionType,
  getConnection,
} from "../../Frameworks/indexedConnection";

export class PatientRepository {
  async delete(ids: number[]): Promise<void> {
    const db = await getConnection();

    // Cria transações para as stores envolvidas
    const transaction = db.transaction(
      ["patients", "exams", "prescriptions"],
      ConnectionType.READWRITE
    );

    const patientStore = transaction.objectStore("patients");
    const examStore = transaction.objectStore("exams");
    const prescriptionStore = transaction.objectStore("prescriptions");

    // Função para deletar exames e prescrições de um paciente
    const deleteRelatedRecords = async (patientId: number): Promise<void> => {
      // Deletar exames relacionados ao paciente
      await new Promise<void>((resolve, reject) => {
        const examIndex = examStore.index("patientId");
        const examRequest = examIndex.openCursor(patientId);
        examRequest.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            const deleteExamRequest = cursor.delete();
            deleteExamRequest.onsuccess = () => cursor.continue(); // Continua deletando até não restar nenhum
            deleteExamRequest.onerror = () => reject(deleteExamRequest.error);
          } else {
            resolve(); // Todos os exames foram deletados
          }
        };
        examRequest.onerror = () => reject(examRequest.error);
      });

      // Deletar prescrições relacionadas ao paciente
      await new Promise<void>((resolve, reject) => {
        const prescriptionIndex = prescriptionStore.index("patientId");
        const prescriptionRequest = prescriptionIndex.openCursor(patientId);
        prescriptionRequest.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            const deletePrescriptionRequest = cursor.delete();
            deletePrescriptionRequest.onsuccess = () => cursor.continue(); // Continua deletando até não restar nenhuma
            deletePrescriptionRequest.onerror = () =>
              reject(deletePrescriptionRequest.error);
          } else {
            resolve(); // Todas as prescrições foram deletadas
          }
        };
        prescriptionRequest.onerror = () => reject(prescriptionRequest.error);
      });
    };

    // Itera sobre cada ID de paciente, exclui os dados relacionados e depois o próprio paciente
    const promises = ids.map(
      (id) =>
        new Promise<void>(async (resolve, reject) => {
          try {
            // Primeiro, deleta os exames e prescrições relacionados ao paciente
            await deleteRelatedRecords(id);

            // Agora, deleta o paciente
            const request = patientStore.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
          } catch (error) {
            reject(error);
          }
        })
    );

    // Aguarda que todas as operações de exclusão sejam concluídas
    await Promise.all(promises);
  }
}
