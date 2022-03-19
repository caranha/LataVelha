module.exports = function(array, weight) {
  let weightsum = 0;
  for (const i in weight) {
    weightsum += weight[i];
  }

  const choice = Math.random() * weightsum;
  let count = 0;
  let adder = weight[count];

  while (adder < choice) {
    count += 1;
    adder += weight[count];
  }

  return array[count];
};
