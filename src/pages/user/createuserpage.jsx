import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { validateCreateUser } from '../../validator/validator';
import { Link } from 'react-router';
import axios from 'axios';

const CreateUserPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCreateUser = () => {
    const Error = validateCreateUser(user);
    if (Error) {
      console.log(Error);
      return;
    }

    const CreateUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      address: user.address,
      phone: user.phone
    }

    try{
      axios
        .post("https://solaris-backend.vercel.app/api/user/signup", CreateUser)
        .then((response) => {
          console.log(response.data.message);
          window.location.href = "/loginpage";
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
    catch(e){
      console.log(e);
    }


    console.log(CreateUser);
  }



  return (
    <div
      className="flex items-center justify-center p-15 font-Poppins"
    >
      <Card
        className="w-2/3
        min-w-[18rem]
        max-w-[24rem]"
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your details to Signup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-1 border-2 border-input rounded-md outline-none focus:border-accent placeholder:opacity-20"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
          <Input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-1 border-2 border-input rounded-md outline-none focus:border-accent placeholder:opacity-20"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border-2 border-input rounded-md outline-none focus:border-accent placeholder:opacity-20"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-foreground opacity-60 hover:opacity-100 focus:outline-none"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border-2 border-input rounded-md outline-none focus:border-accent placeholder:opacity-20"
              value={user.confirmPassword}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
              }}
            />
          </div>
          <Input
            type="text"
            placeholder="Enter Your Address "
            className="w-full px-4 py-1 border-2 border-input rounded-md outline-none focus:border-accent placeholder:opacity-20"
            value={user.address}
            onChange={(e) => {
              setUser({ ...user, address: e.target.value });
            }}
          />

          <Input
            type="text"
            placeholder="Phone Number"
            className="w-full px-4 py-1 border-2 border-input rounded-md outline-none focus:border-accent placeholder:opacity-20"
            value={user.phone}
            onChange={(e) => {
              setUser({ ...user, phone: e.target.value });
            }}
          />

          <div className="flex flex-col gap-2">
            <Link to={"/loginpage"} className="text-[10px] text-muted-foreground hover:underline">Already have an account ?</Link>

            <Button
              onClick={handleCreateUser}
            >Sign Up</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
};

export default CreateUserPage;
