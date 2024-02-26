const createData = (id, description, evidence, date, complete) => {
  return { id, description, evidence, date, complete };
};

export const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const dataset = [
  {
    burlington: 59,
    oakville: 57,
    milton: 35,
    haltonHills: 12,
    type: "Public Order",
  },
  {
    burlington: 150,
    oakville: 97,
    milton: 78,
    haltonHills: 55,
    type: "Traffic",
  },
  {
    burlington: 27,
    oakville: 33,
    milton: 14,
    haltonHills: 4,
    type: "Domestic",
  },
  {
    burlington: 23,
    oakville: 18,
    milton: 8,
    haltonHills: 2,
    type: "Property",
  },
  {
    burlington: 88,
    oakville: 94,
    milton: 7,
    haltonHills: 0,
    type: "Substance",
  },
  {
    burlington: 38,
    oakville: 21,
    milton: 22,
    haltonHills: 7,
    type: "Violent",
  },
  {
    burlington: 11,
    oakville: 19,
    milton: 4,
    haltonHills: 8,
    type: "Environmental",
  },
  {
    burlington: 21,
    oakville: 18,
    milton: 21,
    haltonHills: 9,
    type: "Financial",
  },
  {
    burlington: 75,
    oakville: 44,
    milton: 58,
    haltonHills: 13,
    type: "Cyber",
  },
  {
    burlington: 12,
    oakville: 6,
    milton: 14,
    haltonHills: 5,
    type: "Special",
  },
  {
    burlington: 2,
    oakville: 1,
    milton: 0,
    haltonHills: 1,
    type: "Terrorism",
  },
];
