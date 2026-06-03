import { Plus, Share2 } from 'lucide-react';
import type { ListResponse } from '../types';
import { useState } from 'react';

interface MyListsTabProps {
  myLists: ListResponse[];
  newListTitle: string;
  setNewListTitle: (value: string) => void;
  handleCreateList: (e: React.FormEvent) => void;
  selectedListId: number | null;
  setSelectedListId: (id: number | null) => void;
  newItem: any;
  setNewItem: (item: any) => void;
  handleAddItem: (listId: number) => void;
  shareEmail: { [key: number]: string };
  setShareEmail: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  handleShareList: (listId: number) => void;
  // 🟢 Agregados a la interfaz para resolver el error de tipado:
  handleRemoveShare: (listId: number, shareId: number) => void;
  handleRemoveAllShares: (listId: number) => void;
}

export default function MyListsTab({
  myLists,
  newListTitle,
  setNewListTitle,
  handleCreateList,
  selectedListId,
  setSelectedListId,
  newItem,
  setNewItem,
  handleAddItem,
  shareEmail,
  setShareEmail,
  handleShareList,
  // 🟢 Recibimos las nuevas funciones controladoras
  handleRemoveShare,
  handleRemoveAllShares,
}: MyListsTabProps) {

  const [myListsFilter, setMyListsFilter] = useState<"all" | "shared" | "private">("all");
  
  const filteredMyLists = myLists.filter((list) => {
    const isShared = list.shares && list.shares.length > 0;

    if (myListsFilter === "shared") return isShared;
    if (myListsFilter === "private") return !isShared;
    
    return true;
  });

  const hasBoughtItems = (list: ListResponse) => {
    return list.items && list.items.some(item => item.is_bought);
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleCreateList} className="row g-2 max-w-md mx-auto my-3">
        <div className="col-12 col-md-6">
          <input 
            type="text" 
            placeholder="Nombre de la nueva lista (ej: Regalos Aniversario)" 
            className="form-control form-control-lg" 
            value={newListTitle} 
            onChange={e => setNewListTitle(e.target.value)} 
          />
        </div>
        <div className="col-12 col-md-6">
          <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center w-100 py-2 fw-medium">
            <Plus size={18} />
            <span>Crear</span>
          </button>
        </div>
      </form>

      {/* Filtros sutiles estilo pastilla */}
      <div className="btn-group btn-group-sm mb-3" role="group">
        <button 
          onClick={() => setMyListsFilter("all")} 
          className={`btn ${myListsFilter === "all" ? "btn-info text-white" : "btn-outline-info"}`}
        >
          Todas
        </button>
        <button 
          onClick={() => setMyListsFilter("shared")} 
          className={`btn ${myListsFilter === "shared" ? "btn-info text-white" : "btn-outline-info"}`}
        >
          Compartidas
        </button>
        <button 
          onClick={() => setMyListsFilter("private")} 
          className={`btn ${myListsFilter === "private" ? "btn-info text-white" : "btn-outline-info"}`}
        >
          Privadas
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {filteredMyLists.map(list => {
          const isLocked = hasBoughtItems(list);
          const shareCount = list.shares ? list.shares.length : 0;

          return (
            <div key={list.id} className="col my-2">
              <div className="card h-100 shadow-sm border-secondary-subtle">
                
                <div className="card-body">
                  <div>
                    <h3 className="card-title h5 fw-bold text-dark mb-1">{list.title}</h3>
                    <p className="text-muted small mb-3">ID de Lista: {list.id}</p>
                    
                    {/* Botón para activar el colapsable */}
                    <div className="mb-3">
                      <button 
                        className="btn btn-link btn-sm p-0 text-decoration-none text-muted small"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseShares-${list.id}`}
                        aria-expanded="false"
                      >
                        👥 Compartida con {shareCount} {shareCount === 1 ? 'persona' : 'personas'}
                      </button>
                    </div>

                    {/* Contenedor Colapsable de Bootstrap */}
                    <div className="collapse mb-3" id={`collapseShares-${list.id}`}>
                      <div className="card card-body bg-light p-2 border-0 rounded-3">
                        
                        {/* Aviso visual si está bloqueada por artículos comprados */}
                        {isLocked && shareCount > 0 && (
                          <div className="alert alert-warning py-1 px-2 mb-2 border-0 rounded" style={{ fontSize: '0.75rem' }}>
                            🔒 Bloqueado: Hay artículos comprados en la lista.
                          </div>
                        )}

                        {shareCount === 0 ? (
                          <p className="text-muted text-center small mb-0 py-1">Esta lista es privada.</p>
                        ) : (
                          <ul className="list-group list-group-flush bg-transparent mb-0">
                            {list.shares.map(share => (
                              <div 
                                key={share.id} 
                                className="list-group-item bg-transparent d-flex justify-content-between align-items-center p-1 border-0"
                              >
                                <span className="small text-secondary">Usuario #{share.shared_with_user_id}</span>
                                
                                {/* CONDICIONAL: Solo muestra el botón si NO hay artículos comprados */}
                                {!isLocked && (
                                  <button 
                                    onClick={() => handleRemoveShare(list.id, share.id)} 
                                    className="btn btn-link btn-sm p-0 text-danger text-decoration-none"
                                    title="Quitar acceso"
                                  >
                                    Eliminar
                                  </button>
                                )}
                              </div>
                            ))}
                          </ul>
                        )}

                        {/* Botón masivo: Solo se muestra si hay accesos y NO está bloqueado */}
                        {shareCount > 0 && !isLocked && (
                          <button 
                            onClick={() => handleRemoveAllShares(list.id)}
                            className="btn btn-outline-danger btn-sm w-100 mt-2 fw-semibold"
                            style={{ fontSize: '0.8rem' }}
                          >
                            Dejar de compartir con todos
                          </button>
                        )}
                        
                      </div>
                    </div>

                    {/* Lista de Ítems */}
                    <div className="list-group list-group-flush mb-3">
                      {list.items.map(item => (
                        <div key={item.id} className="list-group-item bg-transparent px-0">
                          <div>
                            <span className="fw-medium text-secondary">{item.name}</span>
                          </div>
                          <div>
                            {item.price 
                            ? <span className="text-muted small">Precio: ₡{item.price}</span> 
                            : <span className="text-muted small">Precio: N/A</span>}
                          </div>
                          {item.link && (
                            <a href={item.link} target="_blank" rel="noreferrer" className="btn btn-link btn-sm p-0 text-decoration-none small">
                              Link
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="card-footer bg-transparent border-0 mt-auto">
                  {/* Acciones al pie de la tarjeta */}
                  <div className="pt-2">
                    <button 
                      onClick={() => setSelectedListId(selectedListId === list.id ? null : list.id)} 
                      className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-1 mb-3"
                    >
                      <Plus size={14} />
                      <span>{selectedListId === list.id ? "Cerrar Formulario" : "Agregar Ítem"}</span>
                    </button>

                    {/* Formulario desplegable interno limpio con Bootstrap */}
                    {selectedListId === list.id && (
                      <div className="p-3 bg-light rounded-3 mb-3 border d-flex flex-column gap-2">
                        <input type="text" placeholder="Artículo..." className="form-control form-control-sm" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                        <input type="text" placeholder="Link (Opcional)..." className="form-control form-control-sm" value={newItem.link} onChange={e => setNewItem({...newItem, link: e.target.value})} />
                        <input type="number" placeholder="Precio (Opcional)..." className="form-control form-control-sm" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                        <button onClick={() => handleAddItem(list.id)} className="btn btn-primary btn-sm w-100 fw-semibold">Guardar Artículo</button>
                      </div>
                    )}
                  </div>
                  <div className="input-group input-group-sm mb-2">
                    <input 
                      type="email" 
                      placeholder="Email amigo..." 
                      className="form-control" 
                      value={shareEmail[list.id] || ""} 
                      onChange={e => setShareEmail({...shareEmail, [list.id]: e.target.value})} 
                    />
                    <button onClick={() => handleShareList(list.id)} className="btn btn-success d-flex align-items-center px-3" type="button">
                      <Share2 size={12} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}