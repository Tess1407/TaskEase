import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // validace e-mailu
    if (!validateEmail(email)) {
      alert("Zadejte platný e-mail.");
      return;
    }

    // Validace délky hesla
    if (password.length < 6) {
      alert("Heslo musí mít alespoň 6 znaků.");
      return;
    }

    // Extrahovat username z e-mailu
    const username = extractUsername(email);

    
    const user = { username }; // Uživatel odvozený z e-mailu
    onLogin(user);
  };

  // Funkce pro validaci e-mailu
  const validateEmail = (email) => {
    // kontrola pomocí regulárního výrazu
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Funkce pro extrakci username z e-mailu
  const extractUsername = (email) => {
    // Extrahovat část před zavináčem jako username
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email; // Pokud není @, použijeme celý e-mail jako username
  };


  return (
    <div>
      <h1>TaskEase</h1>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Heslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Přihlásit se</button>
    </div>
  );
};

export default LoginForm;
