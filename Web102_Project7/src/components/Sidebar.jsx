import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <Link 
          to="/" 
          className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        
        <Link 
          to="/create" 
          className={`sidebar-link ${location.pathname === "/create" ? "active" : ""}`}
        >
          Create a Crewmate!
        </Link>
        
        <Link 
          to="/gallery" 
          className={`sidebar-link ${location.pathname === "/gallery" ? "active" : ""}`}
        >
          Crewmate Gallery
        </Link>
      </div>
      
      <div className="sidebar-footer">
        <img 
          src="https://raw.githubusercontent.com/github/explore/main/topics/among-us/among-us.png" 
          alt="Among Us" 
          className="sidebar-icon"
        />
      </div>
    </aside>
  );
}