import React, { useReducer, useState } from 'react'
import { reducer } from './Data'

export const ReducerCrud = () => {
    let blankObject = { id: 0, fname: '', email: '', mobile: '', date: '', gender: '', course: [] }
    const [obj, setobj] = useState({ ...blankObject })
    const [arr, setarr] = useState([])
    const [countId, setcountId] = useState(0)
    const [state, dispatch] = useReducer(reducer, [])
    // JSON.parse(localStorage.getItem('arr')) ||
    // console.log(state)
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const getValue = async (e) => {
        if (e.target.name == 'course') {
            if (e.target.checked) {
                obj.course = [...obj.course, e.target.value]
            }
            else {
                obj.course = obj.course.filter(x => x != e.target.value)
            }
        }
        else if (e.target.name == 'profile') {
            obj.profile = await toBase64(e.target.files[0])
        }
        else {
            obj[e.target.name] = e.target.value;
        }
        setobj({ ...obj })
    }

    const saveData = () => {
        if (obj.id != 0) {
            dispatch({ data: 'edit', obj : obj })
        }
        else {
            let c1 = countId + 1;
            setcountId(c1)
            obj.id = c1;
            arr.push(obj);
            dispatch({ data: 'abc', Object: obj })
        }

        setarr([...arr])
        // localStorage.setItem('arr', JSON.stringify(arr))
        // console.log(JSON.parse(localStorage.getItem('arr')))
        setobj({ ...blankObject })
    }

    const deleteUser = (x) => {
        dispatch({ data: 'delete', obj : x })
        setarr([...state])
    }

    const editUser = (x) => {
        setobj({ ...x })
    }

    return (
        <>
            <form action="" className='reducer-crud'>
                <h1>Form</h1>

                <label htmlFor=""> First Name</label><br />
                <input type="text" name="fname" className="input_group" value={obj.fname} onChange={(e) => getValue(e)} /> <br />

                <label htmlFor="">Email</label><br />
                <input type="email" name="email" className="input_group" value={obj.email} onChange={(e) => getValue(e)} /> <br />

                <label htmlFor="">Mobile Number</label><br />
                <input type="number" name="mobile" className="input_group" value={obj.mobile} onChange={(e) => getValue(e)} /> <br />

                <label htmlFor="">Date</label><br />
                <input type="date" name="date" className="input_group" value={obj.date} onChange={(e) => getValue(e)} /> <br />

                <label htmlFor="">Gender</label><br />
                <input type="radio" name="gender" className='rc' value='Male' onChange={(e) => getValue(e)} checked={obj.gender?.includes('Male')} /> Male
                <input type="radio" name="gender" className='rc' value='Female' onChange={(e) => getValue(e)} checked={obj.gender?.includes('Female')} /> Female <br />

                <label htmlFor="">Course</label> <br />
                <input type="checkbox" className='rc' name="course" value='React' onChange={(e) => getValue(e)} checked={obj.course?.includes('React')} /> React Js
                <input type="checkbox" className='rc' name="course" value='Angular' checked={obj.course?.includes('Angular')} onChange={(e) => getValue(e)} /> Angular
                <input type="checkbox" className='rc' name="course" value='Node' checked={obj.course?.includes('Node')} onChange={(e) => getValue(e)} /> Node js
                <input type="checkbox" className='rc' name="course" value='.net' checked={obj.course?.includes('.net')} onChange={(e) => getValue(e)} /> .NET Core <br />

                <label htmlFor="profile" className="profile_btn">Profile</label><br />
                <input type="file" name="profile" id="profile" onChange={(e) => getValue(e)} /> <br /> <br />

                <button type="button" className="save_button" onClick={() => saveData()}>Save</button>

            </form>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Profile</th>
                        <th>First Name</th>
                        <th>Enail</th>
                        <th>Mobile</th>
                        <th>Date</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state?.map((x, i) => {
                            return <tr key={i}>
                                <td>{x.id}</td>
                                <td><img src={x.profile} alt="" width={40} /></td>
                                <td>{x.fname}</td>
                                <td>{x.email}</td>
                                <td>{x.mobile}</td>
                                <td>{x.date}</td>
                                <td>{x.gender}</td>
                                <td>{x.course}</td>
                                <td>
                                    <button className="edit_btn" onClick={() => editUser(x)}>EDIT</button>
                                    <button className="delete_btn" onClick={() => deleteUser(x)}>DELETE</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    );
}
