const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];


export const getDate = (data: string) => {
  const newDate = new Date(data);
  console.log(String(newDate).slice(15, 25));
  let formattedDate = `${week[newDate.getDay()]} `;
  formattedDate += `${`0${newDate.getDate()}`.slice(-2)},`;
  formattedDate += `${newDate.getFullYear()}.`; // for double digit day
  formattedDate += ` в ${String(newDate).slice(15, 25)}`;

  return formattedDate;
};

