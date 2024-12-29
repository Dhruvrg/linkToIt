export function processData(list: Array<number>, clickTimeframe: string) {
  const result: Array<{ click: number; date: string }> = [];
  let aggregatedClicks: number[] = [];

  if (clickTimeframe === "daily") {
    aggregatedClicks = [...list];
  } else if (clickTimeframe === "thisWeek") {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);

    for (let i = 0; i <= today.getDay() - 1; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      const formattedDay = daysOfWeek[i];
      result.push({
        click: list[list.length - today.getDay() + i],
        date: formattedDay,
      });
    }
  } else if (clickTimeframe === "monthly") {
    const clicksByMonth: Record<string, number> = {};

    for (let i = 0; i < list.length; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (list.length - 1 - i));

      const monthName = date.toLocaleDateString("en-US", { month: "short" });

      if (!clicksByMonth[monthName]) {
        clicksByMonth[monthName] = 0;
      }
      clicksByMonth[monthName] += list[i];
    }

    Object.entries(clicksByMonth).forEach(([month, totalClicks]) => {
      result.push({ click: totalClicks, date: month });
    });
  } else if (clickTimeframe === "thisMonth") {
    const currentDay = new Date().getDate();

    for (let i = list.length - currentDay; i < list.length; i++) {
      const date = new Date();
      date.setDate(i - (list.length - currentDay) + 1);

      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      });

      result.push({ click: list[i], date: formattedDate });
    }
  }

  if (clickTimeframe === "daily" || clickTimeframe === "thisWeek") {
    aggregatedClicks.forEach((clicks, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (aggregatedClicks.length - 1 - index));

      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      });

      result.push({ click: clicks, date: formattedDate });
    });
  }

  return result;
}
