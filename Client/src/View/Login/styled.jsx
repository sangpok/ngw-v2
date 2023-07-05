const StyledLogin = {
  Container: ({ children, ...props }) => (
    <div className="container m-auto flex h-screen w-screen items-center justify-center" {...props}>
      {children}
    </div>
  ),
  Form: ({ children, ...props }) => (
    <form className="flex w-full flex-col gap-6 p-6" {...props}>
      {children}
    </form>
  ),
  FormGroup: ({ children, ...props }) => (
    <div className="flex-1" {...props}>
      {children}
    </div>
  ),
  Label: ({ children, ...props }) => (
    <p className="font-bold text-black" {...props}>
      {children}
    </p>
  ),
  Input: (props) => (
    <input
      {...props}
      className="w-full appearance-none border-b border-solid border-black bg-none py-2 outline-none"
    />
  ),
  Button: ({ children, ...props }) => (
    <button
      className="appearance-none rounded border border-solid bg-none p-4 font-bold outline-none hover:border-transparent hover:bg-amber-300 hover:text-amber-900"
      {...props}
    >
      {children}
    </button>
  ),
};

export default StyledLogin;
