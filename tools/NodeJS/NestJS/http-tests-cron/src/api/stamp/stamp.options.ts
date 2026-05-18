import type { InjectionToken, ModuleMetadata } from '@nestjs/common';

export const STAMP_OPTIONS = Symbol('STAMP_OPTIONS');

export interface StampModuleOptions {
  headline: string;
}

export interface StampModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: unknown[]
  ) => Promise<StampModuleOptions> | StampModuleOptions;
  inject?: InjectionToken[];
}
