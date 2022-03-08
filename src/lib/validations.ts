export const validateLength = (
  value: string,
  { min, max }: { min?: number; max?: number },
  name: string
): boolean => {
  let valid = true;
  if (min !== undefined) {
    if (value.length < min) {
      valid = false;
    }
  }
  if (max !== undefined) {
    if (value.length > max) {
      valid = false;
    }
  }
  if (valid) {
    return true;
  } else {
    throw Error(`${name} must be between ${min} and ${max} characters long.`);
  }
};
