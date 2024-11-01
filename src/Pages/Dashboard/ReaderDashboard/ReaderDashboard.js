import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookIcon from "@material-ui/icons/Book";
import HistoryIcon from "@material-ui/icons/History";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useParams } from "react-router-dom"; 
import { IconButton } from "@material-ui/core";
import { AuthContext } from "../../../Context/AuthContext";
import moment from "moment";
import { getUserById, editReader , createReaderCard } from "./readerApi"; // Ensure you import editReader here
import EditPhotoModal from "./editPhotoModal";
import EditReaderModal from "./editReaderModal";

function MemberDashboard() {
  const navigate =useNavigate()
  const { id } = useParams();
  const [active, setActive] = useState("profile");
  const [reader, setReader] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const getReaderDetails = async () => {
      try {
        const res = await getUserById(id);
        console.log("Полученные данные пользователя:", res);
        setReader(res);
      } catch (err) {
        console.log("Ошибка получения данных пользователя", err);
      }
    };
    getReaderDetails();
  }, [id]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const calculateFine = (toDate) => {
    const daysOverdue = Math.floor((Date.parse(moment()) - Date.parse(toDate)) / 86400000);
    return daysOverdue > 0 ? daysOverdue * 10 : 0;
  };

  const handleClose = () => {
    console.log("Закрытие модального окна");
    setIsEditModalOpen(false);
  };

  const handleUpdateSuccess = async (updatedReader) => {
    try {
      const res = await editReader(updatedReader.id); // Update the user after editing
      console.log("Reader updated successfully:", res);
      setReader(res); // Update the local state with the new reader data
      setIsEditModalOpen(false); // Close the edit modal
    } catch (err) {
      console.error("Ошибка обновления пользователя:", err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
          <IconButton>
            {sidebar ? (
              <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />
            ) : (
              <DoubleArrowIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />
            )}
          </IconButton>
        </div>
        <div className={sidebar ? "dashboard-options active" : "dashboard-options"}>
          <div className="dashboard-logo">
            <LibraryBooksIcon style={{ fontSize: 50 }} />
            <p className="logo-name">LCMS</p>
          </div>
          <nav>
            <a
              href="#profile@member"
              className={`dashboard-option ${active === "profile" ? "clicked" : ""}`}
              onClick={() => {
                setActive("profile");
                setSidebar(false);
              }}
            >
              <AccountCircleIcon className="dashboard-option-icon" /> Profile
            </a>
            <a
              href="#activebooks@member"
              className={`dashboard-option ${active === "active" ? "clicked" : ""}`}
              onClick={() => {
                setActive("active");
                setSidebar(false);
              }}
            >
              <LocalLibraryIcon className="dashboard-option-icon" /> Active
            </a>
            <a
              href="#reservedbooks@member"
              className={`dashboard-option ${active === "reserved" ? "clicked" : ""}`}
              onClick={() => {
                setActive("reserved");
                setSidebar(false);
              }}
            >
              <BookIcon className="dashboard-option-icon" /> Reserved
            </a>
            <a
              href="#history@member"
              className={`dashboard-option ${active === "history" ? "clicked" : ""}`}
              onClick={() => {
                setActive("history");
                setSidebar(false);
              }}
            >
              <HistoryIcon className="dashboard-option-icon" /> History
            </a>
            <a
              href="#logout"
              className="dashboard-option"
              onClick={() => {
                logout();
                setSidebar(false);
              }}
            >
              <PowerSettingsNewIcon className="dashboard-option-icon" /> Log out
            </a>
          </nav>
        </div>
        <EditPhotoModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          currentPhoto={reader?.photo}
          onUpload={(e) => {
            const file = e.target.files[0];
            // Handle photo upload logic here
          }}
          userId={id}
        />
        <EditReaderModal
          isOpen={isEditModalOpen}
          onRequestClose={handleClose}
          reader={reader}
          onUpdateSuccess={handleUpdateSuccess}
        />

        <div className="dashboard-option-content">
          <div className="member-profile-content" id="profile@member">
            <div className="user-details-topbar" onClick={() => setIsModalOpen(true)}>
              {reader?.photo ? (
                <img className="user-profileimage" src={`http://localhost:3000/uploads/profile/${reader.photo}`} alt="User Profile" />
              ) : (
                <img className="user-profileimage" src="../assets/images/Profile.png" alt="Default Profile" />
              )}

              <div className="user-info">
                <p className="user-name">{reader?.fullName}</p>
                <p className="user-id">
                  {reader?.role && "Student"}
                </p>
                <p className="user-email">{reader?.email}</p>
              </div>
            </div>
            <div>
              <button onClick={() => setIsEditModalOpen(true)}>редактировать</button>
              <button onClick={() => createReaderCard(reader._id)}>Сгенерировать читательский билет</button>

            </div>
            <div className="user-details-specific">
              <div className="specific-left">
                <div className="specific-left-top">
                  <p className="specific-left-topic">
                    {/* <strong>Age:</strong> {memberDetails?.age} */}
                  </p>
                </div>
                <div className="specific-left-bottom">
                  <p className="specific-left-topic">
                    {/* <strong>DOB:</strong> {memberDetails?.dob} */}
                  </p>
                  <p className="specific-left-topic">
                    {/* <strong>Address:</strong> {memberDetails?.address} */}
                  </p>
                </div>
              </div>
              <div className="specific-right">
                <div className="specific-right-top">
                  <p className="specific-right-topic"><strong>Points</strong></p>
                  {/* <p className="points">{memberDetails?.points || 0}</p> */}
                </div>
                <div className="dashboard-title-line"></div>
                <div className="specific-right-bottom">
                  <p className="specific-right-topic"><strong>Rank</strong></p>
                  {/* <p className="rank">{memberDetails?.rank || 'N/A'}</p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="member-activebooks-content" id="activebooks@member">
            <p className="member-dashboard-heading">Issued</p>
            <table className="activebooks-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book-Name</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Fine</th>
                </tr>
              </thead>
              {/* Uncomment and populate as needed */}
              {/* <tbody>
                {memberDetails?.activeTransactions
                  ?.filter(data => data.transactionType === "Issued")
                  .map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookName}</td>
                      <td>{data.fromDate}</td>
                      <td>{data.toDate}</td>
                      <td>{calculateFine(data.toDate)}</td>
                    </tr>
                  ))}
              </tbody> */}
            </table>
          </div>

          <div className="member-reservedbooks-content" id="reservedbooks@member">
            <p className="member-dashboard-heading">Reserved</p>
            <table className="activebooks-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book-Name</th>
                  <th>Reserved Date</th>
                </tr>
              </thead>
              {/* Uncomment and populate as needed */}
              {/* <tbody>
                {memberDetails?.activeTransactions
                  ?.filter(data => data.transactionType === "Reserved")
                  .map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookName}</td>
                      <td>{data.date}</td>
                    </tr>
                  ))}
              </tbody> */}
            </table>
          </div>

          <div className="member-history-content" id="history@member">
            <p className="member-dashboard-heading">History</p>
            <table className="activebooks-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book-Name</th>
                  <th>Issued Date</th>
                  <th>Returned Date</th>
                </tr>
              </thead>
              {/* Uncomment and populate as needed */}
              {/* <tbody>
                {memberDetails?.historyTransactions.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.bookName}</td>
                    <td>{data.issuedDate}</td>
                    <td>{data.returnedDate}</td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
