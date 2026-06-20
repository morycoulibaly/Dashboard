import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

function WidgetCard({ widget, onDelete }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = useCallback(async () => {
    if (widget.serviceName === "weather" && widget.config?.city) {
      try {
        const res = await api.get(`/weather?city=${widget.config.city}`);
        setWeather(res.data);
      } catch (error) {
        console.error(`Erreur météo pour ${widget.config.city}:`, error);
      } finally {
        setLoading(false);
      }
    }
  }, [widget]);

  useEffect(() => {
    fetchWeather();

    const rateInSeconds = widget.refreshRate || 60;

    const timer = setInterval(() => {
      console.log(`Rafraîchissement automatique de : ${widget.widgetName}`);
      fetchWeather();
    }, rateInSeconds * 1000);

    return () => clearInterval(timer);
  }, [widget.refreshRate, widget.widgetName, fetchWeather]);

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500">
        {widget.serviceName}
      </span>
      <span className="text-lg font-semibold tracking-tight text-gray-900">
        {widget.widgetName}
      </span>
      
      {loading ? (
        <div className="mt-1 text-sm text-gray-400">Chargement...</div>
      ) : weather?.temperature !== undefined ? (
        <div className="mt-1 text-[32px] font-light tracking-tight text-gray-900">
          {weather.temperature}
          <span className="text-lg font-normal text-gray-500">°C</span>
        </div>
      ) : (
        <div className="mt-1 text-xl text-gray-200">—</div>
      )}

      <button
        onClick={() => onDelete(widget._id)}
        className="mt-3 self-start rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 transition-colors hover:border-red-200 hover:text-red-500"
      >
        Supprimer
      </button>
    </div>
  );
}

export default WidgetCard;