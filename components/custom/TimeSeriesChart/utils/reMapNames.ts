export const reMapNames = (name: string | number | undefined) => {
  switch (name) {
    case "h":
      return "High";
    case "l":
      return "Low";
    case "vw":
      return "Avg";
    default:
      return name;
  }
};
