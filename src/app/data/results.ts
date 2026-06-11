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
  // 'apningskamp-vinner': ,
  // 'apningskamp-mal': ,
  // 'apningskamp-straffe': ,
  // 'apningskamp-corner': ,
  // 'apningskamp-rodt-kort': ,
  // --- Norge i VM ---
  // 'norge-progresjon': ,
  // 'norge-poeng': ,
  // 'norge-frankrike': ,
  // 'haaland-mal': ,
  // --- Gruppevinnere ---
  // 'gruppe-a': ,
  // 'gruppe-b': ,
  // 'gruppe-c': ,
  // 'gruppe-d': ,
  // 'gruppe-e': ,
  // 'gruppe-f': ,
  // 'gruppe-g': ,
  // 'gruppe-h': ,
  // 'gruppe-i': ,
  // 'gruppe-j': ,
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
