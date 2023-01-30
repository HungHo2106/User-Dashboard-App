import { useState, useEffect } from "react";
import { NavbarComponent } from "../../components/Navbar";
import { TableComponent } from "../../components/Table";
import { getUsers } from "../../api/axios";

export const Users = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getUsers().then((json) => setUsersList(json));
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="py-3 px-5">
        <h1>User</h1>
        <div>
          <TableComponent usersList={usersList} />
        </div>
      </div>
    </div>
  );
};
