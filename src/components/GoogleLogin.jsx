import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

const CardButton = ({href,title,body,value}) => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {

    supabase.auth.getSession().then(res=>console.log(res))
  }, []);

  const login=async ()=>{
    supabase.auth.signInWithOAuth({
      provider: 'google'
      })

      
  }

  return (
    <button onClick={login} id="login">Login</button>
  );
};

export default CardButton;
