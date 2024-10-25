import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";

const formField = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([]);

  useEffect(() => {
    resumeInfo?.Education.length > 0 &&
      setEducationalList(resumeInfo?.Education);
  }, [resumeInfo?.Education]);

  const handleChange = (index, event) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Education: educationalList,
    });
  }, [educationalList, resumeInfo, setResumeInfo]);

  const onSave=()=>{
    setLoading(true)
    const data={
        data:{
            Education:educationalList.map(({ id, ...rest }) => rest)
        }
    }

     console.log(setEducationalList, educationalList)

    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
        console.log(res);
        setLoading(false);
        toast('Details updated !')
    },()=>{
        setLoading(false);
        toast('Server Error! Please Try Again!')
    })

}

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            {" "}
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
