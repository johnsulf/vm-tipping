/**
 * Seksjonstilhørighet for deltakerne.
 * Fyll inn riktig seksjon for hver deltaker.
 */

export type Section = 'Alle' | 'Automatisering og KI' | 'Systemutvikling Organisasjon og bruker' | 'System- og integrasjonsutvikling' | 'Systemutvikling og IoT' | 'Systemutvikling og UX' | 'Sjefene';

export const SECTIONS: Section[] = ['Automatisering og KI', 'Systemutvikling Organisasjon og bruker', 'System- og integrasjonsutvikling', 'Systemutvikling og IoT', 'Systemutvikling og UX', 'Sjefene'];

/** Mapping fra deltaker-slug til seksjon. */
export const PARTICIPANT_SECTIONS: Record<string, Section | undefined> = {
  'arnt-tobias': 'System- og integrasjonsutvikling',
  'morten-salomonsen': 'Systemutvikling og IoT',
  'sissel': 'Systemutvikling og UX',
  'eivind-lervik': 'System- og integrasjonsutvikling',
  'frode': 'Systemutvikling Organisasjon og bruker',
  'andrea': 'Systemutvikling og UX',
  'oistein-hauge': 'Systemutvikling og IoT',
  'merethe': 'Sjefene',
  'espen-s': 'Sjefene',
  'severin-aas-eliassen': 'Systemutvikling og IoT',
  'ingrid': 'Systemutvikling og UX',
  'knut-ove-standnes': 'Systemutvikling Organisasjon og bruker',
  'erlend': 'System- og integrasjonsutvikling',
  'eirik': 'Automatisering og KI',
  'thomas': 'System- og integrasjonsutvikling',
  'ninaldo': 'System- og integrasjonsutvikling',
  'anette-sognesand': 'Systemutvikling Organisasjon og bruker',
  'pal-espen': 'System- og integrasjonsutvikling',
  'magnhild': 'Sjefene',
  'marte-thuen': 'Sjefene',
  'cecilie-ds': 'Automatisering og KI',
  'kristoffer': 'Systemutvikling og IoT',
  'susann': 'Systemutvikling og UX',
  'emma': 'Systemutvikling og UX',
  'katarina-kroken': 'Systemutvikling og IoT',
  'paul': 'Systemutvikling og UX',
};
