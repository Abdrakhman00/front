import React from 'react';
import "./dashboard.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaUsers, FaUserPlus, FaBook, FaExclamationTriangle, FaChevronDown, FaEllipsisH, FaChevronRight } from 'react-icons/fa';

const App = () => {
    return (
        <div className="container">
            <div className="dashboard-grid">
                <Card icon="fas fa-users" number="1253" label="Total Visitors" />
                <Card icon="fas fa-user-plus" number="16" label="New Members" />
                <Card icon="fas fa-book" number="432" label="Borrowed Books" />
                <Card icon="fas fa-exclamation-triangle" number="22" label="Overdue Books" />
            </div>
            <div className="table-container">
                <Table title="Member List" headers={["MEMBER NAME", "ID", "BOOKS ISSUED", "ACTION"]} rows={members} />
                <Table title="List of Books" headers={["BOOK NAME", "BOOK CODE", "BOOK STATUS", "ACTION"]} rows={books} />
            </div>
        </div>
    );
};

const Card = ({ icon, number, label }) => (
  <div className="card">
      <i className={`icon ${icon}`}></i> {/* Иконка с классом icon */}
      <div>
          <div className="number">{number}</div>
          <div className="label">{label}</div>
      </div>
  </div>
);


const Table = ({ title, headers, rows }) => (
    <div className="table-section">
        <div className="table-header">
            <h3>{title}</h3>
            <button className="view-all">View All</button>
        </div>
        <table className="table">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, i) => (
                            <td key={i}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const members = Array(7).fill(["Aman Sharma", "B332", "Champak", <i className="fas fa-ellipsis-h"></i>]);
const books = Array(7).fill(["Twisted Love", "1342", "On Shelf", <i className="fas fa-ellipsis-h"></i>]);

export default App;
