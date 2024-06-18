// src/app/auth/login.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí deberías implementar la lógica de autenticación
    // Esto puede incluir una llamada a una API de autenticación
    // Ejemplo:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // if (response.ok) {
    //   router.push('/dashboard');
    // }

    // Por ahora, redirigimos al dashboard al hacer login
    router.push("/dashboard");
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container-xl px-4">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                {/* <!-- Basic login form--> */}
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header justify-content-center">
                    <h3 className="fw-light my-4">Iniciar Sesión</h3>
                  </div>
                  <div className="card-body">
                    {/* <!-- Login form--> */}
                    <form onSubmit={handleSubmit}>
                      {/* <!-- Form Group (email address)--> */}
                      <div className="mb-3">
                        <label
                          className="small mb-1"
                          htmlFor="inputEmailAddress">
                          Correo
                        </label>
                        <input
                          className="form-control"
                          id="inputEmailAddress"
                          type="email"
                          placeholder="Ingrese su correo"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {/* <!-- Form Group (password)--> */}
                      <div className="mb-3">
                        <label className="small mb-1" htmlFor="inputPassword">
                          Contraseña
                        </label>
                        <input
                          className="form-control"
                          id="inputPassword"
                          type="password"
                          placeholder="Ingrese la contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {/* <!-- Form Group (login box)--> */}
                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a className="small" href="/auth/forgot-password">
                          ¿Olvisate tu contraseña?
                        </a>
                        <button className="btn btn-primary" type="submit">
                          Iniciar Sesion
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center">
                    <div className="small">
                      <a href="/auth/register">
                        ¿Necesitas una cuenta? Registrate!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
