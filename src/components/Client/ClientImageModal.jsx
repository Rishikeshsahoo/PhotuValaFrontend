import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { handleShortlist } from "../Pin";
import { useStateContext } from "../../contexts/ContextProvider";
import right from "../../data/arrow-right-circle-fill.svg";
import left from "../../data/arrow-left-circle-fill.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
 
};

export default function BasicModal({
  base,
  dest,
  index,
  show,
  setShow,
  Data,
  setIndex,
}) {
  const handleClose = () => setShow(false);
  const { setToggle, currentUser } = useStateContext();
  console.log("curre", currentUser);
  console.log("re rendered", index);

  const handleRemove = (image, setToggle) => {
    const token = localStorage.getItem("token");
    console.log("image", image);
    axios
      .post(
        `${process.env.REACT_APP_LOCALHOST}/users/removeimage/`,
        { image: image },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        if (res.data.success) setToggle((prev) => !prev);
        setShow(false);
        toast("Image Removed from Shortlisted!")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography sx={{ textAlign:"center"}} variant="h6" component="h6"> {Data[index] && Data[index].fileName !== null ? Data[index].fileName : ""}</Typography>

          <div className="flex flex-row w-100 justify-center">
            <img
              style={{ width: "500px", height: "500px", objectFit: "contain" }}
              src={
                Data[index] && Data[index].url !== null ? Data[index].url : ""
              }
            />
          </div>
          <br />

          {base === "User" && dest === "All" ? (
            <div className="w-100 flex justify-center">
              {!currentUser.shortlisted.find((item) => {
                return item.url === Data[index].url;
              }) ? (
                <button
                  style={{ background: "green" }}
                  className="py-2 px-3 text-md text-white rounded-xl"
                  onClick={() => handleShortlist(Data[index], setToggle)}
                >
                  Add to shortlisted
                </button>
              ) : (
                ""
              )}

              <button
                style={{ background: "blue" }}
                className="py-2 px-3 text-md ml-3 text-white rounded-xl"
                onClick={() => setShow(false)}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="w-100 flex justify-center">
              <button
                style={{ background: "green" }}
                className="py-2 px-3 text-md text-white rounded-xl"
                onClick={() => handleRemove(Data[index], setToggle)}
              >
                Remove
              </button>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "10px 50px 0 50px",
            }}
          >
            <button
              class="buttons back"
              onClick={() => {
                setIndex((prev) => {
                  if (prev - 1 >= 0) return prev - 1;
                  else return prev;
                });
              }}
            >
              <img width={"70%"} src={left} />
            </button>
            <button
              class="buttons next"
              onClick={() => {
                setIndex((prev) => {
                  if (prev + 1 < Data.length) return prev + 1;
                  else return prev;
                });
              }}
            >
              <img width={"70%"} src={right} />
            </button>
          </div>
        </Box>
      </Modal>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
