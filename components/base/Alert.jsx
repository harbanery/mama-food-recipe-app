import React, { useEffect, useState } from "react";
import { BiSolidCheckCircle, BiSolidError } from "react-icons/bi";
import Button from "./Button";
import { useSelector } from "react-redux";

const Alert = () => {
  const [visible, setVisible] = useState(true);
  const { alert, alertKey } = useSelector((state) => state.alert);

  useEffect(() => {
    if (alert.status !== "idle") {
      setVisible(true);
    }
  }, [alert.status, alert.message, alertKey]);

  if (!visible || alert.status == `idle`) return null;

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 min-[520px]:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-10 ${
        alert.status == "success" && `bg-[#36a430ca]`
      } ${
        alert.status == "failed" && `bg-[#c52424ca]`
      } text-white p-4 rounded-lg shadow-lg flex gap-4 items-center z-[999999] font-cereal`}
    >
      {alert.status === "success" && (
        <BiSolidCheckCircle className="text-4xl w-2/12" />
      )}
      {alert.status === "failed" && <BiSolidError className="text-4xl w-1/6" />}
      <div className="flex-grow w-1/2">{alert.message || `Message Alert`}</div>
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
