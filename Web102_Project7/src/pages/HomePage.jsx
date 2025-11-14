export default function HomePage() {
  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to the Crewmate Creator!</h1>
      <p className="home-subtitle">
        Here is where you can create your very own set of crewmates before sending them off into space!
      </p>
      
      <div className="home-image">
        <img 
          src="/Crewmate.png" 
          alt="Crewmates" 
          style={{ maxWidth: "600px", height: "auto" }}
        />
        </div>
    </div>
    );
}