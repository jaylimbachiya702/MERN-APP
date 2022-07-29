import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const getdata = async () => {

        const res = await fetch("/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            getdata();
        }

    }


  return (
    <div className='mt-5'>
      <div className="container">
        <div className="add_btn mt-2 mb-2">
            <Link to="/add" className="btn btn-primary">Add Data</Link>
        </div>

        <table class="table">
  <thead>
    <tr className='table-dark'>
      <th scope="col">Id</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Job</th>
    </tr>
  </thead>
  <tbody>

    {
      getuserdata.map((element,id) => {
        return(
          <>

<tr>
      <th scope="row">{id + 1}</th>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.job}</td>
       <td className='d-flex justify-content-between'>
           <Link to={`/view/${element._id}`}>  <button className='btn btn-success'>Read</button> </Link>
            <Link to={`/edit/${element._id}`}> <button className='btn btn-primary'>Update</button> </Link>
             <button className='btn btn-danger' onClick={()=>deleteuser(element._id)}>Delete</button>
      </td> 
    </tr>

          </>
        )
      })
    }



  </tbody>
</table>

      </div>
    </div>
  )
}

export default Home;
