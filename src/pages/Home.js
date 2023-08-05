import React, { useState } from 'react';

import DateSelector from '../Components/Calander';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IoTimeSharp } from 'react-icons/io5';
import { GiPathDistance } from 'react-icons/gi';
import { MdCo2 } from 'react-icons/md';
import { FaCarSide, FaPerson, FaPersonWalking, FaTrainTram } from 'react-icons/fa6';
import { FaBusAlt, FaCarAlt } from 'react-icons/fa';







const Home = () => {

    let transportModeArray = [{

        icon: <div className="text-[7vw]"><FaPerson></FaPerson></div>,
        category: 'Still',
        duration: '0.21',
        distance: '1.70',
        carbonConsumption: '0.16'
    },
    {
        icon: <div className="text-[7vw]"><FaPersonWalking></FaPersonWalking></div>,
        category: 'Walk',
        duration: '1.45',
        distance: '4.00',
        carbonConsumption: '0.00'
    },

    {
        icon: <div className="text-[7vw]"><FaTrainTram></FaTrainTram></div>,
        category: 'Train',
        duration: '0.26',
        distance: '1.70',
        carbonConsumption: '0.18'
    },
    {
        icon: <div className="text-[7vw]"><FaBusAlt></FaBusAlt></div>,
        category: 'Bus',
        duration: '0.45',
        distance: '1.70',
        carbonConsumption: '0.14'
    },
    {
        icon: <div className="text-[7vw]"><FaCarAlt></FaCarAlt></div>,
        category: 'Car',
        duration: '0.21',
        distance: '1.70',
        carbonConsumption: '0.16'
    },

    ]
    return (
        <div className='flex flex-col items-center justify-start w-full h-full'>
            <h2 className='w-full text-[6vw] pl-[15vw] py-[1vh] text-left'>Hi, Keshav</h2>
            <DateSelector />
            <div className='w-[78%] h-[40vw] my-[8vw] px-[4vw] rounded-3xl bg-[#272727] flex  justify-between items-center'>
                <div className='w-[44%]'>
                    <CircularProgressbarWithChildren
                        value={(10 / 22) * 100}
                        strokeWidth={12}
                        styles={buildStyles({
                            pathColor: "red",
                            trailColor: "#343C13"
                        })}
                    >
                        <div style={{ fontSize: "4vw", marginTop: -5 }}>
                            <strong>10/</strong> 22 kgCO2
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className='w-[40%] '>
                    <div className='flex items-center gap-[2vw]'>
                        <div className='text-[7vw] flex items-center text-yellow-400 '>
                            <IoTimeSharp></IoTimeSharp>
                        </div>
                        <h3>10:00</h3></div>
                    <div className='flex items-center gap-[2vw]'>
                        <div className='text-[7vw] flex items-center text-blue-600'>
                            <GiPathDistance></GiPathDistance>
                        </div>
                        <h3>20 Km</h3>
                    </div>
                </div>
            </div>
            <div className="w-[90%] flex overflow-x-scroll">
                {transportModeArray.map((item, index) => (
                    <div key={index} className="bg-[#272727] flex flex-col justify-between h-[45vw] min-w-[30vw] p-[4vw] m-[2vw] rounded-xl shadow-md ">
                        <div className="text-[5vw] flex justify-between "><span>{item.category}</span>{item.icon}</div>
                        <div className="flex items-center justify-between gap-[5vw] text-yellow-400"> <div className="text-[7vw]" > <IoTimeSharp></IoTimeSharp></div><span className="text-[4vw]">{item.duration} hrs</span></div>
                        <div className="flex items-center justify-between gap-[5vw] text-blue-600"><div className="text-[7vw]"><GiPathDistance></GiPathDistance></div><span className="text-[4vw]"> {item.distance} km</span></div>
                        <div className="flex items-center justify-between gap-[5vw] text-red-500"><div className="text-[10vw] flex items-center"><MdCo2></MdCo2></div><span className="text-[4vw]"> {item.carbonConsumption} kg</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Home;