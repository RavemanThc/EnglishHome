// sapp/(public routes)/sign-in/page.tsx

"use client";

const SignIn = () => {
  const handleSubmit = async (formData: FormData) => {};

  return (
    <form action={handleSubmit}>
      <h1>Sign in</h1>
      <label>
        Email
        <input type="email" name="email" required />
      </label>
      <label>
        Password
        <input type="password" name="password" required />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
};

export default SignIn;
