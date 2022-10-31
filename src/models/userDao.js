const dataSource = require('./dataSource')

const getUserByKakaoId = async (kakaoId) => {
  const result = await dataSource.query(
    `SELECT
      username,
      email,
      platform_member_id
    FROM
      users
    WHERE platform_member_id = ?
    `, [ kakaoId ]
  );
  
  return result[0];
};

const createUser = async (kakaoId, username, email) => {
  const result = await dataSource.query(
    `INSERT INTO users(
      username,
      email,
      platform_member_id
    ) VALUES ( ?, ?, ?)
    `, [ username, email, kakaoId ]
  );
  
  return result;
};

const getUserById = async (id) => {
  return await dataSource.query(
    `SELECT
      id,
      username,
      email,
      platform_member_id
    FROM
      users
    WHERE id = ?
    `, [ id ]
  );
};

module.exports = {
  getUserByKakaoId,
  createUser,
  getUserById
}