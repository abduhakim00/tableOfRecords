import "bootstrap/dist/css/bootstrap.css";
import "../styles/table.css";

function Table(props) {
  let headers = [];
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
          return (
            <tr>
              <th scope="row">#{i + 1}</th>
              {item.map((e) => {
                return <td>{e}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
