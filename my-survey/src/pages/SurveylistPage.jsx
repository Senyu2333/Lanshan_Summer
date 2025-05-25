import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import Axios from 'axios'
import {useEffect} from 'react'
export default function ServeylistPage(){
    const [surveys, setSurvey] = useState([])
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
          <form>
            <ul>
                {surveys.map(survey=>(
                    <li key={survey.id}>
                        <h2>{survey.title}</h2>
                    </li>
                ))}
            </ul>
          </form>
      </div>
    );
}