import React from "react";

export default function Spinner() {
    return (
      <div className="text-center">
        <div className="spinner-border text-dark my-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
}
