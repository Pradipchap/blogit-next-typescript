import Button from "@/components/Button";
import Checkbox from "@/components/Inputs/Checkbox";
import CustomInput from "@/components/Inputs/CustomInput";
import OrDivider from "@/components/OrDivider";
import Link from "next/link";

export default function Page() {
  async function handleLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmpassword = formData.get("confirmpassword");
    const rememberme = formData.get("rememberme");
  }

  return (
    <form
      action={handleLogin}
      className="m-auto w-[450px] bg-slate-50 gap-1 flex flex-col p-5"
    >
      <p className="font-bold text-xl py-5">Login </p>
      <CustomInput label="Email or Username" name="email" type="text" />
      <CustomInput label="Password" type="password" name="password" />
      <CustomInput
        label="Confirm Password"
        type="password"
        name="confirmpassword"
      />
      <div className="w-full flex justify-between items-center">
        <Checkbox label="Remember me" name="rememberme" />
        <Link href="/" className="hover:underline text-sm text-green-700">
          Forgot password ?
        </Link>
      </div>
      <Button className="bg-blue-800 text-white mt-5">Login</Button>
      <OrDivider />
      <Button className="bg-white text-black border" icon="Google">
        Login with Google
      </Button>
    </form>
  );
}
