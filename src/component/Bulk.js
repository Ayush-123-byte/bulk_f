import React, { useContext, useEffect, useRef, useState } from "react";
import { whatsBulkContext } from "./Bulkcontext";
import Bulkitem from "./Bulkitem";
import { AiOutlinePauseCircle, AiOutlinePlaySquare } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";

import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import { useNavigate } from "react-router-dom";
// import Whatsbulkui from "./Whatsbulkui";

export default function Bulk(props) {
  const navigate = useNavigate();
  const context = useContext(whatsBulkContext);
  const { bulks, getBulk, editBulk } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getBulk();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const [bulk, setBulk] = useState({
    id: "",
    enumber: "",
    emessage: "",
    econtact: "",
    efile: "",
  });
  // const [hell,setHell]= useState("hii")
  const updateBulk = (currentBulk) => {
    ref.current.click();

    setShowModal(true);
    setBulk({
      id: currentBulk.id,
      enumber: currentBulk.number,
      emessage: currentBulk.message,
      econtact: currentBulk.contact,
      efile: currentBulk.file,
    });
  };

  const handleClick = (e) => {
    editBulk(bulk.id, bulk.enumber, bulk.emessage, bulk.econtact, bulk.efile);
    setShowModal(false);
    props.showAlert("Sucessfullly Edited your Bulk", "success");
    console.log("updating the bulk" + bulk);
  };
  const onChange = (e) => {
    setBulk({ ...bulk, [e.target.name]: e.target.value });
  };
  const [emoji, setEmoji] = useState(false);
  const handleEmoji = () => {
    setEmoji(!emoji);
  };

  return (
    <>
      <div>
        {/* <button
        ref={ref}
          onClick={() => {
            setShowModal(true);
          }}
          className=" btn btn-primary"
        >
          launch
        </button> */}
        {/* <!-- Modal --> */}
        <TEModal show={showModal} setShow={setShowModal}>
          <TEModalDialog>
            <TEModalContent>
              <TEModalHeader>
                {/* <!--Modal title--> */}
                <h5 className="text-2xl text-info leading-normal font-semibold  dark:text-neutral-200">
                  Update Bulk
                </h5>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </TEModalHeader>
              {/* <!--Modal body--> */}
              <TEModalBody>
                {/* <Whatsbulkui /> */}

                <div className="bulk m-auto  p-5 mb-20 rounded-md w-11/12 bg-white">
                  <p className=" text-4xl  text-center p-3 text-info rounded-md font-semibold ">
                    WhatBulk
                  </p>
                  <div className="txt pl-10  w-11/12  pt-4 ">
                    <div className="flex justify-between items-center">
                      <h2 className=" text-2xl text-info font-semibold">
                        Number
                      </h2>
                      <div className="ico flex pr-5 space-x-3 text-2xl text-info">
                        <AiOutlinePlaySquare />
                        <AiOutlinePauseCircle />
                      </div>
                    </div>

                    <textarea
                      name="enumber"
                      id="enumber"
                      onChange={onChange}
                      value={bulk.enumber}
                      minLength={5}
                      required
                      className=" flex border-2 rounded-md w-full"
                    ></textarea>

                    <button
                      type="button"
                      className="inline-block rounded bg-info mt-1 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-info-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-info-400 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Upload CSV
                    </button>
                  </div>
                  <div className="msg pl-10 w-11/12   pt-3">
                    <h2 className=" text-2xl text-info font-semibold">
                      Message
                    </h2>

                    <textarea
                      name="emessage"
                      id="emessage"
                      onChange={onChange}
                      value={bulk.emessage}
                      minLength={5}
                      required
                      className=" flex border-2 rounded-md w-full"
                    ></textarea>
                    <div className="emoji float-right">
                      <div
                        onClick={handleEmoji}
                        className=" hover:cursor-pointer  text-2xl"
                      >
                        😀
                      </div>
                      <div
                        className={`${
                          emoji ? "" : "hidden"
                        } absolute -translate-x-80`}
                      >
                        <EmojiPicker />
                      </div>
                    </div>
                  </div>
                  <div className="contact pl-10 w-11/12   pt-8">
                    <h2 className=" text-2xl text-info font-semibold">
                      Contact
                    </h2>
                    <textarea
                      name="econtact"
                      id="econtact"
                      onChange={onChange}
                      value={bulk.econtact}
                      className=" flex border-2 rounded-md w-full"
                      minLength={5}
                      required
                    ></textarea>
                  </div>

                  <div className="file pl-10 w-11/12  pt-3  ">
                    <h2 className=" text-2xl text-info font-semibold">file</h2>
                    <textarea
                      name="efile"
                      id="efile"
                      onChange={onChange}
                      value={bulk.efile}
                      minLength={5}
                      required
                      className=" flex border-2 rounded-md w-full"
                    ></textarea>
                  </div>
                </div>
              </TEModalBody>
              <TEModalFooter>
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  disabled={
                    bulk.enumber.length < 5 ||
                    bulk.emessage.length < 5 ||
                    bulk.econtact.length < 5 ||
                    bulk.efile.length < 5
                  }
                  onClick={handleClick}
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Save changes
                </button>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
      <div className="text-2xl text-info ml-20  ">
        <p className="text-4xl pb-8"> your Bulks</p>
        {bulks.length === 0 && "Nothing to display please Add the bulk"}
      </div>
      <div className="grid grid-cols-3 m-auto gap-4  w-11/12 ">
        {bulks.map((bulk) => (
          <Bulkitem
            key={bulk._id}
            bulk={bulk}
            updateBulk={updateBulk}
            showAlert={props.showAlert}
          />
        ))}
      </div>
    </>
  );
}