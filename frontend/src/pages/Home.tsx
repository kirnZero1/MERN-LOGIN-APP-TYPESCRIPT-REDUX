import React,{useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchData, deleteData } from '../app/dataSlicers'
import { Link } from 'react-router-dom'

const Home = () => {
    const users = useAppSelector((state) => state.data.data)
    const dispatch = useAppDispatch();

    useEffect(()=> {
        dispatch(fetchData())
    },[dispatch])

    const handleDelete = (id: string) => {
          const confirms = window.confirm('Would you like to delete this user?')
          if(confirms){
            dispatch(deleteData(id));
            alert('Youve successfully delete the user.');
            window.location.reload();
          }else{
            window.location.reload()
          }
    }
    
  return (
    <div className='bg-light text-dark '>
      <div className='container'>
          <div className='container col-10'>
                <div className='d-flex align-items-center justify-content-center flex-column'>

                    <div className='shadow p-2'> 
                      <div className='text-center p-4 '>
                      <h1>User information</h1>
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
                          {users?.map((user, index) => {
                                 return    <tr key={index}>
                                              <td>{user._id}</td>
                                              <td>{user.username}</td>
                                              <td>{user.password && "hashed"}</td>
                                              <td>{user.email}</td>
                                              <td>{user.isAdmin ? "Admin" : "User"}</td>
                                              <td>
                                                <Link to={`/view/${user._id}`} className='btn btn-primary btn-sm me-1'>View</Link>
                                                <Link to={`/update/${user._id}`} className='btn btn-secondary btn-sm me-1'>Update</Link>
                                                <button onClick={() => handleDelete(user._id)} className='btn btn-danger btn-sm'>Delete</button>
                                              </td>
                                          </tr>
                          })  }

                        </tbody>
                      </table>
                    </div>
                </div>
          </div>
      </div>
    </div>
  )
}

export default Home
