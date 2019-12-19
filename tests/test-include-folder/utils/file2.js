module.exports = (constructor) => {
  console.log('I should not be included')
  console.log(constructor);
};