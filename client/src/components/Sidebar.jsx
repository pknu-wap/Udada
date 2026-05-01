import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 style={{ textAlign: "center" }}>UDADA</h2>

      <div className="menu">홈</div>
      <div className="menu">북마크</div>
      <div className="menu">설정</div>
    </div>
  );
}