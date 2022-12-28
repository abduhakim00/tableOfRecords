import { createRef, Fragment, useEffect, useRef, useState } from "react";
import "../styles/modal.css";
import "bootstrap/dist/css/bootstrap.css";
function Modal(props) {
  let data = [];
  let [numFields, setFields] = useState(5);
  let setNumFields = (e) => {
    setFields(e.target.value);
  };

  let formSubmit = async (e) => {
    e.preventDefault();
    refsArr.current.forEach((e) => {
      data.push(e.current.value);
    });
    if (!props.hasNextPage) {
      props.saveData(data);
    }
    fetch("http://localhost:3000/records", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ record: data }), // body data type must match "Content-Type" header
    });
    props.action();
  };

  let fieldsArr = [[], [], []];
  let refsArr = useRef([]);
  let arr = [];
  for (let i = 1; i <= numFields; i++) {
    arr.push(createRef());
    if (i <= 5) {
      fieldsArr[0].push(i);
    } else if (i <= 10) {
      fieldsArr[1].push(i);
    } else if (i <= 15) {
      fieldsArr[2].push(i);
    }
  }
  refsArr.current = arr;

  useEffect(() => {
    document.getElementById("modal-content").classList.add("animate");
  }, []);
  return (
    <Fragment>
      <main id="backdrop" onClick={props.action}>
        <div
          id="modal-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <form onSubmit={formSubmit}>
            <div className="modal-title">Add New Entry</div>
            <div className="modal-body">
              <div class="form-group col-md-3">
                <label htmlFor="fields">Number of fields</label>
                <input
                  onChange={setNumFields}
                  id="fields"
                  type="number"
                  min={5}
                  max={15}
                  class="form-control mb-1"
                  defaultValue={5}
                />
              </div>
              {fieldsArr.map((el, ind) => {
                return (
                  <div class="row mt-1">
                    {el.map((element, i) => {
                      return (
                        <div class="form-group col">
                          <input
                            ref={refsArr.current[5 * ind + i]}
                            key={Math.random()}
                            type="text"
                            class="form-control"
                            required
                            placeholder={`#${element}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="modal-footer">
              <button type="submit" class="btn btn-primary">
                {" "}
                Submit
              </button>
              <button
                onClick={props.action}
                type="button"
                class="btn btn-secondary"
              >
                {" "}
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </Fragment>
  );
}
export default Modal;
