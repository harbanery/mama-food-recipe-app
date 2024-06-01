import React, { useEffect, useState } from "react";
import { BiSolidCheckCircle, BiSolidError } from "react-icons/bi";
import Button from "./Button";

const Alert = ({ status = "idle", message, count }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (status !== "idle") {
      setVisible(true);
    }
  }, [status, message, count]);

  if (!visible || status == `idle`) return null;

  return (
    <div
      className={`fixed top-0 right-0 w-1/5 m-10 ${
        status == "success" && `bg-[#36a430ca]`
      } ${
        status == "failed" && `bg-[#c52424ca]`
      } text-white p-4 rounded-lg shadow-lg flex gap-4 items-center z-[999999]`}
    >
      {status === "success" && (
        <BiSolidCheckCircle className="text-4xl w-2/12" />
      )}
      {status === "failed" && <BiSolidError className="text-4xl w-1/6" />}
      <div className="flex-grow w-1/2">{message || `Message Alert`}</div>
      <Button
        onClick={() => setVisible(false)}
        className="w-1/12 font-bold text-4xl"
      >
        &times;
      </Button>
    </div>
  );
};

export default Alert;
