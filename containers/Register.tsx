import type { NextPage } from "next";
import { useState } from "react";
import { executeRequest } from "../services/api";

type RegisterProps = {
    setToken(s: string): void,
    setComponent(s: boolean): void
}

export const Register: NextPage<RegisterProps> = ({setToken, setComponent}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const doRegister = async () => {
        try{
            setError('');
            if(!name || !email || !password){
                setError('Favor preencher os campos!');
                return
            }

            setLoading(true);

            const body = {
                name,
                email,
                password
            };

            const result = await executeRequest('user', 'post', body);
            if(result && result.data){
                const obj = result.data;
                console.log(obj);
                setComponent(false);
            }
             
            setComponent(false);
        }catch(e : any){
            console.log(`Erro ao efetuar cadastro: ${e}`);
            if(e?.response?.data?.error){
                setError(e.response.data.error);
            }else{
                setError(`Erro ao efetuar cadastro, tente novamente.`);
            }
        }

        setLoading(false);
    }

    
    const redirect = async () => {
        try{
            setError('');

            setLoading(true);

            setComponent(false);

        }catch(e : any){
            console.log(`Erro ao efetuar login: ${e}`);
            if(e?.response?.data?.error){
                setError(e.response.data.error);
            }else{
                setError(`Erro ao efetuar login, tente novamente.`);
            }
        }
        
        setLoading(false);
    }

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <div className="form">
                {error && <p className="error">{error}</p>}
                <div className="input">
                    <img src="/mail.svg" alt="Name Icone" />
                    <input type='text' placeholder="Name"
                        value={name}
                        onChange={evento => setName(evento.target.value)}
                    />
                </div>
                <div className="input">
                    <img src="/mail.svg" alt="Email Icone" />
                    <input type='text' placeholder="Email"
                        value={email}
                        onChange={evento => setEmail(evento.target.value)}
                    />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Senha Icone" />
                    <input type='password' placeholder="Senha"
                        value={password}
                        onChange={evento => setPassword(evento.target.value)}
                    />
                </div>
                <button onClick={doRegister} disabled={loading}>{loading ? '...Carregando': 'Register'}</button>
                <button onClick={redirect} disabled={loading}>{loading ? '...Carregando': 'Voltar'}</button>
          
            </div>
        </div>
    );
}