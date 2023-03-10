/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_shows').del();
  await knex('user_shows').insert([
    { user_id: -1, show_id: 'sp123', season: 1, episode: 10 },
    { user_id: -1, show_id: 'bb123', season: 2, episode: 8 },
    { user_id: -1, show_id: 'to123', season: 4, episode: 2 },
    { user_id: -1, show_id: 'far123', season: 2, episode: 9 },
    { user_id: -2, show_id: 'sp123', season: 1, episode: 12 },
    { user_id: -3, show_id: 'td123', season: 5, episode: 22 },
    { user_id: -1, show_id: 'td123', season: 2, episode: 2 },
    { user_id: -2, show_id: 'bb123', season: 8, episode: 1 },
    { user_id: -4, show_id: 'far123', season: 15, episode: 7 },
  ]);
};
