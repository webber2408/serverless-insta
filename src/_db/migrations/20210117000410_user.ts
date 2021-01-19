import * as Knex from 'knex';
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.bigIncrements('id');
    table.uuid('uuid').index();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    timestamps(knex, table);
  });
}

//create table users(id int(1) PRIMARY KEY, uuid varchar(100), name varchar(100) NOT NULL, password varchar(100) NOT NULL, email varchar(100)NOT NULL)
