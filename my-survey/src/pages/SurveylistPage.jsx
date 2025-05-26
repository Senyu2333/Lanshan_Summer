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
                    <li key={survey.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between border border-gray-200">
                             <div>
                             <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-pointer'>{survey.title}</h2>
                             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">创建人:{survey.creator}</p>
                             </div>
                        <div className="mt-4 flex space-x-2">
                        <button type='button' className="flex-1 px-3 py-1 border rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition" onClick={()=>navigate(`/write/${survey.id}`)}>查看</button>
                        <button type='button' className="flex-1 px-3 py-1 border rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition">删除</button>
                        <button type='button' className="flex-1 px-3 py-1 border rounded-lg text-sm text-green-600 hover:bg-green-50 dark:hover:bg-green-900 transition">结果</button>
                        </div>
                    </li>
                ))}
            </ul>
          </form>
      </div>
    );
}