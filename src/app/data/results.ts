import { AnswerOptions, QuestionId } from './predictions.generated';

/**
 * FASIT — fyll inn riktige svar her etter hvert som resultatene blir klare,
 * og deploy på nytt. Spørsmål som ikke er fylt ut vises som «uavklart» og
 * teller ikke i poengsummen.
 *
 * Du får autocomplete på svarene deltakerne faktisk har gitt, men kan også
 * skrive fritt (f.eks. en gruppevinner ingen har tippet). Matching mot
 * deltakersvar er case-ufølsom og ignorerer ekstra mellomrom.
 *
 * Eksempel:
 *   'apningskamp-vinner': 'Mexico',
 *   'apningskamp-mal': '3',
 */
export type Fasit = { readonly [K in QuestionId]?: AnswerOptions[K] };

export const FASIT: Fasit = {
  // --- Åpningskampen (Mexico - Sør-Afrika, 11. juni) ---
  'apningskamp-vinner': 'Mexico',
  'apningskamp-mal': '2',
  'apningskamp-straffe': 'Nei',
  'apningskamp-corner': 'Mexico',
  'apningskamp-rodt-kort': 'Ja',
  // --- Norge i VM ---
  // 'norge-progresjon': ,
  // 'norge-poeng': ,
  // 'norge-frankrike': ,
  // 'haaland-mal': ,
  // --- Gruppevinnere ---
  'gruppe-a': 'Mexico',
  // 'gruppe-b': ,
  // 'gruppe-c': ,
  'gruppe-d': 'USA',
  'gruppe-e': 'Tyskland',
  // 'gruppe-f': ,
  // 'gruppe-g': ,
  // 'gruppe-h': ,
  // 'gruppe-i': ,
  'gruppe-j': 'Argentina',
  // 'gruppe-k': ,
  // 'gruppe-l': ,
  // --- Finalen ---
  // 'vm-vinner': ,
  // 'finale-taper': ,
  // 'finale-mal': ,
  // 'finale-straffekonk': ,
  // 'finale-rodt-kort': ,
  // 'finale-banestormer': ,
  // --- Turneringen ---
  // 'toppskarer': ,
  // 'beste-spiller': ,
  // 'totalt-mal': ,
  // 'flest-gule-kort': ,
  // 'flest-rode-kort': ,
  // 'flest-mal-scoret': ,
  // 'flest-mal-sluppet-inn': ,
};
