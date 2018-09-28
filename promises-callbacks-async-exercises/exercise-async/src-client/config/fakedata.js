module.exports = () => {
  const faker = require('faker');
  const data = {
    users: {
      pageNumber: 1,
      pageSize: 20,
      totalRecords: 50,
      items: [],
    },
  };

  for (let i = 0; i < 50; i++) {
    data.users.items.push({
      encId: faker.random.uuid(),
      lastName: faker.name.firstName(),
      firstName: faker.name.lastName(),
      employeeId: faker.random.number(),
      userType: `Internal ${faker.random.alphaNumeric()}`,
      createDate: faker.date.past(),
      modifiedDate: faker.date.recent(),
      isActive: faker.random.boolean(),
    });
  }
  return data;
};
