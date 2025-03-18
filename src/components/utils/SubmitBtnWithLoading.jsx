import React from "react";

const SubmitBtnWithLoading = ({ classData, buttonText, isLoading }) => {
    return (
        <button
            type="submit"
            className={
                classData +
                `${isLoading == true ? ` bg-blue-300 cursor-not-allowed` : ``}`
            }
            disabled={isLoading}
        >
            {isLoading == true ? (
                <div className="flex content-center justify-center">
                    <div className="me-1 w-[25px] h-[25px] border-[6px] border-blue-200 border-t-[6px] border-t-blue-500 rounded-[50%] animate-spin inline-block"></div>
                    Please wait...{" "}
                </div>
            ) : (
                buttonText
            )}
        </button>
    );
};

export default SubmitBtnWithLoading;
