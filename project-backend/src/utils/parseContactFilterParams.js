const parseNumber = (number) => {
  if (typeof number !== 'string') return;

  const parsedNumber = parseInt(number);

  if (Number.isNaN(number)) return; //maybe parsedNumber
  return parsedNumber;
};

export const parseContactFilterParams = ({ minBirthYear, maxBirthYear }) => {
  const parsedMinBirthYear = parseNumber(minBirthYear);
  const parsedMaxBirthYear = parseNumber(maxBirthYear);

  return {
    minBirthYear: parsedMinBirthYear,
    maxBirthYear: parsedMaxBirthYear,
  };
};
