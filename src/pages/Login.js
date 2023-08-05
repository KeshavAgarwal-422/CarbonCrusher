import React, { useState } from 'react';

const Login = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handleSendOtp = () => {
        // Here, you can send the OTP to the provided mobile number using an API or any backend logic
        // For demo purposes, we'll just set otpSent to true
        setOtpSent(true);
    };

    const handleVerifyOtp = () => {
        // Here, you can verify the entered OTP with the sent OTP using an API or any backend logic
        // For demo purposes, we'll just set otpSent to false after a short delay
        setTimeout(() => {
            setOtpSent(false);
            setOtp('');
        }, 1500);
    };

    return (
        <div className="w-full h-full flex flex-col mt-[10vw] items-center justify-start decoration-none">
            <div className="h-[10vw] w-[20vw] rounded-3xl bg-[#272727] flex justify-center items-center text-[4vw]">Walking</div>
            {otpSent ? (
                <div className="p-[20vw] mt-[20vw]">
                    <h1 className="text-[7vw]">Enter OTP</h1>
                    <form className="flex flex-col ">
                        <input
                            type="number"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="px-[3vw] py-[2vw] text-[4vw] my-[6vw] bg-[#272727] rounded-3xl text-[#CFFF0F]  focus:border-[#CFFF0F]"
                            required
                        />

                        <button
                            type="button"
                            onClick={handleVerifyOtp}
                            className="bg-[#CFFF0F] px-[1vw] py-[2vw] text-[4vw] font-medium rounded-3xl text-black"
                        >
                            Verify OTP
                        </button>
                    </form>
                </div>
            ) : (
                <div className="p-[20vw] mt-[20vw]">
                    <h1 className="text-[7vw]">Login</h1>
                    <form className="flex flex-col">
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            value={mobileNumber}
                            onChange={handleMobileNumberChange}
                            className="px-[3vw] py-[2vw] text-[4vw] my-[6vw] bg-[#272727] rounded-3xl text-[#CFFF0F] focus:border-[#CFFF0F]"
                            required
                        />

                        <button
                            type="button"
                            onClick={handleSendOtp}
                            className="bg-[#CFFF0F] px-[1vw] py-[2vw] text-[4vw] font-medium rounded-3xl text-black"
                        >
                            Send OTP
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;
