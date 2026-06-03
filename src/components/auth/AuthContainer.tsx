interface AuthContainerProps {
  title: string;
  error: string;
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export default function AuthContainer({
  title,
  error,
  isRegister,
  setIsRegister,
  onSubmit,
  children
}: AuthContainerProps) {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark">
    <div className="card bg-dark-subtle">
      <div className="card-body">
        
        {/* Título */}
        <h2 className="card-title text-center">
          {title}
        </h2>
        
        {error && (
          <div className="text-center py-2 mb-4 text-sm bg-danger text-light" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="d-flex flex-column gap-3">
            {children}
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 mt-4 fw-bold shadow-sm">
            {isRegister ? "Registrarme" : "Ingresar"}
          </button>
        </form>
      </div>

      {/* Sección de enlace inferior */}
      <div className="card-footer">
        {isRegister ? (
          <span>
            ¿Ya tenés cuenta?{" "}
            <button 
              onClick={() => setIsRegister(false)} 
              className="btn btn-link p-0 text-primary fw-semibold text-decoration-none align-baseline small"
            >
              Logueate
            </button>
          </span>
        ) : (
          <span>
            ¿No tenés cuenta?{" "}
            <button 
              onClick={() => setIsRegister(true)} 
              className="btn btn-link p-0 text-primary fw-semibold text-decoration-none align-baseline small"
            >
              Registrate
            </button>
          </span>
        )}
      </div>
    </div>
    </div>
  );
}