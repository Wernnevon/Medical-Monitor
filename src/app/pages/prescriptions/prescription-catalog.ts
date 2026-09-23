/**
 * Catálogo estático de medicações por categoria, oferecido como checklist na
 * prescrição — mesma ideia do `CATALOGO_EXAMES` em `exams/exam-catalog.ts`.
 * Dado de referência da clínica, não do domínio.
 */
export type CategoriaMedicamento = {
  tipo: string;
  medicamentos: string[];
};

export const CATALOGO_MEDICAMENTOS: CategoriaMedicamento[] = [
  {
    tipo: 'Analgésicos e Antitérmicos',
    medicamentos: [
      'Dipirona 500mg',
      'Paracetamol 750mg',
      'Ibuprofeno 400mg',
      'Ácido Acetilsalicílico 500mg',
    ],
  },
  {
    tipo: 'Anti-inflamatórios',
    medicamentos: [
      'Nimesulida 100mg',
      'Diclofenaco Sódico 50mg',
      'Meloxicam 15mg',
      'Prednisolona 20mg',
    ],
  },
  {
    tipo: 'Antibióticos',
    medicamentos: [
      'Amoxicilina 500mg',
      'Amoxicilina + Clavulanato 875mg',
      'Azitromicina 500mg',
      'Cefalexina 500mg',
      'Ciprofloxacino 500mg',
    ],
  },
  {
    tipo: 'Antialérgicos',
    medicamentos: ['Loratadina 10mg', 'Desloratadina 5mg', 'Cetirizina 10mg', 'Prednisona 20mg'],
  },
  {
    tipo: 'Gastrointestinais',
    medicamentos: [
      'Omeprazol 20mg',
      'Pantoprazol 40mg',
      'Domperidona 10mg',
      'Buscopan 10mg',
      'Ondansetrona 4mg',
    ],
  },
  {
    tipo: 'Cardiovasculares',
    medicamentos: [
      'Losartana 50mg',
      'Enalapril 10mg',
      'Atenolol 25mg',
      'Hidroclorotiazida 25mg',
      'Sinvastatina 20mg',
    ],
  },
  {
    tipo: 'Outros',
    medicamentos: ['Metformina 850mg', 'Levotiroxina 50mcg', 'Complexo B', 'Vitamina D 50.000UI'],
  },
];
