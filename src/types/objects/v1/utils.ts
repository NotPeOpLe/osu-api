export const parseUserType = <T extends { u?: string | number }>(data?: T) => {
  if (!data) {
    return data;
  } else {
    const type = typeof data.u === "string" ? "string" : "id";
    return { ...data, type };
  }
};
