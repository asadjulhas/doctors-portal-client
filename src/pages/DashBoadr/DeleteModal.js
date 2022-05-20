import React from 'react';

const DeleteModal = ({name, specialty, setDeleteDoctor}) => {
  return (
    <div>
<input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure, want to delete <span className='text-[red]'>{name}?</span></h3>
    <p className="py-4">Specialty: {specialty}</p>
    <div className="modal-action">
      <label htmlFor="delete-confirm-modal" className="btn btn-sm  btn-info text-white">No ✕</label>
      <button onClick={()=>setDeleteDoctor(true)} className="btn btn-sm  btn-error text-white">Delete!</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default DeleteModal;