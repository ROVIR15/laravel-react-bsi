import React, { useState, useEffect } from 'react';
import API from '../../helpers';

const useCountdown = (manufacture_operation_id, status) => {
  const [ initialDate, setInitialDate ] = useState(0);
  const [ latestStatus, setLatestStatus ] = useState('');
  
  useEffect(() => {
    API.getAnAction(manufacture_operation_id, function(res){
      if(!res) return undefined;
      if(!res.data.length) return undefined;
      else {
        setLatestStatus(res.data[0].action);
        const sum = res.data.reduce((total, cv) => {
          if(cv.action === 'start' || cv.action === 'resume') return total + new Date(cv.time).getTime();
          else if (res.data.length % 2 && cv.action === 'finish') return total;
          else return total - new Date(cv.time).getTime();
        }, 0);

        if (sum < 0) setInitialDate(sum * -1);
        else setInitialDate(sum);
      }
    });
  }, [manufacture_operation_id, status]);

  const countDownDate = initialDate;

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  function justStarted(start_datetime) {
    const interval = setInterval(() => {
      setCountDown(new Date().getTime() - start_datetime);
    }, 1000);

    return interval;
  }

  function resume(latest) {
    const interval = setInterval(() => {
      setCountDown(new Date().getTime() - latest);
    }, 1000);

    return interval;
  }

  useEffect(() => {
    var interval;
    switch (latestStatus) {
      case 'start':
        interval = justStarted(initialDate);
        break;

      case 'pause':
        setCountDown(initialDate);
        interval = initialDate;
        break;

      case 'resume':
        interval = resume(initialDate);
        break;

      default:
        setCountDown(initialDate);
        interval = initialDate;
        break;
    }

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  if(!countDown) return [0, 0, 0, 0];
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown }