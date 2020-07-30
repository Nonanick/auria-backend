export interface IEntityQuerySource {
  sqlQuery : string;
  alias : string;
  buildSource? : string;
}