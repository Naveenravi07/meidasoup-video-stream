"use server";

export async function signupUser(formData: FormData) {
  console.log("Signup attempt:", formData.get("email"));
}

export async function signupWithGithub() {
  console.log("GitHub signup attempt");
}
