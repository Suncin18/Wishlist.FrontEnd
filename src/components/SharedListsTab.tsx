import type { ListResponse } from '../types';

interface SharedListsTabProps {
  sharedLists: ListResponse[];
  handleBuyItem: (itemId: number) => void;
}

export default function SharedListsTab({ sharedLists, handleBuyItem }: SharedListsTabProps) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-1 my-3">
      {sharedLists.length === 0 ? <p className="text-gray-500 text-sm">Nadie ha compartido listas con vos todavía.</p> : null}
      {sharedLists.map(list => (
        <div key={list.id} className="col my-2">
          <div className='card h-100 shadow-sm border-secondary-subtle'>
            <div className='card-body d-flex flex-column justify-content-between'>
              <div>
                <h3 className="card-title h5 fw-bold text-dark mb-1">{list.title}</h3>
                <p className="text-muted small mb-3">De: Usuario #{list.owner_id}</p>
                
                <div className="list-group list-group-flush mb-3">
                  {list.items.map(item => (
                    <div key={item.id} className={`list-group-item ${item.is_bought ? 'bg-success' : 'bg-secondary-subtle'}`}>
                      <div>
                        <span className={`fw-medium ${item.is_bought ? 'text-light' : 'text-secondary'}`}>{item.name}</span>
                      </div>
                      <div>
                        <span className={`${item.is_bought ? 'text-white' : 'text-muted'}`}>Precio: {item.price ? `₡${item.price}` : `N/A`}</span> 
                      </div>
                      <div className="">
                        {item.link && (
                          <a href={item.link} target="_blank" 
                            className={`btn-link btn-sm text-decoration-none ${item.is_bought ? 'text-white text-decoration-underline' : ''}`}
                          >Link</a>
                        )}
                      </div>
                      
                      <div className="w-100 mt-2">
                        <button 
                          onClick={() => handleBuyItem(item.id)} 
                          className={`btn btn-sm w-100 ${item.is_bought 
                            ? `btn-success` 
                            : `btn-primary`}`}>
                          {item.is_bought ? `Comprado (Click para desmarcar)` : `Marcar Comprado`}
                        </button>
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