import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useEffect, useState } from "react";
import Modal from "./comps/modal";
import Table from "./comps/table";
let data = [];

function App() {
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3010/records")
      .then((res) => res.json())
      .then((result) => {
        data = result.map((e) => {
          return e.record;
        });
        setLoading(false);
      });
  }, []);
  let [loading, setLoading] = useState(false);
  let [addEntry, setEntry] = useState(false);
  let hideModal = () => {
    setEntry(!addEntry);
  };
  let bubbleUp = (d) => {
    data.push(d);
  };
  console.log(data);
  return (
    <main>
      {addEntry && <Modal action={hideModal} saveData={bubbleUp}></Modal>}
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
        {loading && <h1>Loading...</h1>}
        {!loading && <Table data={data}></Table>}
      </section>
    </main>
  );
}

export default App;
