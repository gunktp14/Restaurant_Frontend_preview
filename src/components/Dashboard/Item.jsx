import React from "react";
import { useAppContext } from "../../context/appContext";

const Item = ({ restaurant }) => {
  const { displayEditForm, displayPopupConfirm } = useAppContext();

  return (
    <tr>
      <td>{restaurant.name}</td>
      <td>{restaurant.type}</td>
      <td className="img">
        <img src={restaurant.img} width="50" alt="" />
      </td>
      <td>{restaurant.createdAt}</td>
      <td>{restaurant.updatedAt}</td>
      <td className="option-colum">
        <div className="option">
          <button
            className="btn-edit"
            onClick={() => {
              displayEditForm(restaurant.id);
            }}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>
          <button
            className="btn-delete"
            onClick={() => {
              displayPopupConfirm(restaurant.id);
            }}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Item;
