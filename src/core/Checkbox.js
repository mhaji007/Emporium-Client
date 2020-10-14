import React, { useState } from "react";

// Contains checkbox logic
const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setCheked] = useState([]);

  // Grab category id and put them
  // in an array so we can send it
  // to the backend to get all the
  // products based on category
  // accepts category id
  const handleToggle = (c) => () => {
    // Return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    // Grab a copy of the state
    const newCheckedCategoryId = [...checked];
    // If currently checked was not already in checked state > push
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
      // else pull, indicating the uncheck
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId);
    // Use the new updated checked category
    setCheked(newCheckedCategoryId);
    // Send the updated checked category to
    // the parent for processing via
    // handleFilters function
    handleFilters(newCheckedCategoryId);
  };

  // Loop through categoires and
  // display them in a list with
  // a label and an input
  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        // pass in category id
        onChange={handleToggle(c._id)}
        // c._id is used for displaying checked items
        // display tickmark only if the id
        // is present in the array
        value={checked.indexOf(c._id !== -1)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label" style={{color:"white"}}>{c.name}</label>
    </li>
  ));
};

export default Checkbox;
