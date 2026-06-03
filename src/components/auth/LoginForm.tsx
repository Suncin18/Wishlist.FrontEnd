interface LoginFormProps {
  authForm: any;
  setAuthForm: (form: any) => void;
}

export default function LoginForm({ authForm, setAuthForm }: LoginFormProps) {
  return (
    <>
      <div className="row align-items-center">
        <label className="col-4 col-form-label fw-semibold text-secondary">Email</label>
        <div className="col-8">
          <input 
            type="email" 
            required 
            className="form-control bg-dark-subtle border-secondary py-2" 
            value={authForm.email} 
            onChange={e => setAuthForm({...authForm, email: e.target.value})} 
          />
        </div>
      </div>

      {/* Fila Contraseña */}
      <div className="row align-items-center">
        <label className="col-4 col-form-label fw-semibold text-secondary">Contraseña</label>
        <div className="col-8">
          <input 
            type="password" 
            required 
            className="form-control bg-dark-subtle border-secondary py-2" 
            value={authForm.password} 
            onChange={e => setAuthForm({...authForm, password: e.target.value})} 
          />
        </div>
      </div>
    </>
  );
}