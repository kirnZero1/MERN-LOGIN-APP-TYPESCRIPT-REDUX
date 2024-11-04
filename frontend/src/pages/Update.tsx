import React,{useEffect, useState} from 'react';
import { useAppDispatch } from '../app/hooks';
import { updateData } from '../app/dataSlicers';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios'


type tUser2 = {
    _id:string,
    username: string,
    password: string,
    email: string,
    isAdmin: string
}

const Update = () => {
    const [values, setValues] = useState<tUser2>({
        _id:"",
        username:"",
        password:"",
        email:"",
        isAdmin:"false"
    })
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=> {
        axios.get('http://localhost:3001/api/users/'+id)
             .then((res) => {
                 setValues(res.data)
             })
             .catch(error => console.log(error))
     },[])

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateData({id: values._id, values: values}))
    alert('You have successfully updated user. You will be sent to the Home Page.');
    navigate('/')
}
  return (
    <div className='w-100 vh-100 d-flex align-items-center justify-content-center'>
        <div className='container'>
            <div className='text-center'>
                <div><h1>Update User information</h1></div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='col-12 d-flex align-items-center justify-content-center'>
                <div className='col-6 shadow bg-light'>
                    <div className='row m-2'>
                        <div className='col-3 d-flex align-items-center justify-content-end '>
                                <label className='h6'>Username:</label>
                        </div>
                        <div className='col-9 d-flex align-items-center justify-content-start '>
                            <input required type='text' value={values.username} placeholder='Username...' className='form-control' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValues({...values, username: event.target.value})}/>
                        </div>
                    </div>
                    <div className='row m-2'>
                        <div className='col-3 d-flex align-items-center justify-content-end '>
                                <label className='h6'>Password:</label>
                        </div>
                        <div className='col-9 d-flex align-items-center justify-content-start '>
                            <input required type='text' value={values.password} placeholder='Password...' className='form-control' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValues({...values, password: event.target.value})}/>
                        </div>
                    </div>
                    <div className='row m-2'>
                        <div className='col-3 d-flex align-items-center justify-content-end '>
                                <label className='h6'>Email:</label>
                        </div>
                        <div className='col-9 d-flex align-items-center justify-content-start '>
                            <input required type='text' value={values.email} placeholder='Email...' className='form-control' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValues({...values, email: event.target.value})}/>
                        </div>
                    </div>
                    <div className='row m-2'>
                        <div className='col-3 d-flex align-items-center justify-content-end '>
                                <label className='h6'>Role:</label>
                        </div>
                        <div className='col-9 d-flex align-items-center justify-content-start '>
                            <div className='col-4 '>
                                 <select required value={values.isAdmin} className='form-select' onChange={(event: React.ChangeEvent<HTMLSelectElement> ) => setValues({...values, isAdmin: event.target.value})}>
                                    <option></option>
                                    <option value='true'>Admin</option>
                                    <option value='false'>User</option>
                                 </select>
                            </div>

                        </div>
                    </div>
                    <div className='row m-2 p-2'>
                        <div className='col-12 d-flex align-items-center justify-content-center '>
                            <input type='submit' placeholder='Submit' className='btn btn-sm btn-success px-5 me-2' />
                            <Link to='/'  className='btn btn-sm btn-danger px-5 '>Back</Link>
                        </div>
                    </div>
    
                </div>
            </div>
            </form>

        </div>
    </div>
  )
}

export default Update
