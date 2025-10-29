const isGregorianLeap = (year) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

const isJulianLeap = (year) => year % 4 === 0;

export const isLeap = (year) => {
  if (year === 0) {
    return false;
  }
  if (year < 1582) {
    return isJulianLeap(year);
  }
  return isGregorianLeap(year);
};

export const getLeapYearExplanation = (year) => {
  if (year === 0) {
    return 'Year 0 did not exist in the transition from BC to AD, because the number 0 was not yet known to the western world.';
  }

  if (year === 1997) {
    return '1997 is a common year. It is special to me because it is the year I was born.';
  }

  const leap = isLeap(year);
  let explanation = `${year} is a`;

  if (year < 1582) {
    // Julian Calendar
    if (leap) {
      explanation += ' leap year under the Julian calendar because it is divisible by 4.';
    } else {
      explanation += ' common year under the Julian calendar because it is not divisible by 4.';
    }
  } else {
    // Gregorian Calendar
    explanation += leap ? ' leap year' : ' common year';
    explanation += ' under the Gregorian calendar. ';

    if (year % 4 !== 0) {
      explanation += 'It is not divisible by 4.';
    } else if (year % 100 !== 0) {
      explanation += 'It is divisible by 4, but not by 100.';
    } else if (year % 400 !== 0) {
      explanation += `It is divisible by 100 but not by 400, making it a special exception to the leap year rule.`;
    } else {
      explanation += 'It is divisible by 400, making it a leap year to correct for astronomical accuracy.';
    }
  }

  return explanation;
};
