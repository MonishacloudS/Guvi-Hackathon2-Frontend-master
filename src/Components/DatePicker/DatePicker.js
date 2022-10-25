import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

const Datepicker = ({ item }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleChangeStart = (date) => {
    setStartDate(date);
  };
  const handleChangeEnd = (date) => {
    setEndDate(date);
  };
  const handleChangeStartTime = (date) => {
    setStartTime(date);
  };
  const handleChangeEndTime = (date) => {
    setEndTime(date);
  };

  return (
    <div className="row align-items-end" style={{ height: "100%" }}>
      <div className="col-md-6">
        Start Date:
        <DatePicker
          className="border rounded datepicker-design"
          selected={startDate}
          onChange={(date) => handleChangeStart(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="col-md-6">
        Start Time:
        <DatePicker
          className="border rounded datepicker-design"
          selected={startTime}
          onChange={(date) => handleChangeStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </div>
      <div className="col-md-6">
        End Date:
        <DatePicker
          className="border rounded datepicker-design"
          selected={endDate}
          onChange={(date) => handleChangeEnd(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <div className="col-md-6">
        End Time:
        <DatePicker
          className="border rounded datepicker-design"
          selected={endTime}
          onChange={(date) => handleChangeEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </div>
    </div>
  );
};

export default Datepicker;
