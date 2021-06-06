import { IssueInterface } from './IssueInterface';

export interface FetchInterface {
  nextUrl: string;
  weekOf: string;
  issues: IssueInterface[];
}
