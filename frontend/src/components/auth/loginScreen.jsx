import React from "react";
import { Monitor } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

export const LoginScreen = ({ onLogin, onRegister, onGoogleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await onRegister(email, password, name);
      } else {
        await onLogin(email, password);
      }
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // busca informações do usuário no google
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          },
        );
        const userInfo = await userInfoResponse.json();
        await onGoogleLogin(userInfo);
      } catch (err) {
        setError("Erro ao fazer login com Google");
      }
    },
    onError: () => {
      setError("Erro ao fazer login com Google");
    },
  });

  return (
    <>
      <div>
        <img src="" alt="">
      </div>
    </>
  );
};
