exports.getReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordsCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordsCount / wordsPerMinute);

  return minutes;
};
