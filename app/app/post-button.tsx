"use client"

import { Experimental__Gate } from "@clerk/nextjs"
import * as React from "react"

export function PostButton() {
  return (
    <div className="relative border border-red-500 before:absolute before:-top-4 before:text-xs before:text-red-500 before:content-['Client_Component']">
      <Experimental__Gate permission="org:posts:manage">
        <button>New Post</button>
      </Experimental__Gate>
    </div>
  )
}
