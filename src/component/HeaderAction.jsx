import { useEffect, useState } from "react";
import { Link } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../data/firebase-config";

export default function HeaderAction() {
   const [user, setUser] = useState(null);

   // user 설정
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (curUser) => {
         setUser(curUser);
      });

      return () => unsubscribe();
   }, []);

   // 로그아웃
   const logout = () => {
      signOut(auth)
         .then(() => {
            console.log("로그아웃 성공");
         })
         .catch((e) => {
            console.log(e);
         });
   };

   return (
      <>
         {user === null ? (
            <div className="flex gap-2 text-sm md:text-xl">
               <Link to="/login">
                  <div>로그인</div>
               </Link>
               <Link to="signup">
                  <div>회원가입</div>
               </Link>
            </div>
         ) : (
            <div className="absolute flex text-sm md:text-xl flex-col items-end right-6">
               <div className="cursor-pointer text-base" onClick={logout}>
                  로그아웃
               </div>
               <div>환영합니다 {user.email.split("@")[0]}님</div>
            </div>
         )}
      </>
   );
}
