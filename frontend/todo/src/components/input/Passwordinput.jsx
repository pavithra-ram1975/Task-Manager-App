import React,{useState} from 'react'
import {FaRegEye , FaRegEyeSlash } from 'react-icons/fa6';


const Passwordinput = ({value, onChange , placeholder}) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
      <input 
      value={value}
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      placeholder = {placeholder || "Password"}
      className='w-full text-sm bg-transparent py-2 mr-1 rounded outline-none '
      />
  
      {showPassword ? (
  <FaRegEyeSlash
    size={22}
    className='text-primary cursor-pointer'
    // onClick={toggleShowPassword}
    onClick={() => toggleShowPassword()}
    />
) : (
  <FaRegEye
    size={22}
    className='text-primary cursor-pointer'
    // onClick={toggleShowPassword}
    onClick={() => toggleShowPassword()}
    />
)}
    </div>
  )
}

export default Passwordinput
