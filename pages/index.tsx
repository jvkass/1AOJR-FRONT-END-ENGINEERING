import { Login } from "../containers/Login";
import { Home } from "../containers/Home";
import { Register } from "../containers/register"
import { useState, useEffect } from "react";

export default function Index() {

  const [token, setToken] = useState<string | null>('');
  const [component, setComponent] = useState<boolean | null>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const at = localStorage.getItem('accessToken');
      setToken(at);
    }
  }, []);
  
  if (component){
      return component ? <Register setToken={setToken} setComponent={setComponent}/> : <Login setToken={setToken} setComponent={setComponent}/>
  }
  
  return token ? <Home setToken={setToken}/> : <Login setToken={setToken} setComponent={setComponent}/>;
 }