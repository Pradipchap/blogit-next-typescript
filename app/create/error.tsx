"use client";

export default function error({ error }: { error: Error }) {
  return <p>{error.message}</p>;
}
