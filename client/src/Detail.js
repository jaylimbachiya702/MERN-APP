import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

  const {id} = useParams("");
  console.log(id);

  const history = useNavigate();

  const getdata = async () => {

    const res = await fetch(`/getuser/${id}`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);

    if(res.status === 422 || !data){
      console.log("error");
    }else{
      setUserdata(data);
      console.log("get data");
    }
  }

  useEffect(() => {
    getdata();
  })

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
        history.push("/");
    }

}

  return (
    <div className='container mt-3'>
      <Link to={"/"}>Home</Link>
        <h1 style={{fontWeight: 400,marginTop: 20}}>Welcome Jay</h1>

        <Card sx={{ maxWidth: 600 }}>
      <CardContent>

      <div className="add_btn">
       <Link to={`/edit/${getuserdata._id}`}>     <button className='btn btn-primary mx-2'>Update</button>   </Link>
             <button className='btn btn-danger' onClick={() => deleteuser(getuserdata._id)}>Delete</button>
            </div>

        <div className="row">
        <div className="left_view col-lg-6 col-md-6 col-12">
        <img src="../profile.png" alt="Profile" style={{width:50}} />
        <h3 className='mt-3'>Name: <span style={{fontWeight: 400}}>{getuserdata.name}</span></h3>
        <p className='mt-3'>E-Mail: <span>{getuserdata.email}</span></p>
        <p className='mt-3'>Job: <span>{getuserdata.job}</span></p>
        </div>

        <div className="right_view col-lg-6 col-md-6 col-12">
            
        </div>
        </div>
      </CardContent>
      </Card>
        </div>
  )
}

export default Detail;