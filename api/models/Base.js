import { Model, Validator, snakeCaseMappers } from 'objection';
import * as yup from 'yup';
import { ulid } from 'ulid';
import { cloneOnlyKeys } from '../utils';

/**
 * @see https://vincit.github.io/objection.js/recipes/custom-validation.html#examples
 */
class YupValidator extends Validator {
  /** @param {yup.ObjectSchema} schema */
  constructor(schema) {
    super();
    this.schema = schema;
  }

  /**
   * @param {object} params
   * @param {object} params.model The model instance. May be empty at this point.
   * @param {Record<string, any>} params.json The properties to validate. After validation will be merged into `model`.
   * @param {{ patch: boolean }} params.options `ModelOptions` object to check if operation is an update or patch.
   * @param {object} params.ctx Context object shared between the validation methods.
   * @returns {Record<string, any>}
   */
  validate({ json, options }) {
    if (this.schema) {
      // For patch event, cloning relevant fields from schema to validate against
      if (options.patch) {
        const clonedSchemaFields = cloneOnlyKeys(
          this.schema.fields,
          Object.keys(json)
        );
        const patchSchema = yup.object(clonedSchemaFields);

        json = patchSchema.validateSync(json);
      } else {
        json = this.schema.validateSync(json);
      }
    }
    return json;
  }
}

class BaseModel extends Model {
  /**
   * @see https://vincit.github.io/objection.js/recipes/snake-case-to-camel-case-conversion.html
   */
  static columnNameMappers = snakeCaseMappers();

  static validationSchema = yup.object({
    id: yup.string().required(),
    created: yup.date().required(),
    updated: yup.date().nullable(),
    deleted: yup.date().nullable(),
  });

  /** @type { number } */
  id;
  /** @type { Date } */
  createdAt;
  /** @type { Date | null } */
  updatedAt;
  /** @type { Date | null } */
  deletedAt;

  static createValidator() {
    if (!this.validationSchema) {
      return;
    }
    return new YupValidator(this.validationSchema);
  }

  $beforeInsert() {
    if (!this.id) {
      this.id = ulid();
    }
  }
}

export default BaseModel;
