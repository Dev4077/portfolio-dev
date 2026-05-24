import { type Document, Types } from "mongoose";

export function isValidObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id) && new Types.ObjectId(id).toString() === id;
}

export function toApiId(doc: { _id: Types.ObjectId }): string {
  return doc._id.toString();
}

export function serializeDoc<T extends Document>(
  doc: T,
): Record<string, unknown> & { id: string } {
  const obj = doc.toObject({ versionKey: false });
  const { _id, ...rest } = obj as Record<string, unknown> & { _id: Types.ObjectId };
  const serialized: Record<string, unknown> & { id: string } = {
    ...rest,
    id: _id.toString(),
  };
  if (serialized.createdAt instanceof Date) {
    serialized.createdAt = serialized.createdAt.toISOString();
  }
  return serialized;
}
