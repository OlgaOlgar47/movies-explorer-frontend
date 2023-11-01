export const classNames = (obj) => {
    return Object.entries(obj)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(" ");
  }