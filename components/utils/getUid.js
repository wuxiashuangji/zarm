let count = 0;
const getUid = () => {
  count += 1;
  return count;
};

export default getUid;
