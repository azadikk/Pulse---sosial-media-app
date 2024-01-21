import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import '../signup/index.scss'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterSchema } from './schema/RegisterSchema';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import GlobalLoading from '../GlobalLoading';
import GlobalButtonLoading from '../GlobalButtonLoading';
import SignErrors from '../errors-success/SignErrors';

const Register = () => {

     //loading animation
     const [loader, setLoader] = React.useState(false);
     React.useEffect(() => {
       setLoader(true);
       setTimeout(() => {
         setLoader(false);
       }, 1000);
     }, []);

     //handle errors
     const [handleErrors, setHandleErrors] = React.useState<boolean>(false);

     //button loading animation;
     const [loadingButton, setLoadingButton] = React.useState<boolean>(false);

     //if register is true navigation the login page
     const navigator = useNavigate();
    
  return (
     <>
     {loader ? (<GlobalLoading />) : (
       <div className='register-container'>
          <div className='background-provider'>
            <img src='./pulselogo.svg' alt='background-image' />
          </div>

          <Formik
          validationSchema={RegisterSchema}
          initialValues={{
               name: '',
               lastname: '',
               nickname: '',
               email: '',
               password: '',
               rePassword: '',
          }}
          onSubmit={ async (values) => {
               try {
                   const registerApi = 'http://localhost:3000/register';
                   const request = await axios.post(registerApi, values, {
                    validateStatus: (status:number) => {
                         return status >= 200 || status === 409;
                    },
                   });
           
                   if (request.data && request.data.registered === 'registerCompleted') {
                       setLoadingButton(true);
                       
                       localStorage.setItem('ifUserFirstLogin', 'true');

                       
                       const timeout = setTimeout(() => {
                           navigator('/giriş');
                           setLoadingButton(false);
                       }, 1000);
           
                       return () => clearTimeout(timeout);

                   } else if (request.status === 409){
                    setHandleErrors(true);
                    const timeoutForHiddenError = setTimeout(() => {
                         setHandleErrors(false);
                    }, 1500);
                    return () => clearTimeout(timeoutForHiddenError);
                   }
                   
               } catch (error) {
                   console.log('Request error:', error);
               }
           }}
          >
          {props => (
          <Form>
               {handleErrors && (<SignErrors />)}
          <div className='input-field-name'>
               <article>
               <label>Ad</label>
               <Field type='text' name="name" autoComplete="off"/>
               {props.errors.name && props.touched.name && <p>{props.errors.name}</p>}
               </article>
               <article>
               <label>Soyad</label>
               <Field type='text' name="lastname" autoComplete="off"/>
               {props.errors.lastname && props.touched.lastname && <p>{props.errors.lastname}</p>}
               </article>
          </div>

          <div className='input-field'>
               <label>İstifadəçi adı (görünən ad)</label>
               <Field type='text' name="nickname" autoComplete="off"/>
               {props.errors.nickname && props.touched.nickname && <p>{props.errors.nickname}</p>}
          </div>
          <div className='input-field'>
               <label>E-poçt</label>
               <Field type='email' name="email" autoComplete="off"/>
               {props.errors.email && props.touched.email && <p>{props.errors.email}</p>}
          </div>
          <div className='input-field'>
               <label>Şifrə</label>
               <Field type='password' name="password" autoComplete="off"/>
               {props.errors.password && props.touched.password && <p>{props.errors.password}</p>}
          </div>
          <div className='input-field'>
               <label>Təkrar şifrə</label>
               <Field type='password' name="rePassword" autoComplete="off"/>
               {props.errors.rePassword && props.touched.rePassword && <p>{props.errors.rePassword}</p>}
          </div>

          <div className='bottom'>
               <div className='buttons'>
                    <button 
                    id='signin' 
                    type='submit' 
                    >{loadingButton ? <GlobalButtonLoading /> : 'Qeydiyyatdan keç'}</button>
               </div>

               <div className='more'>
                    <div className='label'>
                         <label>Bir hesabın var?</label>
                         <Link to='/giriş' id='link' >Daxil ol</Link>
                    </div>

                    <div className='label'>
                         <label>Kömək lazımdır?</label>
                         <Link to='' id='link'>Dəstək xidməti</Link>
                    </div>
               </div>
          </div>
          </Form>
          )}
          </Formik>

          <Link className='get-back' to='/'>
               <IoIosArrowBack id='backicon' />
               Geri
          </Link>
       </div>   
     )}
     </>
  )
}

export default Register