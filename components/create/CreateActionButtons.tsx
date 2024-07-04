import Icon from "../Icon";
import PopupOver from "../popups/Popup";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { OutputData } from "@editorjs/editorjs";
import { useToast } from "@/custom_hooks/useToast";
import { BASE_URL } from "@/utils/constants";
interface props {
  editorSave: () => Promise<{ content: OutputData; title: string }>;
  isOwner: boolean;
  blogId?: string;
}

export default function CreateActionButtons({
  editorSave,
  isOwner,
  blogId,
}: props) {
  return (
    <div>
      <PopupOver
        content={
          <Content editorSave={editorSave} isOwner={isOwner} blogId={blogId} />
        }
      >
        <button className="hover:bg-gray-200 transition-all duration-300 rotate-90 rounded-full flex justify-center items-center px-2 py-1">
          {" "}
          <Icon name="ThreeDots" className="text-black" />
        </button>
      </PopupOver>
    </div>
  );
}

function Content({ editorSave, isOwner, blogId }: props) {
  const { showSuccess, showError, showLoading } = useToast();
  const router = useRouter();

  function ExitWithoutSaving() {
    sessionStorage.removeItem("editorContent");
    router.push("/");
  }

  async function deleteBlog() {
    showLoading("deleting");

    try {
      const response = await fetch(`${BASE_URL}/api/blogs/delete`, {
        method: "POST",
        body: JSON.stringify({ blogId }),
      });
      if (!response.ok) {
        throw new Error("Unsucessfull");
      }
      showSuccess("Blog deleted");
      sessionStorage.removeItem("editorContent");
      router.push("/");
    } catch (error) {
      //console.error("Error uploading blog:", error);
      showError("Blog delete unsuccessful");
    }
  }
  async function saveToDrafts() {
    const { content, title } = await editorSave();
    showLoading("drafts ");
    if (title === "") {
    }
    const data = new FormData();
    data.append("title", title);
    data.append("content", JSON.stringify(content));
    try {
      const response = await fetch(`${BASE_URL}/api/drafts/create`, {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Unsucessfull");
      }
      showSuccess("Blog uploaded to Drafts");
      sessionStorage.removeItem("editorContent");
      router.push("/");
    } catch (error) {
      //console.error("Error uploading blog:", error);
      showError("Blog upload unsuccessful");
    }
  }

  return (
    <div className="bg-white flex flex-col items-start w-max px-5 py-2 gap-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      {isOwner ? (
        <Button
          icon="Delete"
          iconClassName="text-red-600"
          className=" text-red-600 gap-3"
          onClick={deleteBlog}
        >
          Delete
        </Button>
      ) : (
        <>
          <Button
            icon="Save"
            iconClassName="text-black"
            className="text-black gap-3"
            onClick={saveToDrafts}
          >
            Save to Drafts
          </Button>
          <Button
            icon="Exit"
            iconClassName="text-red-600"
            className=" text-red-600 gap-3"
            onClick={ExitWithoutSaving}
          >
            Exit Without Saving
          </Button>
        </>
      )}
    </div>
  );
}
