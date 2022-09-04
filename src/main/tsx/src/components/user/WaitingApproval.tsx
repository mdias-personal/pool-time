import React from "react";

export const WaitingApproval = (props: { message: string }): JSX.Element => {
  return (
    <div>
      <p>{props.message}</p>
      <p>
        you still need to be approved, but someone should be looking into your
        request soon!
      </p>
    </div>
  );
};
