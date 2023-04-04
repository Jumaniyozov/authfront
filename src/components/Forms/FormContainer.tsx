import { createContext, useContext, useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

export interface ContextType {
  success: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignFormContext = createContext<ContextType>({} as ContextType);

export const useSignFormContext = () => {
  const context = useContext(SignFormContext);
  if (!context) {
    throw new Error("FormContext must be used within FormContext.Provider");
  }
  return context;
};

const FormContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <SignFormContext.Provider value={{ success, setSuccess }}>
      {children}
    </SignFormContext.Provider>
  );
};

const FormContainer = () => {
  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <FormContextProvider>
          <FormBox />
        </FormContextProvider>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

const FormBox = () => {
  const { success } = useSignFormContext();
  return <>{success ? <SignInForm /> : <SignUpForm />}</>;
};

export default FormContainer;
