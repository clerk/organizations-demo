"use client"

import { useAuth } from "@clerk/nextjs"

interface PostItemProps {
  id: string
  title: string
  description: string
}

export function PostActions(props: PostItemProps) {
  const { has, isLoaded } = useAuth()
  if (!isLoaded) return null

  const canEdit = has({ permission: "org:posts:manage" })
  const canDelete = has({ permission: "org:posts:delete" })

  return (
    <div className="relative border border-red-500 before:absolute before:-top-4 before:text-xs before:text-red-500 before:content-['Client_Component']">
      <div className={"flex gap-1 divide-x rounded border px-2"}>
        {canEdit && <button>Edit</button>}
        {canDelete && <button className="text-red-500">Delete</button>}
      </div>
    </div>
  )
}
