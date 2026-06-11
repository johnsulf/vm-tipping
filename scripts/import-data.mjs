// Genererer src/app/data/predictions.generated.ts fra data/google_sheet.csv.
// Kjøres automatisk via prestart/prebuild, eller manuelt med `npm run import:data`.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const csvPath = join(root, 'data', 'google_sheet.csv');
const outPath = join(root, 'src', 'app', 'data', 'predictions.generated.ts');

// Spørsmåls-id-er i samme rekkefølge som CSV-kolonnene (fra kolonne 2 og utover).
// `header` er starten av kolonneoverskriften og brukes som sanity-sjekk mot CSV-en.
const QUESTIONS = [
  { id: 'apningskamp-vinner', header: 'Hvem vinner åpningskampen?' },
  { id: 'apningskamp-mal', header: 'Hvor mange mål blir det totalt i åpningskampen?' },
  { id: 'apningskamp-straffe', header: 'Får et av lagene straffe?' },
  { id: 'apningskamp-corner', header: 'Hvilket lag får den første corneren?' },
  { id: 'apningskamp-rodt-kort', header: 'Blir det rødt kort i kampen?' },
  { id: 'norge-progresjon', header: 'Hvor langt går Norge i VM?' },
  { id: 'norge-poeng', header: 'Hvor mange poeng tar Norge i gruppespillet?' },
  { id: 'norge-frankrike', header: 'Slår Norge Frankrike 26. juni?' },
  { id: 'haaland-mal', header: 'Hvor mange mål scorer Erling Braut Haaland totalt i VM?' },
  { id: 'gruppe-a', header: 'Gruppe A' },
  { id: 'gruppe-b', header: 'Gruppe B' },
  { id: 'gruppe-c', header: 'Gruppe C' },
  { id: 'gruppe-d', header: 'Gruppe D' },
  { id: 'gruppe-e', header: 'Gruppe E' },
  { id: 'gruppe-f', header: 'Gruppe F' },
  { id: 'gruppe-g', header: 'Gruppe G' },
  { id: 'gruppe-h', header: 'Gruppe H' },
  { id: 'gruppe-i', header: 'Gruppe I' },
  { id: 'gruppe-j', header: 'Gruppe J' },
  { id: 'gruppe-k', header: 'Gruppe K' },
  { id: 'gruppe-l', header: 'Gruppe L' },
  { id: 'vm-vinner', header: 'Hvilket lag vinner VM 2026?' },
  { id: 'finale-taper', header: 'Hvilket lag taper finalen?' },
  { id: 'finale-mal', header: 'Hvor mange mål blir det totalt i finalen?' },
  { id: 'finale-straffekonk', header: 'Blir det straffesparkkonkurranse?' },
  { id: 'finale-rodt-kort', header: 'Blir det rødt kort i finalen?' },
  { id: 'finale-banestormer', header: 'Blir det en banestormer i finalen?' },
  { id: 'toppskarer', header: 'Hvem blir VMs toppskårer?' },
  { id: 'beste-spiller', header: 'Hvem blir kåret til VMs beste spiller?' },
  { id: 'totalt-mal', header: 'Hvor mange mål blir det totalt scoret i VM?' },
  { id: 'flest-gule-kort', header: 'Hvilket lag får flest gule kort?' },
  { id: 'flest-rode-kort', header: 'Hvilket lag får flest røde kort?' },
  { id: 'flest-mal-scoret', header: 'Hvilket lag skårer flest mål?' },
  { id: 'flest-mal-sluppet-inn', header: 'Hvilket lag slipper inn flest mål?' },
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((f) => f.trim() !== '')) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    if (row.some((f) => f.trim() !== '')) rows.push(row);
  }
  return rows;
}

function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .replaceAll('æ', 'ae')
    .replaceAll('ø', 'o')
    .replaceAll('å', 'a')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function fail(message) {
  console.error(`\nimport-data: ${message}\n`);
  process.exit(1);
}

const rows = parseCsv(readFileSync(csvPath, 'utf8'));
if (rows.length < 2) fail(`Fant ingen deltakerrader i ${csvPath}.`);

const header = rows[0];
const expectedColumns = QUESTIONS.length + 2;
if (header.length !== expectedColumns) {
  fail(
    `Forventet ${expectedColumns} kolonner (Timestamp, navn og ${QUESTIONS.length} spørsmål), fant ${header.length}. ` +
      'Har spørsmålene i Google Sheet endret seg? Oppdater i så fall QUESTIONS i scripts/import-data.mjs og src/app/data/questions.ts.',
  );
}
QUESTIONS.forEach((q, i) => {
  const actual = header[i + 2].trim();
  if (!actual.startsWith(q.header)) {
    fail(
      `Kolonne ${i + 3} matcher ikke forventet spørsmål.\n  Forventet start: «${q.header}»\n  Fant: «${actual.split('\n')[0]}»`,
    );
  }
});

const slugCounts = new Map();
const participants = rows.slice(1).map((row) => {
  const name = row[1].trim();
  if (!name) fail(`Rad uten navn: ${row.join(', ').slice(0, 80)}…`);
  let slug = slugify(name);
  const seen = slugCounts.get(slug) ?? 0;
  slugCounts.set(slug, seen + 1);
  if (seen > 0) slug = `${slug}-${seen + 1}`;
  const answers = Object.fromEntries(QUESTIONS.map((q, i) => [q.id, row[i + 2].trim()]));
  return { name, slug, timestamp: row[0].trim(), answers };
});

const observed = Object.fromEntries(
  QUESTIONS.map((q) => [
    q.id,
    [...new Set(participants.map((p) => p.answers[q.id]).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, 'nb'),
    ),
  ]),
);

const ts = (value) => JSON.stringify(value, null, 2);
const union = (values) =>
  values.length > 0 ? `${values.map((v) => JSON.stringify(v)).join(' | ')} | (string & {})` : 'string';

const output = `// AUTO-GENERERT av scripts/import-data.mjs — ikke rediger manuelt.
// Kilde: data/google_sheet.csv (${participants.length} deltakere, ${QUESTIONS.length} spørsmål).

export type QuestionId =
${QUESTIONS.map((q) => `  | '${q.id}'`).join('\n')};

/** Observerte svar per spørsmål, som autocomplete-vennlige union-typer for fasit. */
export interface AnswerOptions {
${QUESTIONS.map((q) => `  '${q.id}': ${union(observed[q.id])};`).join('\n')}
}

export interface Participant {
  readonly name: string;
  readonly slug: string;
  readonly timestamp: string;
  readonly answers: Readonly<Record<QuestionId, string>>;
}

export const PARTICIPANTS: readonly Participant[] = ${ts(participants)};

/** Unike svar gitt per spørsmål, sortert alfabetisk. */
export const OBSERVED_ANSWERS: Readonly<Record<QuestionId, readonly string[]>> = ${ts(observed)};
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, output);
console.log(
  `import-data: skrev ${participants.length} deltakere og ${QUESTIONS.length} spørsmål til src/app/data/predictions.generated.ts`,
);
