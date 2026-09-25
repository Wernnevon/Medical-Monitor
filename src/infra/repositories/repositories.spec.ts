/**
 * Testes de integração — repositórios Firestore
 *
 * Pré-requisito: Firebase Emulator Suite rodando.
 *
 * Para executar:
 *   npm run test:emulator
 *
 * O script sobe o emulador automaticamente e roda os specs via vitest.
 */
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  initializeFirestore,
  connectFirestoreEmulator,
  terminate,
  Firestore,
} from 'firebase/firestore';

const PROJECT_ID = 'demo-envinya-care';
const EMULATOR_HOST = 'http://127.0.0.1:8080';

async function clearEmulatorData(): Promise<void> {
  await fetch(
    `${EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}/databases/(default)/documents`,
    { method: 'DELETE' },
  );
}
import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { ExamStatus, type Patient } from '@domain/entities';
import { FIRESTORE } from '@infra/frameworks/firebase';
import { PatientDeleteRepository } from './delete';
import { ExamGetRepository, PatientGetRepository } from './get';
import { ExamPostRepository, PatientPostRepository } from './post';
import { PatientPutRepository } from './put';
import { Injector, runInInjectionContext } from '@angular/core';

// ─── Helpers ─────────────────────────────────────────────────────────────────

let firestore: Firestore;
let app: FirebaseApp;
let injector: Injector;
let appCounter = 0;

function makePatient(name: string, city = 'Recife'): Patient {
  return {
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

function injectRepo<T>(cls: new (...args: any[]) => T): T {
  return runInInjectionContext(injector, () => new cls());
}

// ─── Suite ───────────────────────────────────────────────────────────────────

describe('repositórios Firestore', () => {
  let patientsGet: PatientGetRepository;
  let patientsPost: PatientPostRepository;
  let patientsPut: PatientPutRepository;
  let patientsDelete: PatientDeleteRepository;
  let examsGet: ExamGetRepository;
  let examsPost: ExamPostRepository;

  beforeEach(async () => {
    await clearEmulatorData();

    app = initializeApp(
      { projectId: PROJECT_ID },
      `test-app-${++appCounter}`,
    );
    firestore = initializeFirestore(app, {});
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);

    injector = Injector.create({
      providers: [
        { provide: FIRESTORE, useValue: firestore },
        { provide: PatientGetRepository, useClass: PatientGetRepository },
        { provide: PatientPostRepository, useClass: PatientPostRepository },
        { provide: PatientPutRepository, useClass: PatientPutRepository },
        { provide: PatientDeleteRepository, useClass: PatientDeleteRepository },
        { provide: ExamGetRepository, useClass: ExamGetRepository },
        { provide: ExamPostRepository, useClass: ExamPostRepository },
      ],
    });

    patientsGet = injector.get(PatientGetRepository);
    patientsPost = injector.get(PatientPostRepository);
    patientsPut = injector.get(PatientPutRepository);
    patientsDelete = injector.get(PatientDeleteRepository);
    examsGet = injector.get(ExamGetRepository);
    examsPost = injector.get(ExamPostRepository);
  });

  afterEach(async () => {
    await terminate(firestore);
  });

  // ── Pacientes ──────────────────────────────────────────────────────────────

  it('gera UUID e carimba updatedAt ao gravar', async () => {
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

    const updated = await patientsGet.findById(created.id);
    expect(updated.name).toBe('Ana Maria');
    expect(updated.updatedAt! > created.updatedAt!).toBe(true);
  });

  it('retorna paciente por ID', async () => {
    await patientsPost.save(makePatient('Carlos'));
    const [saved] = await patientsGet.list();

    const found = await patientsGet.findById(saved.id);
    expect(found.name).toBe('Carlos');
  });

  it('apaga exames junto com o paciente', async () => {
    await patientsPost.save(makePatient('Ana'));
    await patientsPost.save(makePatient('Bruno'));
    const patients = await patientsGet.list();
    const ana = patients.find((p) => p.name === 'Ana')!;
    const bruno = patients.find((p) => p.name === 'Bruno')!;

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
});
