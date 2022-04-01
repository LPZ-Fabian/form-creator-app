import React from "react";

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a
                            href="http://localhost:3000/manage-forms"
                            className="navbar-brand"
                        >
                            Form Creator Application
                        </a>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
