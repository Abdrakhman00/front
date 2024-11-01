import React, { useState } from 'react';
import "./EmployeeDashboard.css";
import AddTransaction from './Components/AddTransaction';
import AddMember from './Components/AddMember';
import AddBook from './Components/AddBook';
import Dashboard from './Components/Dashboard';

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookIcon from '@material-ui/icons/Book';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import GetMember from './Components/GetMember';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import Return from './Components/Return';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ProfilePage from './Components/Profile';

/* Semantic UI Dropdown Styles Import */
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function EmployeeDashboard() {
    const [active, setActive] = useState("dashboard");
    const [sidebar, setSidebar] = useState(false);

    /* Logout Function */
    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    // Функция для рендеринга активного компонента
    const renderActiveComponent = () => {
        switch (active) {
            case "profile":
                return <ProfilePage />;
            case "dashboard":
                return <Dashboard />;
            case "addbook":
                return <AddBook />;
            case "addtransaction":
                return <AddTransaction />;
            case "addmember":
                return <AddMember />;
            case "getmember":
                return <GetMember />;
            case "returntransaction":
                return <Return />;
            default:
                return null; // Возвращаем null, если ничего не выбрано
        }
    };

    // Функция для изменения активного элемента и управления сайдбаром
    const handleSidebarClick = (menuItem) => {
        setActive(menuItem);
        // Закрываем сайдбар только если выбран не "profile"
        if (menuItem !== "profile") {
            setSidebar(false);
        } else {
            setSidebar(true);
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
                    <IconButton>
                        {sidebar ? <CloseIcon style={{ fontSize: 20, color: "rgb(234, 68, 74)" }} /> : <DoubleArrowIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />}
                    </IconButton>
                </div>

                {/* Sidebar */}
                <div className={sidebar ? "dashboard-options active" : "dashboard-options"}>
                    <div className='dashboard-logo'>
                        <LibraryBooksIcon style={{ fontSize: 50 }} />
                        <p className="logo-name">ABIS</p>
                    </div>
                    <p className={`dashboard-option ${active === "profile" ? "clicked" : ""}`} onClick={() => handleSidebarClick("profile")}><AccountCircleIcon className='dashboard-option-icon' /> Профиль</p>
                    <p className={`dashboard-option ${active === "dashboard" ? "clicked" : ""}`} onClick={() => handleSidebarClick("dashboard")}><DashboardIcon className='dashboard-option-icon' /> Панель управления</p>
                    <p className={`dashboard-option ${active === "addbook" ? "clicked" : ""}`} onClick={() => handleSidebarClick("addbook")}><BookIcon className='dashboard-option-icon' />Добавить книгу</p>
                    <p className={`dashboard-option ${active === "addtransaction" ? "clicked" : ""}`} onClick={() => handleSidebarClick("addtransaction")}><ReceiptIcon className='dashboard-option-icon' /> Добавить транзакцию </p>
                    <p className={`dashboard-option ${active === "getmember" ? "clicked" : ""}`} onClick={() => handleSidebarClick("getmember")}><AccountBoxIcon className='dashboard-option-icon' /> Получить участника </p>
                    <p className={`dashboard-option ${active === "addmember" ? "clicked" : ""}`} onClick={() => handleSidebarClick("addmember")}><PersonAddIcon className='dashboard-option-icon' /> Добавить участника </p>
                    <p className={`dashboard-option ${active === "returntransaction" ? "clicked" : ""}`} onClick={() => handleSidebarClick("returntransaction")}><AssignmentReturnIcon className='dashboard-option-icon' /> Возврат </p>
                    <p className={`dashboard-option`} onClick={logout}><PowerSettingsNewIcon className='dashboard-option-icon' /> Выйти </p>
                </div>

                {/* Контент активного компонента */}
                <div className="dashboard-option-content">
                    {renderActiveComponent()}
                </div>
            </div>
        </div>
    );
}

export default EmployeeDashboard;
