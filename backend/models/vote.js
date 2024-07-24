const { Model } = require('objection');

class Vote extends Model {
  static get tableName() {
    return 'votes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'voting_choice', 'casted_at'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        voting_choice: { type: 'boolean' },
        casted_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

module.exports = Vote;
