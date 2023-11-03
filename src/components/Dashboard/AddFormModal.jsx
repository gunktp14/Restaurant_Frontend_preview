import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import Alert from "../Alert";

function AddFormModal() {

  const {
    showAddForm,
    showEditForm,
    clearAllModal,
    insertRestaurant,
    updateRestaurant,
    showAlert,
    formValid,
    editId,

    setFormValid,
    selectedRes,
    name,
    type,
    img,
    handleChange
  } = useAppContext();

  useEffect(() => {

  }, []); 
  return ( 
    <div
      className={
        showAddForm || showEditForm ? "form-insert active" : "form-insert"
      }
    >
      <div
        id="close-addForm-btn"
        onClick={() => {
          clearAllModal();
        }}
      >
        X
      </div>
      <h1>{showAddForm ? "Add Restaurant" : "Edit Restaurant"}</h1>
      {showAlert && <Alert/>}
      {showEditForm && (
        <div className="img-box">
          <img width="100%" src={img}></img>
        </div>
      )}
      <form>
        <div className="form-control">
          <label>Name</label>
          <input
            value={name}
            name="name"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            placeholder="ชื่อร้านอาหาร"
          ></input>
        </div>
        <div className="form-control">
          <label>Type</label>
          <input
            type="text"
            value={type}
            name="type"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            placeholder="ประเถทอาหาร"
          ></input>
        </div>
        <div className="form-control">
          <label>Image</label>
          <input
            type="text"
            value={img}
            name="img"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            placeholder="รูปภาพประกอบ"
          ></input>
        </div>
        <button
          onClick={(event) => {
            if (editId) { 
              return updateRestaurant(event);
            } else {
              return insertRestaurant(event);
            }
          }}
          className="btn-submit"
          type="submit"
        >
          {showAddForm ? "ยืนยันการเพิ่มร้านอาหาร" : "ยืนยันการเเก้ไข"}
        </button>
      </form>
    </div>
  );
}

export default AddFormModal;
