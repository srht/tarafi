import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

const Profile = ({href,title,body,value}) => {
  const [userAnswers, setUserAnswers] = useState([]);
  
  useEffect(() => {
    supabase.auth.getSession().then(async (res)=>{
      
      let { data: _userAnswers, error } = await supabase
      .from('answers')
      .select('*')
      .eq('uid',res.data.session.user.email)
    })

    setUserAnswers(_userAnswers)

  }, []);


  let template=
  <><Card
      href="javascript:;"
      title={answers&&answers[0].desc}
      body={answers&&answers[0].id}
      value={answers&&answers[0].id}
    />
    <Card
      href="javascript:;"
      title={answers&&answers[1].desc}
      body={answers&&answers[1].id}
      value={answers&&answers[1].id}
    />
    </>
  return (
    <ul role="list" class="link-card-grid">
    {userAnswers.map(ua=>template)}
  </ul>
  );
};

export default Profile;
