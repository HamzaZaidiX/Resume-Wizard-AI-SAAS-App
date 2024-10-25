import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';
import ResumePreview from '../../components/ResumePreview';

function EditResume() {
    const {resumeId}=useParams();
    const [resumeInfo,setResumeInfo]=useState();

    useEffect(() => {
        const GetResumeInfo = () => {
            GlobalApi.GetResumeById(resumeId).then(resp => {
                setResumeInfo(resp.data.data);
            });
        };

        GetResumeInfo();
    }, [resumeId]);
    

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section  */}
          <FormSection/>
        {/* Preview Section  */}
         <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume