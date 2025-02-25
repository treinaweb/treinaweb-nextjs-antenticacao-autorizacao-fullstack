"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  return ( session ?
    <button style={{position: "absolute", right: 20 }}
            onClick={() => signOut()}>Logout</button> :
    <button style={{position: "absolute", right: 20 }}
            onClick={() => signIn()}>Login</button>
  )
}