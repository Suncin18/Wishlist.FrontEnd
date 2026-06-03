import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface RegisterFormProps {
  authForm: any;
  setAuthForm: (form: any) => void;
}

export default function RegisterForm({ authForm, setAuthForm }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      {/* Fila Nombre */}
      <div className="row align-items-center">
        <label className="col-4 col-form-label fw-semibold text-secondary">Nombre</label>
        <div className="col-8">
          <input type="text" required className="form-control bg-dark-subtle border-secondary py-2" value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} />
        </div>
      </div>

      {/* Fila Género */}
      <div className="row align-items-center">
        <label className="col-4 col-form-label fw-semibold text-secondary">Género</label>
        <div className="col-8">
          <select className="form-control bg-dark-subtle border-secondary py-2" value={authForm.gender} onChange={e => setAuthForm({...authForm, gender: e.target.value})}>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Other">Otro</option>
          </select>
        </div>
      </div>

      {/* Fila Edad */}
      <div className="row align-items-center">
        <label className="col-4 col-form-label fw-semibold text-secondary">Edad</label>
        <div className="col-8">
          <input type="number" required className="form-control bg-dark-subtle border-secondary py-2" value={authForm.age} onChange={e => setAuthForm({...authForm, age: parseInt(e.target.value) || 18})} />
        </div>
      </div>

      {/* Fila Email */}
      <div className="row align-items-center">
        <label className="col-4 col-form-label fw-semibold text-secondary">Email</label>
        <div className="col-8">
          <input type="email" required className="form-control bg-dark-subtle border-secondary py-2" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} />
        </div>
      </div>

      {/* Fila Contraseña */}
      <div className="row align-items-center">
        <label className="col-4 col-form-label fw-semibold text-secondary">Contraseña</label>
        <div className="col-8 d-flex">
          <input type={showPassword ? "text" : "password"}
           required className="form-control bg-dark-subtle border-secondary py-2" 
           value={authForm.password} 
           onChange={e => setAuthForm({...authForm, password: e.target.value})} />

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

      <div className="row align-items-center">
        <label className="col-4 col-form-label fw-semibold text-secondary">Repetir Contraseña</label>
        <div className="col-8 d-flex">
          <input type={showConfirmPassword ? "text" : "password"} 
          required className="form-control bg-dark-subtle border-secondary py-2" 
          value={authForm.confirmedPassword} 
          onChange={e => setAuthForm({...authForm, confirmedPassword: e.target.value})} />

          {/* Botón del ojo acoplado al input */}
            <button 
              type="button"
              className="btn btn-outline-secondary text-secondary border-secondary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
      </div>
    </>
  );
}