export const shouldShowErrorBasedOnLength = (
  inputValue: string,
  requiredLength: number
) => {
  return inputValue.length > 0 && inputValue.length < requiredLength;
};
