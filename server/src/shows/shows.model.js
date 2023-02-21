const config = require('../../knexfile');
const knex = require('knex')(config);
// const { validProps, requiredProps } = require('../util/validation');
//
// const validateProps = validProps(['user_id', 'username', 'password']);
//
// const validateRequired = requiredProps(['user_id', 'username', 'password']);

const USERS_TABLE = 'users';
const TV_SHOWS_TABLE = 'tv_shows';
const USER_SHOW_TABLE = 'user_shows';

module.exports = {
  USERS_TABLE,
  TV_SHOWS_TABLE,
  USER_SHOW_TABLE,

  /**
   * @param {number} limit - The max number of customers to return.
   * @return {Promise<Array>} A promise that resolves to an array of customers.
   */

  getShowList(userId) {
    return knex(USERS_TABLE)
      .join(USER_SHOW_TABLE, 'users.user_id', 'user_shows.user_id')
      .join(TV_SHOWS_TABLE, 'user_shows.show_id', 'tv_shows.show_id')
      .select({
        userId: 'users.user_id',
        username: 'users.username',
        showname: 'tv_shows.name',
        show_id: 'tv_shows.show_id',
        season: 'user_shows.season',
        episode: 'user_shows.episode',
        personal_ranking: 'user_shows.personal_ranking',
        image: 'tv_shows.url',
      })
      .where('users.user_id', userId);
  },

  async postNewShow(newShowObject) {
    // CHECK IF SHOW IS ON OUR DATABASE
    async function checkExists(showId) {
      const checkExisting = await knex(TV_SHOWS_TABLE)
        .select('show_id')
        .where('show_id', showId);
      const resultBoolean = checkExisting.length !== 0 ? true : false;
      return resultBoolean;
    }

    // CHECK IF USER HAS THIS MOVIE ALREADY

    async function checkUsers(showId, userId) {
      const checkExisting = await knex(USER_SHOW_TABLE)
        .select('show_id')
        .where({
          show_id: showId,
          user_id: userId,
        });
      const resultBoolean = checkExisting.length > 0 ? true : false;
      if (resultBoolean) {
        console.log(checkExisting);
      }
      return resultBoolean;
    }

    const checkShow = await checkExists(newShowObject.show_id);
    const checkUser = await checkUsers(
      newShowObject.show_id,
      newShowObject.user_id
    );

    //IF IS NOT ADD IT
    if (!checkShow) {
      await knex(TV_SHOWS_TABLE).insert({
        show_id: newShowObject.show_id,
        name: newShowObject.name,
        url: newShowObject.url,
      });
    }

    if (checkUser) {
      console.log('caught a bad guy');
      return 'Hey it is already here';
    }

    // ELSE JUST ADD TO USER MOVIE TABLE
    return await knex(USER_SHOW_TABLE).insert({
      user_id: newShowObject.user_id,
      show_id: newShowObject.show_id,
      season: newShowObject.season,
      episode: newShowObject.episode,
    });
  },

  async deleteShow(showId, userId) {
    return await knex(USER_SHOW_TABLE)
      .where({ show_id: showId, user_id: userId })
      .del();
  },

  async updateProgress(progressObject) {
    return await knex(USER_SHOW_TABLE)
      .where({
        show_id: progressObject.show_id,
        user_id: progressObject.user_id,
      })
      .update({
        season: progressObject.season,
        episode: progressObject.episode,
        personal_ranking: progressObject.personal_ranking,
      });
  },
};
