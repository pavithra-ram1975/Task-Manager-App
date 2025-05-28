import {useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Passwordinput from '../../components/input/Passwordinput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';



const Login = () => {
  const [email , setEmail ] = useState ("");
  const [password , setPassword] = useState("");
  const [error , setError] = useState(null);
 
  const navigate = useNavigate();

  const handleLogin = async(e) =>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Enter a valid email");
      return;
    }
    if(!password){
      setError("Enter Password");
      return;
    }
    setError("");

    //api call
    try{
  const response = await axiosInstance.post("/login",{
    email:email,
    password:password,
  });
  if(response.data && response.data.accessToken){
    localStorage.setItem("token",response.data.accessToken)
    navigate('/dashboard')
  }
}
catch(error){
  // Handle Login error
  if(error.response && error.response.data && error.response.data.message){
    setError(error.response.data.message);
  }
  else{
    setError("An unexpected error occured.Please Try again.")
  }

}
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
            
            <input
              type="text"
              placeholder=" Email"
              className='input-box'
              value ={email}
              onChange={(e)=> setEmail(e.target.value)} />

            <Passwordinput 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"/>
            {error && <p className=' text-red-500 text-xs pb-1'>{error}</p>}

            <button
              type="submit"
              className='btn-primary'
              // w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'
            >Login</button>

            <p className='text-sm text-center mt-4'>
                Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-blue-600 underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
