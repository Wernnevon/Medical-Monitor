import { TestBed } from '@angular/core/testing';
import { IDBFactory } from 'fake-indexeddb';
import { beforeEach, describe, expect, it } from 'vitest';
import { ExamStatus, type Patient } from '@domain/entities';
import { getConnection, resetConnection } from '../frameworks/indexed-connection';
import { PatientDeleteRepository } from './delete';
import { ExamGetRepository, PatientGetRepository } from './get';
import { ExamPostRepository, PatientPostRepository } from './post';
import { ExamPutRepository, PatientPutRepository } from './put';

function makePatient(name: string, city = 'Recife'): Patient {
  return {
    // `id` vazio: o repositório gera o UUID na gravação.
    id: '',
    name,
    anamnese: 'sem queixas',
    birthday: '1990-05-14' as unknown as Date,
    fatherName: 'Pai',
    motherName: 'Mae',
    rg: '1234567',
    cpf: '00000000000',
    gender: 'F',
    health: { healthInsurance: 'Unimed' },
    adress: { city, neighborhood: 'Centro', street: 'Rua A', number: 10 },
  };
}

describe('repositórios IndexedDB', () => {
  let patientsGet: PatientGetRepository;
  let patientsPost: PatientPostRepository;
  let patientsPut: PatientPutRepository;
  let patientsDelete: PatientDeleteRepository;
  let examsGet: ExamGetRepository;
  let examsPost: ExamPostRepository;
  let examsPut: ExamPutRepository;

  beforeEach(async () => {
    // Banco novo a cada teste. A conexão é memoizada, então trocar a factory
    // exige descartar a que ficou em cache.
    globalThis.indexedDB = new IDBFactory();
    resetConnection();

    TestBed.configureTestingModule({});
    patientsGet = TestBed.inject(PatientGetRepository);
    patientsPost = TestBed.inject(PatientPostRepository);
    patientsPut = TestBed.inject(PatientPutRepository);
    patientsDelete = TestBed.inject(PatientDeleteRepository);
    examsGet = TestBed.inject(ExamGetRepository);
    examsPost = TestBed.inject(ExamPostRepository);
    examsPut = TestBed.inject(ExamPutRepository);
  });

  it('gera um UUID e carimba updatedAt ao gravar', async () => {
    const before = new Date().toISOString();
    await patientsPost.save(makePatient('Ana'));

    const [stored] = await patientsGet.list();

    expect(stored.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(stored.updatedAt).toBeDefined();
    expect(stored.updatedAt! >= before).toBe(true);
  });

  it('gera identificadores distintos para registros distintos', async () => {
    await patientsPost.save(makePatient('Ana'));
    await patientsPost.save(makePatient('Bruno'));

    const ids = (await patientsGet.list()).map((p) => p.id);

    expect(new Set(ids).size).toBe(2);
  });

  it('avança updatedAt ao atualizar', async () => {
    await patientsPost.save(makePatient('Ana'));
    const [created] = await patientsGet.list();

    await new Promise((resolve) => setTimeout(resolve, 5));
    await patientsPut.update({ ...created, name: 'Ana Maria' });

    const [updated] = await patientsGet.list();
    expect(updated.name).toBe('Ana Maria');
    expect(updated.updatedAt! > created.updatedAt!).toBe(true);
  });

  it('faz backfill de updatedAt em registro legado', async () => {
    // Grava direto no store, sem passar pelo repositório — é assim que os
    // registros gravados antes do campo existir estão no banco do usuário.
    const legacy = { ...makePatient('Registro Antigo'), id: 'legado-1' };
    const db = await getConnection();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('patients', 'readwrite');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.objectStore('patients').add(legacy);
    });

    const [read] = await patientsGet.list();

    expect(read.updatedAt).toBe(new Date(0).toISOString());
  });

  it('pagina, filtra por cidade e busca por texto', async () => {
    for (const name of ['Ana', 'Bruno', 'Carla']) {
      await patientsPost.save(makePatient(name, name === 'Bruno' ? 'Olinda' : 'Recife'));
    }

    const page = await patientsPost.listPagination({ page: 1, pageSize: 2 });
    expect(page.totalEntries).toBe(3);
    expect(page.entries).toHaveLength(2);

    const olinda = await patientsPost.listPagination({
      page: 1,
      pageSize: 10,
      filters: [{ key: 'city', value: 'Olinda' }],
    });
    expect(olinda.entries.map((p) => p.name)).toEqual(['Bruno']);

    const search = await patientsPost.listPagination({
      page: 1,
      pageSize: 10,
      keywords: ['carl'],
    });
    expect(search.entries.map((p) => p.name)).toEqual(['Carla']);
  });

  it('apaga exames e prescrições junto com o paciente', async () => {
    await patientsPost.save(makePatient('Ana'));
    await patientsPost.save(makePatient('Bruno'));
    const [ana, bruno] = await patientsGet.list();

    await examsPost.save({
      id: '',
      patientId: ana.id,
      name: 'Hemograma',
      requisitionDate: '2026-01-10' as unknown as Date,
      status: ExamStatus.IN_PROGRESS,
    });
    await examsPost.save({
      id: '',
      patientId: bruno.id,
      name: 'Glicemia',
      requisitionDate: '2026-01-12' as unknown as Date,
      status: ExamStatus.DONE,
    });

    await patientsDelete.delete([ana.id]);

    expect(await patientsGet.list()).toHaveLength(1);
    expect(await examsGet.list(ana.id)).toHaveLength(0);
    expect(await examsGet.list(bruno.id)).toHaveLength(1);
  });

  it('alterna o status do exame e preenche a data de realização', async () => {
    await examsPost.save({
      id: '',
      patientId: 'paciente-1',
      name: 'Hemograma',
      requisitionDate: '2026-01-10' as unknown as Date,
      status: ExamStatus.IN_PROGRESS,
    });
    const [exame] = await examsGet.list('paciente-1');

    await examsPut.changeStatus(exame.id);
    const done = await examsGet.findById(exame.id);
    expect(done.status).toBe(ExamStatus.DONE);
    expect(done.realizationDate).toBeDefined();

    await examsPut.changeStatus(exame.id);
    const back = await examsGet.findById(exame.id);
    expect(back.status).toBe(ExamStatus.IN_PROGRESS);
    expect(back.realizationDate).toBeUndefined();
  });
});
