import bcrypt from "bcrypt";

interface props {}

export default async function getVerificationCode() {
  const x = Math.ceil((Math.random() + 0.1) * 1000000).toString();
  const verificationCode = x.slice(0, 6);
  const hashedCode = await bcrypt.hash(verificationCode.toString(), 10);

  return { verificationCode, hashedCode };
}
