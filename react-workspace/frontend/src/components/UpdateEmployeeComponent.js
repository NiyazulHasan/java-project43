import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import { useEffect } from 'react';

function UpdateEmployeeComponent() 
{
    let navigate = useNavigate();

    const [name,setName]= useState("");
    const [doj,setDoj] = useState("");
    const [department,setDepartment] = useState({deptName:"",designation:""});
    const {id} = useParams();

    const cancelHandler=(e)=>{
        e.preventDefault();
        navigate("/employees");
    }

    const updateHandler=(e)=>{
        e.preventDefault();

        const updatedHandler={
            name,
            doj,
            dept:{
                deptName: department.deptName,
                designation: department.designation
            }
        }
        
        EmployeeService.updateEmployee(id,updatedHandler).then(res=>{
            navigate("/employees");
        })
    }

    useEffect((e)=>{

        EmployeeService.getEmployeeById(id).then(res=>{
          setName(res.data.name);
          setDoj(res.data.doj) 
          setDepartment({
            deptName:res.data.dept.deptName,
            designation: res.data.dept.designation
          }) 
        })
    },[])

  return (
    <div className='container mt-3'>
       <div className='card col-6 offset-3'>
            <h4 className='text-center pt-3'> Update Employee </h4>
            <div className='card-body'>
                <form>
                    <label className='my-3'> Name : </label>
                    <input type="text" name="name" id="name" className='form-control'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}/>

                    <label className='my-3'> DOJ : </label>
                    <input type="text" name="name" id="name" className='form-control'
                    value={doj}
                    onChange={(e)=> setDoj(e.target.value)}/>

                    <label className='my-3'> DeptName : </label>
                    <input type="text" name="name" id="name" className='form-control'
                    value={department.deptName}
                    onChange={(e)=> setDepartment({...department,deptName:e.target.value})}/>


                    <label className='my-3'> Designation : </label>
                    <input type="text" name="name" id="name" className='form-control'
                    value={department.designation}
                    onChange={(e)=> setDepartment({...department,designation:e.target.value})}/>

                    <button className='btn btn-danger mt-3 float-start' onClick={cancelHandler}> cancel </button>
                    <button className='btn btn-success mt-3 float-end' onClick={updateHandler}> save </button>
                </form>
            </div>
       </div>
    </div>
  )
}

export default UpdateEmployeeComponent
