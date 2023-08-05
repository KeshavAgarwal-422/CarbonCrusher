import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoCalendarSharp } from 'react-icons/io5';

const DateCard = ({ date, month, year, isActive, isDisabled, onClick }) => {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-[0.1vw] h-[17vw] mx-[1vw] px-[3vw] rounded-xl cursor-pointer ${isActive ? 'bg-[#343C13] border-solid border-[#E0FF63] text-white' : 'bg-[#272727] text-black'
                } ${isDisabled ? 'pointer-events-none opacity-50' : ''}`}
            onClick={isDisabled ? null : onClick}
        >
            <span className="text-[5vw] font-bold">{date}</span>
            <span className="text-[4vw]">{month}</span>
            <span className="text-[4vw]">{year}</span>
        </div>
    );
};

const DateSelector = () => {
    const [presentDate, setPresentDate] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(presentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(presentDate.getMonth());
    const [selectedDate, setSelectedDate] = useState(presentDate.getDate());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const datesInMonth = () => {
        const today = new Date();
        const firstDay = new Date(selectedYear, selectedMonth, 1);
        const lastDay = new Date(selectedYear, selectedMonth + 1, 0);

        const dates = [];
        for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
            const currentDate = new Date(selectedYear, selectedMonth, i);
            if (currentDate <= today) {
                dates.push({
                    date: i,
                    isDisabled: false,
                });
            } else {
                dates.push({
                    date: i,
                    isDisabled: true,
                });
            }
        }
        return dates;
    };

    const handleDateClick = (date, isDisabled) => {
        if (!isDisabled) {
            setSelectedDate(date);
            const selectedDateObj = new Date(selectedYear, selectedMonth, date);
            console.log('Selected Date:', selectedDateObj.toDateString());
        }
    };

    const handleFilterClick = () => {
        setIsCalendarOpen(true);
    };

    const handleCalendarClose = () => {
        setIsCalendarOpen(false);
    };

    const handleDateChange = (date) => {
        setIsCalendarOpen(false);
        setSelectedYear(date.getFullYear());
        setSelectedMonth(date.getMonth());
        setSelectedDate(date.getDate());
    };

    return (
        <div className="w-full  overflow-x-auto  flex items-center pl-[12vw]">
            <div className=" absolute top-[6vw] right-[8vw] text-[3vh] ">
                <svg
                    className="h-[7vw] text-[#E0FF63]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleFilterClick}
                >
                    <IoCalendarSharp></IoCalendarSharp>
                </svg>
            </div>
            {isCalendarOpen && (
                <div className="absolute top-0 right-0 z-50">
                    <DatePicker
                        selected={new Date(selectedYear, selectedMonth, selectedDate)}
                        onChange={handleDateChange}
                        inline
                        className='hidden md:block '
                        onClose={handleCalendarClose}
                        maxDate={presentDate} // Set the maximum selectable date to the present date
                    /></div>
            )}
            {datesInMonth().map(({ date, isDisabled }) => (
                <DateCard
                    key={date}
                    date={date}
                    month={months[selectedMonth]}
                    year={selectedYear}
                    isActive={date === selectedDate}
                    isDisabled={isDisabled}
                    onClick={() => handleDateClick(date, isDisabled)}
                />
            ))}
        </div>
    );
};

export default DateSelector;
