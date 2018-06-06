function getData(source_data, filterFn) {
  let results = [];
  for (let i = 0; i < source_data.length; i++) {
    if (
      typeof filterFn === "undefined" ||
      typeof filterFn !== "function" ||
      filterFn(source_data[i])
    ) {
      results.push(source_data[i]);
    }
  }

  return results;
}
