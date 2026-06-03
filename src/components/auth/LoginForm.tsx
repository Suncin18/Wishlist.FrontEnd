import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  authForm: any;
  setAuthForm: (form: any) => void;
}

export default function LoginForm({ authForm, setAuthForm }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="col-8 d-flex">
          <input 
            type={showPassword ? "text" : "password"}
            required 
            className="form-control bg-dark-subtle border-secondary py-2" 
            value={authForm.password} 
            onChange={e => setAuthForm({...authForm, password: e.target.value})}
          />
          {/* Botón del ojo acoplado al input */}
            <button 
              type="button"
              className="btn btn-outline-secondary text-secondary border-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
      </div>
    </>
  );
}