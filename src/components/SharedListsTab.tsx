import { CheckCircle } from 'lucide-react';
import type { ListResponse } from '../types';

interface SharedListsTabProps {
  sharedLists: ListResponse[];
  handleBuyItem: (itemId: number) => void;
}

export default function SharedListsTab({ sharedLists, handleBuyItem }: SharedListsTabProps) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-1 mt-4">
      {sharedLists.length === 0 ? <p className="text-gray-500 text-sm">Nadie ha compartido listas con vos todavía.</p> : null}
      {sharedLists.map(list => (
        <div key={list.id} className="col">
          <div className='card h-100 shadow-sm border-secondary-subtle'>
            <div className='card-body d-flex flex-column justify-content-between'>
              <div>
                <h3 className="card-title h5 fw-bold text-dark mb-1">{list.title}</h3>
                <p className="text-muted small mb-3">De: Usuario #{list.owner_id}</p>
                
                <div className="list-group list-group-flush mb-3">
                  {list.items.map(item => (
                    <div key={item.id} className={`list-group-item d-flex justify-content-between align-items-center ${item.is_bought ? 'bg-success' : 'bg-transparent'}`}>
                      <div>
                        <span className={`fw-medium ${item.is_bought ? 'text-light' : 'text-secondary'}`}>{item.name}. </span>
                        Precio: {item.price && <span className="text-muted ms-2">(${item.price})</span>}
                      </div>
                      
                      <div className="">
                        {item.link && <a href={item.link} target="_blank" className="btn btn-link btn-sm text-decoration-none">Link</a>}
                      </div>
                      <div>
                        {item.is_bought ? (
                          <span className="text-light text-xs font-semibold"><CheckCircle size={14} /> <span>Comprado</span></span>
                        ) : (
                          <button onClick={() => handleBuyItem(item.id)} className="btn btn-primary">Marcar Comprado</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}