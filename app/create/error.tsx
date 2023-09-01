"use client";
import React from "react";

export default function error({ error }: { error: Error }) {
  return <p>{error.message}</p>;
}
