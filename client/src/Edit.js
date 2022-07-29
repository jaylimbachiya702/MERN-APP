import React,{useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

const Edit = () => {
  
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const history = useNavigate("");
  
  const [input, setInput] = useState({
    name: '',
    email: '',
    job: ''
  })
  
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInput((preval) => {
        return {
            ...preval,
            [name]: value
        }
    })
}


const { id } = useParams("");
console.log(id);



const getdata = async () => {

    const res = await fetch(`/getuser/${id}`, {
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
        setInput(data)
        console.log("get data");

    }
}

useEffect(() => {
    getdata();
}, []);


const updateuser = async(e)=>{
    e.preventDefault();

    const {name,email,work,add,mobile,desc,age} = input;

    const res2 = await fetch(`/updateuser/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name,email,work,add,mobile,desc,age
        })
    });

    const data2 = await res2.json();
    console.log(data2);

    if(res2.status === 422 || !data2){
        alert("fill the data");
    }else{
        history("/")
    }

}

  return (

    <div className='container'>
        <Link to='/'>HOME2</Link>

        <form className='mt-5'>

            <div className="row">

  <div className="mb-3 col-lg-6 col-md--6 col-12">
    <label htmlFor="exampleInputPassword1" className="form-label">User Name</label>
    <input type="text"  value={input.name} onChange={setdata} name='name' className="form-control" id="exampleInputPassword1"/>
  </div>

  <div className="mb-3 col-lg-6 col-md--6 col-12">
    <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
    <input type="email" value={input.email} onChange={setdata} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3 col-lg-6 col-md--6 col-12">
    <label htmlFor="exampleInputPassword1" value={input.job} onChange={setdata} className="form-label">Job</label>
    <input type="text" name='job' className="form-control" id="exampleInputPassword1"/>
  </div>

  
  <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>

  </div>

</form>
    </div>

  )
}

export default Edit;