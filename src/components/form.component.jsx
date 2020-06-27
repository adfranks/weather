import React from 'react';

const Form = (props) => {
  return (
    <div className="container-fluid">
      <div>{props.error || null}</div>
      <form onSubmit={props.huntgather}>
        <div className="row">
          <div className="col-md-4">
            <input 
              type="text" 
              className="form-control mb-2" 
              name="city"
              autoComplete="off" 
              placeholder="Enter city" 
            />
          </div>
          <div className="col-md-4">
            <input 
              type="text" 
              className="form-control mb-2" 
              name="country"
              autoComplete="off" 
              placeholder="Enter country" 
            />
          </div>
          <div className="col-md-4">
            <button className="mb-3 btn btn-warning">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
