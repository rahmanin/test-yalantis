import React from 'react';


const Loader = () => (
  <div className="loader">
    {
      Array.from({ length: 13 }).map((v, i) => 
        <div className={`loader-circle-${i} circle`} key={i}></div>
      )
    }
  </div>
);

export default Loader;