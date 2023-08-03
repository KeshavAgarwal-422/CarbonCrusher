import React, { useState } from 'react';

import DateSelector from '../Components/Calander';


const Home = () => {
    return (

        <div className='w-full h-full flex flex-col items-center justify-start'>
            <h2 className='w-full text-[5vw] pl-[15vw] py-[1vh] text-left'>Hi, Keshav</h2>
            <DateSelector />

        </div>)
};

export default Home;