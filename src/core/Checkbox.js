import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setCheked] = useState([]);

    const handleToggle = c => () => {
        // Return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // If currently checked was not already in checked state > push
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
             // else pull
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
         console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        // handleFilters(newCheckedCategoryId);
    };

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                onChange={handleToggle(c._id)}
                // c._id is used for displaying checked items
                // Display tickmark only if the id
                // is present in the array
                value={checked.indexOf(c._id !== -1)}
                type="checkbox"
                className="form-check-input"
            />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};

export default Checkbox;
