import { useNavigate, useRouteError } from 'react-router-dom';

type RouteError = {
  data: object;
  status: number;
  statusText: string;
  message: string;
};

function ErrorPage() {
  const { status, statusText, message } = useRouteError() as RouteError;
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h2 className="mb-5 text-8xl font-semibold text-neutral-300">{status}</h2>
      <h1 className="mb-2 text-lg font-semibold">Sorry, an error has occurred.</h1>
      <p className="mb-5 text-lg text-neutral-300">{statusText || message}</p>
      <button
        className="w-11/12 max-w-xs rounded-lg bg-black p-3 text-white transition-all hover:scale-105"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </div>
  );
}

export default ErrorPage;
