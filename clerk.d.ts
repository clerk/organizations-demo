interface ClerkAuthorization {
  permission:
    | "org:posts:delete"
    | "org:posts:manage"
    | "org:billing:manage"
    | "org:billing:read"
    | "org:posts:read"
  role: "org:editor"
}
