
function EducationalPreview({resumeInfo}) {
  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2'
    style={{
        color:resumeInfo?.themeColor
    }}
    >Education</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    {resumeInfo?.Education.map((Education,index)=>(
        <div key={index} className='my-5'>
            <h2 className='text-sm font-bold'
                style={{
                    color:resumeInfo?.themeColor
                }}
            >{Education.universityName}</h2>
            <h2 className='text-xs flex justify-between'>{Education?.degree} in {Education?.major}
            <span>{Education?.startDate} - {Education?.endDate}</span>
            </h2>
            <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:Education?.description}} />
        </div>
    ))}

    </div>
  )
}

export default EducationalPreview