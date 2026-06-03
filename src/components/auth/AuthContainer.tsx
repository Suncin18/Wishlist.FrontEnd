interface AuthContainerProps {
  title: string;
  error: string;
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  loading: boolean;
}

export default function AuthContainer({
  title,
  error,
  isRegister,
  setIsRegister,
  onSubmit,
  children,
  loading
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

          <button 
            type="submit" 
            className="btn btn-primary btn-lg w-100 mt-4 fw-bold shadow-sm"
            disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm" role="status"></div>
                  <span>Espere un momento...</span>
                </>
              ) : (
                isRegister ? "Registrarme" : "Ingresar"
              )}
          </button>
        </form>
      </div>

      {/* Sección de enlace inferior */}
      <div className="card-footer">
        {isRegister ? (
          <span>
            ¿Ya tenés cuenta?{" "}
            <button 
              onClick={() => !loading && setIsRegister(false)} 
              className="btn btn-link p-0 text-primary fw-semibold text-decoration-none align-baseline small"
              disabled={loading}
            >
              Logueate
            </button>
          </span>
        ) : (
          <span>
            ¿No tenés cuenta?{" "}
            <button 
              onClick={() => !loading && setIsRegister(true)} 
              className="btn btn-link p-0 text-primary fw-semibold text-decoration-none align-baseline small"
              disabled={loading}
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