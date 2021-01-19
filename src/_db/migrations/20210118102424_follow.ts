import * as Knex from 'knex';
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('follows', function (table) {
    table.bigIncrements('id');
    table.string('follower_id').index();
    table.string('followed_id').index();
    timestamps(knex, table);
  });
}
