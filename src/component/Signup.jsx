import { Link } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../data/firebase-config";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Signup() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   let navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
         alert("비밀번호가 일치하지 않습니다!!");
         return;
      }
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         navigate("/");
      } catch (error) {
         alert("회원가입에 실패하였습니다. 사유 : " + error.message);
         setPassword("");
         setConfirmPassword("");
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 bg-[url('./assets/bg_repeat.png')] bg-repeat  dark:bg-gray-800">
            <div className="w-full max-w-sm md:max-w-2xl bg-white shadow border border-blue-300 p-10 flex flex-col gap-10  dark:bg-gray-300">
               <h2 className="text-lg md:text-2xl font-semibold text-gray-800 text-center">
                  회원가입
               </h2>
               <div>
                  <label
                     htmlFor="email"
                     className="block text-gray-600 text-md md:text-xl mb-3"
                  >
                     이메일
                  </label>
                  <input
                     type="email"
                     id="email"
                     placeholder="이메일을 입력하세요"
                     className="w-full border border-gray-300 dark:border-gray-800 rounded px-3 py-3 text-md md:text-lg focus:outline-none focus:ring-1 focus:ring-yellow-300"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>

               <div>
                  <label
                     htmlFor="password"
                     className="block  text-gray-600 text-md md:text-xl mb-3"
                  >
                     비밀번호
                  </label>
                  <input
                     type="password"
                     id="password"
                     placeholder="비밀번호를 입력하세요"
                     className="w-full border border-gray-300 dark:border-gray-800 rounded px-3 py-3 text-md md:text-lg focus:outline-none focus:ring-1 focus:ring-yellow-300"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-gray-400 mt-1 text-sm">
                     *8자 이상으로 입력하세요
                  </p>
               </div>
               <div>
                  <label
                     htmlFor="password"
                     className="block  text-gray-600 text-md md:text-xl mb-3"
                  >
                     비밀번호 확인
                  </label>
                  <input
                     type="password"
                     id="confirmPassword"
                     placeholder="동일한 비밀번호를 입력하세요"
                     className="w-full border border-gray-300 dark:border-gray-800 rounded px-3 py-3 text-md placeholder:text-xs md:text-lg md:placeholder:text-lg focus:outline-none focus:ring-1 focus:ring-yellow-300"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  />
               </div>
               <div>
                  <button className="w-full bg-gray-700 text-white py-3 text-md md:text-xl rounded transition">
                     회원가입
                  </button>
                  <div className="mt-4 text-sm md:text-m text-center text-gray-500">
                     계정이 이미 있으신가요? -{" "}
                     <Link to="/login">
                        <span className="underline">로그인</span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </form>
   );
}
