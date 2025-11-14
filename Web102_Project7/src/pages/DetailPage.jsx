import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Loading from "../components/Loading";

export default function DetailPage() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchCrewmate() {
  const { data, error } = await supabase.from("crewmates").select("*").eq("id", id).single();
  
  if (error) {
    console.error("Error:", error);
  } else {
    setCrewmate(data);
  }
  
  setLoading(false);
  }
    fetchCrewmate();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="page-container">
      <h1 className="page-title">{crewmate.name}</h1>
      <div className="details-card">
        <p><b>Role:</b> {crewmate.attributes?.role}</p>
        <p><b>Power:</b> {crewmate.attributes?.power}</p>
        <p><b>Rarity:</b> {crewmate.attributes?.rarity}</p>
        <p><b>Notes:</b> {crewmate.notes || "(none)"}</p>
      </div>
      <div className="form-buttons">
        <Link to={`/crewmates/${crewmate.id}/edit`} className="edit-btn">Edit</Link>
        <Link to="/" className="cancel-btn">Back</Link>
      </div>
    </div>
  );
}