import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Loading from "../components/Loading";

export default function SummaryPage() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCrewmates() {
  const { data, error } = await supabase.from("crewmates").select("*").order("created_at", { ascending: false });
  
  if (error) {
    console.error("Error:", error);
    setCrewmates([]);
  } else {
    setCrewmates(data || []);
  }
  
  setLoading(false);
  }

  useEffect(() => {
    fetchCrewmates();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="page-container">
      <h1 className="page-title">Crewmate Gallery</h1>
      <Link to="/create" className="create-btn">Create New Crewmate</Link>
      {crewmates.length === 0 ? (
        <div className="no-data">No crewmates yet. Create one!</div>
      ) : (
        <div className="crewmate-list">
          {crewmates.map((c) => (
            <div key={c.id} className="crewmate-card">
              <div className="card-top">
                <Link to={`/crewmates/${c.id}`} className="crewmate-name">{c.name}</Link>
                <div className="crewmate-date">{new Date(c.created_at).toLocaleString()}</div>
              </div>
              <div className="attributes">
                <span>Role: {c.attributes?.role}</span>
                <span>Power: {c.attributes?.power}</span>
                <span>Rarity: {c.attributes?.rarity}</span>
              </div>
              <div className="card-actions">
                <Link to={`/crewmates/${c.id}/edit`} className="edit-btn">Edit</Link>
                <Link to={`/crewmates/${c.id}`} className="details-btn">Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}