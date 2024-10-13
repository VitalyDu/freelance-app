import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
// dayjs.locale("ru");

const dateString = ({
  date,
  daysWords = false,
  short = false,
  dayOrDate = false,
  dayTime = false,
  withTime = true,
  withoutYearWords = false,
  withoutYear = false,
}) => {
  if (daysWords) {
    const now = dayjs();
    const today = now.format("YYYY-MM-DD");
    const yesterday = now.subtract(1, "day").format("YYYY-MM-DD");
    const dateYMD = dayjs(date).format("YYYY-MM-DD");

    if (dayOrDate) {
      switch (dateYMD) {
        case today:
          if (dayTime) {
            return dayjs(date).format(`Сегодня, HH:mm`);
          } else {
            return "Сегодня";
          }

        case yesterday:
          if (dayTime) {
            return dayjs(date).format(`Вчера, HH:mm`);
          } else {
            return "Вчера";
          }

        default:
          return dayjs(date).format(
            now.format("YYYY") !== dayjs(date).format("YYYY")
              ? dayTime
                ? "D MMMM YYYY, HH:mm"
                : "D MMMM YYYY"
              : dayTime
              ? "D MMMM, HH:mm"
              : "D MMMM"
          );
          break;
      }
    }

    if (short) {
      switch (dateYMD) {
        case today:
          return dayjs(date).format(`HH:mm`);

        case yesterday:
          return "Вчера";

        default:
          return dayjs(date).format(
            now.format("YYYY") !== dayjs(date).format("YYYY")
              ? "D MMM YYYY"
              : "D MMM"
          );
          break;
      }
    }

    let dayString = "";
    switch (dateYMD) {
      case today:
        dayString = "Сегодня";
        break;

      case yesterday:
        dayString = "Вчера";
        break;

      default:
        dayString = "";
        break;
    }

    return dayjs(date).format(
      dayString.length > 0 ? `${dayString}, в HH:mm` : "D MMMM YYYY, в HH:mm"
    );
  }

  if (!withTime) {
    return dayjs(date).format("D MMMM YYYY");
  }

  if (withoutYear) {
    return dayjs(date).format("DD.MM");
  }

  if (withoutYearWords) {
    return dayjs(date).format("D MMMM");
  }

  return dayjs(date).format("D MMMM YYYY, в H:mm");
};

const formatDate = (dateString) => {
  const date = dayjs(dateString);
  const today = dayjs();

  if (date.isSame(today, "day")) {
    return "Сегодня";
  } else if (date.isSame(today.subtract(1, "day"), "day")) {
    return "Вчера";
  } else {
    return date.format("D MMMM YYYY"); // Например, "2 октября 2024"
  }
};

const dividerDate = (prevent, current) => {
  const datePrevent = prevent ? dayjs(prevent) : null;
  const dateCurrent = dayjs(current);

  const format = "D MMMM YYYY";

  if (!datePrevent || datePrevent.year() !== dateCurrent.year()) {
  }

  if (
    !datePrevent ||
    datePrevent.format("YYYY-MM-DD") !== dateCurrent.format("YYYY-MM-DD")
  ) {
    return dateCurrent.format(format);
  }

  return null;
};

const timeDiff = (prevent, current) => {
  return dayjs(current).diff(prevent, "second");
};

export { dayjs, dateString, dividerDate, timeDiff, formatDate };
