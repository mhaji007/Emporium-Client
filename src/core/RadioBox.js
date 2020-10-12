import React, { useState, useEffect} from "react";

const RadioBox = ({prices, handleFilters}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value)
    setValue(event.target.value);
  }

 // Loop through prices and
  // display them in a div with
  // a label and an input
  return prices.map((p, i) => (
    <div key={i}>
      <input
        // pass in category id
        onChange={handleChange}
        value={`${p._id}`}
        // So only one radio
        // is selectes at a time
        name= {p}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{p.name}</label>
    </div>

  ));

}

export default RadioBox;
