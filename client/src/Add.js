import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Add = () => {

    const history = useNavigate();

    const [input, setInput] = useState({
        name: '',
        email: '',
        job: '',
    });

    const setdata = (e) => {
        console.log(e.target.value);
        const {name,value} = e.target;
        setInput((preval) => {
            return{
                ...preval,
                [name]:value,
            }
        })
    }

    const addinpdata = async (e) => {
      e.preventDefault();

      const {name,email,job} = input;

      const res = await fetch("/add",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,email,job
        })
      });

      const data = await res.json();
      console.log(data);

      if(res.status === 422 || !data){
        console.log("error");
        alert("error");
      }else{
        history("/");
        alert("data added");
        console.log("data added");
      }
    }

  return (
    <div className='container'>
        <Link to='/'>HOME</Link>

        <form className='mt-4'>

            <div className="row">

  <div class="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">User Name</label>
    <input type="text" value={input.name} onChange={setdata} name='name' class="form-control" id="exampleInputPassword1"/>
  </div>

  <div class="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" class="form-label">Email Address</label>
    <input type="email" value={input.email} onChange={setdata} name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1"  class="form-label">Job</label>
    <input type="text" value={input.job} onChange={setdata} name='job' class="form-control" id="exampleInputPassword1"/>
  </div>

  
  <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>

  </div>

</form>
    </div>
  )
}

export default Add;
