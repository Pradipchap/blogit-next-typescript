import classNames from "@/utils/classNames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faSearch,
  faArrowRightFromBracket,
  faCalendarDays,
  faChevronDown,
  faCloudArrowUp,
  faCheck,
  faPlus,
  faUserGroup,
  faChevronRight,
  faChevronLeft,
  faCircleLeft,
  faFolder,
  faFile,
  faEllipsisVertical,
  faLock,
  faLockOpen,
  faPen,
  faExclamation,
  faRightFromBracket,
  faBookOpen,
  faPencilSquare,
  faXmark,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faSpinner, faQuestion } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faClock,
  faComment,
  faEye,
  faEyeSlash,
  faFilePdf,
  faFloppyDisk,
  faHeart,
  faPenToSquare,
  faTrashCan,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = "" }: IconProps) {
  switch (name) {
    case "Dashboard":
      return (
        <FontAwesomeIcon
          icon={faGaugeHigh}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Thumb":
      return (
        <FontAwesomeIcon
          icon={faHeart}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "ThumbSolid":
      return (
        <FontAwesomeIcon
          icon={faHeartSolid}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Comment":
      return (
        <FontAwesomeIcon
          icon={faComment}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Logout":
      return (
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Notification":
      return (
        <FontAwesomeIcon
          icon={faBell}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Close":
      return (
        <FontAwesomeIcon
          icon={faXmark}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Search":
      return (
        <FontAwesomeIcon
          icon={faSearch}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Profile":
      return (
        <FontAwesomeIcon
          icon={faUser}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Calendar":
      return (
        <FontAwesomeIcon
          icon={faCalendarDays}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Down":
      return (
        <FontAwesomeIcon
          icon={faChevronDown}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Check":
      return (
        <FontAwesomeIcon
          icon={faCheck}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Plus":
      return (
        <FontAwesomeIcon
          icon={faPlus}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Upload":
      return (
        <FontAwesomeIcon
          icon={faCloudArrowUp}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "File":
      return (
        <FontAwesomeIcon
          icon={faFilePdf}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Eye":
      return (
        <FontAwesomeIcon
          icon={faEye}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Users":
      return (
        <FontAwesomeIcon
          icon={faUserGroup}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Clock":
      return (
        <FontAwesomeIcon
          icon={faClock}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Edit":
      return (
        <FontAwesomeIcon
          icon={faPencilSquare}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Delete":
      return (
        <FontAwesomeIcon
          icon={faTrashCan}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Loading":
      return (
        <FontAwesomeIcon
          icon={faSpinner}
          className={classNames("text-black text-lg animate-spin", className)}
        />
      );
    case "Right":
      return (
        <FontAwesomeIcon
          icon={faChevronRight}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Left":
      return (
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Question":
      return (
        <FontAwesomeIcon
          icon={faQuestion}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Back":
      return (
        <FontAwesomeIcon
          icon={faCircleLeft}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Folder":
      return (
        <FontAwesomeIcon
          icon={faFolder}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "NormalFile":
      return (
        <FontAwesomeIcon
          icon={faFile}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "ThreeDots":
      return (
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Locked":
      return (
        <FontAwesomeIcon
          icon={faLock}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Unlocked":
      return (
        <FontAwesomeIcon
          icon={faLockOpen}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Write":
      return (
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={classNames("text-lg text-black font-light", className)}
        />
      );
    case "Exclamation":
      return (
        <FontAwesomeIcon
          icon={faExclamation}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Loading":
      return (
        <FontAwesomeIcon
          icon={faSpinner}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Save":
      return (
        <FontAwesomeIcon
          icon={faFloppyDisk}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Exit":
      return (
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Blog":
      return (
        <FontAwesomeIcon
          icon={faBookOpen}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "EyeSlash":
      return (
        <FontAwesomeIcon
          icon={faEyeSlash}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Google":
      return (
        <FontAwesomeIcon
          icon={"google"}
          className={classNames("text-lg text-black", className)}
        />
      );
    default:
      return (
        <FontAwesomeIcon
          icon={faPen}
          className={classNames("text-lg text-black", className)}
        />
      );
  }
}
