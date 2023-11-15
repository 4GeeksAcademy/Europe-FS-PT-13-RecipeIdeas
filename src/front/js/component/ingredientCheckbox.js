import React from "react";

export const IngredientCheckBox = (props) => {

    return(
        <div className="form-check col-3">
        <input className="form-check-input" type="checkbox" value={props.ingredient} id={props.ingredient} onChange={props.handleFunction} />
        <label className="form-check-label" for={props.ingredient}>
            {props.ingredientCapital}
        </label>
    </div>
    )
}