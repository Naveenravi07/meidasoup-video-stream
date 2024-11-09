import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.schema) return value;
    const parsedValue = this.schema.safeParse(value);
    if (parsedValue.success) {
      return parsedValue.data;
    } else {
      throw new BadRequestException(
        parsedValue.error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      );
    }
  }
}
