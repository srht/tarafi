import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

const CardButton = ({href,title,body,value,id}) => {
  const [onlineUser, setOnlineUser] = useState([]);
  
  useEffect(() => {
    supabase.auth.getSession().then(res=>{setOnlineUser(res.data.session.user.email); console.log(res.data.session.user.email) })

  }, []);

  const castVote=async (id, aid)=>{
    const { data, error } = await supabase.from('useranswers')
      .insert([{id:id,aid:aid,uid:onlineUser}])
      .select()
      if (error) {
        console.error(error);
      } 

      window.location="/side"
  }

  return (
    <a onClick={()=>castVote(id,value)} href={href} data-val={value}>
		<h2>
			{title}
			<span>&rarr;</span>
		</h2>
		<p>
			{body}
		</p>
	</a>
  );
};

export default CardButton;
