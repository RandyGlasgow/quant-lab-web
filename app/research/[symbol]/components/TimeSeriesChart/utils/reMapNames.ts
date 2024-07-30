export const reMapNames = (name: string | number | undefined) => {
  switch (name) {
    case "h":
      return "High";
    case "l":
      return "Low";
    case "vw":
      return "Avg";
    case "o":
      return "Open";
    case "c":
      return "Close";
    case "t":
      return "Time";
    default:
      return name;
  }
};
