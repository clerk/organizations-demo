import * as React from "react"
import { Protect } from "@clerk/nextjs"
import { PostActions } from "@/app/app/post-actions"
import { PostButton } from "@/app/app/post-button"

interface PostItemProps {
  id: string
  title: string
  description: string
}

function PostItem(props: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-3">
      <p className="font-semibold">{props.title}</p>

      <div className="relative border border-blue-500 px-5 py-2 before:absolute before:-top-4 before:left-0 before:text-xs before:text-blue-500 before:content-['RSC']">
        <Protect
          condition={(has) =>
            has({ permission: "org:posts:manage" }) ||
            has({ permission: "org:posts:delete" })
          }
        >
          <PostActions {...props} />
        </Protect>
      </div>
    </div>
  )
}

function Posts() {
  const posts = [
    {
      id: "one",
      title: "Post One",
      description: "This is the first post",
    },
    {
      id: "two",
      title: "Post One",
      description: "This is the first post",
    },
  ]

  return (
    <div className="divide-y rounded-md border">
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  )
}

export default function CreateOrganizationPage() {
  return (
    <main
      className={
        "col-span-2 flex h-full w-full items-center justify-center space-y-6 pt-6"
      }
    >
      <div className={"flex w-full max-w-lg flex-col gap-4"}>
        <h1>POSTS</h1>

        <Protect
          permission="org:posts:read"
          fallback={<p>Access not granted</p>}
        >
          <Posts />
        </Protect>
        <PostButton />
      </div>
    </main>
  )
}
