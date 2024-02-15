import { Logger } from '@nestjs/common';

export function Log() {
  return function (_, method: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      Logger.log('start req: ');
      const result = original.apply(this, args);
      Logger.log('end req: ');
      // descriptor.
      return result;
    };
  };
}
