import classNames from "@/utils/classNames";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faSearch,
  faXmark,
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
  faPenToSquare,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPencil,
  faSpinner,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faClock,
  faEye,
  faFilePdf,
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
          className={classNames("text-white text-lg", className)}
        />
      );

    case "Logout":
      return (
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Notification":
      return (
        <FontAwesomeIcon
          icon={faBell}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Close":
      return (
        <FontAwesomeIcon
          icon={faXmark}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Search":
      return (
        <FontAwesomeIcon
          icon={faSearch}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Profile":
      return (
        <FontAwesomeIcon
          icon={faUser}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Calendar":
      return (
        <FontAwesomeIcon
          icon={faCalendarDays}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Down":
      return (
        <FontAwesomeIcon
          icon={faChevronDown}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Check":
      return (
        <FontAwesomeIcon
          icon={faCheck}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Plus":
      return (
        <FontAwesomeIcon
          icon={faPlus}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Upload":
      return (
        <FontAwesomeIcon
          icon={faCloudArrowUp}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "File":
      return (
        <FontAwesomeIcon
          icon={faFilePdf}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Eye":
      return (
        <FontAwesomeIcon
          icon={faEye}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Users":
      return (
        <FontAwesomeIcon
          icon={faUserGroup}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Clock":
      return (
        <FontAwesomeIcon
          icon={faClock}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Edit":
      return (
        <FontAwesomeIcon
          icon={faPencil}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Delete":
      return (
        <FontAwesomeIcon
          icon={faTrashCan}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Loading":
      return (
        <FontAwesomeIcon
          icon={faSpinner}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Right":
      return (
        <FontAwesomeIcon
          icon={faChevronRight}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Left":
      return (
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={classNames("text-white text-lg", className)}
        />
      );
    case "Question":
      return (
        <FontAwesomeIcon
          icon={faQuestion}
          className={classNames("text-white text-lg", className)}
        />
      );

    case "Back":
      return (
        <FontAwesomeIcon
          icon={faCircleLeft}
          className={classNames("text-lg text-white", className)}
        />
      );
    case "Folder":
      return (
        <FontAwesomeIcon
          icon={faFolder}
          className={classNames("text-lg text-white", className)}
        />
      );
    case "NormalFile":
      return (
        <FontAwesomeIcon
          icon={faFile}
          className={classNames("text-lg text-white", className)}
        />
      );
    case "ThreeDots":
      return (
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className={classNames("text-lg text-white", className)}
        />
      );
    case "Locked":
      return (
        <FontAwesomeIcon
          icon={faLock}
          className={classNames("text-lg text-white", className)}
        />
      );
    case "Unlocked":
      return (
        <FontAwesomeIcon
          icon={faLockOpen}
          className={classNames("text-lg text-white", className)}
        />
      );
    case "Write":
      return (
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={classNames("text-lg text-white", className)}
        />
      );
    default:
      return (
        <FontAwesomeIcon
          icon={faPen}
          className={classNames("text-lg text-white", className)}
        />
      );
  }
}
