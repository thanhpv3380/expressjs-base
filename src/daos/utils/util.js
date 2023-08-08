const getSelectQuery = (fields) =>
  JSON.parse(`{${fields.map((element) => `"${element}":1`).join(',')}}`);

module.exports = { getSelectQuery };
