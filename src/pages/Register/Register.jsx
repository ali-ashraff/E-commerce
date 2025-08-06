
import axios from 'axios';
import { useFormik} from 'formik';
import *as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';





export default function Register() {


let navigate=useNavigate()


const validationSchema= Yup.object({
name:Yup.string().required('name is required').min(3,'name must be at least 3 chr').max(20),
email:Yup.string().required('email is required').email('email must be valid'),
password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,10}$/,'password must start with capital letter and contain 3 to 10 characters'),
rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'rePassword must match password'),
phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone must start with 01 and contain 11 digits'),
}
);

  let formik=useFormik({
    initialValues: {
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""

  },

  onSubmit:sendDataTosignup,
  validationSchema,
  

})
















































  

async function sendDataTosignup(values) {
 
  const options={
    url:'https://ecommerce.routemisr.com/api/v1/auth/signup',
    method:'post',
    data:values
  }

let loadingToast=toast.loading('Loading...')

  try{
    const res = await axios.request(options);
    console.log(res)
    toast.success('successfully created')
    navigate('/Login')
  }
  catch(err){
    console.log(err)
    toast.error(err.response.data.message )
  }finally{
    toast.dismiss(loadingToast)
  }

}








function handleSubmit(e){
  e.preventDefault();
 
  ;

}



  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900   ">
  <div className="flex flex-col items-center justify-center px-6 py-8 m-10  mx-auto lg:py-0">
   
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form className="space-y-3 md:space-y-6" onSubmit={formik.handleSubmit} >
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name</label>
            <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
{formik.errors.name&&formik.touched.name&&(
  <p className='text-gray-300  font-extrabold text-sm'>
    {formik.errors.name}
  </p>
)}

            

          </div>
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
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">re-Password</label>
            <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />

{formik.errors.rePassword&&formik.touched.rePassword&&(
  <p className='text-gray-500 font-extrabold text-sm'>
    {formik.errors.rePassword}
  </p>
)}


          </div>
          <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
            <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />

{formik.errors.phone&&formik.touched.phone&&(
  <p className='text-gray-500 font-extrabold text-sm'>
    {formik.errors.phone}
  </p>
)}





          </div>
       
          <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
          </p>
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
