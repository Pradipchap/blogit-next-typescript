import React from "react";

export default function page({ params }: { params: { topic: string } }) {
  return <div>{params.topic}</div>;
}
