interface ClerkAuthorization {
  permission: "org:posts:delete" | "org:posts:manage" | "org:posts:read"
  role: "org:admin" | "org:editor" | "org:viewer"
}
