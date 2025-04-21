import LoginForm from "@/components/loginForm";

interface Prop {
  searchParams : Promise<{error?: string}>
}

  export default async function LoginPage({searchParams}: Prop) {
    const errorMessage = (await searchParams).error;
    return (
       <LoginForm errorMessage={errorMessage}/>
    );
  }