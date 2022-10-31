const dataSource = require('./dataSource')

const saveImage = async(imageAddress) => {
  const result = await dataSource.query(
    `INSERT INTO images(
      path
    ) VALUES (?)
    `, [ imageAddress ]
  );

  return result;
};

const getImage = async() => {
  const result = await dataSource.query(
    `SELECT
      path
    FROM images
    ORDER BY created_at DESC
    LIMIT 1
    `
  );
  
  return result[0].path;
};

module.exports = {
  saveImage,
  getImage
};