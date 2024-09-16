const formatSessionsForCalendar = (sessions) => {
    const calendarData = {};
  
    sessions.forEach((session) => {
      session.date.forEach((date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0]; 
        if (!calendarData[formattedDate]) {
          calendarData[formattedDate] = [];
        }
        calendarData[formattedDate].push({
          name: session.traineeName,
          startTime: session.time[0].startTime,
          endTime: session.time[0].endTime,
        });
      });
    });
  
    return calendarData;
};
  
const calendarData = formatSessionsForCalendar(upcoming);