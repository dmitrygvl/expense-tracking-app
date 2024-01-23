export const addZero = (number: number) => {
  if (number < 10) {
    return `0${number}`;
  }

  return String(number);
};

export const serializeQuery = (queryParams: Record<string, any>) => {
  const query = Object.entries(queryParams).reduce(
    (acc, [key, value], index, array) => {
      if (!value) {
        return acc;
      }
      const postfix = index === array.length - 1 ? '' : '&';
      return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(
        new Date(value).toDateString(),
      )}${postfix}`;
    },
    '?',
  );

  if (query.length === 1) {
    return '';
  }
  if (query[query.length - 1] === '&') {
    return query.slice(0, -1);
  }
  return query;
};

export const deserializeQuery = (
  query: string,
  noQuestionMark = false,
): Record<string, string> => {
  const decodedQuery = decodeURIComponent(query);
  const pairs = (noQuestionMark ? query : decodedQuery.substring(1)).split('&');
  const array = pairs.map((elem) => elem.split('='));
  return Object.fromEntries(array);
};
