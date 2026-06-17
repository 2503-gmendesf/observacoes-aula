// Run once after connecting Neon Postgres on Vercel:
//   vercel env pull .env.local && node setup-db.js
require('dotenv').config({ path: '.env.local' });

const { neon } = require('@neondatabase/serverless');

const SEEDS = [
  {
    unidade: 'Unidade Betim',
    data_observacao: '2026-06-02',
    horario: '08h00 às 08h50',
    professor: 'Ana Paula Ferreira',
    turma: '9º Ano B',
    observador: 'Marcos Oliveira',
    criterio_1_atmosfera: 4, criterio_2_objetivos: 3, criterio_3_interacao: 4,
    criterio_4_recursos: 3, criterio_5_competencias: 3, criterio_6_mediador: 4,
    criterio_7_gestao: 3, criterio_8_conexoes: 4, criterio_9_estrategias: 3, criterio_10_avaliacao: 3,
    feedback: 'Aula muito bem conduzida. A professora Ana Paula demonstrou excelente domínio dos conteúdos. Sugestão: explorar mais atividades colaborativas entre os alunos.'
  },
  {
    unidade: 'Unidade Pampulha',
    data_observacao: '2026-06-05',
    horario: '10h00 às 10h50',
    professor: 'Carlos Eduardo Souza',
    turma: '7º Ano A',
    observador: 'Fernanda Lima',
    criterio_1_atmosfera: 3, criterio_2_objetivos: 2, criterio_3_interacao: 3,
    criterio_4_recursos: 4, criterio_5_competencias: 2, criterio_6_mediador: 3,
    criterio_7_gestao: 3, criterio_8_conexoes: 2, criterio_9_estrategias: 3, criterio_10_avaliacao: 2,
    feedback: 'Bom uso dos recursos tecnológicos. Os objetivos da aula não foram comunicados explicitamente aos alunos.'
  },
  {
    unidade: 'Unidade Floresta',
    data_observacao: '2026-06-08',
    horario: '13h30 às 14h20',
    professor: 'Mariana Costa Alves',
    turma: '6º Ano C',
    observador: 'Roberto Carvalho',
    criterio_1_atmosfera: 4, criterio_2_objetivos: 4, criterio_3_interacao: 4,
    criterio_4_recursos: 3, criterio_5_competencias: 4, criterio_6_mediador: 4,
    criterio_7_gestao: 4, criterio_8_conexoes: 3, criterio_9_estrategias: 4, criterio_10_avaliacao: 4,
    feedback: 'Observação exemplar. Destaque para as estratégias de avaliação formativa utilizadas ao longo de toda a aula.'
  },
  {
    unidade: 'Unidade Nova Lima',
    data_observacao: '2026-06-10',
    horario: '07h30 às 08h20',
    professor: 'Paulo Henrique Martins',
    turma: '8º Ano D',
    observador: 'Marcos Oliveira',
    criterio_1_atmosfera: 2, criterio_2_objetivos: 3, criterio_3_interacao: 2,
    criterio_4_recursos: 2, criterio_5_competencias: 2, criterio_6_mediador: 2,
    criterio_7_gestao: 3, criterio_8_conexoes: 2, criterio_9_estrategias: 2, criterio_10_avaliacao: 2,
    feedback: 'Metodologia ainda predominantemente expositiva. Recomenda-se formação em metodologias ativas.'
  },
  {
    unidade: 'Unidade Contagem',
    data_observacao: '2026-06-12',
    horario: '09h00 às 09h50',
    professor: 'Juliana Ramos Pereira',
    turma: '1º Ano EM A',
    observador: 'Fernanda Lima',
    criterio_1_atmosfera: 3, criterio_2_objetivos: 4, criterio_3_interacao: 3,
    criterio_4_recursos: 4, criterio_5_competencias: 3, criterio_6_mediador: 3,
    criterio_7_gestao: 4, criterio_8_conexoes: 3, criterio_9_estrategias: 4, criterio_10_avaliacao: 3,
    feedback: 'Boa aula, com organização e clareza nos objetivos. Destaque para o uso diversificado de estratégias.'
  }
];

async function main() {
  const sql = neon(process.env.POSTGRES_URL);

  console.log('Criando tabela...');
  await sql(`
    CREATE TABLE IF NOT EXISTS observacoes (
      id SERIAL PRIMARY KEY,
      unidade TEXT NOT NULL,
      data_observacao TEXT NOT NULL,
      horario TEXT NOT NULL,
      professor TEXT NOT NULL,
      turma TEXT NOT NULL,
      observador TEXT NOT NULL,
      criterio_1_atmosfera INTEGER NOT NULL,
      criterio_2_objetivos INTEGER NOT NULL,
      criterio_3_interacao INTEGER NOT NULL,
      criterio_4_recursos INTEGER NOT NULL,
      criterio_5_competencias INTEGER NOT NULL,
      criterio_6_mediador INTEGER NOT NULL,
      criterio_7_gestao INTEGER NOT NULL,
      criterio_8_conexoes INTEGER NOT NULL,
      criterio_9_estrategias INTEGER NOT NULL,
      criterio_10_avaliacao INTEGER NOT NULL,
      feedback TEXT DEFAULT '',
      criado_em TIMESTAMPTZ DEFAULT NOW(),
      atualizado_em TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  console.log('✅ Tabela criada.');

  const [{ count }] = await sql('SELECT COUNT(*) as count FROM observacoes');
  if (Number(count) > 0) {
    console.log(`ℹ️  Banco já possui ${count} registros. Seed ignorado.`);
    return;
  }

  for (const s of SEEDS) {
    await sql(
      `INSERT INTO observacoes (
        unidade, data_observacao, horario, professor, turma, observador,
        criterio_1_atmosfera, criterio_2_objetivos, criterio_3_interacao,
        criterio_4_recursos, criterio_5_competencias, criterio_6_mediador,
        criterio_7_gestao, criterio_8_conexoes, criterio_9_estrategias,
        criterio_10_avaliacao, feedback
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [
        s.unidade, s.data_observacao, s.horario, s.professor, s.turma, s.observador,
        s.criterio_1_atmosfera, s.criterio_2_objetivos, s.criterio_3_interacao,
        s.criterio_4_recursos, s.criterio_5_competencias, s.criterio_6_mediador,
        s.criterio_7_gestao, s.criterio_8_conexoes, s.criterio_9_estrategias,
        s.criterio_10_avaliacao, s.feedback
      ]
    );
  }
  console.log(`✅ Seed concluído: ${SEEDS.length} observações inseridas.`);
}

main().catch(err => { console.error(err); process.exit(1); });
