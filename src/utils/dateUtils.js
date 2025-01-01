export const formatTimestamp = (date) => {
    return date.toISOString().replace("T", " ").split(".")[0];
};
