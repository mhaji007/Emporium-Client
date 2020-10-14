import React, { useState, useEffect} from "react";

const RadioBox = ({prices, handleFilters}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    // Send in selected radio id
    handleFilters(event.target.value);
    setValue(event.target.value);
  }

  // Loop through the array of
  // prices and for each price object
  // display the range array stored
  // in the value key of the object
  // in a div with a label and an input
  return prices.map((p, i) => (
    <div key={i}>
      <input
        // pass in category id
        onChange={handleChange}
        value={`${p._id}`}
        // So only one radio
        // is selected at a time
        name= {p}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label" style={{color:"white"}}>{p.name}</label>
    </div>

  ));

}

export default RadioBox;
