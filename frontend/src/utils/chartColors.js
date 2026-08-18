export const chartColors = {
  fatal: "#ff7a61",
  serious: "#7b98ff",
  slight: "#33d1a6",
  brand: "#5b74fa",
  brandLight: "#a3bdff",
  mint: "#33d1a6",
  coral: "#ff7a61",
  ink: "#8890ab",
  grid: "#eef0f9",
};

export const severityColor = (label) => {
  if (label === "Fatal") return chartColors.fatal;
  if (label === "Serious") return chartColors.serious;
  return chartColors.slight;
};
