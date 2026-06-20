import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmer, setConfirmer] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user", { username, email, password, confirmer });
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-6">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white px-8 py-9">
        <div className="mb-5">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">
            Créer un compte
          </h1>
          {/* <p className="mt-1 text-[13px] text-gray-500">
            Remplissez les champs pour vous inscrire.
          </p> */}
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-2.5">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white"
          />
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white"
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmer}
            onChange={(e) => setConfirmer(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white"
          />
          <button className="mt-1 h-10 w-full rounded-lg bg-indigo-500 text-sm font-medium text-white transition-colors hover:bg-indigo-600 active:scale-[0.98]">
            S'inscrire
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-gray-500">
          Déjà un compte ?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-500 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;