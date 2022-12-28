import "bootstrap/dist/css/bootstrap.css";
import { forwardRef } from "react";
import "../styles/table.css";

let setRef = false;
const Table = forwardRef((props, ref) => {
  let headers = [];
  let lastI = 0;

  for (let i = 1; i <= 15; i++) {
    headers.push(<th scope="col">{i}</th>);
  }

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          {headers}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, i) => {
          setRef = false;
          if (i + 1 === props.data.length) {
            setRef = true;
          }
          return (
            <tr ref={setRef ? ref : null}>
              <th scope="row">#{i + 1}</th>
              {item.map((e, ind) => {
                lastI = i + 1;
                return <td>{e}</td>;
              })}
            </tr>
          );
        })}
        {!props.hasNextPage &&
          props.secData.map((item, i) => {
            return (
              <tr>
                <th scope="row">#{lastI + 1 + i}</th>
                {item.map((e) => {
                  return <td>{e}</td>;
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
});
export default Table;
