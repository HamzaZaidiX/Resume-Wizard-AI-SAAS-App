import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GlobalApi from '@/service/GlobalApi'
import { RWebShare } from 'react-web-share'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import { DownloadIcon, PencilRuler, Share2 } from 'lucide-react'
import { toast } from 'sonner'

function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState();
    const {resumeId}=useParams();
  const navigation = useNavigate();

    useEffect(() => {
        GetResumeInfo()
        toast('Now your resume is all set to download')

      })
    
      const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
          setResumeInfo(resp.data.data)
        })
      }

    const HandleDownload=()=>{
        window.print();
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
        <div id="no-print">
        <Header/>

        <div className='mx-10 my-10 md:mx-20 lg:mx-36'>
            <h2 className='text-2xl font-medium text-center'>
                Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url with your friends and family </p>
            <div className='flex justify-between my-10 px-44 hover:text-black'>
            <Button onClick={() =>
                navigation("/dashboard/resume/" + resumeId + "/edit")
              }>
             <PencilRuler className='w-4 h-5 mr-2'/> Edit
            </Button>
                <Button onClick={HandleDownload}><DownloadIcon  className='w-4 h-5 mr-2'/> Download</Button>
               
                <RWebShare
        data={{
          text: "Hello Everyone 👋, This is my resume please Click on the URL to See it",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
      > <Button><Share2 className='w-4 h-5 mr-2'/> Share</Button>
      </RWebShare>
            </div>
        </div>
            
        </div>
        <div className='mx-10 my-10 md:mx-20 lg:mx-36' style={{
        borderColor:resumeInfo?.themeColor
      }}>
        <div id="print-area" >
                <ResumePreview />
            </div>
            </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume