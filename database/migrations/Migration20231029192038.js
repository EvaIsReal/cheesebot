'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20231029192038 extends Migration {

  async up() {
    this.addSql('create table `bot_response` (`id` text not null, `created_at` datetime not null, `updated_at` datetime not null, `message` text not null, primary key (`id`));');
  }

}
exports.Migration20231029192038 = Migration20231029192038;
