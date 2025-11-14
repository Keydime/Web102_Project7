import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AttributeSelector from "../components/AttributeSelector";
import Loading from "../components/Loading";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      setCrewmate(data);
      setLoading(false);
    }
    fetchCrewmate();
  }, [id]);

  if (loading) return <Loading />;

  async function handleSave(e) {
    e.preventDefault();
    const { error } = await supabase.from("crewmates").update({name: crewmate.name, notes: crewmate.notes, attributes: crewmate.attributes}).eq("id", id);
    if (error) {
      console.error("Error:", error);
      alert("Failed to save changes");
      return;
    }
    navigate(`/crewmates/${id}`);
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this crewmate?")) {
      const { error } = await supabase.from("crewmates").delete().eq("id", id);
      if (error) {
        console.error("Error:", error);
        alert("Failed to delete crewmate");
        return;
      }
      navigate("/");
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Edit Crewmate</h1>
      <form onSubmit={handleSave} className="form">
        <label>
          Name
          <input value={crewmate.name} onChange={(e) => setCrewmate((c) => ({ ...c, name: e.target.value }))} />
        </label>

        <AttributeSelector name="Role" options={["Scout", "Defender", "Striker", "Support"]} value={crewmate.attributes.role} onChange={(v) => setCrewmate((c) => ({ ...c, attributes: { ...c.attributes, role: v } }))} />
        <AttributeSelector name="Power" options={["High", "Balanced", "Low"]} value={crewmate.attributes.power} onChange={(v) => setCrewmate((c) => ({ ...c, attributes: { ...c.attributes, power: v } }))} />
        <AttributeSelector name="Rarity" options={["Common", "Uncommon", "Rare", "Legendary"]} value={crewmate.attributes.rarity} onChange={(v) => setCrewmate((c) => ({ ...c, attributes: { ...c.attributes, rarity: v } }))} />

        <label>
          Notes
          <textarea value={crewmate.notes || ""} onChange={(e) => setCrewmate((c) => ({ ...c, notes: e.target.value }))} />
        </label>

        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleDelete} className="delete-btn">Delete</button>
          <Link to={`/crewmates/${id}`} className="cancel-btn">Cancel</Link>
        </div>
      </form>
    </div>
  );
}