import { Service, inject } from '@angular/core';
import {
  ExamDeleteRepository,
  PatientDeleteRepository,
  PrescriptionDeleteRepository,
} from '../repositories/delete';
import {
  ExamGetRepository,
  PatientGetRepository,
  PrescriptionGetRepository,
} from '../repositories/get';
import {
  ExamPostRepository,
  PatientPostRepository,
  PrescriptionPostRepository,
} from '../repositories/post';
import {
  ExamPutRepository,
  PatientPutRepository,
  PrescriptionPutRepository,
} from '../repositories/put';
import type { Client, ClientReq, ClientRes, Method, Url } from './protocols/request';

type Route = (data: any) => Promise<any>;

/**
 * Despacha uma "requisição" para o repositório IndexedDB correspondente.
 *
 * Não existe servidor: o par (método, url) é apenas a chave de roteamento que
 * mantém os casos de uso ignorantes quanto à persistência. Trocar isto por um
 * cliente HTTP ou por um SDK de BaaS não exige mudança em `data/` nem nas
 * telas.
 */
@Service()
export class LocalClient implements Client {
  private readonly patientGet = inject(PatientGetRepository);
  private readonly examGet = inject(ExamGetRepository);
  private readonly prescriptionGet = inject(PrescriptionGetRepository);

  private readonly patientPost = inject(PatientPostRepository);
  private readonly examPost = inject(ExamPostRepository);
  private readonly prescriptionPost = inject(PrescriptionPostRepository);

  private readonly patientPut = inject(PatientPutRepository);
  private readonly examPut = inject(ExamPutRepository);
  private readonly prescriptionPut = inject(PrescriptionPutRepository);

  private readonly patientDelete = inject(PatientDeleteRepository);
  private readonly examDelete = inject(ExamDeleteRepository);
  private readonly prescriptionDelete = inject(PrescriptionDeleteRepository);

  // As rotas são arrow functions e não referências soltas a método. O projeto
  // original registrava `repo.metodo` diretamente, o que desliga o `this` — só
  // não quebrava porque nenhum repositório usava `this` na época.
  private readonly routes: Record<Method, Partial<Record<Url, Route>>> = {
    get: {
      'patient/list': () => this.patientGet.list(),
      'patient/findById': (id) => this.patientGet.findById(id),
      'patient/listCities': () => this.patientGet.listCities(),
      'patient/listInsurances': () => this.patientGet.listInsurances(),
      'exam/list': (patientId) => this.examGet.list(patientId),
      'exam/findById': (id) => this.examGet.findById(id),
      // Registrado como "precription/..." no original — o typo deixava
      // `prescription/findById` sem rota, e a chamada estourava
      // "getStrategy[key] is not a function".
      'prescription/list': (patientId) => this.prescriptionGet.list(patientId),
      'prescription/findById': (id) => this.prescriptionGet.findById(id),
    },
    post: {
      'patient/list': (params) => this.patientPost.listPagination(params),
      'patient/save': (patient) => this.patientPost.save(patient),
      'exam/list': (params) => this.examPost.listPagination(params),
      'exam/save': (exam) => this.examPost.save(exam),
      'prescription/list': (params) =>
        this.prescriptionPost.listPagination(params),
      'prescription/save': (prescription) =>
        this.prescriptionPost.save(prescription),
    },
    put: {
      'patient/update': (patient) => this.patientPut.update(patient),
      'exam/update': (exam) => this.examPut.update(exam),
      'exam/changeStatus': (id) => this.examPut.changeStatus(id),
      'prescription/update': (prescription) =>
        this.prescriptionPut.update(prescription),
      'prescription/changeStatus': (id) =>
        this.prescriptionPut.changeStatus(id),
    },
    delete: {
      'patient/delete': (ids) => this.patientDelete.delete(ids),
      'exam/delete': (ids) => this.examDelete.delete(ids),
      'prescription/delete': (ids) => this.prescriptionDelete.delete(ids),
    },
  };

  async request({ method, url, data }: ClientReq): Promise<ClientRes<any>> {
    const route = this.routes[method][url];
    if (!route) {
      throw new Error(`Rota não registrada: ${method.toUpperCase()} ${url}`);
    }
    return route(data);
  }
}
