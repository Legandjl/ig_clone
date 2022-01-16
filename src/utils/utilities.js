const getDifference = (date2) => {
  const date1 = new Date();
  const Difference_In_Time = date1.getTime() - date2.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  let Difference_In_Hours = Difference_In_Time / 1000;
  Difference_In_Hours /= 60 * 60;
  const Difference_In_Minutes = Difference_In_Time / 1000 / 60;

  if (Difference_In_Minutes < 60) {
    const returnDiff = Math.abs(Math.round(Difference_In_Minutes));
    return returnDiff < 1
      ? "< 1 minute ago"
      : returnDiff === 1
      ? returnDiff + " minute ago"
      : returnDiff + " minutes ago";
  }

  if (Difference_In_Days < 1) {
    const returnDiff = Math.abs(Math.round(Difference_In_Hours));

    return returnDiff <= 1
      ? returnDiff + " hour ago"
      : returnDiff + " hours ago";
  }

  const returnDiff = Math.abs(Math.round(Difference_In_Days));

  return returnDiff === 1
    ? returnDiff + " day ago"
    : returnDiff > 365
    ? "Over a year ago"
    : returnDiff + " days ago";
};

export default getDifference;
