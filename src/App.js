import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
import Modal from "./comps/modal";
import Table from "./comps/table";

function App() {
  let [addEntry, setEntry] = useState(false);
  let Class = "opac0";
  let hideModal = () => {
    Class = "opac1";

    setEntry(!addEntry);
  };
  return (
    <main>
      {addEntry && <Modal action={hideModal} className={Class}></Modal>}
      <div className="buttonDiv">
        <button
          onClick={hideModal}
          type="button"
          class="btn btn-primary btn-lg"
        >
          Add New Entry
        </button>
      </div>
      <section>
        <Table></Table>
      </section>
    </main>
  );
}

export default App;
