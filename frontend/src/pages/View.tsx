import React,{useEffect, useState} from 'react'
import { useAppDispatch } from '../app/hooks'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

type tUser ={
    _id: string,
    username: string, 
    password: string,
    email: string,
    isAdmin: boolean
}

const View = () => {
    const [values, setValues] = useState<tUser>({
        _id:"",
        username:"",
        password:"",
        email:"",
        isAdmin:false
    })
    const dispatch = useAppDispatch();
    const {id} = useParams()

    useEffect(()=> {
       axios.get('http://localhost:3001/api/users/'+id)
            .then((res) => {
                setValues(res.data)
            })
            .catch(error => console.log(error))
    },[])

    
  return (
    <div className='bg-light text-dark w-100 vh-100 d-flex align-items-center justify-content-center '>
      <div className='container'>
          <div className='container col-10'>
                <div className='d-flex align-items-center justify-content-center flex-column'>

                    <div className='shadow p-2'> 
                      <div className='text-center p-4 '>
                      <h1>View user information</h1>
                    </div>
                        <div className='text-end p-2'><Link to='/create' className='btn btn-success btn-sm me-1 px-5'>Add User</Link></div>
                      <table className='table table-striped table-hover table-bordered shadow table-sm'>
                        <thead>
                              <tr className='text-center'>
                                  <th>Id</th>
                                  <th>Username</th>
                                  <th>Password</th>
                                  <th>Email</th>
                                  <th>Role</th>
                                  <th>Action</th>
                              </tr>
                        </thead>
                        <tbody>
                                         <tr>
                                              <td>{values._id}</td>
                                              <td>{values.username}</td>
                                              <td>{values.password}</td>
                                              <td>{values.email}</td>
                                              <td>{values.isAdmin ? "Admin" : "User"}</td>
                                              <td>
                                                
                                                <Link to={`/update/${values._id}`} className='btn btn-secondary btn-sm me-1 '>Update</Link>
                                                <Link to='/' className='btn btn-danger btn-sm'>Back</Link>
                                              </td>
                                          </tr>
                          

                        </tbody>
                      </table>
                    </div>
                </div>
          </div>
      </div>
    </div>
  )
}

export default View
