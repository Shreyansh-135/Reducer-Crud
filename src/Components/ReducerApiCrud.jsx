import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { reducer } from './Data01'

export const ReducerApiCrud = () => {
    let blankObject = { _id: 0, firstName: '', lastName: '', city: '', gender: '', hobbies: [], age: '' }
    const [obj, setobj] = useState({ ...blankObject })
    const [arr, setarr] = useState([])
    const [countId, setcountId] = useState(0)
    const [array, setarray] = useState([])
    const [state, dispatch] = useReducer(reducer, [])
    const [num, setnum] = useState(0)

    useEffect(() => {
        getStudentdata();
    } , [num]);

    const getStudentdata = () => {
        axios.get('https://student-api.mycodelibraries.com/api/student/get').then((abc) => {
            setarray(abc.data.data)
        })
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const getValue = async (e) => {
        if (e.target.name == 'hobbies') {
            if (e.target.checked) {
                obj.hobbies = [...obj.hobbies, e.target.value]
            }
            else {
                obj.hobbies = obj.hobbies.filter(x => x != e.target.value)
            }
        }
        else if (e.target.name == 'profile') {
            obj.profile = await toBase64(e.target.files[0])
        }
        else {
            obj[e.target.name] = e.target.value;
        }
        setobj({ ...obj })

        // for(let key in editobj)
        //         {
                    
        //             obj[key]= editobj[key]
        //         }

        //         if(!editobj.hobbies){
        //             obj.hobbies = [];
        //         }
        //         else{
        //             obj.hobbies = editobj.hobbies.split(',')
        //         }
    }

    const saveData = () => {
        setnum(num+1)
        if (obj._id != 0) {
            dispatch({ data: 'edit', obj : obj })
        }
        else {
            let c1 = countId + 1;
            setcountId(c1)
            obj._id = c1;
            dispatch({ data: 'abc', obj })
        }
        setarr([...arr])
        setobj({ ...blankObject })
    }

    const deleteUser = (id) => {
        setnum(num+1)
        dispatch({ data: 'delete', obj: id })
        setarr([...state])
    }

    const editUser = (x) => {
        setobj({ ...x })
    }


    return (
        <>
            <form action="" className='mx-auto  p-3 border border-1 reducer-crud'>
                <h1 className="text-center fw-bold p-2">Student-Form</h1>

                <label htmlFor="" className='m-2 fw-bold fs-5'> First Name</label><br />
                <input type="text" name="firstName" className="input_group w-100 m-2" value={obj.firstName} onChange={(e) => getValue(e)} /> <br />

                <label className='m-2 fw-bold fs-5'>Last Name</label><br />
                <input type="text" name="lastName" className="input_group w-100  m-2" value={obj.lastName} onChange={(e) => getValue(e)} /> <br />

                <label className='m-2 fw-bold fs-5'>hobbies</label><br />
                <input className='m-2 rc' type="checkbox" name="hobbies" value='Singing' onChange={(e) => getValue(e)} checked={obj.hobbies?.includes('Singing')} /> Singing
                <input className='m-2 rc' type="checkbox" name="hobbies" value='Writing' checked={obj.hobbies?.includes('Writing')} onChange={(e) => getValue(e)} /> Writing
                <input className='m-2 rc' type="checkbox" name="hobbies" value='Driveing' checked={obj.hobbies?.includes('Driveing')} onChange={(e) => getValue(e)} /> Driveing
                <input className='m-2 rc' type="checkbox" name="hobbies" value='Shoping' checked={obj.hobbies?.includes('Shoping')} onChange={(e) => getValue(e)} /> Shoping <br />

                <label className='m-2 fw-bold fs-5'>Gender</label><br />
                <input type="radio" className='m-2 rc' name="gender" value='Male' onChange={(e) => getValue(e)} checked={obj.gender?.includes('Male')} /> Male
                <input type="radio" className='m-2 rc' name="gender" value='Female' onChange={(e) => getValue(e)} checked={obj.gender?.includes('Female')} /> Female <br />

                <label htmlFor="" className='m-2 fw-bold fs-5'>City</label><br />
                <input type="text" name="city" className="input_group w-100 m-2" value={obj.city} onChange={(e) => getValue(e)} /> <br />

                <label htmlFor="" className='m-2 fw-bold fs-5'>Age</label><br />
                <input type="number" name="age" className="input_group w-100 m-2" value={obj.age} onChange={(e) => getValue(e)} /> <br />

                <button type="button" className="save_button btn btn-success mt-4" onClick={() => saveData()}>Submit</button>
            </form>

            <table className='table text-center'>
                <thead className=''>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Hobbies</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Age</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {
                        array?.map((x, i) => {
                            return <tr key={i}>
                                <td>{x._id}</td>
                                <td>{x.firstName}</td>
                                <td>{x.lastName}</td>
                                <td>{x.hobbies}</td>
                                <td>{x.gender}</td>
                                <td>{x.city}</td>
                                <td>{x.age}</td>
                                <td>
                                    <button type='button' className='btn btn-warning py-1 edit' onClick={() => editUser(x)}>EDIT</button>
                                    <button type='button' className='btn btn-danger py-1 ms-2 delete' onClick={() => deleteUser(x._id)}>DELETE</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
