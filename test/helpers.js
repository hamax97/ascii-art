module.exports = { expectValidationError, expectNotValidationError };

function expectValidationError(validatorMock) {
  const validationResult = getValidationResult(validatorMock);
  expect(validationResult).toHaveProperty('error');
  expect(validationResult.error).toBeTruthy();
}

function expectNotValidationError(validatorMock) {
  const validationResult = getValidationResult(validatorMock);
  expect(validationResult).not.toHaveProperty('error');
}

function getValidationResult(validatorMock) {
  const mockResults = validatorMock.mock.results;
  return mockResults[mockResults.length - 1].value;
}
