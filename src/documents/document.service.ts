import {
  Document,
  DocumentCreationDTO,
} from '../core/database/types/document.types';
import * as documentDAL from './document.dal';

export const create = async (
  payload: DocumentCreationDTO
): Promise<Document> => {
  let user = await documentDAL.create(payload);
  return user;
};
