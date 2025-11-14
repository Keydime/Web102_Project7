import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import AttributeSelector from "../components/AttributeSelector";

export default function CreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [attributes, setAttributes] = useState({ role: "Scout", power: "Balanced", rarity: "Common" });

  async function handleSubmit(e) {
  e.preventDefault();
  
  if (!name.trim()) {
    alert("Please enter a name for your crewmate");
    return;
  }
  
  // Make sure attributes is a proper object, not an array
  const { data, error } = await supabase
    .from("crewmates")
    .insert([{ 
      name: name.trim(), 
      attributes: attributes,  // This should be an object like {role: "Scout", power: "High"}
      notes: notes.trim() || null 
    }])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating crewmate:", error);
    alert("Failed to create crewmate: " + error.message);
    return;
  }
  
  navigate(`/crewmates/${data.id}`);
}

  return (
    <div className="page-container">
      <h1 className="page-title">Create a Crewmate</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a name" />
        </label>

        <AttributeSelector name="Role" options={["Imposter", "Crewmate", "Engineer", "Sheriff"]} value={attributes.role} onChange={(v) => setAttributes((a) => ({ ...a, role: v }))} />
        <AttributeSelector name="Color" options={["Pink", "Blue", "Black", "Yellow", "Gray", "Green", "Red"]} value={attributes.power} onChange={(v) => setAttributes((a) => ({ ...a, power: v }))} />
        <AttributeSelector name="Speed" options={["Fast", "Balanced", "Slow"]} value={attributes.rarity} onChange={(v) => setAttributes((a) => ({ ...a, rarity: v }))} />

        <label>
          Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        <div className="form-buttons">
          <button type="submit">Create</button>
          <Link to="/" className="cancel-btn">Cancel</Link>
        </div>
      </form>
    </div>
  );
}