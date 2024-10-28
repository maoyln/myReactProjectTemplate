const faker = require('faker');

export function generateMockData(): any {
  return {
      returnCode: faker.random.number({ min: 300, max: 400 }),
      errorMsg: faker.random.word(),
      detail: {},
      result: {
          columns: [
              {
                  attr: faker.random.word(),
                  name: faker.internet.userName()
              }
          ],
          materials: [
              {
                  mixingStationName: faker.internet.userName(),
                  timeStamp: Date.now(),
                  plateVolume: parseFloat(faker.finance.amount(50, 100, 2)),
                  workPointName: faker.internet.userName(),
                  beam: faker.random.word(),
                  projectPartId: faker.random.number({ min: 1, max: 100 }).toString(),
                  beamSpan: faker.random.word(),
                  plateTimes: faker.random.word(),
                  wbsName: faker.internet.userName(),
                  strengthGrade: faker.random.word(),
                  deviceName: faker.internet.userName(),
                  deviceId: faker.random.number({ min: 1, max: 100 }).toString(),
                  materialDetails: [
                      {
                          productionValue: parseFloat(faker.finance.amount(30, 100, 2)),
                          designAmount: parseFloat(faker.finance.amount(50, 150, 2)),
                          rate: parseFloat(faker.finance.amount(80, 100, 2)),
                          attr: faker.random.word(),
                          name: faker.internet.userName(),
                          sort: faker.random.number({ min: 1, max: 1000 }),
                          deviationType: faker.random.arrayElement(['NORMAL', 'HIGH', 'LOW']),
                          materialType: faker.random.word()
                      }
                  ]
              },
              {
                mixingStationName: faker.internet.userName(),
                timeStamp: Date.now(),
                plateVolume: parseFloat(faker.finance.amount(50, 100, 2)),
                workPointName: faker.internet.userName(),
                beam: faker.random.word(),
                projectPartId: faker.random.number({ min: 1, max: 100 }).toString(),
                beamSpan: faker.random.word(),
                plateTimes: faker.random.word(),
                wbsName: faker.internet.userName(),
                strengthGrade: faker.random.word(),
                deviceName: faker.internet.userName(),
                deviceId: faker.random.number({ min: 1, max: 100 }).toString(),
                materialDetails: [
                    {
                        productionValue: parseFloat(faker.finance.amount(30, 100, 2)),
                        designAmount: parseFloat(faker.finance.amount(50, 150, 2)),
                        rate: parseFloat(faker.finance.amount(80, 100, 2)),
                        attr: faker.random.word(),
                        name: faker.internet.userName(),
                        sort: faker.random.number({ min: 1, max: 1000 }),
                        deviationType: faker.random.arrayElement(['NORMAL', 'HIGH', 'LOW']),
                        materialType: faker.random.word()
                    }
                ]
            },
            {
              mixingStationName: faker.internet.userName(),
              timeStamp: Date.now(),
              plateVolume: parseFloat(faker.finance.amount(50, 100, 2)),
              workPointName: faker.internet.userName(),
              beam: faker.random.word(),
              projectPartId: faker.random.number({ min: 1, max: 100 }).toString(),
              beamSpan: faker.random.word(),
              plateTimes: faker.random.word(),
              wbsName: faker.internet.userName(),
              strengthGrade: faker.random.word(),
              deviceName: faker.internet.userName(),
              deviceId: faker.random.number({ min: 1, max: 100 }).toString(),
              materialDetails: [
                  {
                      productionValue: parseFloat(faker.finance.amount(30, 100, 2)),
                      designAmount: parseFloat(faker.finance.amount(50, 150, 2)),
                      rate: parseFloat(faker.finance.amount(80, 100, 2)),
                      attr: faker.random.word(),
                      name: faker.internet.userName(),
                      sort: faker.random.number({ min: 1, max: 1000 }),
                      deviationType: faker.random.arrayElement(['NORMAL', 'HIGH', 'LOW']),
                      materialType: faker.random.word()
                  }
              ]
          },
          {
                  mixingStationName: faker.internet.userName(),
                  timeStamp: Date.now(),
                  plateVolume: parseFloat(faker.finance.amount(50, 100, 2)),
                  workPointName: faker.internet.userName(),
                  beam: faker.random.word(),
                  projectPartId: faker.random.number({ min: 1, max: 100 }).toString(),
                  beamSpan: faker.random.word(),
                  plateTimes: faker.random.word(),
                  wbsName: faker.internet.userName(),
                  strengthGrade: faker.random.word(),
                  deviceName: faker.internet.userName(),
                  deviceId: faker.random.number({ min: 1, max: 100 }).toString(),
                  materialDetails: [
                      {
                          productionValue: parseFloat(faker.finance.amount(30, 100, 2)),
                          designAmount: parseFloat(faker.finance.amount(50, 150, 2)),
                          rate: parseFloat(faker.finance.amount(80, 100, 2)),
                          attr: faker.random.word(),
                          name: faker.internet.userName(),
                          sort: faker.random.number({ min: 1, max: 1000 }),
                          deviationType: faker.random.arrayElement(['NORMAL', 'HIGH', 'LOW']),
                          materialType: faker.random.word()
                      }
                  ]
              },
          ]
      }
  };
}
