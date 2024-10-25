
function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {resumeInfo?.Experience?.map((Experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                 style={{
                    color:resumeInfo?.themeColor
                }}>{Experience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{Experience?.companyName}, 
                {Experience?.city}, 
                {Experience?.state}
                <span>{Experience?.startDate} To {Experience?.currentlyWorking?'Present':Experience.endDate} </span>
                </h2>
                <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:Experience?.workSummery}} />
            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview