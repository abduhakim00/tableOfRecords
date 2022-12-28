// index.js
module.exports = () => {
  const data = { records: [] };
  // Create 1000 users
  for (let i = 1; i <= 100; i++) {
    data.records.push({ id: i, record: [i, i + 1, i + 2, i + 3, i + 4] });
  }
  return data;
};
