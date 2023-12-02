import { postOrDeleteMatches } from "../controllers/api";
import { format, sub, add } from "date-fns";

const DATE_FORMAT = "yyyy-MM-dd";

export const getParamsString = (): string => {
  const today = new Date();
  const dateFrom = format(sub(today, { days: 3 }), DATE_FORMAT);
  const dateto = format(add(today, { days: 7 }), DATE_FORMAT);
  const dateRange = `dateFrom=${dateFrom}&dateTo=${dateto}`;

  return dateRange;
};

export const toMiliseconds = (seconds: number): number => seconds * 1000;
