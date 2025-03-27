import React from "react";

type NeverToBeProps = {
  title: string;
};

const NeverToBe: React.FC<NeverToBeProps> = ({ title }) => {
  return <h2>You do not have any {title}</h2>;
};

export default NeverToBe;
