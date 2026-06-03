import { useState, useEffect } from 'react';
import { api } from './api';
import type { ListResponse } from './types';

// Importación de los nuevos subcomponentes
import Navbar from './components/Navbar';
import { AuthContainer, LoginForm, RegisterForm } from './components/auth';
import MyListsTab from './components/MyListsTab';
import SharedListsTab from './components/SharedListsTab';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isRegister, setIsRegister] = useState(false);
  const [activeTab, setActiveTab] = useState<"my" | "shared">("my");
  const [error, setError] = useState("");

  // Form States
  const [authForm, setAuthForm] = useState({ email: "", password: "", confirmedPassword: "", name: "", gender: "Male", age: 18 });
  const [newListTitle, setNewListTitle] = useState("");
  const [newItem, setNewItem] = useState({ name: "", link: "", price: "" });
  const [shareEmail, setShareEmail] = useState<{ [key: number]: string }>({});

  // Data States
  const [myLists, setMyLists] = useState<ListResponse[]>([]);
  const [sharedLists, setSharedLists] = useState<ListResponse[]>([]);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  // Loader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token, activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === "my") {
        const data = await api.getMyLists();
        setMyLists(data);
      } else {
        const data = await api.getSharedLists();
        setSharedLists(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        if (authForm.password !== authForm.confirmedPassword) {
          setError("Las contraseñas no coinciden. Por favor, verificalas.");
          return;
        }

        setLoading(true);
        await api.register(authForm);
        alert("Usuario registrado. Ya podés iniciar sesión.");
        setIsRegister(false);
      } else {
        setLoading(true);
        await api.login(authForm.email, authForm.password);
        setToken(localStorage.getItem("token"));
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMyLists([]);
    setSharedLists([]);
  };

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    await api.createList(newListTitle);
    setNewListTitle("");
    loadData();
  };

  const handleAddItem = async (listId: number) => {
    if (!newItem.name.trim()) return;
    try {
      await api.addItem(listId, {
        name: newItem.name,
        link: newItem.link || undefined,
        price: newItem.price ? parseFloat(newItem.price) : undefined
      });
      setNewItem({ name: "", link: "", price: "" });
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleShareList = async (listId: number) => {
    const email = shareEmail[listId];
    if (!email) return;
    try {
      await api.shareList(listId, email);
      alert("¡Lista compartida con éxito!");
      setShareEmail(prev => ({ ...prev, [listId]: "" }));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleBuyItem = async (itemId: number) => {
    await api.buyItem(itemId);
    loadData();
  };

// Render condicional si no hay inicio de sesión
  if (!token) {
    return (
      <AuthContainer
        title={isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
        error={error}
        isRegister={isRegister}
        setIsRegister={setIsRegister}
        onSubmit={handleAuth}
        loading={loading}
      >
        {isRegister ? (
          <RegisterForm authForm={authForm} setAuthForm={setAuthForm} />
        ) : (
          <LoginForm authForm={authForm} setAuthForm={setAuthForm} />
        )}
      </AuthContainer>
    );
  }

  return (
    <div className="container-fluid">
      <Navbar onLogout={handleLogout} />

      {/* Main Container */}
      <div className="mt-4">
        {/* Pestañas */}
        <div className="">
          <button onClick={() => setActiveTab("my")} className={`px-4 mx-3 py-2 ${activeTab === "my" ? "bg-primary-subtle" : "bg-light"}`}>
            Mis Listas de Deseos
          </button>
          <button onClick={() => setActiveTab("shared")} className={`px-4 mx-3 py-2 ${activeTab === "shared" ? "bg-primary-subtle" : "bg-light"}`}>
            Listas Compartidas Conmigo
          </button>
        </div>

        {/* Contenido Dinámico según la Pestaña Activa */}
        {activeTab === "my" ? (
          <MyListsTab 
            myLists={myLists}
            newListTitle={newListTitle}
            setNewListTitle={setNewListTitle}
            handleCreateList={handleCreateList}
            selectedListId={selectedListId}
            setSelectedListId={setSelectedListId}
            newItem={newItem}
            setNewItem={setNewItem}
            handleAddItem={handleAddItem}
            shareEmail={shareEmail}
            setShareEmail={setShareEmail}
            handleShareList={handleShareList}
          />
        ) : (
          <SharedListsTab 
            sharedLists={sharedLists}
            handleBuyItem={handleBuyItem}
          />
        )}
      </div>
    </div>
  );
}