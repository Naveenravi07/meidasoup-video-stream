"use server";

export async function loginUser(formData: FormData) {
  console.log("Login attempt:", formData.get("email"));
}

export async function loginWithGithub() {
  console.log("GitHub login attempt");
}
