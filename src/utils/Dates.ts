import moment from 'moment';
import { ptBR, enUS } from 'date-fns/locale';
import addHours from 'date-fns/addHours';
import startOfHour from 'date-fns/startOfHour';

export function converteDateBars(date: Date) {
  return new Date(date).toLocaleString('pt-br', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}

export function formatOnlyHours(date: Date): string {
  return new Date(date).toLocaleString('pt-BR', {
    timeStyle: 'short',
  });
}

export const locales = {
  'en-US': enUS,
  'pt-BR': ptBR,
};
export const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
