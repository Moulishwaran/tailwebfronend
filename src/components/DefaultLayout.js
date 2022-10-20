import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../resources/default-layout.css";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("student-user"));
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <li
              onClick={() => {
                localStorage.removeItem("student-user");
                navigate("/login");
              }}
            >
              Logout
            </li>
          ),
        },
      ]}
    />
  );

  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">TAILWEB-STUDENT</h1>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className="primary">{user.name}</button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
