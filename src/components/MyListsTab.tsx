import { Plus, Share2 } from 'lucide-react';
import type { ListResponse } from '../types';

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
}: MyListsTabProps) {
  return (
    <div className="container-fluid">
      <div className="row mb-5">
        <div className="col-12 col-md-8 col-lg-6 mt-4">
          <form onSubmit={handleCreateList} className="input-group">
            <input 
              type="text" 
              placeholder="Nombre de la nueva lista (ej: Regalos Cumple)..." 
              className="form-control form-control-lg" 
              value={newListTitle} 
              onChange={e => setNewListTitle(e.target.value)} 
            />
            <button type="submit" className="btn btn-primary d-flex align-items-center px-4">
              <Plus size={18} />
              <span>Crear</span>
            </button>
          </form>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {myLists.map(list => (
          <div key={list.id} className="col">
            <div className="card h-100 shadow-sm border-secondary-subtle">
              
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h3 className="card-title h5 fw-bold text-dark mb-1">{list.title}</h3>
                  <p className="text-muted small mb-3">ID de Lista: {list.id}</p>
                  
                  {/* Lista de Ítems */}
                  <div className="list-group list-group-flush mb-3">
                    {list.items.map(item => (
                      <div key={item.id} className="list-group-item px-0 d-flex justify-content-between align-items-center bg-transparent">
                        <div>
                          <span className="fw-medium text-secondary">{item.name}. </span>
                          Precio: {item.price && <span className="text-muted ms-2">(${item.price})</span>}
                        </div>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noreferrer" className="btn btn-link btn-sm p-0 text-decoration-none">
                            Link
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              
                {/* Acciones al pie de la tarjeta */}
                <div className="mt-auto pt-3 border-t">
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
              </div>
              <div className='card-footer'>
                <div className="input-group input-group-sm">
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
        ))}
      </div>
    </div>
  );
}