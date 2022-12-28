import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Modal from "./comps/modal";
import Table from "./comps/table";
let data = [];
let secData = [];
let hasNextPage = true;

function App() {
  let [initialP, setPage] = useState(1);
  const dataFetchedRef = useRef(false);
  let [loading, setLoading] = useState(false);
  let [addEntry, setEntry] = useState(false);
  const target = useRef();
  let options = useMemo(() => {
    return {
      root: document.querySelector("#section"),
      rootMargin: "0px",
      threshold: 1.0,
    };
  }, []);
  let fetchNextPage = (page, setload = false) => {
    fetch(`http://localhost:3000/records?_page=${page}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length === 0) {
          hasNextPage = false;
        }
        data.push(
          ...result.map((e) => {
            return e.record;
          })
        );
        if (setload) {
          setLoading(false);
        }
        setPage(page + 1);
      });
  };
  const mbappe = useCallback(
    (post) => {
      if (target.current) {
        target.current.disconnect();
      }
      target.current = new IntersectionObserver((e) => {
        if (e[0].isIntersecting && hasNextPage) fetchNextPage(initialP);
      }, options);
      if (post) {
        target.current.observe(post);
      }
    },
    [options, initialP]
  );
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setLoading(true);
    fetchNextPage(1, true);
  }, []);

  let hideModal = () => {
    setEntry(!addEntry);
  };
  let bubbleUp = (d) => {
    secData.push(d);
  };

  return (
    <main>
      {addEntry && (
        <Modal
          hasNextPage={hasNextPage}
          action={hideModal}
          saveData={bubbleUp}
        ></Modal>
      )}
      <div className="buttonDiv">
        <button
          onClick={hideModal}
          type="button"
          class="btn btn-primary btn-lg"
        >
          Add New Entry
        </button>
      </div>
      <section id="section">
        {loading && <h1>Loading...</h1>}
        {!loading && (
          <Table
            ref={mbappe}
            secData={secData}
            data={data}
            hasNextPage={hasNextPage}
          ></Table>
        )}
      </section>
    </main>
  );
}

export default App;
