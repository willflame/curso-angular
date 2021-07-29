import { GenericField } from "./generic-field";

export interface ConfigParams {
  page?: number;
  limit?: number;
  search?: string;
  field?: GenericField;
}
