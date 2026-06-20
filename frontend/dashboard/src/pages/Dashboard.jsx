import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import AddWidgetModal from "../components/AddWidgetModal";
import WidgetCard from "../components/WidgetCard";

function Dashboard() {
  const [widgets, setWidgets] = useState([]);
  const [username, setUsername] = useState("utilisateur");

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await api.get("/widget");
        setWidgets(response.data);
      } catch (error) {
        console.log("Erreur de récupération des widgets:", error);
      }
    };
    fetchWidgets();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/profile");
        setUsername(response.data.username);
      } catch (error) {
        console.log("Erreur de récupération du profil:", error);
      }
    };
    fetchProfile();
  }, []);

  const addWidget = async (serviceName, city) => {
    try {
      const response = await api.post("/widget", {
        serviceName,
        widgetName: city,
        config: { city },
        refreshRate: 60, 
      });
      setWidgets([...widgets, response.data]);
    } catch (error) {
      console.log("Erreur lors de l'ajout du widget:", error);
    }
  };

  const deleteWidget = async (id) => {
    try {
      await api.delete(`/widget/${id}`);
      setWidgets((wid) => wid.filter((w) => w._id !== id));
    } catch (error) {
      console.log("Erreur lors de la suppression du widget:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="border-b border-gray-200 bg-white">
        <Navbar />
      </div>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-9">
          <h1 className="text-[22px] font-semibold tracking-tight text-gray-900">
            Bienvenue sur votre dashboard, {username} !
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Suivez vos widgets en temps réel.
          </p>
        </div>

        <AddWidgetModal onAddWidget={addWidget} />

        {widgets.length > 0 && (
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            {widgets.length} widget{widgets.length > 1 ? "s" : ""} actif
            {widgets.length > 1 ? "s" : ""}
          </p>
        )}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {widgets.length === 0 ? (
            <div className="col-span-full py-12 text-center text-sm text-gray-400">
              Aucun widget — ajoutez-en un ci-dessus.
            </div>
          ) : (
            widgets.map((widget) => (
              <WidgetCard
                key={widget._id}
                widget={widget}
                onDelete={deleteWidget}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
