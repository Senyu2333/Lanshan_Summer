import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import Axios from 'axios'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
export default function ServeylistPage(){
    const [surveys, setSurvey] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        Axios.get('http://localhost:3000/surveys')
            .then(res=>{
                setSurvey(res.data)
        })
            .catch(err=>{
                console.log(err)
            })
    },[])
    return (

      <div className="text-center">
          <Helmet>
              <title>问卷列表</title>
          </Helmet>
          <h1>问卷列表</h1>
          <button type={'button'} onClick={()=>navigate('/edit')}>创建问卷</button>
          <form>
            <ul>
                {surveys.map(survey=>(
                    <li key={survey.id}>
                        <h2 className='cursor-pointer'>{survey.title}      创建人:{survey.creator}</h2>
                    </li>
                ))}
            </ul>
          </form>
      </div>
    );
}