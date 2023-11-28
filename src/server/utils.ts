import { postOrDeleteMatches } from "../controllers/api";
import {format, sub, add} from 'date-fns'

export const getParamsString = (): string => {
    const today = new Date();
    const dateFrom = format(sub(today, {days: 3}), 'yyyy-MM-dd');
    const dateto = format(add(today, {days: 7}), 'yyyy-MM-dd');
    const dateRange = `dateFrom=${dateFrom}&dateTo=${dateto}`
  
    return dateRange;
  }

  export const toMiliseconds = (seconds: number): number => seconds * 1000