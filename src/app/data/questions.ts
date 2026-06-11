import { QuestionId } from './predictions.generated';

export type QuestionCategory = 'apningskamp' | 'norge' | 'grupper' | 'finale' | 'turnering';

export interface Question {
  readonly id: QuestionId;
  /** Kort tekst til tabeller og lister. */
  readonly label: string;
  /** Full spørsmålstekst slik den sto i skjemaet. */
  readonly text: string;
  readonly category: QuestionCategory;
  /** Tilleggsinfo fra skjemaet, f.eks. presiseringer. */
  readonly note?: string;
}

export const CATEGORY_LABELS: Readonly<Record<QuestionCategory, string>> = {
  apningskamp: 'Åpningskampen',
  norge: 'Norge i VM',
  grupper: 'Gruppevinnere',
  finale: 'Finalen',
  turnering: 'Turneringen',
};

export const CATEGORIES: readonly QuestionCategory[] = [
  'apningskamp',
  'norge',
  'grupper',
  'finale',
  'turnering',
];

export const QUESTIONS: readonly Question[] = [
  {
    id: 'apningskamp-vinner',
    label: 'Vinner av åpningskampen',
    text: 'Hvem vinner åpningskampen?',
    category: 'apningskamp',
  },
  {
    id: 'apningskamp-mal',
    label: 'Antall mål i åpningskampen',
    text: 'Hvor mange mål blir det totalt i åpningskampen?',
    category: 'apningskamp',
  },
  {
    id: 'apningskamp-straffe',
    label: 'Straffe i åpningskampen',
    text: 'Får et av lagene straffe?',
    category: 'apningskamp',
  },
  {
    id: 'apningskamp-corner',
    label: 'Første corner',
    text: 'Hvilket lag får den første corneren?',
    category: 'apningskamp',
  },
  {
    id: 'apningskamp-rodt-kort',
    label: 'Rødt kort i åpningskampen',
    text: 'Blir det rødt kort i kampen?',
    category: 'apningskamp',
  },
  {
    id: 'norge-progresjon',
    label: 'Hvor langt går Norge',
    text: 'Hvor langt går Norge i VM?',
    category: 'norge',
  },
  {
    id: 'norge-poeng',
    label: 'Norges poeng i gruppespillet',
    text: 'Hvor mange poeng tar Norge i gruppespillet?',
    category: 'norge',
    note: 'Av 3 kamper (maks 9 poeng)',
  },
  {
    id: 'norge-frankrike',
    label: 'Norge–Frankrike 26. juni',
    text: 'Slår Norge Frankrike 26. juni?',
    category: 'norge',
  },
  {
    id: 'haaland-mal',
    label: 'Haalands mål i VM',
    text: 'Hvor mange mål scorer Erling Braut Haaland totalt i VM?',
    category: 'norge',
  },
  { id: 'gruppe-a', label: 'Vinner gruppe A', text: 'Hvem vinner gruppe A?', category: 'grupper' },
  { id: 'gruppe-b', label: 'Vinner gruppe B', text: 'Hvem vinner gruppe B?', category: 'grupper' },
  { id: 'gruppe-c', label: 'Vinner gruppe C', text: 'Hvem vinner gruppe C?', category: 'grupper' },
  { id: 'gruppe-d', label: 'Vinner gruppe D', text: 'Hvem vinner gruppe D?', category: 'grupper' },
  { id: 'gruppe-e', label: 'Vinner gruppe E', text: 'Hvem vinner gruppe E?', category: 'grupper' },
  { id: 'gruppe-f', label: 'Vinner gruppe F', text: 'Hvem vinner gruppe F?', category: 'grupper' },
  { id: 'gruppe-g', label: 'Vinner gruppe G', text: 'Hvem vinner gruppe G?', category: 'grupper' },
  { id: 'gruppe-h', label: 'Vinner gruppe H', text: 'Hvem vinner gruppe H?', category: 'grupper' },
  { id: 'gruppe-i', label: 'Vinner gruppe I', text: 'Hvem vinner gruppe I?', category: 'grupper' },
  { id: 'gruppe-j', label: 'Vinner gruppe J', text: 'Hvem vinner gruppe J?', category: 'grupper' },
  { id: 'gruppe-k', label: 'Vinner gruppe K', text: 'Hvem vinner gruppe K?', category: 'grupper' },
  { id: 'gruppe-l', label: 'Vinner gruppe L', text: 'Hvem vinner gruppe L?', category: 'grupper' },
  {
    id: 'vm-vinner',
    label: 'VM-vinner',
    text: 'Hvilket lag vinner VM 2026?',
    category: 'finale',
  },
  {
    id: 'finale-taper',
    label: 'Taper av finalen',
    text: 'Hvilket lag taper finalen?',
    category: 'finale',
  },
  {
    id: 'finale-mal',
    label: 'Antall mål i finalen',
    text: 'Hvor mange mål blir det totalt i finalen?',
    category: 'finale',
  },
  {
    id: 'finale-straffekonk',
    label: 'Straffesparkkonkurranse',
    text: 'Blir det straffesparkkonkurranse?',
    category: 'finale',
  },
  {
    id: 'finale-rodt-kort',
    label: 'Rødt kort i finalen',
    text: 'Blir det rødt kort i finalen?',
    category: 'finale',
  },
  {
    id: 'finale-banestormer',
    label: 'Banestormer i finalen',
    text: 'Blir det en banestormer i finalen?',
    category: 'finale',
  },
  {
    id: 'toppskarer',
    label: 'VMs toppskårer',
    text: 'Hvem blir VMs toppskårer?',
    category: 'turnering',
  },
  {
    id: 'beste-spiller',
    label: 'VMs beste spiller',
    text: 'Hvem blir kåret til VMs beste spiller?',
    category: 'turnering',
  },
  {
    id: 'totalt-mal',
    label: 'Totalt antall mål i VM',
    text: 'Hvor mange mål blir det totalt scoret i VM?',
    category: 'turnering',
    note: 'Av alle 104 kampene',
  },
  {
    id: 'flest-gule-kort',
    label: 'Flest gule kort',
    text: 'Hvilket lag får flest gule kort?',
    category: 'turnering',
  },
  {
    id: 'flest-rode-kort',
    label: 'Flest røde kort',
    text: 'Hvilket lag får flest røde kort?',
    category: 'turnering',
  },
  {
    id: 'flest-mal-scoret',
    label: 'Laget som skårer flest mål',
    text: 'Hvilket lag skårer flest mål?',
    category: 'turnering',
  },
  {
    id: 'flest-mal-sluppet-inn',
    label: 'Laget som slipper inn flest mål',
    text: 'Hvilket lag slipper inn flest mål?',
    category: 'turnering',
  },
];

const byId = new Map(QUESTIONS.map((q) => [q.id, q]));

export function getQuestion(id: QuestionId): Question {
  const question = byId.get(id);
  if (!question) {
    throw new Error(`Ukjent spørsmål: ${id}`);
  }
  return question;
}
