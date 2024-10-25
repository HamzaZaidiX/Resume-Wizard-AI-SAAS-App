import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '@/service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
function Skills() {

    const [skillsList,setSkillsList]=useState([])
    const {resumeId}=useParams();
    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
   
    useEffect(() => {
        resumeInfo?.Skills.length > 0 &&
          setSkillsList(resumeInfo?.Skills);
      }, [resumeInfo?.Skills]);

    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
            rating:0 
        }])
    }

    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            Skills:skillsList
        })
    },[resumeInfo, setResumeInfo, skillsList])

    const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                Skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }
        console.log(setSkillsList, skillsList)
        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        },()=>{
            setLoading(false);
            toast('Server Error, Try again!')
        })
    }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Skills</h2>
    <p>Add Your top professional key skills</p>

    <div>
        {skillsList.map((item,index)=>(
            <div key={index} className='flex justify-between mb-2 border rounded-lg p-3 '>
                <div>
                    <label className='text-xs'>Name</label>
                    <Input className="w-full"
                    defaultValue={item.name}
                    onChange={(event) => handleChange(index, event)} />
                </div>
                <Rating style={{ maxWidth: 120 }} value={item.rating} 
                onChange={(event) => handleChange(index, event)} />

            </div>
        ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
            <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Skills