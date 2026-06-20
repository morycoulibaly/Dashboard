import { useState } from "react";

function AddWidgetModal({ onAddWidget }) {
  const [serviceName, setServiceName] = useState("weather");
  const [city, setCity] = useState("");
  const [refreshRate, setRefreshRate] = useState("")

  const handleSubmit = () => {
    if (!city.trim()) return;
    onAddWidget(serviceName, city, refreshRate);
    setCity(""); 
  };

  return (
    <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-5">
      <select
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        className="h-10 w-36 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition-colors focus:border-indigo-500 focus:bg-white"
      >
        <option value="weather">Météo</option>
      </select>

      {serviceName === "weather" && (
        <input
          type="text"
          placeholder="Ville (ex : Abidjan)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={!city.trim()}
        className="h-10 shrink-0 rounded-lg bg-indigo-500 px-5 text-sm font-medium text-white transition-colors hover:bg-indigo-600 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-indigo-200"
      >
        + Ajouter
      </button>
    </div>
  );
}

export default AddWidgetModal;