import {
  Doctype,
  DoctypeCreationDTO,
} from '../core/database/types/doctype.types';
import * as doctypeDAL from './doctype.dal';

export const create = async (payload: DoctypeCreationDTO): Promise<Doctype> => {
  let doctype = await doctypeDAL.create(payload);
  return doctype;
};
