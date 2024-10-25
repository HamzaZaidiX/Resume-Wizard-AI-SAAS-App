import GlobalApi from "../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import ResumeCardItem from "./components/ResumeCardItem";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = useCallback(() => {
    setIsLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        console.log(resp.data.data);
        setResumeList(resp.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => {
        toast('No Resumes Found! Please Create a New one!');
      });
  }, [user]);

  useEffect(() => {
    user && GetResumesList();
  }, [GetResumesList, user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="text-3xl font-bold">My Resume</h1>
      <p>Start creating your AI Resume to get your next job!</p>
      <div className="grid grid-cols-2 gap-5 mt-10 md:grid-cols-8 lg:grid-cols-5 ">
        <AddResume />
        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 h-[280px] rounded-lg bg-slate-200 animate-pulse">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className=""
              ></div>
            ))}
          </div>
        ) : resumeList && resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCardItem
              resume={resume}
              key={index}
              refreshData={GetResumesList}
            />
          ))
        ) : (
          <h2 className="text-center text-gray-500">No resumes found 😥 Please Create a New one Else Try Again!</h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;