import { NavLink } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { tableColumns } from "./table-column";
import { useNavigate } from "react-router-dom";

export const TableComponent = ({ usersList }) => {
  const navigate = useNavigate();
  const goUserDetail = (user) => {
    navigate(`/users/${user.id}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {tableColumns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {usersList &&
          usersList.length > 0 &&
          usersList.map((user) => (
            <tr
              key={user.id}
              onClick={() => goUserDetail(user)}
              style={{ cursor: "pointer" }}
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.address.city}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
