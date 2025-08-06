import axios from 'axios';
import { useFormik} from 'formik';
import *as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import Home from './../Home/Home';
import { useContext, useState } from 'react';
import { authContext } from '../../components/Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';





export default function Login() {


  let navigate=useNavigate()
  let{setToken}=useContext(authContext)

const[error,setError]=useState('')


const validationSchema= Yup.object({

email:Yup.string().required('email is required').email('email must be valid'),
password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,10}$/,'password must start with capital letter and contain 3 to 10 characters'),

}
);

  let formik=useFormik({
    initialValues: {
    name:"",
    email:"",
   

  },

  onSubmit:sendDataTosignup,
  validationSchema,
  

})
















































  

async function sendDataTosignup(values) {
 
  const options={
    url:'https://ecommerce.routemisr.com/api/v1/auth/signin',
    method:'post',
    data:values
  }
let loadingToast=toast.loading('Loading...')

  try{
    const {data} = await axios.request(options);
    console.log(data.token)
    localStorage.setItem('token',data.token)
    setToken(data.token)
    
    toast.success('successfully logged in')
    setTimeout(()=>{navigate('/')},200)
  }
  catch(err){
    console.log(err)
    toast.error(err.response.data.message )
    setError(err.response.data.message)
  }finally{
    toast.dismiss(loadingToast)
  }

}












  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900   ">
  <div className="flex flex-col items-center justify-center px-6 py-8 m-10  mx-auto lg:py-0">
   
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit} >
          
           <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">e-mail</label>
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />

{formik.errors.email&&formik.touched.email&&(
  <p className='text-gray-500 font-extrabold text-sm'>
    {formik.errors.email}
  </p>
)}



          </div>


          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
{formik.errors.password&&formik.touched.password&&(
  <p className='text-gray-500 font-extrabold text-sm'>
    {formik.errors.password}
  </p>
)}




          </div>
         
          
       
          <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
{error&& <p   className='text-gray-400 text-sm font-bold'> {error} </p>}






          
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Forget password?</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>




    </div>
  )
}
