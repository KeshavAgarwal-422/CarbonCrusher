import React, { useState } from 'react';

const BasicInfoForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any validation or data submission here
        // For now, we'll just set the submitted state to true
        setSubmitted(true);
    };

    return (
        <div className="w-full h-full flex flex-col mt-[5vw] items-center justify-start">
            <div className="px-[20vw] mt-[12vw]">
                <h1 className="text-[7vw]">Basic Info</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="text-[4vw] mt-[5vw]">Name:</label>
                    <input
                        type="text"
                        placeholder="Jon Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-[3vw] py-[2vw] text-[4vw] my-[2vw] bg-[#272727] rounded-3xl text-[#CFFF0F] focus:border-[#CFFF0F]"
                        required
                    />

                    <label className="text-[4vw]  mt-[6vw]">Age:</label>
                    <input
                        type="number"
                        placeholder="22"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="px-[3vw] py-[2vw] text-[4vw] my-[2vw] bg-[#272727] rounded-3xl text-[#CFFF0F] focus:border-[#CFFF0F]"

                        required
                    />

                    <label className="text-[4vw]  mt-[6vw]">Gender:</label>
                    <input
                        type="text"
                        placeholder="Male"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="px-[3vw] py-[2vw] text-[4vw] my-[2vw] bg-[#272727] rounded-3xl text-[#CFFF0F] focus:border-[#CFFF0F]"

                        required
                    />

                    <label className="text-[4vw] mt-[6vw]">Email:</label>
                    <input
                        type="email"
                        placeholder="jondoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-[3vw] py-[2vw] text-[4vw] my-[2vw] bg-[#272727] rounded-3xl text-[#CFFF0F] focus:border-[#CFFF0F]"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-[#CFFF0F] px-[1vw] py-[2vw] text-[4vw] font-medium rounded-3xl text-black mt-[6vw]"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BasicInfoForm;
