/**
 * Returns a new object containing only specified properties from input object
 *
 * @template T
 * @param {T} obj object to clone
 * @param {Array<keyof T>} keys array of keys you want to include in clone
 * @returns {Record<string, any>} Cloned object with only specified keys. Empty object if no keys provided.
 */
export function cloneOnlyKeys(obj, keys = []) {
  return keys.reduce((next, key) => {
    // eslint-disable-next-line security/detect-object-injection
    next[key] = obj[key];
    return next;
  }, {});
}

export class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
  }
}
