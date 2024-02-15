import { Logger } from '@nestjs/common';

export const CacheCustom = (ttl: number): MethodDecorator => {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const cache: Map<string, Promise<string>> = new Map();

    function removeCache(key: string) {
      cache.delete(key);
    }

    descriptor.value = async function (...args: any) {
      const key = `${target.constructor.name}:${propertyKey.toString()}:${JSON.stringify(args)}`;

      if (cache.has(key)) {
        Logger.log('data FROM cache');
        return await cache.get(key);
      }

      const result = originalMethod.apply(this, args) as Promise<any>;
      cache.set(key, result);

      setTimeout(() => removeCache(key), ttl);

      return await result;
    };
  };
};
