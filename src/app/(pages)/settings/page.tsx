"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

const Settings = () => {
  const { data: session } = useSession();
  const [deleteModal, isDeleteModal] = useState(false);

  const handleDeleteModal = () => {
    isDeleteModal(!deleteModal);
  };

  const deleteAccount = async (accountId: string) => {
    try {
      const response = await fetch(`/api/user/deleteAccount`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      });
      if (response.ok) {
        console.log("Account successfully deleted.");
        toast.success("Account successfully deleted", {
          position: "top-right",
          classNames: {
            title: "text-green-600",
            description: "text-green-600",
            success: "text-green-600",
          },
        });
        await signOut({ callbackUrl: "/" });
      } else {
        console.log("Failed to delete account.");
        toast.error("Failed to delete account", {
          position: "top-right",
          classNames: {
            title: "text-red-600",
            description: "text-red-600",
            error: "text-red-600",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred in deleting account.", {
        position: "top-right",
        classNames: {
          title: "text-red-600",
          description: "text-red-600",
          error: "text-red-600",
        },
      });
    }
  };

  const handleDelete = () => {
    if (session) {
      deleteAccount(session!.user.id);
    }
  };
  return (
    <>
      <div className="  flex flex-col h-auto bg-[#F8F7F4] text-[#071e22] ">
        <Navbar isLandingPage={false} />
        <div className="relative flex flex-row justify-start mx-4 my-4 ml-0">
          <div>
            <Sidebar />
          </div>
          <div className="flex flex-1 overflow-y-auto bg-[#e7e4da] rounded-lg ">
            <div className="content-component flex flex-col flex-1 text-[#071e22] h-auto min-w-[530px] px-4">
              <div className="card-component my-4 p-4 pt-3 rounded-md bg-[#F8F7F4] shadow ">
                <div className="flex font-bold text-2xl mb-2">
                  Delete Acount
                </div>
                <div className="text-sm text-gray-600">
                  Deleting your account will permanently remove all public and
                  private information associated to your profile.
                  {/* You must cancel your subscription before you can delete your account. */}
                </div>
                <button
                  className="mt-8 h-[40px] w-[200px] rounded border border-red-600 hover:bg-red-600 hover:text-white last:font-semibold text-sm text-red-600"
                  onClick={handleDeleteModal}
                  data-testid="delete-account"
                >
                  Delete my account
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {deleteModal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
            <div className="box-border border border-[#071e22] hover:border-[#3510bc] text-gray-900 bg-[#F8F7F4] p-8 rounded-md h-auto w-[450px]">
              <div className="text-md font-bold">
                You are about to delete your account.
              </div>
              <div className="mt-2 text-xs font-medium text-gray-700">
                Are you sure you want to delete your account? Please note that
                the account cannot be retrieved back after deletion.
              </div>
              <div className="flex flex-row mt-6 gap-4">
                <button
                  className={`w-full border  border-gray-200 bg-none text-sm text-gray-600 py-2 rounded-md hover:bg-gray-200 `}
                  onClick={handleDeleteModal}
                  data-testid="cancel"
                >
                  Cancel
                </button>
                <button
                  data-testid="proceed"
                  type="submit"
                  className={`w-full bg-red-600 text-sm text-white py-2 rounded-md hover:bg-red-700 `}
                  onClick={() => handleDelete()}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Settings;
