export type ClientReq = {
  method: Method;
  data: any;
  url: Url;
};

export type ClientRes<T = any> = T;

export type Method = 'post' | 'get' | 'put' | 'delete';

/**
 * Rotas internas. Não há servidor: o `LocalClient` usa estas chaves para
 * despachar ao repositório IndexedDB correspondente. A forma de URL vem do
 * projeto original e foi mantida — é o que torna a troca por um backend real
 * (ou BaaS) uma questão de trocar o client, sem tocar nos casos de uso.
 */
export type Url =
  // Get
  | 'patient/list'
  | 'patient/findById'
  | 'patient/listCities'
  | 'patient/listInsurances'
  | 'exam/list'
  | 'exam/findById'
  | 'prescription/list'
  | 'prescription/findById'
  | 'professional/findById'
  | 'professional/findByUsername'
  // Post
  | 'patient/save'
  | 'exam/save'
  | 'prescription/save'
  | 'professional/save'
  // Put
  | 'patient/update'
  | 'exam/update'
  | 'exam/changeStatus'
  | 'prescription/update'
  | 'prescription/changeStatus'
  // Delete
  | 'patient/delete'
  | 'exam/delete'
  | 'prescription/delete';

export interface Client<R = any> {
  request(data: ClientReq): Promise<ClientRes<R>>;
}
