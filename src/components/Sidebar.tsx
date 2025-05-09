import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Scheduling Assistant Call Results", path: "/" },
    { name: "Claim Status Call Results", path: "/outbound-calls" },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-sidebar-background text-sidebar-foreground shadow-lg">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-4">
          <img
            src="src/components/images/zinniax_logo.png"
            alt="App Logo"
            className="h-8 ml-10"
          />
          {/* <h1 className="text-xl font-bold">App Name</h1> */}
        </div>
      </div>
      <nav className="mt-4 p-2">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-6 py-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;