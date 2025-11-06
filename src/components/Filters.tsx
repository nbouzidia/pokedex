import { useEffect, useState } from "react";
import { fetchTypes } from "../services/api";
import "./Filtres.css";

interface FilterProps {
  onFilterChange: (name: string, types: number[]) => void;
  onLimitChange: (limit: number) => void;
}

export default function Filters({ onFilterChange, onLimitChange }: FilterProps) {
  const [name, setName] = useState("");
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [showTypes, setShowTypes] = useState(false);

  useEffect(() => {
    fetchTypes().then((res) => {
      const typesData = Array.isArray(res) ? res : res.data ?? [];
      setTypes(typesData);
    });
  }, []);

  const handleTypeChange = (id: number, checked: boolean) => {
    const updated = checked
      ? [...selected, id]
      : selected.filter((t) => t !== id);
    setSelected(updated);
    onFilterChange(name, updated);
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="🔍 Rechercher un Pokémon par nom..."
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          onFilterChange(e.target.value, selected);
        }}
      />
      
      <button 
        className="types-toggle-btn"
        onClick={() => setShowTypes(!showTypes)}
      >
        🏷️ Types {selected.length > 0 && `(${selected.length})`}
      </button>

      {showTypes && (
        <div className="types-container">
          {types.map((t) => (
            <label key={t.id} className={`type-checkbox ${selected.includes(t.id) ? 'active' : ''}`}>
              <input
                type="checkbox"
                checked={selected.includes(t.id)}
                onChange={(e) => handleTypeChange(t.id, e.target.checked)}
                style={{ display: 'none' }}
              />
              {t.name}
            </label>
          ))}
        </div>
      )}

      <select onChange={(e) => onLimitChange(Number(e.target.value))} defaultValue={50}>
        <option value={25}>25 par page</option>
        <option value={50}>50 par page</option>
        <option value={100}>100 par page</option>
      </select>
    </div>
  );
}
