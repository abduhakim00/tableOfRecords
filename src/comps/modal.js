import { Fragment } from "react";
import "../styles/modal.css";
import "bootstrap/dist/css/bootstrap.css";
function Modal(props) {
  return (
    <Fragment>
      <main id="backdrop" className={props.Class}>
        <div className="modal-content" onClick={() => {}}>
          <div className="modal-title">Add New Entry</div>
          <div className="modal-body"> This is the form</div>
          <div className="modal-footer">
            <button
              onClick={props.action}
              type="button"
              class="btn btn-secondary"
            >
              {" "}
              Cancel
            </button>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
export default Modal;
