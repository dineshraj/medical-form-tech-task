
export const shouldShowErrorBasedOnLength = (inputValue: string, requiredLength: number) => {
  console.log("🚀 ~ shouldShowErrorBasedOnLength ~ requiredLength:", requiredLength)
  console.log("🚀 ~ shouldShowErrorBasedOnLength ~ inputValue:", inputValue)
  return inputValue.length > 0 && inputValue.length < requiredLength;
};