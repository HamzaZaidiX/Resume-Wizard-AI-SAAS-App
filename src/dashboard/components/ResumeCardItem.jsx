import { FileWarningIcon, Loader2Icon, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast("Resume Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      () => {
        setLoading(false);
      }
    );
  };
  return (
    <div
      className="hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed w-full hover:text-[#646cffaa] select-none"
    >
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4
        "
          style={{
            borderColor: resume?.themeColor,
          }}
        >
          <div
            className="flex 
        items-center justify-center w-full h-[180px] "
          >
            <img src="/cv.png" />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between overflow-hidden rounded-b-lg shadow-lg"
        style={{
          color: resume?.themeColor,
        }}
      >
        <div className="flex-col overflow-hidden ">
          <h2 className="text-center font-semibold truncate">{resume.title}</h2>
          <p className="text-xs text-gray-500 truncate">
            Created By {resume.userName}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {new Date(resume.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </p>
        </div>
        <DropdownMenu className="ml-2">
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume.documentId + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="flex space-between text-[#e43838]">
                <FileWarningIcon className="w-5 h-5 ml-5 animate-pulse" /> This
                action cannot be undone! This will permanently delete your
                Resume you created and remove your data from our servers!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
