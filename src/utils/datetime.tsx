import moment from "moment-timezone";

export const DateTimeFormat = (datetime: string) => {
  return moment(datetime).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss");
};
