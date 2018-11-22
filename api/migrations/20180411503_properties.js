module.exports.up = async db => {
  console.log('Create properties table');
  await db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await db.schema.createTable('properties', table => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(db.raw('uuid_generate_v1mc()'))
      .primary();
    table.float('living_surface');
    table.float('land_surface');
    table.float('number_of_rooms');
    table.integer('number_of_parkings');
    table.timestamps(false, true);
  });
};

module.exports.down = async db => {
  await db.schema.dropTable('properties');
};

module.exports.config = { transaction: true };
