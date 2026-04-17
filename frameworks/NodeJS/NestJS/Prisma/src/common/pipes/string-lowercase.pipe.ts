import { Injectable } from "@nestjs/common";
import type { ArgumentMetadata, PipeTransform } from "@nestjs/common";

@Injectable()
export class StringLowercasePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (typeof value !== 'string') {
      return value;
    }

    return value.toLowerCase();
  }
}
